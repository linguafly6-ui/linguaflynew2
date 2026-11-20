(()=>{
const lessons = {
1:{title:"Who Am I?",words:["name","surname","age","address","city","country","nationality","phone number","email address","date of birth"],grammar:"be",focus:"Practise the /eɪdʒ/ sound in age. Address has different stress patterns in British and American English; say it slowly and clearly. Keep the final consonants in name and surname clear.",drill:"name · age · address · surname · country",reading:"My name is Laura García. I am twenty-four years old. I am from Spain and I live in Madrid. My address is 14 Green Street. My phone number is 612 345 678. My email address is laura@example.com. My date of birth is 12 May.",writing:"Write a personal profile with your name, age, country, city, address and contact details.",speaking:"Introduce yourself to a new classmate. Say your name, age, nationality and city. Ask: What is your name? Where are you from? How old are you?",listening:"Hello. My name is Daniel Ruiz. I am twenty-eight years old. I am Spanish. I live in Seville. My phone number is 600 123 456. My birthday is on 3 March."},
2:{title:"Nice to Meet You",words:["hello","good morning","good afternoon","good evening","goodbye","see you later","please","thank you","you're welcome","meet"],grammar:"pronouns",focus:"Notice the /h/ at the start of hello. Let air out gently. Keep the two words in good morning connected.",drill:"hello · hi · good morning · thank you · goodbye",reading:"Hello! My name is Emma. Good morning, Mr Brown. This is my friend, Leo. Nice to meet you, Leo. Thank you for your help. You're welcome. See you later. Goodbye!",writing:"Write a short greeting dialogue. Include hello, your name, nice to meet you, thank you and goodbye.",speaking:"Meet a new person. Greet them, say your name, ask their name and say goodbye politely.",listening:"Good afternoon. I am Anna. This is my brother, Tom. Tom, meet Sara. Nice to meet you, Sara. Thank you. You're welcome. See you later!"},
3:{title:"Where Are You From?",words:["Spain","Spanish","the United Kingdom","British","France","French","Germany","German","Italy","Italian"],grammar:"present",focus:"Practise country and nationality stress. Say SPAIN, SPANish; FRANCE, FRENCH; GERmany, GERman.",drill:"Spain · Spanish · France · French · Germany · German",reading:"My name is Marco. I am from Italy and I am Italian. My friend Emma is from France. She is French. We are in an English class in Spain. Our teacher is British. She is from the United Kingdom.",writing:"Write five sentences about where you and three people are from. Use I am from…, He is from… and She is…",speaking:"Ask and answer: Where are you from? Are you Spanish? Say three countries and their nationalities.",listening:"Hi, I am Paul. I am from the United Kingdom. I am British. Ana is from Spain and she is Spanish. Luca is from Italy. He is Italian."},
4:{title:"Spelling My Name",words:["letter","alphabet","spell","first name","surname","capital letter","small letter","how do you spell...?","double","vowel"],grammar:"articles",focus:"Say the alphabet clearly. Pay special attention to pairs that sound similar: A/E, G/J and I/Y.",drill:"A · E · G · J · I · Y · double L · vowel",reading:"My first name is Alice and my surname is Green. Alice has five letters. Green has five letters. The first letter of each name is a capital letter. I can spell my name: A-L-I-C-E, G-R-E-E-N.",writing:"Write your first name and surname. Spell both names with capital letters. Write one question asking another person to spell a name.",speaking:"Work with a partner. Ask How do you spell your first name? Spell your name slowly. Ask your partner to repeat the surname.",listening:"My name is Sophie White. Sophie is S-O-P-H-I-E. White is W-H-I-T-E. The first letters are capital letters. There are two vowels in White."},
5:{title:"Personal Questions",words:["who","what","where","when","how","how old","married","single","address","occupation"],grammar:"beQuestions",focus:"Make question words clear and separate: WHO, WHAT, WHERE, WHEN and HOW. Keep the final /d/ in married and the final /s/ in address clear.",drill:"Who are you? · What is your job? · Where do you live? · How old are you?",reading:"This is Ben. He is single and he is a teacher. He lives at 8 Park Road. His friend Mia is married. She is a doctor. They ask each other simple questions: Where do you live? What is your occupation? How old are you?",writing:"Write a short profile. Include your occupation, address and one personal detail. Add three questions with who, what, where or how.",speaking:"Ask a partner four polite personal questions. Answer with short, complete sentences. You can say: I prefer not to say.",listening:"Who is the new student? Her name is Mia. What is her occupation? She is a nurse. Where does she live? She lives in Oxford. Is she married? No, she is single."},
6:{title:"Numbers and Contact Details",words:["zero","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],grammar:"there",focus:"Keep the /t/ clear in ten, twenty and thirty. Notice the different stress in thirteen and thirty.",drill:"zero · ten · twenty · thirty · forty · fifty · sixty · seventy · eighty · ninety",reading:"My phone number is 020 4567 8910. My office is at number 40. There are 20 students in my class. There are 30 books in the room. My appointment is at 10:30.",writing:"Write three numbers in words. Then write a fictional phone number and an appointment time. Do not use your real private contact details.",speaking:"Read a fictional phone number to your partner. Your partner writes it and reads it back. Check each number together.",listening:"The room number is 24. The class starts at 10:00. There are 30 students. The teacher has 40 books and 50 pens."},
7:{title:"Languages I Speak",words:["language","English","Spanish","French","German","speak","read","write","understand","practise"],grammar:"can",focus:"Practise the /ŋ/ sound at the end of English and the consonant groups in speak and practise.",drill:"English · Spanish · speak · read · write · understand · practise",reading:"I speak Spanish and I study English. I can read short texts in English. I can write simple messages. I understand my teacher, but I need to practise listening. My friend speaks French and German.",writing:"Write a language profile. Say which languages you speak, read, write or understand. Use can and can't.",speaking:"Tell a partner about the languages you know. Ask: What languages do you speak? Can you read in English? Can you write a message?",listening:"Hello, I am Nina. I speak German and English. I can read in Spanish, but I can't speak it very well. I practise English every day."},
8:{title:"My Profile",words:["profile","surname","born","live","work","study","favourite","hobby","free time","profile picture"],grammar:"continuous",focus:"Link words smoothly in short phrases. Notice the final /k/ in work and /t/ in favourite. Study ends with the vowel sound /i/, not a final consonant.",drill:"profile · surname · born · favourite · hobby · free time",reading:"This is my profile. My name is Jack Miller. I was born in Bristol, but I live in London. I work in a café and study English. My favourite hobby is cycling. In my free time, I read and listen to music.",writing:"Create a short online profile with your name, where you live, work or study, and one favourite hobby. Add a simple profile-picture description.",speaking:"Describe your profile to a partner. Say where you live, what you do and what you like doing in your free time.",listening:"My name is Eva. I live in Cardiff and I work in a shop. I study English on Tuesdays. My favourite hobby is swimming. In my free time, I meet my friends."},
9:{title:"People in My Class",words:["classmate","teacher","student","friend","boy","girl","man","woman","people","group"],grammar:"like",focus:"Notice the difference between the vowel sounds in man and men. Keep the final /z/ in boys and the final /l/ in girl.",drill:"classmate · teacher · student · friend · man · woman · people · group",reading:"There are twelve students in my English class. Our teacher is kind. My classmate Rosa is my friend. There are six women and six men in the group. The students work together and help each other.",writing:"Describe your class or an imaginary group. Write five sentences about the teacher, students and classmates.",speaking:"Introduce two people in your class. Describe them with simple words: This is… He is… She is… They are…",listening:"There are eight people in the group. The teacher is a woman. Two students are friends. A boy and a girl sit near the door. Everyone is in the English class."},
10:{title:"First Conversation",words:["conversation","question","answer","introduce","again","slowly","together","class","new","welcome"],grammar:"questions",focus:"Use friendly intonation in questions. Let your voice rise gently in yes/no questions such as Do you speak English?",drill:"What's your name? · Where are you from? · Can you repeat that, please?",reading:"Hello! I am Sara. I am new in this class. My classmate Ben introduces himself. He asks, “What's your name?” I answer, “I'm Sara.” We ask questions and speak slowly. We practise together. Our teacher says, “Welcome to the class!”",writing:"Write a dialogue of six lines between two new classmates. Include a greeting, two questions, two answers and a friendly goodbye.",speaking:"Have a first conversation with a partner. Introduce yourself, ask where your partner is from and ask them to repeat one answer slowly.",listening:"Hello, I am Alex. I am new here. What is your name? My name is Lucy. Nice to meet you. Can you speak slowly, please? Of course. Welcome to our class!"}
};
const grammar = {
be:{name:"Verb to be: am / is / are",rule:"Use am with I, is with he/she/it and are with you/we/they. Put not after the verb for negatives. Put am/is/are before the subject in questions.",examples:["I am a student.","She is from Spain.","Are you twenty years old?"],tasks:["I ___ from Madrid.","My surname ___ Brown.","___ you a student?"],answers:["am","is","Are"]},
pronouns:{name:"Subject pronouns and possessive adjectives",rule:"Use I, you, he, she, it, we and they for people or things. Use my, your, his, her, its, our and their before a noun.",examples:["I am Emma.","His name is Leo.","Their teacher is nice."],tasks:["Maria is here. ___ is my friend.","This is ___ phone.","Tom has a book. It is ___ book."],answers:["She","my","his"]},
present:{name:"Present simple",rule:"Use the present simple for facts and routines. Add -s to most verbs with he, she and it. Use do or does to make questions.",examples:["I live in Spain.","She speaks French.","Do you study English?"],tasks:["He ___ (live) in Rome.","I ___ (speak) English.","___ she work here?"],answers:["lives","speak","Does"]},
articles:{name:"Articles and plural nouns",rule:"Use a before a consonant sound and an before a vowel sound. Use the for something specific. Add -s or -es to make many nouns plural.",examples:["It is a letter.","This is an alphabet.","The vowels are A, E, I, O and U."],tasks:["It is ___ alphabet.","I have ___ name.","Two classmate___ are here."],answers:["an","a","s"]},
havegot:{name:"Have got",rule:"Use have got with I/you/we/they and has got with he/she/it. Use haven't got or hasn't got for negatives.",examples:["I have got an address.","She has got a job.","Have you got a question?"],tasks:["I ___ got a new address.","He ___ got a job.","___ you got a question?"],answers:["have","has","Have"]},
beQuestions:{name:"Questions with the verb to be",rule:"Put am, is or are before the subject in yes/no questions. With a question word, use question word + am/is/are + subject.",examples:["Are you from Spain?","Where are you from?","How old is she?"],tasks:["Where ___ you from?","How old ___ she?","___ he a teacher?"],answers:["are","is","Is"]},
there:{name:"There is / There are and place prepositions",rule:"Use there is for one thing and there are for two or more. Use in, on and under to say where something is.",examples:["There is a number on the page.","There are twenty students in the room.","The phone is on the desk."],tasks:["___ a zero in this number.","___ ten students here.","The pen is ___ the desk."],answers:["There is","There are","on"]},
can:{name:"Can / can't",rule:"Use can + base verb to talk about ability. Use can't for a negative. Make questions with Can + subject + verb?",examples:["I can speak English.","He can't write in French.","Can you read this?"],tasks:["She can ___ (speak) Spanish.","I ___ understand German.","___ you write in English?"],answers:["speak","can't","Can"]},
continuous:{name:"Present continuous",rule:"Use am/is/are + verb-ing for actions happening now. Add -ing to the main verb.",examples:["I am studying English.","She is writing a profile.","They are talking now."],tasks:["I am ___ (study).","He ___ working now.","They are ___ (write)."],answers:["studying","is","writing"]},
like:{name:"Like / love + nouns or -ing",rule:"Use like or love + a noun, or like/love + verb-ing, to talk about preferences.",examples:["I like my class.","She loves reading.","We like learning together."],tasks:["I like ___ (read).","He loves ___ (music).","Do you ___ this class?"],answers:["reading","music","like"]},
questions:{name:"Question words",rule:"Use what for things, where for places, when for times, who for people, why for reasons and how for manner.",examples:["What is your name?","Where do you live?","How do you spell your surname?"],tasks:["___ is your name?","___ are you from?","___ do you spell it?"],answers:["What","Where","How"]}
};
const readingQuestionSets = {
1:[
["What is the text mainly about?","Laura's personal details","A school timetable","A holiday in Spain"],
["How old is Laura?","Twenty-four","Twenty-eight","Fourteen"],
["Where is Laura from?","Spain","Italy","The United Kingdom"],
["Where does Laura live?","Madrid","Seville","London"],
["What is Laura's surname?","García","Green","Ruiz"],
["Which detail is an address?","14 Green Street","12 May","612 345 678"],
["What is Laura's phone number?","612 345 678","612 345 876","600 123 456"],
["When is Laura's date of birth?","12 May","3 March","24 May"],
["Which sentence is true?","Laura lives in Madrid.","Laura is twenty-eight.","Laura is from France."],
["Why might someone ask for Laura's email address?","To contact her by email","To find her age","To ask where she lives"]
],
2:[
["What is the text mainly about?","People greeting each other politely","A family holiday","A school lesson"],
["Who says 'Good morning, Mr Brown'?","Emma","Leo","Mr Brown"],
["Who is Leo?","Emma's friend","Emma's teacher","Emma's brother"],
["What does Emma say when she meets Leo?","Nice to meet you","Goodbye","See you later"],
["What does 'You're welcome' reply to?","Thank you","Good morning","Goodbye"],
["Which phrase is used to leave?","See you later","Nice to meet you","Thank you"],
["Is the conversation formal or informal?","Polite and friendly","Angry","Very formal"],
["Who receives thanks?","The person who helps","Mr Brown only","A person leaving"],
["Which happens first in the text?","Emma greets Mr Brown","Emma says goodbye","Emma thanks Leo"],
["What is the best title?","A friendly meeting","At the doctor's","Buying a ticket"]
],
3:[
["What is the text mainly about?","People's countries and nationalities","Languages at work","A trip to France"],
["Where is Marco from?","Italy","France","Spain"],
["What is Marco's nationality?","Italian","French","British"],
["Where is Emma from?","France","Italy","The United Kingdom"],
["What nationality is Emma?","French","Italian","Spanish"],
["Where is the English class?","Spain","France","Germany"],
["What is the teacher's nationality?","British","Spanish","Italian"],
["Which country is the teacher from?","The United Kingdom","Italy","France"],
["Who is from Italy?","Marco","Emma","The teacher"],
["Which pair is correct?","France – French","Italy – French","Spain – British"]
],
4:[
["What is the text mainly about?","Spelling a first name and surname","Describing a classroom","Meeting a new teacher"],
["What is the person's first name?","Alice","Green","Alex"],
["What is the surname?","Green","Alice","White"],
["How many letters are in Alice?","Five","Four","Six"],
["How many letters are in Green?","Five","Six","Four"],
["What kind of letter is the A in Alice?","A capital letter","A small letter","A vowel sound only"],
["How is the name Alice spelt?","A-L-I-C-E","A-L-I-S-E","A-L-E-C-E"],
["How is the surname spelt?","G-R-E-E-N","G-R-I-E-N","G-R-E-N"],
["What do the first letters of Alice and Green have in common?","They are capital letters","They are both vowels","They are small letters"],
["Why does the speaker spell the names?","To show exactly how to write them","To say where they live","To give their phone number"]
],
5:[
["What is the text mainly about?","Ben and Mia sharing personal information","Two people choosing a job","A married couple moving house"],
["What is Ben's job?","He is a teacher.","He is a doctor.","He is a nurse."],
["Is Ben single or married?","Single","Married","The text doesn't say"],
["Where does Ben live?","8 Park Road","14 Green Street","8 Oxford Road"],
["What is Mia's job?","She is a doctor.","She is a teacher.","She is a student."],
["Is Mia married?","Yes","No, she is single","The text doesn't say"],
["Who lives at 8 Park Road?","Ben","Mia","Both of them"],
["Which question asks about a job?","What is your occupation?","Where do you live?","How old are you?"],
["What does 'they' refer to in 'They ask each other'?","Ben and Mia","The teacher and Ben","Two doctors"],
["Which statement is true?","Ben is a teacher and Mia is a doctor.","Ben is married and Mia is single.","Mia lives at 8 Park Road."]
],
6:[
["What is the text mainly about?","Numbers used for contact details and everyday information","A telephone conversation","A maths lesson"],
["What is the phone number?","020 4567 8910","020 4567 8911","020 4657 8910"],
["Where does the speaker work?","In an office","In a school","In a shop"],
["What is the office number?","40","20","30"],
["How many students are in the class?","20","30","40"],
["How many books are in the room?","30","20","10"],
["What time is the appointment?","10:30","10:00","3:10"],
["Which number is the largest?","40","20","30"],
["What does 'There are 20 students' tell us?","The number of students in the class","The room number","The appointment time"],
["Which detail is a time, not a quantity?","10:30","30 books","20 students"]
],
7:[
["What is the text mainly about?","The languages the speaker and a friend know","A language school timetable","A trip abroad"],
["Which language does the speaker speak?","Spanish","French","German"],
["What language is the speaker studying?","English","German","French"],
["What can the speaker read?","Short texts in English","Long books in French","Messages in German"],
["What can the speaker write?","Simple messages","Long novels","French essays"],
["What does the speaker need to practise?","Listening","Writing","Reading"],
["Which languages does the speaker's friend speak?","French and German","Spanish and English","English and Italian"],
["Does the speaker understand the teacher?","Yes","No","The text doesn't say"],
["What does 'but' show in 'I understand my teacher, but I need to practise listening'?","A contrast","A reason","A sequence"],
["Which statement is true?","The speaker studies English.","The speaker's friend speaks Spanish.","The speaker cannot read English."]
],
8:[
["What is the text mainly about?","Jack's personal and work profile","Jack's family history","A cycling competition"],
["Where was Jack born?","Bristol","London","Cardiff"],
["Where does Jack live now?","London","Bristol","Oxford"],
["Where does Jack work?","In a café","In a shop","In an office"],
["What does Jack study?","English","French","Spanish"],
["What is Jack's favourite hobby?","Cycling","Swimming","Reading"],
["What does Jack do in his free time?","He reads and listens to music.","He works in a café.","He studies at school."],
["Which sentence describes the past?","I was born in Bristol.","I live in London.","I work in a café."],
["Does Jack live in the same city where he was born?","No","Yes","The text doesn't say"],
["Which detail is about Jack's job?","He works in a café.","He likes cycling.","He listens to music."]
],
9:[
["What is the text mainly about?","A group of students in an English class","A family of twelve people","A teacher's daily routine"],
["How many students are in the class?","Twelve","Eight","Six"],
["How is the teacher described?","Kind","Strict","New"],
["Who is Rosa?","A classmate and friend","The teacher","A student's sister"],
["How many women are in the group?","Six","Twelve","Eight"],
["How many men are in the group?","Six","Two","Twelve"],
["How do the students work?","Together","Alone","At home"],
["What does 'each other' mean here?","One another","The teacher only","The people outside the class"],
["Which statement is true?","There are six women and six men.","There are twelve teachers.","Rosa is the teacher."],
["What can we infer about the class?","The students help one another.","Nobody knows each other.","The class has only two students."]
],
10:[
["What is the text mainly about?","Two classmates meeting for the first time","A teacher explaining grammar","Friends planning a holiday"],
["Who is new in the class?","Sara","Ben","The teacher"],
["Who introduces himself?","Ben","Sara","The teacher"],
["What does Ben ask?","What's your name?","Where do you live?","How old are you?"],
["What is the new student's name?","Sara","Ben","Alex"],
["How do they speak?","Slowly","Loudly","Very quickly"],
["What do they practise together?","Speaking and asking questions","Writing emails","Playing a sport"],
["Who says 'Welcome to the class!'?","The teacher","Ben","Sara"],
["Why do they speak slowly?","To help communication","Because they are angry","Because the class is finished"],
["Which event happens at the end?","The teacher welcomes Sara.","Ben asks Sara's name.","Sara says she is new."]
]
};
const pronunciationCues = {
"name":"neim","surname":"ser-neim","age":"eidch","address":"a-dres","city":"si-ti","country":"kan-tri","nationality":"na-sha-na-li-ti","phone number":"feun nam-ba","email address":"i-meil a-dres","date of birth":"deit av berth",
"hello":"he-lou","good morning":"gud mor-ning","good afternoon":"gud af-ter-nun","good evening":"gud iv-ning","goodbye":"gud-bai","see you later":"si iu lei-ta","please":"pliiz","thank you":"zank iu","you're welcome":"ior wel-kam","meet":"miit",
"Spain":"spein","Spanish":"spa-nish","the United Kingdom":"dha iu-nai-tid king-dam","British":"bri-tish","France":"frans","French":"french","Germany":"yer-ma-ni","German":"yer-man","Italy":"i-ta-li","Italian":"i-ta-lian",
"letter":"le-ta","alphabet":"al-fa-bet","spell":"spel","first name":"ferst neim","capital letter":"ka-pi-tal le-ta","small letter":"smol le-ta","how do you spell...?":"hau du iu spel","double":"da-bal","vowel":"vau-el",
"who":"huu","what":"wot","where":"wea","when":"wen","how":"hau","how old":"hau ould","married":"ma-rid","single":"sin-gal","occupation":"o-kiu-pei-shan",
"zero":"zi-rou","ten":"ten","twenty":"twen-ti","thirty":"zer-ti","forty":"for-ti","fifty":"fif-ti","sixty":"siks-ti","seventy":"se-ven-ti","eighty":"ei-ti","ninety":"nain-ti",
"language":"lang-gwidch","English":"ing-glish","speak":"spiik","read":"riid","write":"rait","understand":"an-da-stand","practise":"prak-tis",
"profile":"prou-fail","born":"born","live":"liv","work":"werk","study":"sta-di","favourite":"fei-vrit","hobby":"ho-bi","free time":"fri taim","profile picture":"prou-fail pik-cha",
"classmate":"klas-meit","teacher":"tii-cha","student":"stiu-dent","friend":"frend","boy":"boi","girl":"gerl","man":"man","woman":"wu-man","people":"pii-pal","group":"gruup",
"conversation":"kon-va-sei-shan","question":"kwes-chan","answer":"an-sa","introduce":"in-tra-dius","again":"a-gen","slowly":"slou-li","together":"ta-ge-dha","class":"klas","new":"niu","welcome":"wel-kam"
};
const wordTranslations = {"name":"nombre","surname":"apellido","age":"edad","address":"dirección","city":"ciudad","country":"país","nationality":"nacionalidad","phone number":"número de teléfono","email address":"correo electrónico","date of birth":"fecha de nacimiento","hello":"hola","good morning":"buenos días","good afternoon":"buenas tardes","good evening":"buenas tardes / noches","goodbye":"adiós","see you later":"hasta luego","please":"por favor","thank you":"gracias","you're welcome":"de nada","meet":"conocer","Spain":"España","Spanish":"español/a","the United Kingdom":"Reino Unido","British":"británico/a","France":"Francia","French":"francés/francesa","Germany":"Alemania","German":"alemán/alemana","Italy":"Italia","Italian":"italiano/a","letter":"letra","alphabet":"alfabeto","spell":"deletrear","first name":"nombre de pila","capital letter":"mayúscula","small letter":"minúscula","how do you spell...?":"¿Cómo se deletrea...?","double":"doble","vowel":"vocal","who":"quién","what":"qué","where":"dónde","when":"cuándo","how":"cómo","how old":"cuántos años","married":"casado/a","single":"soltero/a","occupation":"profesión","zero":"cero","ten":"diez","twenty":"veinte","thirty":"treinta","forty":"cuarenta","fifty":"cincuenta","sixty":"sesenta","seventy":"setenta","eighty":"ochenta","ninety":"noventa","language":"idioma","English":"inglés","speak":"hablar","read":"leer","write":"escribir","understand":"entender","practise":"practicar","profile":"perfil","born":"nacido/a","live":"vivir","work":"trabajar","study":"estudiar","favourite":"favorito/a","hobby":"afición","free time":"tiempo libre","profile picture":"foto de perfil","classmate":"compañero/a de clase","teacher":"profesor/a","student":"estudiante","friend":"amigo/a","boy":"niño / chico","girl":"niña / chica","man":"hombre","woman":"mujer","people":"personas / gente","group":"grupo","conversation":"conversación","question":"pregunta","answer":"respuesta / responder","introduce":"presentar","again":"otra vez","slowly":"despacio","together":"juntos","class":"clase","new":"nuevo/a","welcome":"bienvenido/a"};
const translateWord = word => wordTranslations[word] || 'Traducción pendiente';
const keyVocabularyCard = () => card('Vocabulario clave · inglés y español',"<div class='a1-vocab-grid'>"+l.words.map(w=>"<div class='a1-vocab-item'><strong>"+esc(w)+"</strong><span>"+esc(translateWord(w))+"</span></div>").join('')+'</div>');
const pronunciationCue = word => pronunciationCues[word] || word;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const list=a=>"<ul>"+a.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>";
const card=(h,p)=>"<div class='a1extra-card'><h3>"+h+"</h3>"+p+"</div>";
const n=+(location.pathname.match(/\/(\d{3})(?:\/index\.html)?\/?$/)||[])[1];const l=lessons[n];if(!l||document.querySelector("[data-a1-eight]"))return;
const g=grammar[l.grammar];
const grammarTheory = {
be:{title:"El verbo TO BE: am / is / are",explain:"Usamos TO BE para decir quiénes somos, cómo estamos, nuestra edad o de dónde somos. En español suele equivaler a ser o estar.",structure:["I am (I'm) · yo soy / estoy","You are (you're) · tú eres / estás","He / She / It is · él / ella es / está","We / You / They are · nosotros / vosotros / ellos somos / sois / son"],negative:"Sujeto + am/is/are + not. Ejemplo: I am not from London. (No soy de Londres.)",question:"Am/Is/Are + sujeto...? Ejemplo: Are you a student? (¿Eres estudiante?)",examples:[["I am twenty-four years old.","Tengo veinticuatro años."],["She is from Spain.","Ella es de España."],["They are students.","Ellos son estudiantes."]]},
pronouns:{title:"Pronombres personales y adjetivos posesivos",explain:"El pronombre sustituye al nombre de la persona. El posesivo indica de quién es algo y siempre acompaña a un sustantivo.",structure:["I → my · yo → mi","You → your · tú → tu","He → his · él → su","She → her · ella → su","We → our · nosotros → nuestro/a","They → their · ellos → su"],negative:"No se suele repetir el nombre si el pronombre ya lo sustituye: Emma is here. She is my friend. (Emma está aquí. Ella es mi amiga.)",question:"Para preguntar por la identidad o pertenencia: What is your name? (¿Cómo te llamas?)",examples:[["I am Emma. My name is Emma.","Soy Emma. Mi nombre es Emma."],["His name is Leo.","Su nombre es Leo."],["Their teacher is nice.","Su profesor/a es amable."]]},
present:{title:"Presente simple",explain:"Usamos el presente simple para hechos, información general y rutinas. Con he, she e it, normalmente añadimos -s al verbo.",structure:["I / You / We / They + verbo base","He / She / It + verbo-s","Negativa: don't / doesn't + verbo base","Pregunta: Do / Does + sujeto + verbo base?"],negative:"I don't live in Rome. / She doesn't speak French. Después de doesn't, el verbo no lleva -s.",question:"Do you speak English? / Does he live here?",examples:[["I live in Spain.","Vivo en España."],["She speaks French.","Ella habla francés."],["Do you study English?","¿Estudias inglés?"]]},
articles:{title:"Artículos: a, an, the y plurales",explain:"A y an significan un/una cuando hablamos de algo no específico. Elegimos según el sonido inicial: a + sonido consonántico; an + sonido vocálico. The se usa para algo concreto o conocido.",structure:["a + sonido consonántico: a name","an + sonido vocálico: an address","the + elemento concreto: the alphabet","Plural habitual: sustantivo + -s / -es"],negative:"No usamos a/an con sustantivos plurales: two letters (dos letras), no two a letters.",question:"Is it a letter? (¿Es una letra?) / What is the address? (¿Cuál es la dirección?)",examples:[["It is a letter.","Es una letra."],["This is an address.","Esta es una dirección."],["The vowels are A, E, I, O and U.","Las vocales son A, E, I, O y U."]]},
beQuestions:{title:"Preguntas con el verbo TO BE",explain:"Para formar preguntas de sí/no, colocamos am, is o are delante del sujeto. Si usamos una palabra interrogativa, va primero.",structure:["Am / Is / Are + sujeto + complemento?","Where / What / Who / How + am / is / are + sujeto?"],negative:"En respuestas negativas: No, I'm not. / No, she isn't. / No, they aren't.",question:"Where are you from? (¿De dónde eres?) / How old is she? (¿Cuántos años tiene ella?)",examples:[["Are you from Spain?","¿Eres de España?"],["Where are you from?","¿De dónde eres?"],["How old is she?","¿Cuántos años tiene ella?"]]},
there:{title:"There is / There are",explain:"Usamos there is para decir que hay una cosa y there are para decir que hay dos o más. También podemos indicar dónde está algo con in, on y under.",structure:["There is + singular · Hay una cosa","There are + plural · Hay varias cosas","in · en/dentro de; on · sobre; under · debajo de"],negative:"There isn't a book. / There aren't ten students. (No hay un libro. / No hay diez alumnos.)",question:"Is there a...? / Are there any...? (¿Hay...?)",examples:[["There is a number on the page.","Hay un número en la página."],["There are twenty students in the room.","Hay veinte alumnos en el aula."],["The phone is on the desk.","El teléfono está sobre el escritorio."]]},
can:{title:"Can / can't para expresar capacidad",explain:"Can expresa habilidad o posibilidad. Can't expresa que no podemos o no sabemos hacer algo. El verbo que sigue va siempre en forma base.",structure:["Afirmativa: sujeto + can + verbo base","Negativa: sujeto + can't + verbo base","Pregunta: Can + sujeto + verbo base?"],negative:"I can't speak German. (No sé hablar alemán.) No añadimos -s ni usamos to después de can.",question:"Can you read in English? (¿Puedes leer en inglés?)",examples:[["I can speak English.","Sé hablar inglés."],["He can't write in French.","Él no sabe escribir en francés."],["Can you read this?","¿Puedes leer esto?"]]},
continuous:{title:"Presente continuo",explain:"Usamos el presente continuo para acciones que están ocurriendo ahora. Se forma con el verbo TO BE y el verbo principal terminado en -ing.",structure:["I am + verbo-ing","He / She / It is + verbo-ing","You / We / They are + verbo-ing"],negative:"Sujeto + am/is/are + not + verbo-ing. Ejemplo: She isn't working. (Ella no está trabajando.)",question:"Am/Is/Are + sujeto + verbo-ing? Ejemplo: Are they studying? (¿Están estudiando?)",examples:[["I am studying English.","Estoy estudiando inglés."],["She is writing a profile.","Ella está escribiendo un perfil."],["They are talking now.","Están hablando ahora."]]},
like:{title:"Like / love + sustantivo o verbo en -ing",explain:"Usamos like y love para expresar gustos. Después puede ir un sustantivo o un verbo terminado en -ing.",structure:["like / love + sustantivo: I like music.","like / love + verbo-ing: I like reading.","Con he/she/it: likes / loves"],negative:"I don't like swimming. / She doesn't like coffee. (No me gusta nadar. / A ella no le gusta el café.)",question:"Do you like music? / Does he love reading?",examples:[["I like my class.","Me gusta mi clase."],["She loves reading.","A ella le encanta leer."],["We like learning together.","Nos gusta aprender juntos."]]},
questions:{title:"Palabras interrogativas",explain:"Las palabras interrogativas sirven para pedir información concreta. Normalmente van al principio de la pregunta.",structure:["What · qué / cuál (cosas e información)","Where · dónde (lugares)","When · cuándo (tiempo)","Who · quién (personas)","Why · por qué (razones)","How · cómo (manera)"],negative:"No son negativas por sí mismas. Para preguntar con do/does: Where do you live? (¿Dónde vives?)",question:"What is your name? / Where are you from? / How do you spell it?",examples:[["What is your name?","¿Cómo te llamas?"],["Where do you live?","¿Dónde vives?"],["How do you spell your surname?","¿Cómo se deletrea tu apellido?"]]}
};
const theory=grammarTheory[l.grammar];
const nav=document.querySelector("nav");const main=document.querySelector("main");if(!nav||!main)return;
const exploration=document.getElementById("explore");
if(exploration&&theory&&!exploration.querySelector("[data-mission-grammar]")){
 const html="<div class='a1-theory-card' data-mission-grammar><div class='a1-theory-kicker'>GRAMÁTICA DE ESTA MISIÓN</div><h3>"+esc(theory.title)+"</h3><p class='a1-theory-explain'>"+esc(theory.explain)+"</p><h4>Cómo se construye</h4><ul>"+theory.structure.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul><div class='a1-theory-note'><strong>Forma negativa</strong><p>"+esc(theory.negative)+"</p><strong>Cómo preguntar</strong><p>"+esc(theory.question)+"</p></div><h4>Ejemplos con traducción</h4><div class='a1-theory-examples'>"+theory.examples.map(x=>"<div><strong>"+esc(x[0])+"</strong><span>"+esc(x[1])+"</span></div>").join("")+"</div></div>";
 exploration.insertAdjacentHTML("beforeend",html);
}

const sections=[
["grammar","3. Gramática","Gramática",card("Objetivo: "+g.name,"<p>"+esc(g.rule)+"</p>")+card("Modelos",list(g.examples))+card("Práctica guiada","<ol>"+g.tasks.map((x,i)=>"<li>"+esc(x)+"</li>").join("")+"</ol><details><summary>Ver soluciones</summary>"+list(g.answers)+"</details>")+card("Producción","<p>Escribe dos frases verdaderas sobre "+esc(l.title)+". Usa la estructura de esta lección.</p>")],
["pronunciation","4. Pronunciación","Pronunciación","<div class='a1-pron-intro'><span class='a1-pron-kicker'>BRITISH ENGLISH · A1</span><h3>Escucha, reconoce y recuerda</h3><p>Repasa cada palabra con su significado y una guía de pronunciación aproximada para hispanohablantes.</p></div><div class='a1-pron-grid'>"+l.words.map((w,i)=>"<article class='a1-pron-word'><span class='a1-pron-number'>"+String(i+1).padStart(2,"0")+"</span><strong>"+esc(w)+"</strong><span class='a1-pron-meaning'>"+esc(translateWord(w))+"</span><span class='a1-pron-sound'>/"+esc(pronunciationCue(w))+"/</span><span class='a1-pron-label'>Aproximación fonética</span></article>").join("")+"</div>"+card("Consejo de pronunciación","<p>"+esc(l.focus)+"</p>")+"<p class='a1-pron-note'>La guía entre barras es una ayuda de lectura, no una transcripción IPA. No hay grabación ni evaluación en esta sección: la práctica oral está en Speaking.</p>"],
["reading","5. Reading","Reading",card("Read the text","<p class='a1extra-reading'>"+esc(l.reading)+"</p>")+card("Check your understanding","<ol><li>Who or what is the text about?</li><li>Find three words from this mission.</li><li>Write one fact from the text.</li></ol><details><summary>Suggested answers</summary><p>Answers depend on the mission text. Find the person/topic, three target words and one stated fact.</p></details>")],
["writing","6. Writing","Writing",card("Your writing task","<p>"+esc(l.writing)+"</p>")+card("Useful language","<p>I am… · My name is… · I live in… · I like… · I can… · My favourite…</p>")+card("Checklist","<ul><li>Write 5–6 short sentences.</li><li>Use at least four words from this mission.</li><li>Start each sentence with a capital letter.</li><li>Finish each sentence with a full stop.</li><li>Check the verb and word order.</li></ul>")],
["speaking","7. Speaking","Speaking",card("Speaking situation","<p>"+esc(l.speaking)+"</p>")+card("Useful phrases","<p>Hello. / Nice to meet you. / I think… / Can you repeat, please? / How do you say… in English?</p>")+card("Your turn","<ol><li>Prepare three key words.</li><li>Speak for 30–45 seconds.</li><li>Ask your partner one follow-up question.</li></ol><button type='button' class='a1extra-say' data-say='"+esc(l.speaking)+"'>🔊 Escuchar consigna</button>")],
["listening","8. Listening","Listening",card("Listen to the text","<p>Escucha el audio dos veces antes de abrir la transcripción. Puedes reproducirlo de nuevo si lo necesitas.</p><button type='button' class='a1extra-say' data-say='"+esc(l.listening)+"'>🔊 Escuchar audio</button>")+card("Check your understanding","<ol><li>What is the main topic?</li><li>Write two details you hear.</li><li>Which two mission words do you hear?</li></ol><details><summary>Mostrar transcripción después de escuchar</summary><p>"+esc(l.listening)+"</p></details>")]
];
const style=document.createElement("style");style.textContent=".a1-theory-card{margin:28px 0 8px;padding:22px;border:1px solid #cbdaf4;border-radius:20px;background:linear-gradient(145deg,#f0f6ff,#fff);color:#20345d;box-shadow:0 10px 28px rgba(42,70,130,.08)}.a1-theory-kicker{font-size:11px;font-weight:900;letter-spacing:.14em;color:#277d9d}.a1-theory-card h3{margin:8px 0 10px;font-size:22px;color:#233e75}.a1-theory-card h4{margin:18px 0 8px;color:#294777;font-size:15px}.a1-theory-explain{line-height:1.7;color:#526783}.a1-theory-card ul{padding-left:22px;display:grid;gap:7px}.a1-theory-card li{line-height:1.55;color:#314a70}.a1-theory-note{padding:14px 16px;background:#e7f3ff;border-radius:13px;margin-top:14px}.a1-theory-note strong{color:#234d83}.a1-theory-note p{margin:5px 0 12px;line-height:1.6;color:#405979}.a1-theory-note p:last-child{margin-bottom:0}.a1-theory-examples{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}.a1-theory-examples>div{display:flex;flex-direction:column;gap:6px;padding:13px;background:#fff;border:1px solid #dce6f7;border-radius:12px}.a1-theory-examples strong{color:#243e75}.a1-theory-examples span{font-size:14px;color:#65799c}.a1-vocab-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px;margin-top:12px}.a1-vocab-item{display:flex;flex-direction:column;gap:3px;padding:10px 12px;background:#fff;border:1px solid #dce6f7;border-radius:11px}.a1-vocab-item strong{color:#243e75;font-size:14px}.a1-vocab-item span{color:#536783;font-size:13px}.a1-pron-intro{padding:22px;margin:14px 0 18px;border-radius:18px;background:linear-gradient(135deg,#172b58,#3564a8);color:#fff}.a1-pron-intro h3{font-size:22px;margin:8px 0;color:#fff}.a1-pron-intro p{margin:0;color:#e5efff;line-height:1.6}.a1-pron-kicker{font-size:11px;letter-spacing:.13em;font-weight:900;color:#b8d4ff}.a1-pron-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:11px;margin:16px 0}.a1-pron-word{position:relative;display:flex;flex-direction:column;gap:6px;min-height:126px;padding:15px;background:#fff;border:1px solid #d9e4f5;border-radius:15px;box-shadow:0 4px 14px rgba(30,58,110,.06)}.a1-pron-number{position:absolute;right:12px;top:10px;color:#9aabc5;font-size:11px;font-weight:800}.a1-pron-word strong{padding-right:24px;color:#203b70;font-size:17px}.a1-pron-meaning{color:#526681;font-size:14px}.a1-pron-sound{margin-top:auto;color:#147d91;font-size:16px;font-weight:800;letter-spacing:.02em}.a1-pron-label{color:#8998ad;font-size:10px;text-transform:uppercase;letter-spacing:.07em}.a1-pron-note{padding:12px 14px;border-left:3px solid #70a9d8;background:#eef5fc;border-radius:8px;color:#526681;font-size:13px;line-height:1.6}.a1extra-card{background:#f7f9ff;color:#20345d;border:1px solid #dce6f7;border-radius:16px;padding:18px;margin:14px 0;line-height:1.65}.a1extra-card p,.a1extra-card li,.a1extra-card details,.a1extra-card summary{color:#20345d}.a1extra-card h3{margin:0 0 8px;color:#243e75;font-size:18px}.a1extra-card ul,.a1extra-card ol{padding-left:24px}.a1extra-card li{margin:7px 0}.a1extra-reading{font-size:17px;line-height:1.9}.a1extra-drill{font-size:20px;font-weight:800;letter-spacing:.04em}.a1extra-say{background:#e1f7ff;color:#087c9a;padding:10px 14px;border-radius:12px;font-weight:800}.a1extra-card details{margin-top:12px;padding:10px;background:#fff;border-radius:10px}.a1extra-card summary{cursor:pointer;font-weight:800}.a1extra-feedback{display:block!important;min-height:48px;margin:14px 0;padding:12px 15px;border-radius:12px;background:#eef3ff;color:#20345d!important;font-weight:800;font-size:16px;line-height:1.5;opacity:1!important;visibility:visible!important}.a1extra-feedback.good{background:#e6f8ee;color:#176b42!important;border:1px solid #a9dfbd}.a1extra-feedback.bad{background:#fff0ef;color:#a52d27!important;border:1px solid #f0b8b3}.a1extra-progress{display:flex;align-items:center;gap:12px;margin:14px 0;color:#20345d!important;font-weight:800}.a1extra-progress>div{height:9px;flex:1;background:#e7edf8;border-radius:20px;overflow:hidden}.a1extra-progress i{display:block;height:100%;width:0;background:#4669bb;border-radius:20px;transition:width .2s}.a1extra-question{color:#20345d!important;font-size:20px;font-weight:800}.a1extra-options{display:grid;gap:10px;margin-top:14px}.a1extra-options button{background:#f0f4ff;color:#20345d;border:2px solid #dce5f7;text-align:left}.a1extra-options button:focus{outline:3px solid #8ba5e5}.a1extra-label{display:block;margin:14px 0 6px;color:#20345d!important;font-weight:800}.a1extra-card input{display:block;width:100%;padding:12px;border:1px solid #aebcda;border-radius:10px;color:#20345d;background:white;margin-bottom:10px}";document.head.appendChild(style);
for(const [id,label,title,html] of sections){const b=document.createElement("button");b.type="button";b.dataset.tab=id;b.textContent=label;nav.appendChild(b);const s=document.createElement("section");s.id=id;s.className="panel";s.dataset.a1Eight="true";s.innerHTML="<h2>"+title+"</h2><p class='muted'>Misión "+String(n).padStart(3,"0")+" · "+esc(l.title)+"</p>"+html;main.appendChild(s);}

/* Interactive 10-task runtime for every added A1 section. */
const makeChoices=(correct,wrong)=>[correct,...wrong.filter(x=>x!==correct).slice(0,2)];
const shuffle=a=>a.map(x=>({x,k:Math.random()})).sort((a,b)=>a.k-b.k).map(o=>o.x);
const taskUI=(id,title,intro,items)=> {
 const s=document.getElementById(id); if(!s)return;
 s.innerHTML="<h2>"+title+"</h2><p class='muted'>"+intro+"</p>"+keyVocabularyCard()+"<div class='a1extra-progress'><span data-count>1 / 10</span><div><i data-bar></i></div></div><div class='a1extra-card' data-taskbox></div><p class='a1extra-feedback' data-feedback aria-live='polite'></p><button type='button' data-next disabled>Siguiente ejercicio →</button><p class='a1extra-score' data-score hidden></p>";
 const box=s.querySelector("[data-taskbox]"),fb=s.querySelector("[data-feedback]"),next=s.querySelector("[data-next]"),count=s.querySelector("[data-count]"),bar=s.querySelector("[data-bar]"),score=s.querySelector("[data-score]");
 let at=0,points=0,done=false;
 function render(){
  done=false;const t=items[at];count.textContent=(at+1)+" / 10";bar.style.width=(at*10)+"%";fb.textContent="";next.disabled=true;next.textContent=at===9?"Ver resultado":"Siguiente ejercicio →";
  if(t.kind==="write"){
   box.innerHTML="<span class='tag'>DICTADO · "+(at+1)+"</span><p>"+t.prompt+"</p><button type='button' data-audio>🔊 Escuchar audio</button><label class='a1extra-label'>Escribe lo que escuchas</label><input data-answer autocomplete='off' spellcheck='false' placeholder='Escribe aquí…'><button type='button' data-check>Comprobar</button>";
   box.querySelector("[data-audio]").onclick=()=>speak(t.target);
   box.querySelector("[data-check]").onclick=()=>checkText(box.querySelector("[data-answer]").value,t.target);
  } else if(t.kind==="speak"||t.kind==="pron"){
   box.innerHTML="<span class='tag'>"+(t.kind==="speak"?"SPEAKING":"PRONUNCIACIÓN")+" · "+(at+1)+"</span><p class='a1extra-question'>"+t.prompt+"</p><p><strong>Modelo británico:</strong> "+t.target+"</p><button type='button' data-model>🔊 Escuchar modelo</button><button type='button' data-record>● Grabar mi voz</button><button type='button' data-stop disabled>■ Detener y transcribir</button><p data-recstatus role='status'>La transcripción ayuda a comprobar qué palabras se reconocen; no mide los fonemas.</p><div data-recording></div><div data-result></div>";
   box.querySelector("[data-model]").onclick=()=>speak(t.target);
   attachSpeechAssessment(box,t,mark);
  } else {
   const opts= id==="reading" ? (()=>{const wrong=shuffle((t.wrong||[]).filter(x=>x!==t.answer)).slice(0,2);const choices=[...wrong];choices.splice(at%3,0,t.answer);return choices;})() : shuffle(makeChoices(t.answer,t.wrong||[]));
   box.innerHTML="<span class='tag'>EJERCICIO · "+(at+1)+"</span><p class='a1extra-question'>"+t.prompt+"</p>"+(t.audio? "<button type='button' data-audio>🔊 Escuchar audio</button>":"")+"<div class='a1extra-options'>"+opts.map((o,i)=>"<button type='button' data-option='"+i+"'>"+o+"</button>").join("")+"</div>";
   if(t.audio)box.querySelector("[data-audio]").onclick=()=>speak(t.audio);
   box.querySelectorAll("[data-option]").forEach((b,i)=>b.onclick=()=>mark(opts[i]===t.answer,opts[i]===t.answer?"¡Correcto!": "La respuesta correcta es: "+t.answer));
  }
 }
 function mark(ok,msg,neutral=false){if(done)return;done=true;if(ok&&!neutral)points++;fb.textContent=msg;fb.className="a1extra-feedback "+(neutral?"":(ok?"good":"bad"));next.disabled=false;}
 function checkText(value,target){const norm=x=>String(x).trim().toLowerCase().replace(/[.,!?']/g,"").replace(/\\s+/g," ");mark(norm(value)===norm(target),norm(value)===norm(target)?"¡Exacto!":"Respuesta esperada: "+target);}
 next.onclick=()=>{if(at<9){at++;render();}else{box.innerHTML="<h3>Sección completada</h3><p>Has terminado los 10 ejercicios.</p>";fb.textContent="";next.hidden=true;count.textContent="10 / 10";bar.style.width="100%";score.hidden=false;score.textContent="Resultado: "+points+" / 10 respuestas correctas."; }};
 render();
};
const speak=text=>{if(!("speechSynthesis"in window)){alert("La reproducción de voz no está disponible en este navegador.");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-GB";speechSynthesis.speak(u);};
const attachSpeechAssessment=(box,t,mark)=>{
 const startButton=box.querySelector("[data-record]"),stopButton=box.querySelector("[data-stop]"),status=box.querySelector("[data-recstatus]"),recording=box.querySelector("[data-recording]"),resultBox=box.querySelector("[data-result]");
 let stream=null,recorder=null,chunks=[],active=false;
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent="La grabación no está disponible. Usa un navegador actualizado y una conexión HTTPS.";startButton.disabled=true;return;}
 startButton.onclick=async()=>{
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];
   recorder=new MediaRecorder(stream);recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data);};
   recorder.onstop=async()=>{
    const blob=new Blob(chunks,{type:recorder.mimeType||"audio/webm"});
    const audioUrl=URL.createObjectURL(blob);
    recording.innerHTML="<audio controls></audio><p class='muted'>Escucha tu grabación si quieres revisar cómo suenas.</p>";
    recording.querySelector("audio").src=audioUrl;
    stream?.getTracks().forEach(track=>track.stop());stream=null;
    status.textContent="Enviando audio a Workers AI para transcribirlo…";
    stopButton.disabled=true;startButton.disabled=false;
    const form=new FormData();form.append("audio",blob,"speaking.webm");form.append("targetPhrase",t.target);form.append("language","en");
    try{
     const response=await fetch("/api/pronunciation/analyze",{method:"POST",body:form});
     const data=await response.json();
     if(!response.ok||data.error){status.textContent=esc(data.error||"No se pudo analizar la grabación.");return;}
     status.textContent=data.transcription?"Transcripción recibida. Revisa las palabras reconocidas.":"No se reconocieron palabras; inténtalo otra vez.";
     const tips=Array.isArray(data.britishTips)?data.britishTips:[];
     resultBox.innerHTML="<div class='a1extra-card'><strong>Coincidencia de transcripción: "+Number(data.score||0)+"/100</strong><p>"+esc(data.scoreLabel||"No es una nota fonética.")+"</p><p><strong>El sistema reconoció:</strong> "+esc(data.transcription||"—")+"</p><p>"+esc(data.feedback||"")+"</p>"+tips.map(item=>"<div><strong>"+esc(item.word)+" · "+esc(item.ipa)+"</strong><p>"+esc(item.spanishCue)+"</p><small>Aproximación para hispanohablantes; no es IPA.</small><p>"+esc(item.tip)+"</p></div>").join("")+"</div>";
     mark(true,"Grabación completada. La coincidencia indica qué palabras reconoció Whisper; no evalúa la calidad de cada fonema.",true);
    }catch(error){status.textContent="No se pudo conectar con el análisis de voz. Puedes volver a grabar.";}
   };
   recorder.start();active=true;startButton.disabled=true;stopButton.disabled=false;status.textContent="Grabando… Di la palabra o frase del modelo británico.";
  }catch(error){status.textContent="No se pudo acceder al micrófono. Comprueba los permisos del navegador.";}
 };
 stopButton.onclick=()=>{if(!active)return;active=false;if(recorder&&recorder.state!=="inactive")recorder.stop();};
};
const sentences=l.reading.split(/(?<=[.!?])\\s+/).filter(Boolean);
const listenWords=l.listening.match(/[A-Za-z']+/g)||l.words;
const vocab=l.words.slice(0,10);
const grammarItems=Array.from({length:10},(_,i)=>{const j=i%g.tasks.length;const task=g.tasks[j],answer=g.answers[j];return {prompt:"Completa la frase según la regla: "+task,answer,wrong:g.answers.filter(x=>x!==answer).concat(["do","does","are"])};});
const readingItems=(readingQuestionSets[n]||[]).map(([prompt,answer,wrong1,wrong2])=>({prompt,answer,wrong:[wrong1,wrong2]}));
const listeningItems=Array.from({length:10},(_,i)=>{const word=listenWords[(i*Math.max(1,Math.floor(listenWords.length/10)))%listenWords.length];const sentence=l.listening.split(/(?<=[.!?])\\s+/).find(x=>x.toLowerCase().includes(word.toLowerCase()))||l.listening;const blank=sentence.replace(new RegExp("\\b"+word+"\\b","i"),"_____");return {prompt:"Escucha y elige la palabra que falta: "+blank,answer:word,wrong:listenWords.filter(x=>x.toLowerCase()!==word.toLowerCase()).slice(i%Math.max(1,listenWords.length-3),i%Math.max(1,listenWords.length-3)+2),audio:sentence};});
const dictationItems=Array.from({length:10},(_,i)=>{const target=i<5?vocab[i]:((l.listening.split(/(?<=[.!?])\\s+/)[(i-5)%Math.max(1,l.listening.split(/(?<=[.!?])\\s+/).length)]||l.listening).trim());return {kind:"write",prompt:"Pulsa el audio y escribe exactamente la palabra o frase.",target};});
const speakingItems=Array.from({length:10},(_,i)=>({kind:"speak",prompt:["Preséntate en voz alta e incluye esta palabra: ","Haz una pregunta completa que incluya esta expresión: ","Di una frase verdadera sobre ti usando esta palabra: ","Haz una pregunta a tu compañero con esta palabra: ","Describe una persona o cosa e incluye esta palabra: "][i%5]+vocab[i],target:vocab[i]}));
taskUI("grammar","3. Gramática · 10 ejercicios","Practica "+g.name+" con 10 respuestas autocorregibles.",grammarItems);

taskUI("reading","5. Reading · texto + 10 preguntas","Lee primero el texto y después responde. Texto: "+l.reading,readingItems);
taskUI("writing","6. Writing · 10 dictados","Escucha palabras y frases en inglés y escríbelas.",dictationItems);
taskUI("speaking","7. Speaking · 10 ejercicios","Responde en voz alta usando el vocabulario de la misión.",speakingItems);
taskUI("listening","8. Listening · audio + 10 preguntas","Escucha el audio completo y responde a las preguntas. Puedes reproducir cada fragmento.",listeningItems);

nav.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{nav.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));main.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===b.dataset.tab));}));
document.addEventListener("click",e=>{const b=e.target.closest(".a1extra-say");if(!b)return;if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(b.dataset.say);u.lang="en-GB";speechSynthesis.speak(u);});
})();