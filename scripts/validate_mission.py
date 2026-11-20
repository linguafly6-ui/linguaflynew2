#!/usr/bin/env python3
"""Standard-library structural and cross-reference validator for mission v1.1.0."""
import json, re, sys
from pathlib import Path

ORDER = ["explore","practice","grammar","pronunciation","reading","writing","speaking","listening"]
COUNTS = dict(explore=10, practice=20, grammar=10, pronunciation=10, reading=10, writing=10, speaking=10, listening=10)
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

def validate(data):
    errors, seen = [], {}
    def err(path, msg): errors.append(f"{path}: {msg}")
    def check_id(value, path):
        if not isinstance(value, str) or not ID_RE.fullmatch(value): err(path, "ID ausente o inválido")
        elif value in seen: err(path, f"ID duplicado; primera aparición en {seen[value]}")
        else: seen[value] = path
    if not isinstance(data, dict): return ["$: la raíz debe ser un objeto"]
    if data.get("schemaVersion") != "1.1.0": err("$.schemaVersion", "debe ser 1.1.0")
    if type(data.get("contentVersion")) is not int or data["contentVersion"] < 1: err("$.contentVersion", "debe ser entero >= 1")
    for group, field in [("course","courseId"),("unit","unitId"),("mission","missionId")]:
        obj=data.get(group)
        if not isinstance(obj,dict): err("$."+group,"objeto obligatorio"); continue
        check_id(obj.get(field), "$."+group+"."+field)
    course,unit,mission=(data.get(k,{}) for k in ("course","unit","mission"))
    if isinstance(course,dict) and isinstance(unit,dict) and unit.get("courseId") != course.get("courseId"): err("$.unit.courseId","no coincide con course.courseId")
    if isinstance(unit,dict) and isinstance(mission,dict) and mission.get("unitId") != unit.get("unitId"): err("$.mission.unitId","no coincide con unit.unitId")
    if isinstance(course,dict) and course.get("language") != "en-GB": err("$.course.language","esta versión requiere en-GB")
    sections=data.get("sections")
    if not isinstance(sections,list) or len(sections)!=8: err("$.sections","debe contener exactamente 8 secciones"); return errors
    for i,(s,key) in enumerate(zip(sections,ORDER),1):
        p=f"$.sections[{i-1}]"
        if not isinstance(s,dict): err(p,"debe ser objeto"); continue
        if s.get("sectionKey")!=key: err(p+".sectionKey",f"se esperaba {key}")
        if s.get("position")!=i: err(p+".position",f"se esperaba {i}")
        check_id(s.get("sectionId"),p+".sectionId")
        ex=s.get("exercise")
        if not isinstance(ex,dict): err(p+".exercise","objeto obligatorio"); continue
        check_id(ex.get("exerciseId"),p+".exerciseId")
        items=ex.get("items")
        if not isinstance(items,list) or len(items)!=COUNTS[key]:
            n=len(items) if isinstance(items,list) else "no definido"
            err(p+".exercise.items",f"se requieren {COUNTS[key]} elementos; encontrados {n}"); continue
        for j,item in enumerate(items,1):
            ip=f"{p}.exercise.items[{j-1}]"
            if not isinstance(item,dict): err(ip,"debe ser objeto"); continue
            check_id(item.get("itemId"),ip+".itemId")
            if item.get("position")!=j: err(ip+".position",f"se esperaba {j}")
            required={"pronunciation":["word","translation","pronunciationGuide","audio"],"writing":["audio","expectedAnswer","evaluation"],"speaking":["prompt","modelAnswer","evaluation"]}.get(key,[])
            for field in required:
                if not item.get(field): err(ip+"."+field,"campo obligatorio")
            if key=="speaking":
                ev=item.get("evaluation",{})
                if not isinstance(ev,dict) or ev.get("transcriptionSeparateFromPronunciation") is not True:
                    err(ip+".evaluation","debe separar transcripción y evaluación fonética")
        if key=="reading":
            c=ex.get("content",{})
            if not isinstance(c,dict) or not c.get("passageId") or not c.get("passage"): err(p+".exercise.content","requiere passageId y pasaje completo")
            else: check_id(c["passageId"],p+".exercise.content.passageId")
        if key=="listening":
            c=ex.get("content",{})
            if not isinstance(c,dict):
                err(p+".exercise.content","objeto obligatorio")
                continue
            if not c.get("audio"): err(p+".exercise.content.audio","requiere audio reproducible o directiva de síntesis")
            if c.get("audioLocale")!="en-GB": err(p+".exercise.content.audioLocale","debe ser en-GB")
            if c.get("interaction")!="select_place_move_replace": err(p+".exercise.content.interaction","debe permitir seleccionar, colocar, mover y sustituir palabras")
            template=c.get("transcriptTemplate","")
            tokens=re.findall(r"\[\[gap-(\d{2})\]\]",template) if isinstance(template,str) else []
            if tokens!=[f"{i:02d}" for i in range(1,11)]: err(p+".exercise.content.transcriptTemplate","debe contener exactamente los tokens [[gap-01]] a [[gap-10]], en orden")
            bank=c.get("wordBank")
            if not isinstance(bank,list) or len(bank)!=10:
                err(p+".exercise.content.wordBank","debe contener exactamente 10 palabras")
                bank=[]
            bank_ids=set(); bank_words=[]
            for k,w in enumerate(bank):
                if not isinstance(w,dict):
                    err(f"{p}.exercise.content.wordBank[{k}]","entrada inválida")
                    continue
                wid=w.get("wordId"); check_id(wid,f"{p}.exercise.content.wordBank[{k}].wordId")
                if isinstance(wid,str) and wid: bank_ids.add(wid)
                word=w.get("word")
                if not isinstance(word,str) or not word.strip(): err(f"{p}.exercise.content.wordBank[{k}].word","palabra obligatoria")
                else: bank_words.append(word.strip().casefold())
            if len(bank_words)!=10 or len(set(bank_words))!=10: err(p+".exercise.content.wordBank","las diez palabras deben ser distintas")
            used=[]
            for k,it in enumerate(items):
                if not isinstance(it,dict): continue
                expected=f"[[gap-{k+1:02d}]]"
                if it.get("gapToken")!=expected: err(f"{p}.exercise.items[{k}].gapToken",f"debe ser {expected}")
                wid=it.get("expectedWordId"); used.append(wid)
                if not isinstance(wid,str) or wid not in bank_ids: err(f"{p}.exercise.items[{k}].expectedWordId","no referencia palabra del banco")
            if len(used)!=10 or len(set(x for x in used if isinstance(x,str)))!=10: err(p+".exercise.items","los diez huecos deben usar las diez palabras distintas del banco")
    return errors

def main():
    if len(sys.argv)!=2:
        print("Uso: python3 scripts/validate_mission.py ruta/mision.json",file=sys.stderr); return 2
    try: data=json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    except (OSError,json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}",file=sys.stderr); return 2
    issues=validate(data)
    if issues:
        print(f"NO VÁLIDA: {len(issues)} problema(s)")
        for x in issues: print("- "+x)
        return 1
    print("VÁLIDA: estructura, cantidades, orden e IDs básicos conformes a v1.1.0"); return 0

if __name__=="__main__": raise SystemExit(main())
