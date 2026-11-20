import re, json, html
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

ROOT=Path(".")
OUT=ROOT/"artifacts"/"A1_contenido_A1_ocho_secciones.xlsx"
SECTIONS=["Exploración","Práctica","Gramática","Pronunciación","Reading","Writing","Speaking","Listening"]

GRAMMAR=[
("Verb to be: am / is / are","Use am with I, is with he/she/it, and are with you/we/they. Add not to make a negative sentence. Put am/is/are before the subject in a question.","I am interested in this topic. / It is useful. / Are you ready?","1) I __ a student. 2) She __ happy. 3) __ you ready?","am; is; Are"),
("Subject pronouns and possessive adjectives","Use I, you, he, she, it, we and they for people or things. Use my, your, his, her, its, our and their before a noun.","My favourite topic is this. / Her idea is good. / They are in class.","1) This is Maria. __ is here. 2) I have a book. It is __ book. 3) They have a teacher. __ teacher is kind.","She; my; Their"),
("Present simple","Use the present simple for routines and facts. Add -s to most verbs with he, she and it. Use do/does for questions.","I study English every day. / She likes this topic. / Do you practise?","1) He (like) __ English. 2) I (study) __ at home. 3) __ she work here?","likes; study; Does"),
("Articles and plural nouns","Use a before a consonant sound and an before a vowel sound. Use the for something specific. Add -s or -es to make many nouns plural.","It is a useful word. / I have an idea. / The examples are easy.","1) __ apple 2) two book__ 3) __ teacher in our class","an; s; The"),
("Have got","Use have got with I/you/we/they and has got with he/she/it. Use haven't got or hasn't got for negatives.","I have got a question. / She has got a new book. / Have you got a pen?","1) I __ got a notebook. 2) He __ got a phone. 3) __ they got time?","have; has; Have"),
("There is / There are and place prepositions","Use there is for one thing and there are for two or more. Use in, on and under to say where something is.","There is a book on the desk. / There are two chairs in the room.","1) __ a picture on the wall. 2) __ three students here. 3) The pen is __ the bag.","There is; There are; in"),
("Can / can't","Use can + base verb to talk about ability or possibility. Use can't for a negative. Make questions with Can + subject + verb?","I can talk about this topic. / Can you repeat, please?","1) She can __ (speak) English. 2) I __ swim. (negative) 3) __ you help me?","speak; can't; Can"),
("Present continuous","Use am/is/are + verb-ing for actions happening now. Add -ing to the main verb.","I am studying now. / They are listening. / He is writing a sentence.","1) I am __ (read). 2) She __ speaking. 3) They are __ (study).","reading; is; studying"),
("Like / love + nouns or -ing","Use like or love + a noun, or like/love + verb-ing, to talk about preferences.","I like this subject. / I love learning English. / Do you like reading?","1) I like __ (read). 2) He loves __ (music). 3) Do you __ this topic?","reading; music; like"),
("Question words","Use what for things, where for places, when for times, who for people, why for reasons and how for manner.","What is it? / Where do you study? / How do you say this word?","1) __ is your name? 2) __ do you live? 3) __ is your birthday?","What; Where; When"),
]
def clean(x):
    return re.sub(r"\s+"," ",html.unescape(str(x or ""))).strip()
def load_mission(path):
    src=path.read_text(encoding="utf-8",errors="replace")
    m=re.search(r"\bconst\s+data\s*=\s*(\{[\s\S]*?\})\s*;",src)
    if not m: raise ValueError(f"Cannot find mission data in {path}")
    data=json.loads(m.group(1))
    tm=re.search(r"<h1[^>]*>([\s\S]*?)</h1>",src,re.I)
    title=clean(tm.group(1)) if tm else clean(re.search(r"<title[^>]*>(.*?)</title>",src,re.I).group(1))
    return int(path.parent.name),title,data
def safe_words(data):
    out=[]
    for item in data.get("words",[]):
        if isinstance(item,(list,tuple)) and len(item)>=2:
            out.append((clean(item[0]),clean(item[1])))
    return out
def grammar_block(n,title,words):
    g=GRAMMAR[(n-1)%len(GRAMMAR)]
    topic=title
    w=[x[0] for x in words[:3]]
    return (f"OBJETIVO: {g[0]}\n\nEXPLICACIÓN A1: {g[1]}\n\nEJEMPLOS EN CONTEXTO ({topic}): {g[2]}\n\nPRÁCTICA GUIADA:\n{g[3]}\n\nSOLUCIONES: {g[4]}\n\nPRODUCCIÓN: Escribe dos frases verdaderas sobre {topic}. Usa la estructura de esta lección." )
def pronunciation_block(n,title,words):
    terms=[x[0] for x in words]
    joined=", ".join(terms[:6])
    alltext=" ".join(terms).lower()
    if any(x in alltext for x in ["think","three","thank","birthday","thursday"]):
        focus="El sonido inicial th de think: coloca suavemente la lengua entre los dientes y deja salir el aire."
        drill="think – three – thank – this – that"
    elif any(x in alltext for x in ["hello","hotel","home","help","happy"]):
        focus="La h inicial: deja salir aire suavemente; no pronuncies una vocal antes de la h."
        drill="hello – home – happy – help – hotel"
    elif any(x in alltext for x in ["she","shop"," English","fish","shopping"]):
        focus="Distingue sh /ʃ/ (como en she) del sonido s /s/."
        drill="she – shop – fish – see – sit"
    elif any(x in alltext for x in ["chair","teacher","chicken","lunch"]):
        focus="El sonido ch /tʃ/: empieza con una pequeña pausa y suelta el aire."
        drill="chair – teacher – chicken – lunch"
    elif any(x.endswith("s") for x in terms):
        focus="Pronuncia con claridad la -s final en plurales y en la tercera persona del presente."
        drill="books – names – likes – works"
    else:
        focus="Acento de palabra: marca con más fuerza una sílaba. Escucha el modelo y repite sin separar las sílabas."
        drill="Repite despacio y después a velocidad natural: "+ " – ".join(terms[:5])
    return (f"OBJETIVO: pronunciar con claridad vocabulario de {title}.\n\nCONSEJO: {focus}\n\nESCUCHA Y REPITE: {drill}\n\nPRÁCTICA CON EL VOCABULARIO DE LA MISIÓN: {joined}.\n\nACTIVIDAD: 1) Lee cada palabra en voz alta. 2) Da una palmada en la sílaba más fuerte. 3) Grábate leyendo cinco palabras y compara tu pronunciación con el modelo del profesor.\n\nAUTOEVALUACIÓN: ¿Se entiende cada palabra? ¿Mantienes el sonido final? ¿Pronuncias sin añadir sílabas?")
def explore_block(title,words):
    lines=[f"OBJETIVO: activar conocimientos y comprender el vocabulario clave de {title}.",
           "ANTES DE EMPEZAR: Mira el título. ¿Qué palabras conoces? Di dos ideas sencillas en inglés.",
           "VOCABULARIO CLAVE:"]
    for en,es in words:
        lines.append(f"• {en} = {es}. Modelo: I can use “{en}” when I talk about {title}.")
    lines += ["COMPRUEBA: 1) Elige cinco palabras nuevas. 2) Relaciona cada palabra con su traducción. 3) Di una frase corta con tres palabras.",
              "PREGUNTAS PARA HABLAR: What do you know about this topic? Which words are new for you?"]
    return "\n".join(lines)
def practice_block(title,words):
    tasks=[]
    for i,(en,es) in enumerate(words[:5],1):
        tasks.append(f"{i}. Traduce al español: {en}. Respuesta: {es}.")
    for i,(en,es) in enumerate(words[5:8],6):
        tasks.append(f"{i}. Completa la frase con la palabra inglesa: “I can say {en} in a sentence about {title}.” Traducción: {es}.")
    tasks += [f"{len(tasks)+1}. Producción: escribe una frase A1 sobre {title} con una palabra del vocabulario.",
              f"{len(tasks)+2}. Comprensión: explica en español la diferencia entre dos palabras de la lista."]
    return "OBJETIVO: recordar y usar el vocabulario de la misión.\n\nACTIVIDADES:\n"+"\n".join(tasks)+"\n\nCRITERIO DE ÉXITO: 5/5 palabras reconocidas y al menos dos frases comprensibles."
def reading_block(title,words):
    vocab=", ".join(x[0] for x in words[:5])
    return (f"READING · A1\n\nRead the short text.\n\n“Hello! My name is Alex. I am in an English class. This week, our topic is {title}. I learn new words and write them in my notebook. I practise with a friend. We read the words, say them aloud and make short sentences. English is interesting. I study a little every day.”\n\nKEY WORDS: {vocab}.\n\nCOMPREHENSION:\n1. What is Alex doing? — Alex is in an English class.\n2. Where does Alex write new words? — In a notebook.\n3. Who does Alex practise with? — A friend.\n4. Is English interesting for Alex? — Yes, it is.\n\nFOLLOW-UP: Find three words connected with the mission topic. Write one new sentence.")
def writing_block(title,words):
    vocab=", ".join(x[0] for x in words[:5])
    return (f"WRITING · A1\n\nTASK: Write a short text (5–6 sentences) about {title}. Use simple present sentences and at least three words from this mission: {vocab}.\n\nPLAN:\n1. Introduce the topic.\n2. Say what you know or like.\n3. Add two simple details.\n4. Finish with a short opinion.\n\nMODEL:\n“My name is Alex. I want to write about {title}. I learn new words in English. I practise with my class. I like this topic because it is interesting.”\n\nCHECKLIST: Capital letter at the beginning; full stop at the end; correct word order; at least three target words; 5–6 clear sentences.")
def speaking_block(title,words):
    a=words[0][0] if words else "topic"
    b=words[1][0] if len(words)>1 else "idea"
    return (f"SPEAKING · A1\n\nSITUATION: Talk to a classmate about {title}.\n\nMODEL DIALOGUE:\nA: Hello! What are you learning today?\nB: I am learning about {title}.\nA: What new word do you know?\nB: I know “{a}”.\nA: What does it mean?\nB: It means “{words[0][1] if words else '...'}”.\nA: Great! Can you use it in a sentence?\nB: Yes. I can use “{a}” in a sentence. What about you?\nA: I know “{b}”.\n\nYOUR TURN: Change the two target words. Ask and answer three questions. Speak for 30–45 seconds.\n\nUSEFUL PHRASES: I think… / I like… / I don't know. / Can you repeat, please? / How do you say … in English?")
def listening_block(title,words):
    a=words[0][0] if words else "English"
    b=words[1][0] if len(words)>1 else "class"
    return (f"LISTENING · A1\n\nTEACHER SCRIPT (read twice at a natural, slow speed):\n“Hello! My name is Emma. Today, our English lesson is about {title}. I have a notebook and a pen. I listen to the new words and repeat them. My favourite word today is {a}. I practise with my friend after class. We use {b} in a short sentence. Learning English is fun.”\n\nQUESTIONS:\n1. What is the lesson about? — {title}.\n2. What does Emma have? — A notebook and a pen.\n3. What does Emma do with the new words? — She listens and repeats them.\n4. Who does Emma practise with? — Her friend.\n5. Is learning English fun for Emma? — Yes, it is.\n\nLISTEN AGAIN: Listen for the words {a} and {b}. Repeat the final sentence.")
def main():
    paths=sorted((ROOT/"public/missions/a1").glob("*/index.html"))
    missions=[load_mission(p) for p in paths if p.parent.name.isdigit()]
    missions.sort(key=lambda x:x[0])
    if len(missions)!=50: raise ValueError(f"Expected 50 A1 missions, found {len(missions)}")
    wb=Workbook(); ws=wb.active; ws.title="Resumen"
    ws.append(["Curso","Misiones","Secciones nuevas por misión","Fuente","Criterio"])
    ws.append(["A1",50,"8: Exploración, Práctica, Gramática, Pronunciación, Reading, Writing, Speaking, Listening","main · public/missions/a1","Contenido original redactado para nivel A1; Pre-A1 no se copia."])
    ws.append(["Alcance","400 bloques didácticos (50 misiones × 8 secciones)","","",""])
    ws.append(["Base de adaptación","Se conservan los títulos y el vocabulario temático A1 de cada misión; las explicaciones, textos, diálogos y ejercicios son nuevos y graduados a A1.","","",""])
    for c in ws[1]:
        c.font=Font(bold=True,color="FFFFFF"); c.fill=PatternFill("solid",fgColor="254A87")
    for row in ws.iter_rows():
        for c in row: c.alignment=Alignment(vertical="top",wrap_text=True)
    for col,w in {"A":24,"B":18,"C":70,"D":42,"E":78}.items(): ws.column_dimensions[col].width=w
    ws.freeze_panes="A2"
    rows=[]; vocab=[]; sourcepractice=[]
    for n,title,data in missions:
        words=safe_words(data)
        if not words: raise ValueError(f"No A1 vocabulary found in mission {n:03d}")
        contents=[
          explore_block(title,words),practice_block(title,words),grammar_block(n,title,words),
          pronunciation_block(n,title,words),reading_block(title,words),writing_block(title,words),
          speaking_block(title,words),listening_block(title,words)
        ]
        objectives=[
          "Activar conocimientos previos y comprender el vocabulario del tema.",
          "Practicar vocabulario y producir frases breves.",
          GRAMMAR[(n-1)%len(GRAMMAR)][0],
          "Mejorar la inteligibilidad y el acento de palabra.",
          "Comprender un texto breve con vocabulario frecuente.",
          "Escribir un texto guiado de 5–6 frases.",
          "Participar en un intercambio breve y predecible.",
          "Identificar información principal y detalles en un audio breve."
        ]
        for section,objective,content in zip(SECTIONS,objectives,contents):
            rows.append([f"{n:03d}",title,section,objective,content])
        for en,es in words: vocab.append([f"{n:03d}",title,en,es])
        for q in data.get("qs",[]):
            if isinstance(q,dict):
                sourcepractice.append([f"{n:03d}",title,clean(q.get("type") or q.get("kind") or ""),clean(q.get("en") or q.get("prompt") or ""),clean(q.get("es") or q.get("correct") or ""), " | ".join(map(str,q.get("opts",[])))])
    def add(name,headers,data,widths):
        sh=wb.create_sheet(name); sh.append(headers)
        for r in data: sh.append(r)
        sh.freeze_panes="A2"; sh.auto_filter.ref=sh.dimensions; sh.sheet_view.showGridLines=False
        for c in sh[1]:
            c.font=Font(bold=True,color="FFFFFF"); c.fill=PatternFill("solid",fgColor="254A87")
            c.alignment=Alignment(vertical="center",wrap_text=True)
        sh.row_dimensions[1].height=28
        for row in sh.iter_rows(min_row=2):
            for c in row: c.alignment=Alignment(vertical="top",wrap_text=True)
        for i,w in enumerate(widths,1): sh.column_dimensions[get_column_letter(i)].width=w
        return sh
    add("Contenido A1 - 8 secciones",["Misión","Título A1","Sección","Objetivo didáctico","Contenido nuevo adaptado a A1"],rows,[12,34,22,52,110])
    add("Vocabulario base A1",["Misión","Título A1","Inglés","Español"],vocab,[12,34,32,34])
    add("Práctica existente A1",["Misión","Título A1","Tipo","Enunciado original","Respuesta / traducción","Opciones"],sourcepractice,[12,34,26,70,55,70])
    for sh in wb.worksheets:
        sh.sheet_view.zoomScale=85
    OUT.parent.mkdir(parents=True,exist_ok=True); wb.save(OUT)
    print(f"Created {OUT}: {len(missions)} missions, {len(rows)} newly authored A1 sections, {len(vocab)} vocabulary entries, {len(sourcepractice)} existing practice prompts.")
if __name__=="__main__": main()
