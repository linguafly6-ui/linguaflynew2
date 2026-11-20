import os, re, json, html, glob
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT=Path(".")
OUT=ROOT/"artifacts"/"A1_contenido_produccion_y_secciones_PreA1.xlsx"
SECTIONS=[
 ("explore","Exploración"),("practice","Práctica"),("grammar","Gramática"),
 ("pronunciation","Pronunciación"),("reading","Reading"),("writing","Writing"),
 ("speaking","Speaking"),("listening","Listening")
]
def clean(s):
    s=html.unescape(str(s or ""))
    s=re.sub(r"<script\b[\s\S]*?</script>"," ",s,flags=re.I)
    s=re.sub(r"<style\b[\s\S]*?</style>"," ",s,flags=re.I)
    s=re.sub(r"<[^>]+>"," ",s)
    return re.sub(r"\s+"," ",s).strip()

def title_of(src):
    m=re.search(r"<title[^>]*>([\s\S]*?)</title>",src,re.I)
    if m: return clean(m.group(1))
    m=re.search(r"<h1[^>]*>([\s\S]*?)</h1>",src,re.I)
    return clean(m.group(1)) if m else ""

def parse_json_assignment(src, pattern):
    m=re.search(pattern,src,re.S|re.I)
    if not m: return {}
    try: return json.loads(m.group(1))
    except Exception: return {}

def data_object(src):
    # Mission pages use a JSON object assigned to const data.
    return parse_json_assignment(src,r"\bconst\s+data\s*=\s*(\{[\s\S]*?\})\s*;\s*(?:let|const|function)\b")

def config_object(src):
    return parse_json_assignment(src,r"window\.LINGUAFLY_MISSION\s*=\s*(\{[\s\S]*?\})\s*;")

def panel_texts(src):
    out={}
    for m in re.finditer(r"<section\b([^>]*)>([\s\S]*?)</section>",src,re.I):
        attrs=m.group(1)
        idm=re.search(r'\bid=["\']([^"\']+)["\']',attrs,re.I)
        if not idm: continue
        out[idm.group(1)]=clean(m.group(2))
    # Some earlier pages use div.panel rather than section.
    if not out:
        for m in re.finditer(r"<div\b([^>]*\bclass=[\"'][^\"']*\bpanel\b[^\"']*[\"'][^>]*)>([\s\S]*?)</div>\s*(?=<div\b[^>]*class=[\"'][^\"']*\bpanel\b|</main>)",src,re.I):
            idm=re.search(r'\bid=["\']([^"\']+)["\']',m.group(1),re.I)
            if idm: out[idm.group(1)]=clean(m.group(2))
    return out

def tab_ids(src):
    return re.findall(r'data-tab=["\']([^"\']+)["\']',src,re.I)

def scripts(src):
    return re.findall(r'<script[^>]+src=["\']([^"\']+)["\']',src,re.I)

def mission_record(level,n,path):
    src=path.read_text(encoding="utf-8",errors="replace")
    cfg=config_object(src)
    data=data_object(src)
    title=cfg.get("title") or title_of(src)
    if title.startswith("Linguafly"): title=re.sub(r"^Linguafly\s*[·|:-]*\s*(?:Pre-A1|A1)?\s*[·|:-]*\s*\d+\s*[·|:-]*\s*","",title,flags=re.I).strip()
    panels=panel_texts(src)
    tabs=tab_ids(src)
    if not tabs:
        tabs=list(panels.keys())
    words=cfg.get("words") or data.get("words") or []
    extra=cfg.get("extraVocabulary") or []
    qs=data.get("qs") or data.get("questions") or []
    grammar=cfg.get("grammar") or {}
    pronunciation=cfg.get("pronunciation") or []
    reading=cfg.get("readingText") or data.get("readingText") or ""
    reading_q=cfg.get("readingQuestions") or data.get("readingQuestions") or []
    listening=cfg.get("listeningScript") or data.get("listeningScript") or ""
    listening_q=cfg.get("listeningQuestions") or data.get("listeningQuestions") or []
    # A1 content is stored in the data.words / data.qs arrays; Pre-A1 011-070 uses mission config.
    return {
      "level":level,"id":f"{n:03d}","title":title,"path":str(path).replace("\\","/"),
      "tabs":tabs,"panels":panels,"words":words,"extra":extra,"qs":qs,
      "grammar":grammar,"pronunciation":pronunciation,"reading":reading,
      "reading_q":reading_q,"listening":listening,"listening_q":listening_q,
      "listening_format":cfg.get("listeningFormat",""),
      "description":cfg.get("description",""),"theme":cfg.get("theme",""),
      "scripts":scripts(src),"source":src
    }

def as_text(v):
    if isinstance(v,(dict,list)): return json.dumps(v,ensure_ascii=False)
    return clean(v)

def add_sheet(wb,name,headers,rows,widths=None):
    ws=wb.create_sheet(name)
    ws.append(headers)
    for row in rows: ws.append([as_text(x) for x in row])
    ws.freeze_panes="A2"
    ws.auto_filter.ref=ws.dimensions
    for c in ws[1]:
        c.font=Font(bold=True,color="FFFFFF")
        c.fill=PatternFill("solid",fgColor="254A87")
        c.alignment=Alignment(vertical="center",wrap_text=True)
    ws.row_dimensions[1].height=28
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment=Alignment(vertical="top",wrap_text=True)
    if widths:
        for i,width in enumerate(widths,1): ws.column_dimensions[get_column_letter(i)].width=width
    else:
        for i in range(1,len(headers)+1): ws.column_dimensions[get_column_letter(i)].width=min(55,max(16,len(headers[i-1])+3))
    return ws

a1_paths=sorted((ROOT/"public/missions/a1").glob("*/index.html"))
pre_paths=sorted((ROOT/"public/missions/pre-a1").glob("*/index.html"))
a1=[mission_record("A1",int(p.parent.name),p) for p in a1_paths if p.parent.name.isdigit()]
pre=[mission_record("Pre-A1",int(p.parent.name),p) for p in pre_paths if p.parent.name.isdigit()]
a1.sort(key=lambda x:int(x["id"])); pre.sort(key=lambda x:int(x["id"]))

wb=Workbook()
summary=wb.active; summary.title="Resumen"
summary.append(["Curso","Misiones detectadas","Secciones","Fuente"])
summary.append(["A1",len(a1),"Exploración; Práctica","main · public/missions/a1"])
summary.append(["Pre-A1",len(pre),"Exploración; Práctica; Gramática; Pronunciación; Reading; Writing; Speaking; Listening (según misión)","main · public/missions/pre-a1"])
summary.append(["Criterio","Contenido extraído del HTML/JSON de producción. Las celdas vacías indican que el contenido no está presente en el archivo de esa misión.","","",""])
summary.append(["Nota","Las secciones cargadas mediante runtimes externos se identifican en la hoja Secciones y en la columna de recursos; el runtime compartido no se duplica como contenido de cada misión.","","",""])
for c in summary[1]:
    c.font=Font(bold=True,color="FFFFFF"); c.fill=PatternFill("solid",fgColor="254A87")
for row in summary.iter_rows():
    for c in row: c.alignment=Alignment(vertical="top",wrap_text=True)
summary.column_dimensions["A"].width=22; summary.column_dimensions["B"].width=80; summary.column_dimensions["C"].width=70; summary.column_dimensions["D"].width=42

mission_rows=[]
for m in a1+pre:
    mission_rows.append([m["level"],m["id"],m["title"],m["theme"],m["description"],", ".join(m["tabs"]),m["path"],"; ".join(m["scripts"])])
add_sheet(wb,"Misiones",["Curso","Misión","Título","Tema","Descripción","Secciones/pestañas detectadas","Archivo fuente","Scripts/runtime"],mission_rows,[12,10,34,32,55,48,48,55])

section_rows=[]
for m in a1+pre:
    present=set(m["tabs"])|set(m["panels"].keys())
    # Data-only sections in Pre-A1 011-070 are represented explicitly.
    if m["level"]=="Pre-A1":
        if m["grammar"]: present.add("grammar")
        if m["pronunciation"]: present.add("pronunciation")
        if m["reading"]: present.add("reading")
        if m["listening"]: present.add("listening")
        if m["scripts"] and any("writing" in s.lower() for s in m["scripts"]): present.add("writing")
    for sid,label in SECTIONS:
        content=m["panels"].get(sid,"")
        if sid=="explore" and not content and m["words"]:
            content="Relacionar vocabulario inglés-español. Vocabulario: "+as_text(m["words"])
        if sid=="practice" and not content and m["qs"]:
            content=f"Banco de práctica: {len(m['qs'])} actividades/preguntas."
        if sid=="grammar" and m["grammar"]:
            g=m["grammar"]; content=" | ".join(str(g.get(k,"")) for k in ["focus","model","practice","order"] if g.get(k))
            if g.get("items"): content += " | Actividades: "+as_text(g["items"])
        if sid=="pronunciation" and m["pronunciation"]:
            content="; ".join((str(x.get("word",""))+": "+str(x.get("activity",""))) if isinstance(x,dict) else str(x) for x in m["pronunciation"])
        if sid=="reading" and m["reading"]:
            content=m["reading"]
            if m["reading_q"]: content+=" | Preguntas: "+as_text(m["reading_q"])
        if sid=="listening" and m["listening"]:
            content=(m["listening_format"]+": " if m["listening_format"] else "")+m["listening"]
            if m["listening_q"]: content+=" | Preguntas: "+as_text(m["listening_q"])
        if sid=="writing" and not content and any("writing" in s.lower() for s in m["scripts"]):
            content="Sección conectada a runtime externo: "+", ".join(s for s in m["scripts"] if "writing" in s.lower())
        if sid=="speaking" and not content and any("speaking" in s.lower() for s in m["scripts"]):
            content="Sección conectada a runtime externo: "+", ".join(s for s in m["scripts"] if "speaking" in s.lower())
        section_rows.append([m["level"],m["id"],m["title"],label,"Sí" if sid in present else "No",content,m["path"]])
add_sheet(wb,"Secciones",["Curso","Misión","Título","Sección","Presente","Contenido extraído / actividad","Archivo fuente"],section_rows,[12,10,32,20,12,100,48])

vocab_rows=[]
for m in a1+pre:
    for item in (m["words"] or [])+(m["extra"] or []):
        if isinstance(item,(list,tuple)):
            vocab_rows.append([m["level"],m["id"],m["title"],item[0] if len(item)>0 else "",item[1] if len(item)>1 else "",item[2] if len(item)>2 else ""])
        elif isinstance(item,dict):
            vocab_rows.append([m["level"],m["id"],m["title"],item.get("en",""),item.get("es",""),item.get("emoji","")])
add_sheet(wb,"Vocabulario",["Curso","Misión","Título","Inglés","Español","Apoyo visual"],vocab_rows,[12,10,32,28,32,16])

practice_rows=[]
for m in a1+pre:
    for idx,q in enumerate(m["qs"],1):
        if isinstance(q,dict):
            practice_rows.append([m["level"],m["id"],m["title"],idx,q.get("type") or q.get("kind",""),q.get("en") or q.get("prompt",""),q.get("es",""),q.get("correct") or q.get("answer","")," | ".join(map(str,q.get("opts",q.get("options",[]))))])
    for idx,q in enumerate((m["grammar"] or {}).get("items",[]),1):
        if isinstance(q,dict):
            practice_rows.append([m["level"],m["id"],m["title"],f"G{idx}","Gramática",q.get("prompt",""),q.get("es",""),q.get("answer","")," | ".join(map(str,q.get("options",[])))])
add_sheet(wb,"Banco de práctica",["Curso","Misión","Título","N.º","Tipo","Enunciado inglés","Traducción/ayuda","Respuesta","Opciones"],practice_rows,[12,10,32,10,24,65,65,42,70])

runtime_rows=[]
seen=set()
for m in pre:
    for s in m["scripts"]:
        if s not in seen:
            seen.add(s)
            runtime_path=ROOT/"public"/s.lstrip("/")
            if not runtime_path.exists(): runtime_path=ROOT/s.lstrip("/")
            content=""
            if runtime_path.exists():
                raw=runtime_path.read_text(encoding="utf-8",errors="replace")
                content=clean(raw)[:12000]
            runtime_rows.append([s,"Disponible" if runtime_path.exists() else "No localizado",content])
add_sheet(wb,"Runtimes",["Script enlazado","Estado","Contenido textual (primeros 12.000 caracteres)"],runtime_rows,[55,18,120])

# Make workbook usable and auditable.
for ws in wb.worksheets:
    ws.sheet_view.showGridLines=False
    ws.sheet_properties.pageSetUpPr.fitToPage=True
    ws.page_setup.fitToWidth=1
    ws.page_setup.fitToHeight=0
    ws.sheet_view.zoomScale=85
OUT.parent.mkdir(parents=True,exist_ok=True)
wb.save(OUT)
print(f"Workbook created: {OUT}; A1={len(a1)} missions; Pre-A1={len(pre)} missions; sections={len(section_rows)}; vocabulary={len(vocab_rows)}; practice={len(practice_rows)}")
