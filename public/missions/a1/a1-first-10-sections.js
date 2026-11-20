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
,
11:{title:"A Day in My Life",words:["daily routine","wake up","get up","have breakfast","start","finish","usually","sometimes","always","at night"],grammar:"frequency",focus:undefined,drill:"wake up · get up · have breakfast · start · finish",reading:"My name is Sophie and I have a busy routine. I usually wake up at seven and get up at half past seven. I always have breakfast at home. I start work at nine and finish at five. Sometimes I walk in the park after work. At night, I read a book and go to bed at ten.",writing:"Write about your weekday routine. Include five activities and use usually, always or sometimes.",speaking:"Describe your normal weekday. Say what time you get up and what you do at night.",listening:"Hi, I'm Daniel. I usually get up at six thirty. I have breakfast at seven and start work at eight. I finish at four. Sometimes I play football after work. I always go to bed before eleven."},
12:{title:"My Home",words:["house","flat","kitchen","bedroom","bathroom","living room","garden","sofa","table","next to"],grammar:"prepositions",focus:undefined,drill:"flat · kitchen · bedroom · bathroom · living room",reading:"I live in a small flat with my sister. There are two bedrooms and one bathroom. The kitchen is next to the living room. There is a blue sofa in the living room and a table near the window. We do not have a garden, but there is a park opposite our building.",writing:"Describe your home or an imaginary home. Name four rooms or pieces of furniture and say where they are.",speaking:"Give a short tour of your home. Describe the rooms and where the furniture is.",listening:"Welcome to my house. There is a kitchen on the ground floor. The living room is next to it. Upstairs, there are two bedrooms and a bathroom. There is a small garden behind the house."},
13:{title:"Food and Drink",words:["bread","rice","pasta","apple","banana","water","milk","coffee","chicken","vegetables"],grammar:"quantifiers",focus:undefined,drill:"rice · pasta · apple · banana · water",reading:"I usually have bread and an apple for breakfast. For lunch, I eat chicken with rice and vegetables. I sometimes have pasta for dinner. I drink water during the day and a cup of coffee in the morning. I do not drink much milk.",writing:"Write a simple food diary for one day. Include breakfast, lunch, dinner and three foods or drinks.",speaking:"Tell a partner what you usually eat and drink. Ask what food they like.",listening:"For breakfast, I have toast and a banana. I drink coffee with a little milk. At lunch, I eat rice and chicken. In the evening, I have pasta and vegetables. I drink water with every meal."},
14:{title:"At the Café",words:["menu","order","I'd like","cup","glass","bottle","sandwich","soup","bill","please"],grammar:"politeRequests",focus:undefined,drill:"order · I'd like · cup · glass · bottle",reading:"Mia is at a café with her friend. They look at the menu. Mia says, “I'd like a cheese sandwich and a cup of tea, please.” Her friend orders tomato soup and a glass of water. The waiter brings their food. After lunch, Mia asks for the bill. They pay and say thank you.",writing:"Write a short café dialogue between a customer and a waiter. Order food and a drink, and ask for the bill politely.",speaking:"Role-play a café visit. One person is the customer and the other is the waiter.",listening:"Good afternoon. Are you ready to order? Yes, I'd like vegetable soup and a glass of water, please. Certainly. Anything else? A cheese sandwich, please. Of course. I'll bring your order shortly."},
15:{title:"Clothes and Colours",words:["shirt","trousers","dress","shoes","jacket","coat","blue","black","size","wear"],grammar:"demonstratives",focus:undefined,drill:"trousers · dress · shoes · jacket · coat",reading:"Today, Anna is shopping for clothes. She wants a blue shirt and a black jacket. This shirt is small, but that shirt is medium. These shoes are comfortable, but those shoes are too expensive. Anna tries on the jacket and buys it. She wears it to work on Monday.",writing:"Describe the clothes you are wearing today or choose an outfit for a friend. Use colours and this, that, these or those.",speaking:"Describe an outfit in a shop. Ask about the size and compare two items of clothing.",listening:"I'm looking for a coat. Do you like this brown coat? It's nice, but I prefer that black one. What size do you need? Medium, please. And I need a pair of blue shoes."},
16:{title:"Around Town",words:["bank","station","supermarket","pharmacy","library","hospital","turn left","turn right","go straight","opposite"],grammar:"imperatives",focus:undefined,drill:"station · supermarket · pharmacy · library · hospital",reading:"The train station is in the town centre. When you leave the station, go straight along King Street. Turn left at the bank. The library is opposite the supermarket. The pharmacy is next to the library. The hospital is on Park Road, near the bus stop.",writing:"Write directions from your home or an imaginary starting point to a place in town. Use four direction expressions.",speaking:"Ask for and give directions to three places in town.",listening:"Excuse me, where is the library? Go straight ahead and turn right at the supermarket. The library is opposite the bank. Is it far? No, it's about five minutes on foot."},
17:{title:"Weather and Seasons",words:["sunny","rainy","cloudy","windy","cold","hot","spring","summer","autumn","winter"],grammar:"weather",focus:undefined,drill:"rainy · cloudy · windy · cold · hot",reading:"I live in the north of England. In spring, the weather is often cool and rainy. Summer is usually warm and sometimes hot. Autumn is windy and cloudy. Winter is cold, and it sometimes snows. Today it is raining, so I am staying at home with a cup of tea.",writing:"Describe the weather in your town in two different seasons. Add a sentence about today's weather.",speaking:"Give a short weather report. Describe the weather today and compare two seasons.",listening:"Good morning. Today it is sunny and warm in the south. In the north, it is cloudy and windy. Tomorrow, it is going to be rainy in many places. Take an umbrella if you go out."},
18:{title:"Yesterday",words:["yesterday","last night","last week","was","were","at home","tired","happy","busy","yesterday morning"],grammar:"pastBe",focus:undefined,drill:"last night · last week · was · were · at home",reading:"Yesterday was a busy day for Tom. He was at home in the morning because he was tired. His parents were at work. In the afternoon, Tom was happy because his friend visited him. They were together all evening. Last night, Tom was not busy and he watched a film.",writing:"Write five sentences about where you were and how you felt yesterday. Use was and were in positive and negative sentences.",speaking:"Tell a partner where you were yesterday and how you felt. Ask where they were last night.",listening:"Last week, I was in Bristol with my family. The weather was cold, but we were happy. Yesterday morning, my brother was at school and my parents were at work. I was at home."},
19:{title:"Last Weekend",words:["visited","watched","played","cooked","went","saw","had","bought","stayed","travelled"],grammar:"pastSimple",focus:undefined,drill:"watched · played · cooked · went · saw",reading:"Last weekend, Lucy visited her grandparents. On Saturday morning, they went to the market and bought fresh fruit. In the afternoon, Lucy played tennis with her cousin. In the evening, they cooked dinner and watched a film. On Sunday, they stayed at home and had a relaxing day.",writing:"Write about your last weekend. Use three regular past verbs and three irregular past verbs.",speaking:"Describe what you did last weekend. Ask your partner where they went and what they watched or played.",listening:"On Saturday, I went to the city centre. I saw an old friend and we had lunch together. In the afternoon, I bought a new book. On Sunday, I stayed at home, cooked dinner and watched a film."},
20:{title:"Future Plans",words:["tomorrow","next week","weekend","plan","visit","travel","going to","meet","study","soon"],grammar:"goingTo",focus:undefined,drill:"next week · weekend · plan · visit · travel",reading:"Next weekend, I am going to visit my cousin in Manchester. We are going to travel by train on Saturday morning. In the afternoon, we are going to meet some friends and have lunch. On Sunday, I am going to study English and then relax at home. I am excited about the plan.",writing:"Write about three plans for tomorrow or next weekend. Use am/is/are going to and include when you will do each activity.",speaking:"Tell a partner about your plans for next weekend. Ask what they are going to do.",listening:"Tomorrow, I'm going to get up early. I'm going to study English before lunch. In the afternoon, I'm going to meet my friend in town. Next week, we're going to travel to London for two days."}
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
,
"frequency":{"name":"Adverbios de frecuencia","rule":"Always, usually, sometimes y never indican cada cuánto hacemos algo. Normalmente van antes del verbo principal, pero después de TO BE.","examples":["I usually get up at seven.","She always has breakfast.","We are sometimes tired."],"tasks":["I ___ drink coffee in the morning. (usually)","She ___ goes to bed late. (never)","They are ___ busy on Mondays. (sometimes)"],"answers":["usually","never","sometimes"]},
"prepositions":{"name":"Preposiciones de lugar","rule":"In indica dentro de un espacio; on, sobre una superficie; under, debajo; next to, al lado; opposite, enfrente.","examples":["The kitchen is next to the living room.","The keys are on the table.","The park is opposite my flat."],"tasks":["The sofa is ___ the living room.","The book is ___ the table.","The bank is ___ the supermarket. (enfrente)"],"answers":["in","on","opposite"]},
"quantifiers":{"name":"Contables e incontables; some / any","rule":"Los contables tienen singular y plural (an apple, two apples). Los incontables no suelen llevar plural (water, rice). Some se usa normalmente en afirmativas y any en preguntas y negativas.","examples":["I have some apples.","We don't have any milk.","Is there any rice?"],"tasks":["There are ___ bananas on the table.","We haven't got ___ water.","I'd like ___ rice, please."],"answers":["some","any","some"]},
"politeRequests":{"name":"Peticiones educadas con would like","rule":"Would like sirve para pedir algo de forma educada. Se contrae como I'd like. Para ofrecer usamos Would you like...?","examples":["I'd like a cup of tea, please.","Would you like some water?","I'd like the bill, please."],"tasks":["I ___ like a sandwich, please.","___ you like some coffee?","She would like ___ glass of water."],"answers":["would","Would","a"]},
"demonstratives":{"name":"This / that / these / those","rule":"This y these señalan algo cercano; that y those algo más lejano. This/that se usan con singular y these/those con plural.","examples":["This shirt is blue.","That coat is expensive.","These shoes are comfortable."],"tasks":["___ jacket here is new.","___ shoes over there are black.","___ dress here is beautiful."],"answers":["This","Those","This"]},
"imperatives":{"name":"Imperativos para dar instrucciones","rule":"Usamos el verbo en forma base para dar instrucciones. Para prohibir algo, usamos don't + verbo. Please ayuda a sonar más educado.","examples":["Go straight ahead.","Turn left at the bank.","Don't cross the road here."],"tasks":["___ straight ahead. (go)","___ right at the station. (turn)","___ cross the road here. (negative)"],"answers":["Go","Turn","Don't"]},
"weather":{"name":"It is + adjetivo y expresiones del tiempo","rule":"Para describir el tiempo usamos It is + adjetivo: It's sunny, It's cold. Para una acción meteorológica en curso usamos It is + verbo-ing: It's raining.","examples":["It's sunny today.","It is cold in winter.","It's raining at the moment."],"tasks":["It ___ windy today.","It is ___ (rain) now.","It ___ hot in summer."],"answers":["is","raining","is"]},
"pastBe":{"name":"Pasado de TO BE: was / were","rule":"Was es el pasado de am/is y se usa con I/he/she/it. Were es el pasado de are y se usa con you/we/they. Para preguntar, ponemos was/were antes del sujeto.","examples":["I was at home yesterday.","They were happy.","Were you tired last night?"],"tasks":["She ___ at work yesterday.","We ___ at home last night.","___ they busy yesterday?"],"answers":["was","were","Were"]},
"pastSimple":{"name":"Pasado simple: verbos regulares e irregulares","rule":"El pasado simple describe acciones terminadas. Los verbos regulares suelen añadir -ed; los irregulares cambian de forma. En preguntas y negativas usamos did/didn't + verbo base.","examples":["We visited my aunt.","He went to London.","Did you watch the film?"],"tasks":["Yesterday I ___ (visit) my friend.","She ___ (go) to the market.","They didn't ___ (watch) TV."],"answers":["visited","went","watch"]},
"goingTo":{"name":"Futuro con be going to","rule":"Usamos be going to para hablar de planes e intenciones. La forma es sujeto + am/is/are + going to + verbo base.","examples":["I'm going to study tomorrow.","She is going to visit her cousin.","Are they going to travel next week?"],"tasks":["I ___ going to meet Ana.","He is going to ___ (travel).","___ you going to study tonight?"],"answers":["am","travel","Are"]}
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
,
"11":[["What is the text mainly about?","Sophie's daily routine","Sophie's holiday","Sophie's new job"],["What time does Sophie wake up?","At seven","At six","At eight"],["When does she get up?","At half past seven","At seven","At half past eight"],["Where does she have breakfast?","At home","At work","In the park"],["What time does she start work?","At nine","At eight","At ten"],["When does she finish work?","At five","At four","At six"],["What does she sometimes do after work?","Walks in the park","Reads at work","Goes shopping"],["What does she do at night?","Reads a book","Plays football","Cooks lunch"],["Which adverb means 'a veces'?","Sometimes","Always","Usually"],["Which statement is true?","Sophie goes to bed at ten.","Sophie starts work at seven.","Sophie never walks in the park."]],
"12":[["What is the text mainly describing?","A small flat","A large hotel","A garden centre"],["Who does the speaker live with?","Her sister","Her parents","A friend"],["How many bedrooms are there?","Two","One","Three"],["How many bathrooms are there?","One","Two","Three"],["Where is the kitchen?","Next to the living room","Opposite the bedrooms","Behind the garden"],["What colour is the sofa?","Blue","Green","Brown"],["Where is the table?","Near the window","In the bedroom","In the garden"],["Does the flat have a garden?","No","Yes","The text doesn't say"],["What is opposite the building?","A park","A supermarket","A station"],["Which sentence is correct?","There are two bedrooms.","The sofa is in the kitchen.","The flat has a large garden."]],
"13":[["What is the text mainly about?","The speaker's meals","A restaurant review","A shopping list"],["What does the speaker have for breakfast?","Bread and an apple","Rice and chicken","Pasta and vegetables"],["What does the speaker eat for lunch?","Chicken with rice and vegetables","Bread and milk","Pasta with coffee"],["What does the speaker sometimes have for dinner?","Pasta","An apple","Bread"],["What does the speaker drink in the morning?","Coffee","Water only","Milk only"],["Does the speaker drink much milk?","No","Yes","The text doesn't say"],["When does the speaker drink water?","During the day","Only at night","Only at breakfast"],["Which item is a fruit?","Apple","Rice","Chicken"],["Which item is usually uncountable?","Water","Banana","Vegetable"],["Which statement is true?","The speaker drinks water during the day.","The speaker has pasta for breakfast.","The speaker never drinks coffee."]],
"14":[["Where are Mia and her friend?","At a café","At a station","At home"],["What does Mia order?","A cheese sandwich and tea","Tomato soup and coffee","A salad and water"],["What does Mia's friend order?","Tomato soup and water","A cheese sandwich and tea","A bottle of milk"],["What does Mia look at before ordering?","The menu","The bill","A map"],["Who brings the food?","The waiter","Mia's friend","The manager"],["When does Mia ask for the bill?","After lunch","Before ordering","Before they sit down"],["When do they pay?","After the meal","Before ordering","They do not pay"],["Which phrase is a polite request?","I'd like a cheese sandwich, please.","Give me food.","I want bill now."],["What does Mia say at the end?","Thank you","Good morning","Goodbye forever"],["Which item does Mia drink?","A cup of tea","A glass of milk","A bottle of water"]],
"15":[["What is Anna doing?","Shopping for clothes","Going to school","Packing for a holiday"],["What colour shirt does Anna want?","Blue","Black","Brown"],["What colour jacket does she want?","Black","Blue","White"],["What size is the first shirt?","Small","Medium","Large"],["What size is the second shirt?","Medium","Small","Large"],["Which shoes are comfortable?","These shoes","Those shoes","Neither pair"],["Why doesn't Anna buy those shoes?","They are too expensive","They are too small","They are black"],["What does Anna try on?","The jacket","The shoes","The trousers"],["When does she wear the jacket?","On Monday","On Sunday","On Saturday"],["Which word refers to more than one item nearby?","These","This","That"]],
"16":[["What is the text mainly about?","Directions in a town","A train journey","A hospital visit"],["Where is the train station?","In the town centre","Near the hospital","Opposite the library"],["Which street do you follow?","King Street","Park Road","Queen Street"],["Where do you turn left?","At the bank","At the library","At the hospital"],["What is opposite the supermarket?","The library","The station","The pharmacy"],["Where is the pharmacy?","Next to the library","Behind the station","Inside the bank"],["Which road is the hospital on?","Park Road","King Street","Market Road"],["What is near the hospital?","A bus stop","A supermarket","A school"],["What do you do first after leaving the station?","Go straight","Turn right","Stop at the library"],["Which statement is true?","The pharmacy is next to the library.","The library is inside the station.","The hospital is on King Street."]],
"17":[["Where does the speaker live?","In the north of England","In the south of England","In Scotland"],["What is spring often like?","Cool and rainy","Hot and sunny","Very snowy"],["What is summer usually like?","Warm","Very cold","Always windy"],["What is autumn often like?","Windy and cloudy","Hot and dry","Snowy"],["What is winter like?","Cold","Hot","Warm"],["What is the weather like today?","It is raining","It is sunny","It is snowing"],["Why is the speaker staying at home?","Because it is raining","Because it is too hot","Because it is windy"],["Which season is usually warm?","Summer","Winter","Autumn"],["Which adjective means 'nublado'?","Cloudy","Windy","Sunny"],["Which statement is true?","It sometimes snows in winter.","Spring is always hot.","Autumn is never cloudy."]],
"18":[["What is the text mainly about?","Tom's day yesterday","Tom's holiday next week","Tom's daily routine"],["Why was Tom at home in the morning?","Because he was tired","Because he was ill","Because it was raining"],["Where were Tom's parents?","At work","At home","At the park"],["How did Tom feel after his friend visited?","Happy","Angry","Tired"],["When did Tom's friend visit?","In the afternoon","In the morning","At night"],["Who was with Tom all evening?","His friend","His parents","His teacher"],["Was Tom busy last night?","No","Yes","The text doesn't say"],["What did Tom do last night?","He watched a film","He played tennis","He went to work"],["Which form is the past of are?","Were","Was","Be"],["Which sentence is true?","Tom's parents were at work.","Tom was at school all day.","Tom was unhappy when his friend visited."]],
"19":[["What is the text mainly about?","Lucy's weekend","Lucy's school day","Lucy's holiday plans"],["Who did Lucy visit?","Her grandparents","Her teacher","Her cousin"],["Where did they go on Saturday morning?","To the market","To the cinema","To the park"],["What did they buy?","Fresh fruit","New clothes","A book"],["What sport did Lucy play?","Tennis","Football","Basketball"],["Who did she play with?","Her cousin","Her friend","Her brother"],["What did they do in the evening?","Cooked dinner and watched a film","Went to the market","Travelled"],["Where did they stay on Sunday?","At home","At the station","At a hotel"],["Which verb is irregular in the past?","Went","Visited","Played"],["Which statement is true?","Lucy had a relaxing Sunday.","Lucy watched a film on Sunday morning.","Lucy travelled abroad."]],
"20":[["What is the text mainly about?","Plans for next weekend","A past holiday","A normal working day"],["Who is the speaker going to visit?","Their cousin","Their teacher","Their colleague"],["Where does the cousin live?","Manchester","London","Bristol"],["How are they going to travel?","By train","By car","By bus"],["When are they going to travel?","Saturday morning","Friday evening","Sunday afternoon"],["What are they going to do on Saturday afternoon?","Meet friends and have lunch","Study English","Stay at home"],["What is the speaker going to do on Sunday?","Study English and relax","Go shopping all day","Work in a café"],["How does the speaker feel about the plan?","Excited","Worried","Bored"],["Which phrase signals future plans?","Going to","Was","Usually"],["Which statement is true?","They are going to travel by train.","They are going to visit London.","They are going to work on Sunday."]]
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
,
"daily routine":"dei-li ru-tiin",
"wake up":"ueik ap",
"get up":"get ap",
"have breakfast":"hav brek-fast",
"start":"start",
"finish":"fi-nish",
"usually":"iu-yu-a-li",
"sometimes":"sam-taimz",
"always":"ol-ueiz",
"at night":"at nait",
"house":"haus",
"flat":"flat",
"kitchen":"ki-chen",
"bedroom":"bed-rum",
"bathroom":"baz-rum",
"living room":"li-ving rum",
"garden":"gar-den",
"sofa":"sou-fa",
"table":"tei-bal",
"next to":"nekst tu",
"bread":"bred",
"rice":"rais",
"pasta":"pas-ta",
"apple":"a-pal",
"banana":"ba-na-na",
"water":"uo-ta",
"milk":"milk",
"coffee":"ko-fi",
"chicken":"chi-ken",
"vegetables":"vech-ta-bals",
"menu":"men-iu",
"order":"or-da",
"I'd like":"aid laik",
"cup":"kap",
"glass":"glas",
"bottle":"bo-tal",
"sandwich":"san-wich",
"soup":"suup",
"bill":"bil",
"please":"pliiz",
"shirt":"shert",
"trousers":"trau-zas",
"dress":"dres",
"shoes":"shuus",
"jacket":"ya-ket",
"coat":"kout",
"blue":"bluu",
"black":"blak",
"size":"saiz",
"wear":"uea",
"bank":"bank",
"station":"stei-shan",
"supermarket":"su-pa-mar-ket",
"pharmacy":"far-ma-si",
"library":"lai-bra-ri",
"hospital":"hos-pi-tal",
"turn left":"tern left",
"turn right":"tern rait",
"go straight":"gou streit",
"opposite":"o-pa-zit",
"sunny":"sa-ni",
"rainy":"rei-ni",
"cloudy":"klau-di",
"windy":"uin-di",
"cold":"kould",
"hot":"hot",
"spring":"spring",
"summer":"sa-ma",
"autumn":"o-tam",
"winter":"uin-ta",
"yesterday":"ies-ta-dei",
"last night":"last nait",
"last week":"last wiik",
"was":"uoz",
"were":"uer",
"at home":"at houm",
"tired":"tai-ad",
"happy":"ha-pi",
"busy":"bi-zi",
"yesterday morning":"ies-ta-dei mor-ning",
"visited":"vi-zi-tid",
"watched":"uocht",
"played":"pleid",
"cooked":"kukt",
"went":"uent",
"saw":"so",
"had":"had",
"bought":"bot",
"stayed":"steid",
"travelled":"tra-veld",
"tomorrow":"ta-mo-rou",
"next week":"nekst wiik",
"weekend":"wiik-end",
"plan":"plan",
"visit":"vi-zit",
"travel":"tra-val",
"going to":"gou-ing tu",
"meet":"miit",
"study":"sta-di",
"soon":"suun"
};
const wordTranslations = {"name":"nombre","surname":"apellido","age":"edad","address":"dirección","city":"ciudad","country":"país","nationality":"nacionalidad","phone number":"número de teléfono","email address":"correo electrónico","date of birth":"fecha de nacimiento","hello":"hola","good morning":"buenos días","good afternoon":"buenas tardes","good evening":"buenas tardes / noches","goodbye":"adiós","see you later":"hasta luego","please":"por favor","thank you":"gracias","you're welcome":"de nada","meet":"conocer","Spain":"España","Spanish":"español/a","the United Kingdom":"Reino Unido","British":"británico/a","France":"Francia","French":"francés/francesa","Germany":"Alemania","German":"alemán/alemana","Italy":"Italia","Italian":"italiano/a","letter":"letra","alphabet":"alfabeto","spell":"deletrear","first name":"nombre de pila","capital letter":"mayúscula","small letter":"minúscula","how do you spell...?":"¿Cómo se deletrea...?","double":"doble","vowel":"vocal","who":"quién","what":"qué","where":"dónde","when":"cuándo","how":"cómo","how old":"cuántos años","married":"casado/a","single":"soltero/a","occupation":"profesión","zero":"cero","ten":"diez","twenty":"veinte","thirty":"treinta","forty":"cuarenta","fifty":"cincuenta","sixty":"sesenta","seventy":"setenta","eighty":"ochenta","ninety":"noventa","language":"idioma","English":"inglés","speak":"hablar","read":"leer","write":"escribir","understand":"entender","practise":"practicar","profile":"perfil","born":"nacido/a","live":"vivir","work":"trabajar","study":"estudiar","favourite":"favorito/a","hobby":"afición","free time":"tiempo libre","profile picture":"foto de perfil","classmate":"compañero/a de clase","teacher":"profesor/a","student":"estudiante","friend":"amigo/a","boy":"niño / chico","girl":"niña / chica","man":"hombre","woman":"mujer","people":"personas / gente","group":"grupo","conversation":"conversación","question":"pregunta","answer":"respuesta / responder","introduce":"presentar","again":"otra vez","slowly":"despacio","together":"juntos","class":"clase","new":"nuevo/a","welcome":"bienvenido/a",
"daily routine":"rutina diaria",
"wake up":"despertarse",
"get up":"levantarse",
"have breakfast":"desayunar",
"start":"empezar",
"finish":"terminar",
"usually":"normalmente",
"sometimes":"a veces",
"always":"siempre",
"at night":"por la noche",
"house":"casa",
"flat":"piso",
"kitchen":"cocina",
"bedroom":"dormitorio",
"bathroom":"baño",
"living room":"salón",
"garden":"jardín",
"sofa":"sofá",
"table":"mesa",
"next to":"al lado de",
"bread":"pan",
"rice":"arroz",
"pasta":"pasta",
"apple":"manzana",
"banana":"plátano",
"water":"agua",
"milk":"leche",
"coffee":"café",
"chicken":"pollo",
"vegetables":"verduras",
"menu":"menú",
"order":"pedir",
"I'd like":"quisiera",
"cup":"taza",
"glass":"vaso",
"bottle":"botella",
"sandwich":"sándwich",
"soup":"sopa",
"bill":"cuenta",
"please":"por favor",
"shirt":"camisa",
"trousers":"pantalones",
"dress":"vestido",
"shoes":"zapatos",
"jacket":"chaqueta",
"coat":"abrigo",
"blue":"azul",
"black":"negro",
"size":"talla",
"wear":"llevar puesto",
"bank":"banco",
"station":"estación",
"supermarket":"supermercado",
"pharmacy":"farmacia",
"library":"biblioteca",
"hospital":"hospital",
"turn left":"girar a la izquierda",
"turn right":"girar a la derecha",
"go straight":"seguir recto",
"opposite":"enfrente de",
"sunny":"soleado",
"rainy":"lluvioso",
"cloudy":"nublado",
"windy":"ventoso",
"cold":"frío",
"hot":"caluroso",
"spring":"primavera",
"summer":"verano",
"autumn":"otoño",
"winter":"invierno",
"yesterday":"ayer",
"last night":"anoche",
"last week":"la semana pasada",
"was":"era / estaba",
"were":"eran / estaban",
"at home":"en casa",
"tired":"cansado/a",
"happy":"contento/a",
"busy":"ocupado/a",
"yesterday morning":"ayer por la mañana",
"visited":"visitó / visité",
"watched":"vio / miró",
"played":"jugó",
"cooked":"cocinó",
"went":"fue",
"saw":"vio",
"had":"tuvo / tomó",
"bought":"compró",
"stayed":"se quedó",
"travelled":"viajó",
"tomorrow":"mañana",
"next week":"la semana que viene",
"weekend":"fin de semana",
"plan":"plan",
"visit":"visitar",
"travel":"viajar",
"going to":"ir a (futuro)",
"meet":"quedar con / conocer",
"study":"estudiar",
"soon":"pronto"
};
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
,
"frequency":{"title":"Adverbios de frecuencia","explain":"Indican cada cuánto hacemos una actividad: always (siempre), usually (normalmente), sometimes (a veces) y never (nunca).","structure":["Sujeto + adverbio + verbo: I usually walk.","TO BE + adverbio: She is always happy.","Never ya tiene sentido negativo: I never smoke."],"negative":"I don't usually drink tea. (Normalmente no tomo té.)","question":"Do you usually walk to work? (¿Normalmente vas andando al trabajo?)","examples":[["I always have breakfast.","Siempre desayuno."],["She sometimes reads at night.","A veces lee por la noche."],["We are usually busy.","Normalmente estamos ocupados."]]},
"prepositions":{"title":"Preposiciones de lugar","explain":"Explican dónde está una persona o cosa. Son útiles para describir una casa, una habitación o una ciudad.","structure":["in · dentro de: The keys are in the bag.","on · encima de: The cup is on the table.","under · debajo; next to · al lado; opposite · enfrente."],"negative":"The sofa isn't next to the window. (El sofá no está junto a la ventana.)","question":"Where is the table? (¿Dónde está la mesa?)","examples":[["The kitchen is next to the living room.","La cocina está al lado del salón."],["The book is on the table.","El libro está encima de la mesa."],["The park is opposite my house.","El parque está enfrente de mi casa."]]},
"quantifiers":{"title":"Contables, incontables y some / any","explain":"Los alimentos pueden ser contables (an apple, two bananas) o incontables (water, rice, milk). Some y any expresan cantidades no exactas.","structure":["some + plural contable o incontable en afirmativas.","any en preguntas y negativas.","How many + plural contable; How much + incontable."],"negative":"We don't have any milk. (No tenemos leche.)","question":"Are there any apples? / How much water do you drink?","examples":[["I have some bananas.","Tengo algunos plátanos."],["There isn't any milk.","No hay leche."],["How many apples do you want?","¿Cuántas manzanas quieres?"]]},
"politeRequests":{"title":"Peticiones educadas: would like","explain":"Would like es una forma amable de decir qué queremos o de ofrecer algo. Es más educada que want en muchas situaciones.","structure":["I'd like + sustantivo: I'd like a coffee.","Would you like + sustantivo? para ofrecer.","Would like + to + verbo: I'd like to order."],"negative":"I wouldn't like... expresa algo que no querríamos.","question":"Would you like a sandwich? (¿Te apetece un sándwich?)","examples":[["I'd like a cup of tea, please.","Quisiera una taza de té, por favor."],["Would you like some water?","¿Quieres un poco de agua?"],["I'd like the bill, please.","Quisiera la cuenta, por favor."]]},
"demonstratives":{"title":"Demostrativos: this, that, these, those","explain":"Señalan objetos según estén cerca o lejos y concuerdan con singular o plural.","structure":["this · este/esta (cerca, singular).","that · ese/esa/aquel (lejos, singular).","these · estos/estas (cerca, plural); those · esos/esas (lejos, plural)."],"negative":"That isn't my jacket. / These aren't my shoes.","question":"Is this your shirt? / Are those shoes new?","examples":[["This shirt is blue.","Esta camisa es azul."],["Those shoes are expensive.","Esos zapatos son caros."],["Are these your trousers?","¿Estos son tus pantalones?"]]},
"imperatives":{"title":"Imperativos para dar direcciones","explain":"Los imperativos sirven para dar instrucciones directas, por ejemplo, para explicar cómo llegar a un lugar.","structure":["Verbo base al inicio: Go straight.","Turn left / Turn right.","Negativa: Don't + verbo base."],"negative":"Don't turn left here. (No gires a la izquierda aquí.)","question":"How do I get to the station? (¿Cómo llego a la estación?)","examples":[["Go straight ahead.","Sigue todo recto."],["Turn left at the bank.","Gira a la izquierda en el banco."],["Don't cross the road here.","No cruces la calle aquí."]]},
"weather":{"title":"Cómo describir el tiempo","explain":"Usamos it como sujeto impersonal para hablar del tiempo. Podemos usar adjetivos o describir una acción que ocurre ahora.","structure":["It is + adjetivo: It's sunny / cold / windy.","It is + verbo-ing: It's raining / snowing.","What's the weather like? para preguntar."],"negative":"It isn't sunny today. / It isn't raining now.","question":"What's the weather like today? (¿Qué tiempo hace hoy?)","examples":[["It's sunny and warm.","Hace sol y está templado."],["It's raining now.","Está lloviendo ahora."],["It's cold in winter.","Hace frío en invierno."]]},
"pastBe":{"title":"El pasado de TO BE: was y were","explain":"Was y were hablan de estados y lugares en el pasado. Was corresponde a I/he/she/it; were a you/we/they.","structure":["I / He / She / It + was.","You / We / They + were.","Negativa: wasn't / weren't; pregunta: Was/Were + sujeto?"],"negative":"I wasn't at work. / They weren't tired.","question":"Were you at home yesterday? (¿Estuviste en casa ayer?)","examples":[["I was happy yesterday.","Ayer estaba contento/a."],["They were at school.","Ellos estaban en el colegio."],["Was she tired?","¿Estaba ella cansada?"]]},
"pastSimple":{"title":"Pasado simple: regulares e irregulares","explain":"Describe acciones que comenzaron y terminaron en el pasado. Los regulares suelen terminar en -ed; los irregulares tienen formas propias.","structure":["Regular: visit → visited; play → played.","Irregular: go → went; see → saw; have → had.","Pregunta: Did + sujeto + verbo base? Negativa: didn't + verbo base."],"negative":"I didn't go out. Después de didn't usamos go, no went.","question":"Did you watch a film? (¿Viste una película?)","examples":[["We visited our grandparents.","Visitamos a nuestros abuelos."],["She went to the market.","Ella fue al mercado."],["Did you have a good weekend?","¿Tuviste un buen fin de semana?"]]},
"goingTo":{"title":"Planes futuros con be going to","explain":"Usamos be going to para expresar planes o intenciones que ya tenemos. El verbo principal se mantiene en forma base.","structure":["I am going to + verbo base.","He/She is going to + verbo base.","We/They are going to + verbo base."],"negative":"I'm not going to travel. (No voy a viajar.)","question":"Are you going to study tomorrow? (¿Vas a estudiar mañana?)","examples":[["I'm going to visit my cousin.","Voy a visitar a mi primo/a."],["She is going to travel next week.","Ella va a viajar la semana que viene."],["Are they going to meet us?","¿Van a quedar con nosotros?"]]}
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
["pronunciation","4. Pronunciación","Pronunciación","<div class='a1-pron-intro'><span class='a1-pron-kicker'>BRITISH ENGLISH · A1</span><h3>Escucha, reconoce y recuerda</h3><p>Repasa cada palabra con su significado y una guía de pronunciación aproximada para hispanohablantes.</p></div><div class='a1-pron-grid'>"+l.words.map((w,i)=>"<article class='a1-pron-word'><span class='a1-pron-number'>"+String(i+1).padStart(2,"0")+"</span><strong>"+esc(w)+"</strong><span class='a1-pron-meaning'>"+esc(translateWord(w))+"</span><span class='a1-pron-sound'>/"+esc(pronunciationCue(w))+"/</span><span class='a1-pron-label'>Aproximación fonética</span><button type='button' class='a1extra-say a1-pron-audio' data-say='"+esc(w)+"' aria-label='Escuchar "+esc(w)+"'>▶ Escuchar</button></article>").join("")+"</div>"+card("Consejo de pronunciación","<p>"+esc(l.focus)+"</p>")+"<p class='a1-pron-note'>La guía entre barras es una ayuda de lectura, no una transcripción IPA. No hay grabación ni evaluación en esta sección: la práctica oral está en Speaking.</p>"],
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
 s.innerHTML="<h2>"+title+"</h2><p class='muted'>"+intro+"</p>"+(id==="writing"?"":keyVocabularyCard())+"<div class='a1extra-progress'><span data-count>1 / 10</span><div><i data-bar></i></div></div><div class='a1extra-card' data-taskbox></div><p class='a1extra-feedback' data-feedback aria-live='polite'></p><button type='button' data-next disabled>Siguiente ejercicio →</button><p class='a1extra-score' data-score hidden></p>";
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
(()=>{
 const section=document.getElementById("listening");if(!section)return;
 const matches=[...l.listening.matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)];
 const selected=new Set(Array.from({length:10},(_,i)=>Math.round(i*(matches.length-1)/9)));
 const gaps=[...selected].sort((a,b)=>a-b).map((pos,index)=>({pos,index,answer:matches[pos][0]}));
 const byPos=new Map(gaps.map(g=>[g.pos,g]));
 let cursor=0,passage="";
 matches.forEach((m,pos)=>{
  const gap=byPos.get(pos),start=m.index;
  passage+=esc(l.listening.slice(cursor,start));
  passage+=gap?"<input class='a1-listen-gap' data-gap='"+gap.index+"' aria-label='Hueco "+(gap.index+1)+"' autocomplete='off' spellcheck='false' placeholder='"+(gap.index+1)+"'>":esc(m[0]);
  cursor=start+m[0].length;
 });
 passage+=esc(l.listening.slice(cursor));
 section.innerHTML="<h2>8. Listening · audio + 10 huecos</h2><p class='muted'>Escucha el audio completo y completa los diez huecos en este único texto. No hay opciones: escribe lo que realmente oyes.</p>"+keyVocabularyCard()+"<div class='a1extra-card'><button type='button' data-listen-audio>🔊 Escuchar audio completo</button><p class='a1-listen-passage'>"+passage+"</p><button type='button' data-listen-check>Comprobar las 10 respuestas</button><p class='a1extra-feedback' data-listen-feedback aria-live='polite'></p><p data-listen-result></p></div>";
 section.querySelector("[data-listen-audio]").onclick=()=>speak(l.listening);
 section.querySelector("[data-listen-check]").onclick=()=>{
  let score=0;
  gaps.forEach(g=>{
   const input=section.querySelector("[data-gap='"+g.index+"']");
   const norm=x=>String(x).trim().toLowerCase().replace(/[^a-z']/g,"");
   const ok=norm(input.value)===norm(g.answer);
   if(ok)score++;
   input.disabled=true;
   input.style.borderColor=ok?"#27945d":"#c94b45";
   input.title=ok?"Correcto":"Respuesta: "+g.answer;
  });
  section.querySelector("[data-listen-feedback]").textContent="Has acertado "+score+" de 10 huecos.";
  section.querySelector("[data-listen-result]").textContent="Soluciones: "+gaps.map((g,i)=>(i+1)+". "+g.answer).join(" · ");
  section.querySelector("[data-listen-check]").disabled=true;
 };
 const css=document.createElement("style");css.textContent=".a1-listen-passage{font-size:18px;line-height:2.5;margin:20px 0;color:#20345d}.a1-listen-gap{display:inline-block;width:clamp(76px,11vw,120px);margin:3px 4px;padding:7px 8px;border:1px solid #8da4ca;border-radius:7px;background:#fff;color:#20345d;font:inherit;font-size:15px;text-align:center}.a1-listen-gap:disabled{opacity:1;background:#f2f5fb}";document.head.appendChild(css);
})();

nav.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{nav.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));main.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===b.dataset.tab));}));
document.addEventListener("click",e=>{const b=e.target.closest(".a1extra-say");if(!b)return;if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(b.dataset.say);u.lang="en-GB";speechSynthesis.speak(u);});
})();