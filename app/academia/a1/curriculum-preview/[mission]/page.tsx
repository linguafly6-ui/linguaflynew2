import Link from "next/link";
import { notFound } from "next/navigation";
import CanonicalMission, { type Mission } from "@/components/academy/CanonicalMission";
import { getSpanishPronunciationGuide } from "@/content/pronunciation-guide";
import mission001 from "@/content/canonical-missions/a1/001.json";
import mission002 from "@/content/canonical-missions/a1/002.json";
import { getPreviewMission, previewMissions } from "@/content/a1-curriculum-preview";

const canonicalMissions: Record<string, Mission> = {
  "001": mission001 as Mission,
  "002": mission002 as Mission,
};
const ids = ["001", "002", ...previewMissions.map((mission) => mission.id)];
const keys = ["explore", "practice", "grammar", "pronunciation", "reading", "writing", "speaking", "listening"];
const types = ["vocabulary_pairs", "mixed_practice", "grammar", "pronunciation_cards", "reading_comprehension", "dictation", "speaking_prompts", "listening_gap_fill"];
const spanish: Record<string, string> = {
  "Spain":"España","Spanish":"español","the United Kingdom":"Reino Unido","British":"británico","France":"Francia","French":"francés","Germany":"Alemania","German":"alemán","Italy":"Italia","Italian":"italiano",
  "letter":"letra","alphabet":"alfabeto","spell":"deletrear","first name":"nombre","surname":"apellido","capital letter":"mayúscula","small letter":"minúscula","double":"doble","vowel":"vocal",
  "who":"quién","what":"qué","where":"dónde","when":"cuándo","how":"cómo","how old":"qué edad","married":"casado/a","single":"soltero/a","address":"dirección","occupation":"ocupación",
  "zero":"cero","ten":"diez","twenty":"veinte","thirty":"treinta","forty":"cuarenta","fifty":"cincuenta","sixty":"sesenta","seventy":"setenta","eighty":"ochenta","ninety":"noventa",
  "English":"inglés","language":"idioma","speak":"hablar","read":"leer","write":"escribir","understand":"entender","practise":"practicar",
  "profile":"perfil","born":"nacido/a","live":"vivir","work":"trabajar","study":"estudiar","favourite":"favorito/a","hobby":"afición","free time":"tiempo libre","profile picture":"foto de perfil",
  "classmate":"compañero/a de clase","teacher":"profesor/a","student":"estudiante","friend":"amigo/a","boy":"chico","girl":"chica","man":"hombre","woman":"mujer","people":"personas","group":"grupo",
  "conversation":"conversación","question":"pregunta","answer":"respuesta","introduce":"presentar","again":"otra vez","slowly":"despacio","together":"juntos","class":"clase","new":"nuevo/a","welcome":"bienvenido/a",
  "daily routine":"rutina diaria","wake up":"despertarse","get up":"levantarse","have breakfast":"desayunar","start":"empezar","finish":"terminar","usually":"normalmente","sometimes":"a veces","always":"siempre","at night":"por la noche",
  "house":"casa","flat":"piso","kitchen":"cocina","bedroom":"dormitorio","bathroom":"baño","living room":"salón","garden":"jardín","sofa":"sofá","table":"mesa","next to":"al lado de",
  "bread":"pan","rice":"arroz","pasta":"pasta","apple":"manzana","banana":"plátano","water":"agua","milk":"leche","coffee":"café","chicken":"pollo","vegetables":"verduras",
  "menu":"menú","order":"pedido","I'd like":"quisiera","cup":"taza","glass":"vaso","bottle":"botella","sandwich":"sándwich","soup":"sopa","bill":"cuenta","please":"por favor",
  "shirt":"camisa","T-shirt":"camiseta","trousers":"pantalones","jeans":"vaqueros","dress":"vestido","skirt":"falda","shoes":"zapatos","jacket":"chaqueta","coat":"abrigo","trainers":"zapatillas deportivas","blue":"azul","black":"negro","red":"rojo","white":"blanco","size":"talla","wear":"llevar puesto",
  "football":"fútbol","tennis":"tenis","basketball":"baloncesto","swimming":"natación","cycling":"ciclismo","run":"correr","jump":"saltar","play":"jugar","can":"poder / saber","can't":"no poder / no saber","sports equipment":"material deportivo","training":"entrenamiento","ride a bicycle":"montar en bicicleta",
  "town":"ciudad","city":"ciudad","street":"calle","square":"plaza","park":"parque","station":"estación","bus stop":"parada de autobús","supermarket":"supermercado","bank":"banco","post office":"oficina de correos","hospital":"hospital","turn left":"girar a la izquierda","turn right":"girar a la derecha","go straight":"seguir recto","opposite":"enfrente de","between":"entre","near":"cerca de","bus":"autobús","train":"tren","underground":"metro","taxi":"taxi","car":"coche","bicycle":"bicicleta","plane":"avión","ticket":"billete","single ticket":"billete sencillo","return ticket":"billete de ida y vuelta","platform":"andén","timetable":"horario","journey":"viaje","travel":"viajar","leave":"salir","arrive":"llegar","hotel":"hotel","reception":"recepción","room":"habitación","single room":"habitación individual","double room":"habitación doble","reservation":"reserva","key":"llave","lift":"ascensor","breakfast":"desayuno","shower":"ducha","towel":"toalla","night":"noche","check in":"registrarse","check out":"dejar la habitación","available":"disponible","airport":"aeropuerto","check-in desk":"mostrador de facturación","boarding pass":"tarjeta de embarque","passport":"pasaporte","luggage":"equipaje","suitcase":"maleta","hand luggage":"equipaje de mano","security":"control de seguridad","departure":"salida","arrival":"llegada","flight":"vuelo","gate":"puerta de embarque","boarding":"embarque","delayed":"retrasado","on time":"en hora","baggage claim":"recogida de equipaje","passport control":"control de pasaportes","terminal":"terminal","weather":"tiempo","sunny":"soleado","cloudy":"nublado","rainy":"lluvioso","windy":"ventoso","snowy":"nevado","hot":"caluroso","cold":"frío","warm":"templado","cool":"fresco","spring":"primavera","summer":"verano","autumn":"otoño","winter":"invierno","temperature":"temperatura","forecast":"previsión","rain":"lluvia","snow":"nieve","doctor":"médico/a","nurse":"enfermero/a","patient":"paciente","appointment":"cita","head":"cabeza","stomach":"estómago","throat":"garganta","tooth":"diente","back":"espalda","arm":"brazo","leg":"pierna","hand":"mano","foot":"pie","shoulder":"hombro","headache":"dolor de cabeza","stomachache":"dolor de estómago","sore throat":"dolor de garganta","toothache":"dolor de muelas","feel":"sentirse","ill":"enfermo/a","better":"mejor","medicine":"medicina","birthday":"cumpleaños","celebration":"celebración","party":"fiesta","invitation":"invitación","guest":"invitado/a","present":"regalo","cake":"pastel / tarta","card":"tarjeta","candles":"velas","balloon":"globo","January":"enero","February":"febrero","March":"marzo","April":"abril","May":"mayo","June":"junio","July":"julio","August":"agosto","September":"septiembre","October":"octubre","November":"noviembre","December":"diciembre","date":"fecha","birthday card":"tarjeta de cumpleaños",
  "shop":"tienda","shop assistant":"dependiente/a","customer":"cliente","price":"precio","pound":"libra","pence":"penique","cash":"efectivo","receipt":"recibo","bag":"bolsa","small":"pequeño/a","medium":"mediano/a","large":"grande","cheap":"barato/a","expensive":"caro/a","buy":"comprar","pay":"pagar","change":"cambio","notebook":"cuaderno","pen":"bolígrafo","How much is it?":"¿Cuánto cuesta?","How much are they?":"¿Cuánto cuestan?","Here you are":"Aquí tiene","That's all, thank you":"Eso es todo, gracias","library":"biblioteca","librarian":"bibliotecario/a","book":"libro","library card":"carné de biblioteca","borrow":"tomar prestado","return":"devolver","bookcase":"estantería","shelf":"estante","floor":"planta","opening hours":"horario de apertura","close":"cerrar","open":"abierto/a","story":"relato","adventure":"aventura","animal":"animal","quiet":"silencioso/a","three books":"tres libros","two weeks":"dos semanas","How long can I borrow this?":"¿Durante cuánto tiempo puedo tomarlo prestado?","Where can I find…?":"¿Dónde puedo encontrar…?","What time does the library close?":"¿A qué hora cierra la biblioteca?","I must return this book.":"Debo devolver este libro.","job":"profesión","driver":"conductor/a","cook":"cocinero/a","farmer":"agricultor/a","office":"oficina","school":"escuela","restaurant":"restaurante","workplace":"lugar de trabajo","What do you do?":"¿A qué te dedicas?","Where do you work?":"¿Dónde trabajas?","office worker":"empleado/a de oficina","I'm a teacher":"Soy profesor/a","He works in a hospital":"Él trabaja en un hospital","She works in a shop":"Ella trabaja en una tienda",
"Monday":"lunes",
"Tuesday":"martes",
"Wednesday":"miércoles",
"Thursday":"jueves",
"Friday":"viernes",
"Saturday":"sábado",
"Sunday":"domingo",
"every day":"todos los días",
"once a week":"una vez por semana",
"twice a week":"dos veces por semana",
"never":"nunca",
"early":"temprano",
"late":"tarde",
"schedule":"horario",
"have dinner":"cenar",
"do homework":"hacer los deberes",
"go to bed":"acostarse",
"sleep":"dormir",
"morning":"mañana",
"afternoon":"tarde",
"evening":"atardecer / noche",
"before":"antes",
"after":"después",
"sunrise":"amanecer",
"midday":"mediodía",
"o'clock":"en punto",
"half past":"y media",
"quarter past":"y cuarto",
"quarter to":"menos cuarto",
"minute":"minuto",
"noon":"mediodía",
"midnight":"medianoche"
};
const phraseModels: Record<string, string[]> = {
  "003":["Where are you from?","I'm from Spain.","What nationality are you?","I'm Spanish.","She is from France.","He is German.","We live in Italy.","They are from the United Kingdom.","I speak Spanish and English.","Where is your friend from?"],
  "004":["How do you spell your name?","My name is spelled L-A-U-R-A.","Please use a capital letter.","The first letter is A.","There are five letters in my name.","Is that a double N?","Can you spell your surname?","The word has three vowels.","Write your name in capital letters.","I don't know how to spell it."],
  "005":["Who is your English teacher?","What is your favourite colour?","Where are your parents?","When is your English class?","How old is your brother?","Are you a student?","Is she your sister?","Are they from Spain?","What is his occupation?","How are your friends?"],
  "006":["My phone number ends in twenty.","Her house number is thirty-five.","The class has twenty students.","I am thirty years old.","There are forty people here.","My postcode has five numbers.","The ticket costs fifteen euros.","Please write the number here.","His telephone number is on the card.","Can you repeat that number, please?"],
  "007":["I speak English at work.","She speaks three languages.","Can you speak French?","I can read simple texts.","He can write emails in English.","We understand the teacher.","They practise English every day.","I can't speak German yet.","Please speak slowly.","Do you understand this question?"],
  "008":["I was born in Seville.","I live with my family.","I work in a small shop.","I study English on Mondays.","My favourite food is pasta.","My favourite hobby is reading.","I have one brother and two sisters.","I am friendly and quiet.","In my free time, I play tennis.","This is my personal profile."],
  "009":["This is my classmate, Tom.","Our teacher is very friendly.","There are twelve students in my class.","The girl next to me is Sara.","The boys are in the classroom.","That woman is our English teacher.","My best friend is in this group.","Who is the new student?","The people in my class are nice.","We study English together."],
  "010":["Hello, I'm Marta. What's your name?","I'm from Portugal. Where are you from?","How old are you? I'm twenty-one.","Do you speak English?","A little, but I practise every day.","Can you repeat the question, please?","Please speak more slowly.","This is my friend, Luis. He is a student.","Nice to meet you. Welcome to the class!","See you next lesson. Goodbye!"],
  "011":["I wake up at seven.","I get up at half past seven.","I have breakfast at eight.","I start work at nine.","I finish work at five.","I usually walk to work.","She sometimes reads at night.","He always has breakfast.","What time do you get up?","I go to bed at ten."],
  "012":["There is a kitchen in my flat.","There are two bedrooms.","The sofa is in the living room.","The table is next to the window.","There is a garden behind the house.","The bathroom is small.","There are four chairs in the kitchen.","Is there a desk in your bedroom?","The lamp is on the table.","My flat has a big living room."],
  "013":["I eat bread for breakfast.","We have rice for lunch.","She likes pasta.","He eats an apple every day.","I have a banana.","Would you like some water?","I drink milk in the morning.","My father likes coffee.","They eat chicken and vegetables.","I don't like fish."],
  "014":["Can I see the menu, please?","I'd like a sandwich.","Can I have a glass of water?","I'd like a cup of coffee.","Would you like some soup?","Anything else?","No, thank you. That's all.","How much is the bill?","Can I pay by card?","Here you are. Thank you."],
  "018":["Excuse me, where is the station?","Go straight and turn left.","The bank is next to the supermarket.","The park is opposite the hospital.","Where are the bus stops?","There is a post office near the square.","Turn right at the traffic lights.","The station is between the bank and the park.","How can I get to the museum?","Go straight. It is on your right."],
  "019":["How do you get to work?","I go by bus.","We travel by train.","Can I have a return ticket to Oxford?","How much is a single ticket?","What time does the train leave?","The train arrives at ten thirty.","Which platform does it leave from?","The journey takes forty minutes.","I take the underground to the city centre."],
  "020":["Hello, I have a reservation.","I have a double room for two nights.","Is breakfast included?","What time is check-out?","Can I have the room key, please?","There is a shower in the bathroom.","The hotel has a lift.","Can I have another towel, please?","The room is available now.","Where is the reception?"],
  "017":["What do you do in your free time?","I like listening to music.","She loves reading books.","He doesn't like cooking.","Do you like dancing?","Yes, I do. I love it.","Does Nina enjoy taking photos?","They like meeting their friends.","My favourite hobby is cycling.","We sometimes play games together."],
  "016":["I am wearing a blue shirt.","She wears black shoes.","He is wearing a red jacket.","What colour is your T-shirt?","I need a new pair of jeans.","This dress is white.","Do you have this skirt in black?","What size do you need?","I like your trainers.","The coat is too big."],
  "021":["Where is the check-in desk?","Here is my passport and boarding pass.","I have one suitcase and a small bag.","Can I take this bag on the plane?","Which gate is the flight to Madrid?","The flight leaves from Terminal 2.","Boarding starts at half past ten.","The flight is delayed by twenty minutes.","Where is the baggage claim?","Can you help me find my gate?"],
  "023":["What's the matter?","I have a headache.","My stomach hurts.","She has a sore throat.","I don't feel well today.","I have an appointment at ten.","The nurse is very kind.","Can you help me, please?","I feel better now.","My back hurts."],
  "015":["I can swim very well.","She can't play tennis.","Can you ride a bicycle?","My brother plays football on Saturdays.","We can speak two languages.","He can't run very fast.","Can they play basketball?","I like swimming in the sea.","You can use my sports equipment.","I can't come to training today."],
  "029":["What do you do?","I'm a teacher.","Where do you work?","I work at a school.","My sister is a doctor.","She works in a hospital.","He is a shop assistant.","He works in a small shop.","My father is a driver.","My mother works in an office."],
  "028":["I would like to borrow this book.","Where is the library, please?","Can I have a library card?","You can borrow three books.","I must return this book on Friday.","The library is open today.","What time does the library close?","This book is about animals.","I like reading adventure stories.","Thank you for your help."],
"030":["I study English on Monday and Wednesday.","I usually go swimming on Tuesday.","I visit my grandmother on Thursday.","I sometimes meet friends on Friday.","I always have lunch at one.","I never work on Sunday.","I play tennis once a week.","We go to the cinema twice a month.","What do you do at the weekend?","My week is busy but fun."]
"031":["I get up at seven every morning.","She has breakfast at home.","He goes to work by bus.","We go to school at eight.","I have lunch at one o'clock.","They go home after school.","He does his homework in the afternoon.","We have dinner at eight.","I go to bed at ten.","The children sleep at night."]
"032":["I drink tea in the morning.","She studies in the afternoon.","We watch television in the evening.","The baby sleeps at night.","I get up early.","He goes to bed late.","I wash my face before breakfast.","We play football after school.","The sun rises in the morning.","We have lunch at midday."]
"033":["What time is it?","It is seven o'clock.","It is half past eight.","It is quarter past nine.","It is quarter to ten.","The lesson starts at nine.","It is five minutes past three.","We meet at half past six.","The train leaves at noon.","I go to bed at midnight."]
"034":["Today is Monday.","My English class is on Tuesday.","We play tennis on Wednesday.","I visit my grandmother on Thursday.","Friday is my favourite day.","The shop is open on Saturday.","I relax on Sunday.","My birthday is in January.","February is a short month.","Her birthday is on the fifth of May."]

};
const mission026Reading = [
  { prompt:"Who is organising the birthday celebration?", answer:"Maya.", options:["Maya.","Oliver.","Maya's sister."] },
  { prompt:"Where is the party?", answer:"At Green Street Community Centre.", options:["At Green Street Community Centre.","At the library.","At Maya's house."] },
  { prompt:"What day is the party?", answer:"Saturday.", options:["Saturday.","Friday.","Sunday."] },
  { prompt:"What is the date?", answer:"14 June.", options:["14 June.","4 June.","14 July."] },
  { prompt:"What time does the party start?", answer:"At three o'clock.", options:["At three o'clock.","At two o'clock.","At four o'clock."] },
  { prompt:"Where is the community centre?", answer:"Opposite the library.", options:["Opposite the library.","Next to the station.","Behind the park."] },
  { prompt:"Why should guests arrive ten minutes early?", answer:"To decorate the room together.", options:["To decorate the room together.","To eat lunch.","To play football."] },
  { prompt:"Can Oliver come to the party?", answer:"Yes, he can.", options:["Yes, he can.","No, he can't.","He isn't sure."] },
  { prompt:"What does Maya ask Oliver to bring?", answer:"Some juice.", options:["Some juice.","A present.","Some balloons."] },
  { prompt:"How many candles are on the cake?", answer:"Fourteen.", options:["Fourteen.","Thirteen.","Fifteen."] }
];

const mission027Reading = [
  { prompt:"When does Ella go shopping?", answer:"On Saturday morning.", options:["On Saturday morning.","On Sunday afternoon.","On Friday evening."] },
  { prompt:"Where does Ella go?", answer:"Green Street Shop.", options:["Green Street Shop.","Green Street Library.","Green Street Market."] },
  { prompt:"How many notebooks does Ella need?", answer:"Two.", options:["Two.","One.","Three."] },
  { prompt:"What colour is the pen?", answer:"Blue.", options:["Blue.","Black.","Red."] },
  { prompt:"How much is each notebook?", answer:"Two pounds.", options:["Two pounds.","One pound.","Two pounds fifty."] },
  { prompt:"How much is the pen?", answer:"One pound fifty.", options:["One pound fifty.","Fifty pence.","Two pounds."] },
  { prompt:"How much is the bottle of water?", answer:"Eighty pence.", options:["Eighty pence.","Eighteen pence.","One pound."] },
  { prompt:"How does Ella pay?", answer:"By card.", options:["By card.","In cash.","By cheque."] },
  { prompt:"What does Ella ask the assistant for?", answer:"A receipt.", options:["A receipt.","A discount.","A bigger bag."] },
  { prompt:"What does Ella do before she leaves?", answer:"She checks her shopping list and says thank you.", options:["She checks her shopping list and says thank you.","She buys another notebook.","She returns the water."] }
];

const mission030Grammar = [
  {
    "prompt": "Choose the correct sentence.",
    "answer": "I usually study after work.",
    "options": [
      "I usually study after work.",
      "I study usually after work.",
      "I usually studies after work."
    ]
  },
  {
    "prompt": "Complete: She ___ goes swimming on Tuesday.",
    "answer": "usually",
    "options": [
      "usually",
      "usual",
      "use"
    ]
  },
  {
    "prompt": "Choose the correct position with to be.",
    "answer": "He is never late.",
    "options": [
      "He is never late.",
      "He never is late.",
      "Never he is late."
    ]
  },
  {
    "prompt": "Complete: We ___ visit friends on Friday.",
    "answer": "sometimes",
    "options": [
      "sometimes",
      "sometime",
      "some times"
    ]
  },
  {
    "prompt": "Which phrase means una vez por semana?",
    "answer": "once a week",
    "options": [
      "once a week",
      "twice a week",
      "every day"
    ]
  },
  {
    "prompt": "Complete: I play tennis ___ a week.",
    "answer": "twice",
    "options": [
      "twice",
      "two",
      "second"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "They always have lunch together.",
    "options": [
      "They always have lunch together.",
      "They have always lunch together.",
      "They always has lunch together."
    ]
  },
  {
    "prompt": "Which adverb means nunca?",
    "answer": "never",
    "options": [
      "never",
      "usually",
      "sometimes"
    ]
  },
  {
    "prompt": "Complete: He ___ works on Sundays.",
    "answer": "never",
    "options": [
      "never",
      "always",
      "usually"
    ]
  },
  {
    "prompt": "Choose the correct question.",
    "answer": "What is your schedule this week?",
    "options": [
      "What is your schedule this week?",
      "What your schedule is this week?",
      "What does your schedule this week?"
    ]
  }
];

const mission031Grammar = [
  {
    "prompt": "Complete: I ___ up at seven.",
    "answer": "get",
    "options": [
      "get",
      "gets",
      "getting"
    ]
  },
  {
    "prompt": "Choose the correct third-person form.",
    "answer": "She has breakfast at home.",
    "options": [
      "She has breakfast at home.",
      "She have breakfast at home.",
      "She haves breakfast at home."
    ]
  },
  {
    "prompt": "Complete: He ___ to work by bus.",
    "answer": "goes",
    "options": [
      "goes",
      "go",
      "going"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "We go to school in the morning.",
    "options": [
      "We go to school in the morning.",
      "We goes to school in the morning.",
      "We going to school in the morning."
    ]
  },
  {
    "prompt": "Complete: He ___ his homework after school.",
    "answer": "does",
    "options": [
      "does",
      "do",
      "doing"
    ]
  },
  {
    "prompt": "Choose the correct phrase.",
    "answer": "have lunch",
    "options": [
      "have lunch",
      "has lunch I",
      "do lunch"
    ]
  },
  {
    "prompt": "Complete: They ___ home after school.",
    "answer": "go",
    "options": [
      "go",
      "goes",
      "going"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "I go to bed at ten.",
    "options": [
      "I go to bed at ten.",
      "I goes to bed at ten.",
      "I going to bed at ten."
    ]
  },
  {
    "prompt": "Complete: The children ___ at night.",
    "answer": "sleep",
    "options": [
      "sleep",
      "sleeps",
      "sleeping"
    ]
  },
  {
    "prompt": "Choose the correct question.",
    "answer": "What time do you get up?",
    "options": [
      "What time do you get up?",
      "What time you get up?",
      "What time does you get up?"
    ]
  }
];

const mission032Grammar = [
  {
    "prompt": "Complete: I drink tea ___ the morning.",
    "answer": "in",
    "options": [
      "in",
      "at",
      "on"
    ]
  },
  {
    "prompt": "Complete: The baby sleeps ___ night.",
    "answer": "at",
    "options": [
      "at",
      "in",
      "on"
    ]
  },
  {
    "prompt": "Choose the correct phrase.",
    "answer": "in the afternoon",
    "options": [
      "in the afternoon",
      "at the afternoon",
      "on the afternoon"
    ]
  },
  {
    "prompt": "Complete: We have lunch ___ midday.",
    "answer": "at",
    "options": [
      "at",
      "in",
      "on"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "She studies in the evening.",
    "options": [
      "She studies in the evening.",
      "She studies at the evening.",
      "She studies on the evening."
    ]
  },
  {
    "prompt": "Complete: I wash my face ___ breakfast.",
    "answer": "before",
    "options": [
      "before",
      "after",
      "late"
    ]
  },
  {
    "prompt": "Complete: We play football ___ school.",
    "answer": "after",
    "options": [
      "after",
      "before",
      "early"
    ]
  },
  {
    "prompt": "Which word means amanecer?",
    "answer": "sunrise",
    "options": [
      "sunrise",
      "midday",
      "night"
    ]
  },
  {
    "prompt": "Choose the natural sentence.",
    "answer": "I get up early.",
    "options": [
      "I get up early.",
      "I get up in early.",
      "I get early up."
    ]
  },
  {
    "prompt": "Choose the correct phrase.",
    "answer": "at night",
    "options": [
      "at night",
      "in night",
      "on night"
    ]
  }
];

const mission033Grammar = [
  {
    "prompt": "Choose the correct time.",
    "answer": "It is seven o'clock.",
    "options": [
      "It is seven o'clock.",
      "It is seven hour.",
      "It seven o'clock."
    ]
  },
  {
    "prompt": "What time is 8:30?",
    "answer": "Half past eight.",
    "options": [
      "Half past eight.",
      "Quarter past eight.",
      "Quarter to eight."
    ]
  },
  {
    "prompt": "What time is 9:15?",
    "answer": "Quarter past nine.",
    "options": [
      "Quarter past nine.",
      "Quarter to nine.",
      "Half past nine."
    ]
  },
  {
    "prompt": "What time is 9:45?",
    "answer": "Quarter to ten.",
    "options": [
      "Quarter to ten.",
      "Quarter past nine.",
      "Half past ten."
    ]
  },
  {
    "prompt": "Complete: The lesson starts ___ nine.",
    "answer": "at",
    "options": [
      "at",
      "in",
      "on"
    ]
  },
  {
    "prompt": "What time is 3:05?",
    "answer": "Five minutes past three.",
    "options": [
      "Five minutes past three.",
      "Five minutes to three.",
      "Quarter past three."
    ]
  },
  {
    "prompt": "Choose the correct question.",
    "answer": "What time is it?",
    "options": [
      "What time is it?",
      "What time it is?",
      "What is time it?"
    ]
  },
  {
    "prompt": "Complete: We meet ___ half past six.",
    "answer": "at",
    "options": [
      "at",
      "in",
      "on"
    ]
  },
  {
    "prompt": "Which word means mediodía?",
    "answer": "noon",
    "options": [
      "noon",
      "midnight",
      "minute"
    ]
  },
  {
    "prompt": "Which word means medianoche?",
    "answer": "midnight",
    "options": [
      "midnight",
      "noon",
      "hour"
    ]
  }
];

const mission034Grammar = [
  {
    "prompt": "Complete: My class is ___ Tuesday.",
    "answer": "on",
    "options": [
      "on",
      "in",
      "at"
    ]
  },
  {
    "prompt": "Complete: My birthday is ___ January.",
    "answer": "in",
    "options": [
      "in",
      "on",
      "at"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "We play tennis on Wednesday.",
    "options": [
      "We play tennis on Wednesday.",
      "We play tennis in Wednesday.",
      "We play tennis at Wednesday."
    ]
  },
  {
    "prompt": "Choose the correct phrase.",
    "answer": "in February",
    "options": [
      "in February",
      "on February",
      "at February"
    ]
  },
  {
    "prompt": "Complete: The shop is open ___ Saturday.",
    "answer": "on",
    "options": [
      "on",
      "in",
      "at"
    ]
  },
  {
    "prompt": "Choose the correct question.",
    "answer": "When is your birthday?",
    "options": [
      "When is your birthday?",
      "When your birthday is?",
      "When does your birthday?"
    ]
  },
  {
    "prompt": "Complete: Her birthday is ___ the fifth of May.",
    "answer": "on",
    "options": [
      "on",
      "in",
      "at"
    ]
  },
  {
    "prompt": "Which month comes after January?",
    "answer": "February",
    "options": [
      "February",
      "Monday",
      "Sunday"
    ]
  },
  {
    "prompt": "Which word means cumpleaños?",
    "answer": "birthday",
    "options": [
      "birthday",
      "month",
      "week"
    ]
  },
  {
    "prompt": "Choose the correct sentence.",
    "answer": "Today is Monday.",
    "options": [
      "Today is Monday.",
      "Today are Monday.",
      "Today Monday is."
    ]
  }
];

const mission030Reading = [
  {
    "prompt": "What does Alex do on Monday and Wednesday?",
    "answer": "He studies English after work.",
    "options": [
      "He studies English after work.",
      "He goes swimming.",
      "He visits his grandmother."
    ]
  },
  {
    "prompt": "When does Alex usually go swimming?",
    "answer": "On Tuesday.",
    "options": [
      "On Tuesday.",
      "On Thursday.",
      "On Sunday."
    ]
  },
  {
    "prompt": "Who does Alex visit on Thursday?",
    "answer": "His grandmother.",
    "options": [
      "His grandmother.",
      "His teacher.",
      "His friend."
    ]
  },
  {
    "prompt": "When does he sometimes meet friends?",
    "answer": "On Friday evening.",
    "options": [
      "On Friday evening.",
      "On Monday morning.",
      "On Saturday afternoon."
    ]
  },
  {
    "prompt": "What time does he always have lunch?",
    "answer": "At one o'clock.",
    "options": [
      "At one o'clock.",
      "At twelve o'clock.",
      "At two o'clock."
    ]
  },
  {
    "prompt": "How often does he play tennis?",
    "answer": "Once a week.",
    "options": [
      "Once a week.",
      "Twice a week.",
      "Every day."
    ]
  },
  {
    "prompt": "How often does he visit the cinema?",
    "answer": "Twice a month.",
    "options": [
      "Twice a month.",
      "Once a month.",
      "Every Friday."
    ]
  },
  {
    "prompt": "What does he do at the weekend?",
    "answer": "He relaxes.",
    "options": [
      "He relaxes.",
      "He works.",
      "He studies English."
    ]
  },
  {
    "prompt": "Does Alex work on Sunday?",
    "answer": "No, he never works on Sunday.",
    "options": [
      "No, he never works on Sunday.",
      "Yes, he works all day.",
      "The text doesn't say."
    ]
  },
  {
    "prompt": "What is the text about?",
    "answer": "Alex's weekly routine.",
    "options": [
      "Alex's weekly routine.",
      "Alex's holiday.",
      "Alex's new job."
    ]
  }
];

const mission031Reading = [
  {
    "prompt": "What time does Leo get up?",
    "answer": "At seven.",
    "options": [
      "At seven.",
      "At half past seven.",
      "At eight."
    ]
  },
  {
    "prompt": "Who does Leo have breakfast with?",
    "answer": "His family.",
    "options": [
      "His family.",
      "His friends.",
      "His teacher."
    ]
  },
  {
    "prompt": "What time does he have breakfast?",
    "answer": "At half past seven.",
    "options": [
      "At half past seven.",
      "At seven.",
      "At eight."
    ]
  },
  {
    "prompt": "How does Leo go to school?",
    "answer": "By bus.",
    "options": [
      "By bus.",
      "By car.",
      "On foot."
    ]
  },
  {
    "prompt": "What time does he go to school?",
    "answer": "At eight.",
    "options": [
      "At eight.",
      "At seven.",
      "At nine."
    ]
  },
  {
    "prompt": "What time does he have lunch?",
    "answer": "At one o'clock.",
    "options": [
      "At one o'clock.",
      "At twelve o'clock.",
      "At two o'clock."
    ]
  },
  {
    "prompt": "What does he do after school?",
    "answer": "He goes home and does his homework.",
    "options": [
      "He goes home and does his homework.",
      "He goes swimming.",
      "He visits his grandmother."
    ]
  },
  {
    "prompt": "What does Leo do at six?",
    "answer": "He plays football with his friends.",
    "options": [
      "He plays football with his friends.",
      "He watches television.",
      "He has dinner."
    ]
  },
  {
    "prompt": "What time does he go to bed?",
    "answer": "At ten.",
    "options": [
      "At ten.",
      "At eight.",
      "At eleven."
    ]
  },
  {
    "prompt": "Why does Leo sleep well?",
    "answer": "Because he has a busy day.",
    "options": [
      "Because he has a busy day.",
      "Because he gets up late.",
      "Because he does not go to school."
    ]
  }
];

const mission032Reading = [
  {
    "prompt": "What does Anna drink in the morning?",
    "answer": "Tea.",
    "options": [
      "Tea.",
      "Coffee.",
      "Milk."
    ]
  },
  {
    "prompt": "When does the family have lunch?",
    "answer": "At midday.",
    "options": [
      "At midday.",
      "In the evening.",
      "At sunrise."
    ]
  },
  {
    "prompt": "What do the children do after school?",
    "answer": "They play.",
    "options": [
      "They play.",
      "They sleep.",
      "They watch a film."
    ]
  },
  {
    "prompt": "What does Anna do in the afternoon?",
    "answer": "She works.",
    "options": [
      "She works.",
      "She goes swimming.",
      "She visits her friends."
    ]
  },
  {
    "prompt": "What does the family do in the evening?",
    "answer": "They watch television together.",
    "options": [
      "They watch television together.",
      "They have breakfast.",
      "They go to school."
    ]
  },
  {
    "prompt": "What do the children do before bed?",
    "answer": "They wash their faces and read a story.",
    "options": [
      "They wash their faces and read a story.",
      "They play football.",
      "They have lunch."
    ]
  },
  {
    "prompt": "When does everyone sleep?",
    "answer": "At night.",
    "options": [
      "At night.",
      "At midday.",
      "In the afternoon."
    ]
  },
  {
    "prompt": "Who gets ready for school in the morning?",
    "answer": "Anna's son.",
    "options": [
      "Anna's son.",
      "Anna's husband.",
      "The neighbours."
    ]
  },
  {
    "prompt": "When do the children play?",
    "answer": "After school.",
    "options": [
      "After school.",
      "Before breakfast.",
      "At midnight."
    ]
  },
  {
    "prompt": "What is the text about?",
    "answer": "The Green family's day.",
    "options": [
      "The Green family's day.",
      "A family holiday.",
      "A school timetable."
    ]
  }
];

const mission033Reading = [
  {
    "prompt": "What time does the English lesson start?",
    "answer": "At nine o'clock.",
    "options": [
      "At nine o'clock.",
      "At ten o'clock.",
      "At half past nine."
    ]
  },
  {
    "prompt": "When does the art class start?",
    "answer": "At half past ten.",
    "options": [
      "At half past ten.",
      "At quarter past ten.",
      "At eleven."
    ]
  },
  {
    "prompt": "What time does the café open for lunch?",
    "answer": "At quarter past twelve.",
    "options": [
      "At quarter past twelve.",
      "At twelve o'clock.",
      "At quarter to twelve."
    ]
  },
  {
    "prompt": "When does the music lesson begin?",
    "answer": "At quarter to two.",
    "options": [
      "At quarter to two.",
      "At quarter past two.",
      "At half past two."
    ]
  },
  {
    "prompt": "What time does the last class finish?",
    "answer": "At four o'clock.",
    "options": [
      "At four o'clock.",
      "At five o'clock.",
      "At three o'clock."
    ]
  },
  {
    "prompt": "What time does the centre close?",
    "answer": "At five.",
    "options": [
      "At five.",
      "At four.",
      "At six."
    ]
  },
  {
    "prompt": "What starts at half past six on Friday?",
    "answer": "A film.",
    "options": [
      "A film.",
      "An English lesson.",
      "A music lesson."
    ]
  },
  {
    "prompt": "Where is the timetable?",
    "answer": "At Green Town Community Centre.",
    "options": [
      "At Green Town Community Centre.",
      "At the train station.",
      "At the school library."
    ]
  },
  {
    "prompt": "Which activity starts first?",
    "answer": "The English lesson.",
    "options": [
      "The English lesson.",
      "The art class.",
      "The music lesson."
    ]
  },
  {
    "prompt": "What is the text about?",
    "answer": "A community centre timetable.",
    "options": [
      "A community centre timetable.",
      "A family routine.",
      "A birthday calendar."
    ]
  }
];

const mission034Reading = [
  {
    "prompt": "What day is it today in the text?",
    "answer": "Monday.",
    "options": [
      "Monday.",
      "Tuesday.",
      "Friday."
    ]
  },
  {
    "prompt": "When is Mia's English class?",
    "answer": "On Tuesday.",
    "options": [
      "On Tuesday.",
      "On Monday.",
      "On Wednesday."
    ]
  },
  {
    "prompt": "What does Mia do on Wednesday?",
    "answer": "She plays tennis.",
    "options": [
      "She plays tennis.",
      "She visits her grandmother.",
      "She meets her friends."
    ]
  },
  {
    "prompt": "Who does Mia visit on Thursday?",
    "answer": "Her grandmother.",
    "options": [
      "Her grandmother.",
      "Her teacher.",
      "Her friend Lily."
    ]
  },
  {
    "prompt": "Why is Friday her favourite day?",
    "answer": "Because she meets her friends.",
    "options": [
      "Because she meets her friends.",
      "Because she has English class.",
      "Because the shop is open."
    ]
  },
  {
    "prompt": "When is the shop open?",
    "answer": "On Saturday.",
    "options": [
      "On Saturday.",
      "On Sunday.",
      "On Monday."
    ]
  },
  {
    "prompt": "What does Mia do on Sunday?",
    "answer": "She relaxes.",
    "options": [
      "She relaxes.",
      "She plays tennis.",
      "She goes to school."
    ]
  },
  {
    "prompt": "When is Mia's birthday?",
    "answer": "In January.",
    "options": [
      "In January.",
      "In February.",
      "In May."
    ]
  },
  {
    "prompt": "When is her brother's birthday?",
    "answer": "In February.",
    "options": [
      "In February.",
      "In January.",
      "In June."
    ]
  },
  {
    "prompt": "When is Lily's birthday?",
    "answer": "On the fifth of May.",
    "options": [
      "On the fifth of May.",
      "On the fifth of January.",
      "On the fifteenth of May."
    ]
  }
];

const mission029Reading = [
  { prompt:"Where does Emma work?", answer:"At Green Town School.", options:["At Green Town School.","At Green Street Hospital.","In a small shop."] },
  { prompt:"What is Emma's job?", answer:"She is a teacher.", options:["She is a teacher.","She is a doctor.","She is a driver."] },
  { prompt:"What time does Emma start work?", answer:"At eight o'clock.", options:["At eight o'clock.","At nine o'clock.","At seven o'clock."] },
  { prompt:"Where does Daniel work?", answer:"At Green Street Hospital.", options:["At Green Street Hospital.","At Green Town School.","At a restaurant."] },
  { prompt:"What is Daniel's job?", answer:"He is a doctor.", options:["He is a doctor.","He is a cook.","He is a farmer."] },
  { prompt:"Who works with Daniel?", answer:"Rosa.", options:["Rosa.","Emma.","Leo."] },
  { prompt:"Where does Rosa work?", answer:"At the hospital.", options:["At the hospital.","At the school.","At the shop."] },
  { prompt:"What is Leo's job?", answer:"He is a shop assistant.", options:["He is a shop assistant.","He is a teacher.","He is a nurse."] },
  { prompt:"What does Leo do in the shop?", answer:"He talks to customers and helps them find things.", options:["He talks to customers and helps them find things.","He teaches English.","He helps doctors."] },
  { prompt:"When do the friends meet at a café?", answer:"On Saturday.", options:["On Saturday.","On Monday.","On Friday."] }
];

const mission028Reading = [
  { prompt:"When does Noah visit the library?", answer:"On Tuesday afternoon.", options:["On Tuesday afternoon.","On Monday morning.","On Friday evening."] },
  { prompt:"Who goes with Noah?", answer:"Mia.", options:["Mia.","His brother.","His teacher."] },
  { prompt:"What kind of book does Noah want?", answer:"A book about animals.", options:["A book about animals.","A cookery book.","A history book."] },
  { prompt:"Why does Noah fill in a form?", answer:"He does not have a library card.", options:["He does not have a library card.","He wants to work there.","He wants to buy a book."] },
  { prompt:"How many books can he borrow?", answer:"Three.", options:["Three.","Two.","Five."] },
  { prompt:"How long can he borrow the books for?", answer:"Two weeks.", options:["Two weeks.","One week.","Three weeks."] },
  { prompt:"Which two books does Noah choose?", answer:"A book about wild animals and a story about a friendly dog.", options:["A book about wild animals and a story about a friendly dog.","Two adventure comics.","A book about cooking and a map."] },
  { prompt:"When must he return the books?", answer:"By Friday, 12 September.", options:["By Friday, 12 September.","By Tuesday, 12 September.","By Friday, 19 September."] },
  { prompt:"Where are the adventure books?", answer:"On the second floor.", options:["On the second floor.","Next to the entrance.","On the first floor."] },
  { prompt:"What time does the library close?", answer:"At six o'clock.", options:["At six o'clock.","At five o'clock.","At seven o'clock."] }
];

const mission023Grammar = [
  { prompt:"Complete: I ___ a headache.", answer:"have", options:["have","has","am"] },
  { prompt:"Complete: She ___ a sore throat.", answer:"has", options:["has","have","is"] },
  { prompt:"Choose the correct question.", answer:"What's the matter?", options:["What's the matter?","What matter is?","What's matter you?"] },
  { prompt:"Choose the correct sentence.", answer:"My stomach hurts.", options:["My stomach hurts.","My stomach hurt.","My stomach is hurt."] },
  { prompt:"Complete: I don't ___ well.", answer:"feel", options:["feel","feels","feeling"] },
  { prompt:"Which word means enfermera/o?", answer:"nurse", options:["nurse","patient","appointment"] },
  { prompt:"Choose the polite request.", answer:"Can you help me, please?", options:["Can you help me, please?","You can help me?","Do you can help me?"] },
  { prompt:"Complete: This is ___ appointment.", answer:"my", options:["my","I","me"] },
  { prompt:"Which phrase means dolor de garganta?", answer:"sore throat", options:["sore throat","headache","toothache"] },
  { prompt:"Choose the correct response to How do you feel?", answer:"I feel better, thank you.", options:["I feel better, thank you.","I am ten o'clock.","I have a nurse."] }
];
const mission023Reading = [
  { prompt:"Who visits the clinic?", answer:"Jamie.", options:["Jamie.","Alex.","Sam."] },
  { prompt:"What time is Jamie's appointment?", answer:"At ten o'clock.", options:["At ten o'clock.","At nine o'clock.","At eleven o'clock."] },
  { prompt:"What is the matter with Jamie?", answer:"A sore throat.", options:["A sore throat.","A headache.","A toothache."] },
  { prompt:"Who speaks to Jamie?", answer:"A nurse.", options:["A nurse.","A teacher.","A receptionist."] },
  { prompt:"Does Jamie feel well?", answer:"No, Jamie doesn't.", options:["No, Jamie doesn't.","Yes, Jamie does.","The text doesn't say."] },
  { prompt:"What does the nurse ask Jamie to do?", answer:"Sit down, please.", options:["Sit down, please.","Go to the airport.","Open the window."] },
  { prompt:"What does Jamie have?", answer:"A glass of water.", options:["A glass of water.","A cup of coffee.","A train ticket."] },
  { prompt:"How does Jamie feel at the end?", answer:"Better.", options:["Better.","Worse.","Hungry."] },
  { prompt:"Where does the conversation take place?", answer:"At a clinic.", options:["At a clinic.","At a hotel.","At a station."] },
  { prompt:"Are the people in the text real students?", answer:"No, they are fictional characters.", options:["No, they are fictional characters.","Yes, they are real patients.","The text doesn't say."] }
];
const mission021Grammar = [
  { prompt:"Where ___ the check-in desk?", answer:"is", options:["is","are","do"] },
  { prompt:"Choose the polite request.", answer:"Can I take this bag on the plane, please?", options:["Can I take this bag on the plane, please?","I can taking this bag?","Do I can take this bag?"] },
  { prompt:"I ___ one suitcase.", answer:"have", options:["have","has","am"] },
  { prompt:"The flight ___ from Terminal 2.", answer:"leaves", options:["leaves","leave","leaving"] },
  { prompt:"Choose the correct instruction.", answer:"Show your passport, please.", options:["Show your passport, please.","Showing your passport, please.","You showing passport."] },
  { prompt:"What does boarding pass mean?", answer:"Tarjeta de embarque.", options:["Tarjeta de embarque.","Pasaporte.","Maleta."] },
  { prompt:"The gate is ___ the café.", answer:"next to", options:["next to","at","on"] },
  { prompt:"Which word means retrasado?", answer:"delayed", options:["delayed","on time","arrival"] },
  { prompt:"___ I have a window seat, please?", answer:"Can", options:["Can","Do","Am"] },
  { prompt:"Choose the correct question.", answer:"Where does the flight leave from?", options:["Where does the flight leave from?","Where the flight does leave?","Where is the flight leave from?"] }
];
const mission021Reading = [
  { prompt:"Which city is the flight going to?", answer:"Madrid.", options:["Madrid.","London.","Rome."] },
  { prompt:"Which terminal does the flight leave from?", answer:"Terminal 2.", options:["Terminal 2.","Terminal 1.","Terminal 3."] },
  { prompt:"What time does boarding start?", answer:"At 10:30.", options:["At 10:30.","At 10:00.","At 11:30."] },
  { prompt:"Which gate is shown on the boarding pass?", answer:"Gate 14.", options:["Gate 14.","Gate 4.","Gate 40."] },
  { prompt:"How many suitcases does Alex have?", answer:"One.", options:["One.","Two.","Three."] },
  { prompt:"What does Alex have in his hand luggage?", answer:"A book and a phone.", options:["A book and a phone.","A laptop and a camera.","A passport and a ticket."] },
  { prompt:"Is the flight on time?", answer:"No, it is delayed.", options:["No, it is delayed.","Yes, it is on time.","The text doesn't say."] },
  { prompt:"Where does Alex go after security?", answer:"To gate 14.", options:["To gate 14.","To baggage claim.","To the check-in desk."] },
  { prompt:"What document does he show?", answer:"His passport.", options:["His passport.","His driving licence.","His hotel key."] },
  { prompt:"What is the main topic of the text?", answer:"Getting ready to fly.", options:["Getting ready to fly.","Checking into a hotel.","Taking a train."] }
];
const mission020Grammar = [
  { prompt:"Complete: The hotel ___ a lift.", answer:"has", options:["has","have","is"] },
  { prompt:"Choose the correct sentence.", answer:"There is a shower in the bathroom.", options:["There is a shower in the bathroom.","There are a shower in the bathroom.","It have a shower in the bathroom."] },
  { prompt:"Complete: I ___ a reservation.", answer:"have", options:["have","has","am"] },
  { prompt:"Choose the polite request.", answer:"Can I have a towel, please?", options:["Can I have a towel, please?","I have towel now.","Do I having a towel?"] },
  { prompt:"Complete: ___ breakfast included?", answer:"Is", options:["Is","Are","Do"] },
  { prompt:"What does single room mean?", answer:"A room for one person.", options:["A room for one person.","A room for two people.","A room with two beds only."] },
  { prompt:"Complete: How many ___ are you staying?", answer:"nights", options:["nights","keys","showers"] },
  { prompt:"Choose the correct question.", answer:"What time is check-out?", options:["What time is check-out?","What time check-out are?","When does check-out is?"] },
  { prompt:"Choose the correct plural form.", answer:"There are two towels.", options:["There are two towels.","There is two towels.","There are two towel."] },
  { prompt:"Which phrase means registrarse en el hotel?", answer:"check in", options:["check in","check out","lift"] }
];
const mission020Reading = [
  { prompt:"Which hotel does Sam visit?", answer:"The Green Park Hotel.", options:["The Green Park Hotel.","The City Hotel.","The River Hotel."] },
  { prompt:"What type of room does he book?", answer:"A double room.", options:["A double room.","A single room.","A family room."] },
  { prompt:"How many nights does he stay?", answer:"Two nights.", options:["Two nights.","One night.","Three nights."] },
  { prompt:"What does the receptionist give Sam?", answer:"A key.", options:["A key.","A towel.","A ticket."] },
  { prompt:"Is breakfast included?", answer:"Yes, it is.", options:["Yes, it is.","No, it isn't.","The text doesn't say."] },
  { prompt:"When is breakfast?", answer:"From 7:00 to 9:30.", options:["From 7:00 to 9:30.","From 9:30 to 11:00.","From 6:00 to 7:00."] },
  { prompt:"What is in the bathroom?", answer:"A shower.", options:["A shower.","A lift.","A reception desk."] },
  { prompt:"What does the hotel have?", answer:"A lift.", options:["A lift.","A swimming pool.","A restaurant on the roof."] },
  { prompt:"What does Sam ask for?", answer:"Another towel.", options:["Another towel.","A new room.","A taxi."] },
  { prompt:"What time is check-out?", answer:"At 11:00.", options:["At 11:00.","At 9:30.","At 7:00."] }
];
const mission019Grammar = [
  { prompt:"Complete: I go to work ___ bus.", answer:"by", options:["by","on","at"] },
  { prompt:"Choose the natural phrase.", answer:"by train", options:["by train","in train","on train"] },
  { prompt:"Complete: We ___ the bus to school.", answer:"take", options:["take","go","make"] },
  { prompt:"Choose the correct question about transport.", answer:"How do you get to the station?", options:["How do you get to the station?","How you get to the station?","How are you get to the station?"] },
  { prompt:"Complete: What time ___ the train leave?", answer:"does", options:["does","do","is"] },
  { prompt:"What is a return ticket?", answer:"A ticket to go and come back.", options:["A ticket to go and come back.","A ticket for one journey only.","A timetable at the station."] },
  { prompt:"Choose the correct verb.", answer:"The train arrives at ten.", options:["The train arrives at ten.","The train arrive at ten.","The train arriving at ten."] },
  { prompt:"Complete: Which ___ does the train leave from?", answer:"platform", options:["platform","ticket","journey"] },
  { prompt:"Choose the correct question about price.", answer:"How much is a single ticket?", options:["How much is a single ticket?","How many is a single ticket?","How much a single ticket is?"] },
  { prompt:"Choose the natural phrase.", answer:"take the underground", options:["take the underground","go the underground","by the underground"] }
];
const mission019Reading = [
  { prompt:"Where is Alex travelling to?", answer:"Cambridge.", options:["Cambridge.","Oxford.","Manchester."] },
  { prompt:"How does Alex travel?", answer:"By train.", options:["By train.","By bus.","By plane."] },
  { prompt:"What type of ticket does he buy?", answer:"A return ticket.", options:["A return ticket.","A single ticket.","A bus pass."] },
  { prompt:"What time does the train leave?", answer:"At 9:15.", options:["At 9:15.","At 10:05.","At 16:30."] },
  { prompt:"Which platform does the train leave from?", answer:"Platform 4.", options:["Platform 4.","Platform 2.","Platform 5."] },
  { prompt:"What time does the train arrive?", answer:"At 10:05.", options:["At 10:05.","At 9:15.","At 16:30."] },
  { prompt:"How long is the journey?", answer:"Fifty minutes.", options:["Fifty minutes.","Forty minutes.","One hour."] },
  { prompt:"What does Alex check?", answer:"The timetable.", options:["The timetable.","A town map.","A shopping list."] },
  { prompt:"What time is the return train?", answer:"At 16:30.", options:["At 16:30.","At 9:15.","At 10:05."] },
  { prompt:"Why does Alex like travelling by train?", answer:"It is easy and comfortable.", options:["It is easy and comfortable.","It is very expensive.","It is very slow."] }
];
const mission018Grammar = [
  { prompt:"Choose the correct question.", answer:"Where is the station?", options:["Where is the station?","Where the station is?","Where are the station?"] },
  { prompt:"Complete: The bank is ___ the supermarket.", answer:"next to", options:["next to","turn left","go straight"] },
  { prompt:"Choose the correct instruction.", answer:"Turn left at the square.", options:["Turn left at the square.","Turns left at the square.","Turning left at the square."] },
  { prompt:"Complete: ___ a park near my house.", answer:"There is", options:["There is","There are","It are"] },
  { prompt:"Choose the correct phrase for moving forward.", answer:"Go straight.", options:["Go straight.","Go opposite.","Go between."] },
  { prompt:"Complete: The post office is ___ the bank and the station.", answer:"between", options:["between","opposite to","turn"] },
  { prompt:"Choose the correct question.", answer:"Where are the bus stops?", options:["Where are the bus stops?","Where is the bus stops?","Where the bus stops are?"] },
  { prompt:"What does opposite mean?", answer:"Enfrente de.", options:["Enfrente de.","Al lado de.","A la derecha."] },
  { prompt:"Complete: Turn right ___ the traffic lights.", answer:"at", options:["at","on","between"] },
  { prompt:"Choose the natural polite opening.", answer:"Excuse me, where is the station?", options:["Excuse me, where is the station?","Tell me station now.","Where station you?"] }
];
const mission018Reading = [
  { prompt:"Where does the visitor want to go first?", answer:"The station.", options:["The station.","The hospital.","The supermarket."] },
  { prompt:"What is next to the supermarket?", answer:"The bank.", options:["The bank.","The park.","The post office."] },
  { prompt:"Where is the park?", answer:"Opposite the hospital.", options:["Opposite the hospital.","Next to the station.","Between two shops."] },
  { prompt:"What should the visitor do at the square?", answer:"Turn left.", options:["Turn left.","Turn right.","Stop and wait."] },
  { prompt:"Is the post office far from the square?", answer:"No, it is near the square.", options:["No, it is near the square.","Yes, it is outside the town.","The text doesn't say."] },
  { prompt:"Which place is between the bank and the park?", answer:"The station.", options:["The station.","The hospital.","The bus stop."] },
  { prompt:"Where should the visitor go straight?", answer:"Along King Street.", options:["Along King Street.","Through the hospital.","Behind the supermarket."] },
  { prompt:"Which place is opposite the park?", answer:"The hospital.", options:["The hospital.","The bank.","The station."] },
  { prompt:"What does the visitor use to find the places?", answer:"A town map.", options:["A town map.","A shopping list.","A bus ticket."] },
  { prompt:"What is the main topic?", answer:"Places in town and directions.", options:["Places in town and directions.","Hobbies and free time.","Clothes and colours."] }
];
const mission017Grammar = [
  { prompt:"Choose the correct sentence.", answer:"I like reading.", options:["I like reading.","I likes reading.","I like read."] },
  { prompt:"Complete: She ___ dancing.", answer:"likes", options:["likes","like","liking"] },
  { prompt:"Choose the correct negative.", answer:"I don't like cooking.", options:["I don't like cooking.","I doesn't like cooking.","I not like cooking."] },
  { prompt:"Choose the correct question.", answer:"Do you like music?", options:["Do you like music?","Are you like music?","Does you like music?"] },
  { prompt:"Complete: ___ he like taking photos?", answer:"Does", options:["Does","Do","Is"] },
  { prompt:"Choose the correct short answer.", answer:"Yes, I do.", options:["Yes, I do.","Yes, I like.","Yes, I am."] },
  { prompt:"Complete: They ___ meeting friends.", answer:"love", options:["love","loves","loving"] },
  { prompt:"Which form follows like in this lesson?", answer:"verb + -ing", options:["verb + -ing","verb + -s only","past form"] },
  { prompt:"Choose the correct sentence.", answer:"He doesn't like watching TV.", options:["He doesn't like watching TV.","He don't like watching TV.","He doesn't likes watching TV."] },
  { prompt:"Complete: What ___ you like doing?", answer:"do", options:["do","does","are"] }
];
const mission017Reading = [
  { prompt:"What does Alex like doing?", answer:"Listening to music and cycling.", options:["Listening to music and cycling.","Cooking and dancing.","Taking photos and swimming."] },
  { prompt:"Does Alex like cooking?", answer:"No, he doesn't.", options:["No, he doesn't.","Yes, he does.","The text doesn't say."] },
  { prompt:"What is Nina's favourite hobby?", answer:"Taking photos.", options:["Taking photos.","Reading books.","Playing football."] },
  { prompt:"Does Nina enjoy reading?", answer:"Yes, she does.", options:["Yes, she does.","No, she doesn't.","The text doesn't say."] },
  { prompt:"When do Alex and Nina meet?", answer:"At the weekend.", options:["At the weekend.","Every morning.","After every lesson."] },
  { prompt:"What do they sometimes do together?", answer:"Play games.", options:["Play games.","Cook dinner.","Watch a film at school."] },
  { prompt:"Who likes dancing?", answer:"Nina.", options:["Nina.","Alex.","Both of them."] },
  { prompt:"Which activity does Alex dislike?", answer:"Cooking.", options:["Cooking.","Cycling.","Listening to music."] },
  { prompt:"What do they have in common?", answer:"They both like music.", options:["They both like music.","They both like cooking.","They both dislike reading."] },
  { prompt:"What is the text mainly about?", answer:"Free-time activities and hobbies.", options:["Free-time activities and hobbies.","Clothes and colours.","A visit to a café."] }
];
const mission016Grammar = [
  { prompt:"Choose the correct word order.", answer:"a blue shirt", options:["a blue shirt","a shirt blue","blue a shirt"] },
  { prompt:"Complete: She ___ black shoes.", answer:"wears", options:["wears","wear","wearing"] },
  { prompt:"Choose the correct sentence.", answer:"I'm wearing a red jacket.", options:["I'm wearing a red jacket.","I wearing a red jacket.","I am wear a red jacket."] },
  { prompt:"Choose the correct question about colour.", answer:"What colour is it?", options:["What colour is it?","What is colour it?","Which colour it is?"] },
  { prompt:"Complete: He ___ a white T-shirt.", answer:"is wearing", options:["is wearing","wear","wears wearing"] },
  { prompt:"Choose the correct phrase.", answer:"black trousers", options:["black trousers","trousers black","the black trouserses"] },
  { prompt:"Complete: What size ___ you need?", answer:"do", options:["do","are","does"] },
  { prompt:"Choose the correct sentence.", answer:"I wear jeans every day.", options:["I wear jeans every day.","I wears jeans every day.","I am wear jeans every day."] },
  { prompt:"Which adjective comes first?", answer:"The colour", options:["The colour","The clothing noun","The size"] },
  { prompt:"Complete: This coat ___ too big.", answer:"is", options:["is","are","be"] }
];
const mission016Reading = [
  { prompt:"What is Mia wearing?", answer:"A blue T-shirt and black jeans.", options:["A blue T-shirt and black jeans.","A red dress and white shoes.","A green coat and blue trousers."] },
  { prompt:"What colour is Leo's jacket?", answer:"Red.", options:["Red.","Black.","White."] },
  { prompt:"What does Mia want to buy?", answer:"A new pair of trainers.", options:["A new pair of trainers.","A blue skirt.","A white shirt."] },
  { prompt:"What size does the shop assistant show her?", answer:"Size 38.", options:["Size 38.","Size 40.","Size 36."] },
  { prompt:"Are the first trainers too small?", answer:"Yes, they are.", options:["Yes, they are.","No, they aren't.","The text doesn't say."] },
  { prompt:"What colour trainers does Mia choose?", answer:"White.", options:["White.","Black.","Red."] },
  { prompt:"What is Leo wearing?", answer:"A red jacket and grey trousers.", options:["A red jacket and grey trousers.","A blue shirt and black jeans.","A white coat and a skirt."] },
  { prompt:"Where are Mia and Leo?", answer:"In a clothes shop.", options:["In a clothes shop.","At school.","In a café."] },
  { prompt:"Which item is plural?", answer:"Trainers.", options:["Trainers.","Jacket.","T-shirt."] },
  { prompt:"What is the main topic?", answer:"Clothes, colours and sizes.", options:["Clothes, colours and sizes.","Sports and abilities.","Food and drink."] }
];
const mission015Grammar = [
  { prompt:"Choose the correct sentence.", answer:"I can swim.", options:["I can swim.","I can to swim.","I cans swim."] },
  { prompt:"Complete: She ___ play tennis.", answer:"can't", options:["can't","don't","isn't"] },
  { prompt:"Choose the correct question.", answer:"Can you ride a bicycle?", options:["Can you ride a bicycle?","Do you can ride a bicycle?","Can ride you a bicycle?"] },
  { prompt:"Choose the short answer: Can Leo swim?", answer:"No, he can't.", options:["No, he can't.","No, he doesn't.","No, he isn't."] },
  { prompt:"Complete: Mia can ___ very well.", answer:"swim", options:["swim","swims","swimming"] },
  { prompt:"Choose the correct sentence about two people.", answer:"They can play basketball.", options:["They can play basketball.","They cans play basketball.","They can to play basketball."] },
  { prompt:"Which verb form follows can?", answer:"base form (play)", options:["base form (play)","plays","to play"] },
  { prompt:"Complete: He ___ run very fast.", answer:"can't", options:["can't","can to","doesn't can"] },
  { prompt:"Choose the natural expression.", answer:"play football", options:["play football","go football","do football"] },
  { prompt:"Choose the natural expression.", answer:"go swimming", options:["go swimming","play swimming","do swim"] }
];
const mission015Reading = [
  { prompt:"Which sports can Mia do?", answer:"Swimming and cycling.", options:["Swimming and cycling.","Tennis and football.","Basketball and running."] },
  { prompt:"Can Mia play tennis?", answer:"No, she can't.", options:["No, she can't.","Yes, she can.","The text doesn't say."] },
  { prompt:"Which sports can Leo play?", answer:"Football and basketball.", options:["Football and basketball.","Tennis and swimming.","Cycling and tennis."] },
  { prompt:"Can Leo swim?", answer:"No, he can't.", options:["No, he can't.","Yes, he can.","Only in summer."] },
  { prompt:"When do Mia and Leo practise?", answer:"After school.", options:["After school.","Before breakfast.","At the weekend."] },
  { prompt:"Who runs fast?", answer:"Leo.", options:["Leo.","Mia.","Both of them."] },
  { prompt:"What does Mia ask Leo to teach her?", answer:"Basketball.", options:["Basketball.","Tennis.","Swimming."] },
  { prompt:"Does Leo agree to help Mia?", answer:"Yes, he does.", options:["Yes, he does.","No, he doesn't.","The text doesn't say."] },
  { prompt:"Find the sentence that expresses inability.", answer:"Mia can't play tennis.", options:["Mia can't play tennis.","Mia can swim very well.","Leo can play football."] },
  { prompt:"What is the main topic of the text?", answer:"Sports and abilities.", options:["Sports and abilities.","School subjects.","Food and drink."] }
];
const passages: Record<string,string> = {
  "029":"Emma is a teacher at Green Town School. She starts work at eight o’clock and teaches English. Daniel is a doctor at Green Street Hospital. He helps people and works with a nurse called Rosa. Rosa works at the same hospital. Emma’s brother Leo is a shop assistant in a small shop. He talks to customers and helps them find things. The three friends enjoy their jobs. On Saturday, they meet at a café and talk about their week.",

  "003":"Ana is from Portugal. She is Portuguese and lives in Lisbon. She speaks Portuguese and English. Her friend Luca is from Italy. He is Italian and speaks Italian and English.",
  "004":"Laura Bennett is at the welcome desk. Her first name has five letters. She spells her surname B-E-N-N-E-T-T. The first letter is a capital B. There are double letters in her surname.",
  "005":"Emma Wilson is a student. She is twenty years old. Her English teacher is Mr Brown. Her class is on Monday. Her brother is sixteen. Her friends are from Spain and France.",
  "006":"Ben is thirty years old. His house number is thirty-five. His telephone number is 07123 456 890. His postcode has five numbers. He writes the numbers on a contact card.",
  "007":"Sara speaks Spanish and English. She can read simple texts in French, but she can't speak French very well. Her brother speaks German. They practise English every day.",
  "008":"Alex was born in Seville, but lives in Bristol now. He works in a small shop and studies English on Mondays. His favourite hobby is reading. In his free time, he plays tennis.",
  "009":"There are twelve students in our class. Our teacher is Anna. Tom is my classmate and Sara is my best friend. The new student is next to the window. We study English together.",
  "010":"Marta meets Luis on his first day of class. They introduce themselves. Marta is from Portugal and Luis is from Spain. They ask about age and languages. Luis asks Marta to repeat her name slowly.",
  "011":"Daniel wakes up at seven. He gets up and has breakfast at half past seven. He starts work at nine and finishes at five. He usually reads in the evening and sometimes watches TV at night.",
  "012":"Emma lives in a small flat. There are two bedrooms, one bathroom and a kitchen. The living room has a sofa and a table. The kitchen is next to the living room. There is a small garden.",
  "013":"Peter has bread and milk for breakfast. He eats rice, chicken and vegetables for lunch. His favourite fruit is an apple. He drinks water every day, but he doesn't like coffee.",
  "014":"Tom and Anna are at Green Café. Tom would like a sandwich and a cup of coffee. Anna orders soup and a glass of water. They read the menu and enjoy lunch. Tom asks for the bill.",
  "018":"Welcome to Green Town. The station is on King Street. Go straight from the square and turn left at the bank. The bank is next to the supermarket. The park is opposite the hospital, and the post office is near the square. The station is between the bank and the park. A visitor looks at the town map and asks for help. A local person gives simple directions and points to the places on the map.",
  "019":"Alex is travelling from London to Cambridge by train. He buys a return ticket at the station. His train leaves at 9:15 from platform 4 and arrives at 10:05. The journey takes fifty minutes. Alex checks the timetable and waits on the platform. On the way back, he can take the 16:30 train. He likes travelling by train because it is easy and comfortable.",
  "021":"Alex is at the airport. His flight to Madrid leaves from Terminal 2. His boarding pass shows gate 14 and boarding at 10:30. He has one suitcase and a small bag with a book and a phone. At security, he shows his passport and boarding pass. The departure screen says the flight is delayed by twenty minutes. Alex waits near gate 14 and listens for the next announcement.",
  "020":"Sam arrives at the Green Park Hotel. He has a reservation for a double room for two nights. At reception, the receptionist gives him a key and explains that breakfast is included. Breakfast is from 7:00 to 9:30. There is a shower in the bathroom and the hotel has a lift. Sam asks for another towel. Check-out is at 11:00.",
  "017":"Alex and Nina are friends. Alex likes listening to music and cycling, but he does not like cooking. Nina loves reading and taking photos. She also likes dancing. They meet at the weekend and sometimes play games together. Alex asks Nina, \"Do you like music?\" Nina says, \"Yes, I do. I love it!\" They enjoy sharing their hobbies.",
  "016":"Mia and Leo are in a clothes shop. Mia is wearing a blue T-shirt and black jeans. Leo is wearing a red jacket and grey trousers. Mia wants to buy new trainers. The shop assistant shows her size 38, but the first pair is too small. She tries size 40 and chooses white trainers. Leo says her new trainers look great.",
  "023":"Jamie has an appointment at the Green Street Clinic at ten o’clock. Jamie does not feel well and has a sore throat. A nurse asks, “What’s the matter?” Jamie says, “I have a sore throat.” The nurse says, “Please sit down.” Jamie drinks a glass of water and waits. After the appointment, Jamie feels better and says thank you.",
  "026":"Maya is planning a birthday celebration at Green Street Community Centre. She sends an invitation to her friend Oliver. The party is on Saturday, 14 June, at three o’clock. The centre is on Green Street, opposite the library. Maya asks her guests to arrive ten minutes early because they want to decorate the room together. Oliver sends a message to say he can come. He asks what he can bring, and Maya says, “Please bring some juice.” Maya’s sister is making a chocolate cake, and Maya is putting fourteen candles on it. There will be balloons, music and a small game. Oliver is happy to help. He writes, “Thank you for the invitation. See you on Saturday!”",
  "028":"On Tuesday afternoon, Noah visits Green Street Library with his friend Mia. He wants to borrow a book about animals. At the desk, the librarian asks for his library card. Noah does not have one, so he fills in a short form. The librarian gives him a card and explains the rules. He can borrow three books for two weeks. Noah chooses a book about wild animals and a story about a friendly dog. He must return both books by Friday, 12 September. Mia asks where the adventure books are, and the librarian shows her the second floor. The library closes at six o’clock. Noah says thank you and puts the books in his bag.",
  "027":"On Saturday morning, Ella visits Green Street Shop with a short shopping list. She needs two notebooks, a blue pen and a small bottle of water. The shop assistant shows her the notebooks. They are two pounds each. The pen is one pound fifty, and the water is eighty pence. Ella asks, “How much are these notebooks?” The assistant says, “They are four pounds.” Ella pays by card and asks for a receipt. She puts everything in a bag and checks the list. She has all the things she needs, so she says, “That’s all, thank you. Goodbye!”"
"030":"Alex has a busy week. On Monday and Wednesday, he studies English after work. He usually goes swimming on Tuesday. On Thursday, he visits his grandmother. He sometimes meets friends on Friday evening. He always has lunch at one o'clock. He plays tennis once a week and visits the cinema twice a month. At the weekend, he relaxes. He never works on Sunday."
"031":"Leo gets up at seven every morning. He has breakfast with his family at half past seven. He goes to school by bus at eight. He has lunch at one o'clock. After school, he goes home and does his homework. At six, he plays football with his friends. He has dinner at eight and goes to bed at ten. He sleeps well because he has a busy day."
"032":"The Green family has different activities during the day. In the morning, Anna drinks tea and her son gets ready for school. At midday, they have lunch. In the afternoon, Anna works and the children play after school. In the evening, they watch television together. Before bed, the children wash their faces and read a story. Everyone sleeps at night."
"033":"Green Town Community Centre has a simple timetable. The English lesson starts at nine o'clock. The art class starts at half past ten. At quarter past twelve, the café opens for lunch. The music lesson begins at quarter to two. The last class finishes at four o'clock. The centre closes at five. On Friday, a film starts at half past six."
"034":"Mia has a small calendar on her desk. Today is Monday, and her English class is on Tuesday. She plays tennis on Wednesday and visits her grandmother on Thursday. Friday is her favourite day because she meets her friends. The shop is open on Saturday, and she relaxes on Sunday. Her birthday is in January. Her brother's birthday is in February. Their friend Lily has a birthday on the fifth of May."

};

function makeCanonicalMission(p: (typeof previewMissions)[number]): Mission {
  const id = p.id;
  const vocab = p.vocabulary.map((entry) => {
    const parts = entry.split(" / ");
    const english = entry;
    const translated = parts.map((part) => spanish[part] ?? "");
    return { english, spanish: translated.filter(Boolean).join(" / ") || "Traducción pendiente de revisión", pronunciationGuide: getSpanishPronunciationGuide(english) };
  });
  const phrases = phraseModels[id] ?? phraseModels["014"];
  const activities = p.sections;
  const sections = keys.map((key, index) => {
    const activity = activities[index];
    const exerciseId = `english-a1-m${id}-${key}-exercise`;
    let items: any[] = [];
    let content: any;
    let lesson: any;
    let theory: any;
    if (key === "explore") {
      items = vocab.map((word, i) => ({ itemId: `english-a1-m${id}-explore-${i+1}`, position: i+1, ...word, audio: "tts:en-GB" }));
      lesson = {
        phrases: phrases.map((english) => ({ english, spanish: "" })),
        grammar: p.grammar.map((english) => ({ english, spanish: "Estructura objetivo de la misión." })),
        reading: [{ english: passages[id] ?? p.goal, spanish: "" }],
        writing: phrases.slice(0,5).map((english) => ({ english, spanish: "" })),
        speaking: phrases.slice(0,5).map((english) => ({ english, spanish: "", prompt: "Practise this expression.", promptSpanish: "Practica esta expresión." })),
        listening: phrases.slice(0,5).map((english) => ({ english, spanish: "" })),
        examples: phrases.map((english) => ({ english, spanish: "" })),
        communication: phrases.map((english) => ({ english, spanish: "Expresión comunicativa de la misión." }))
      };
      theory = { title: p.grammar[0], explanation: `En esta misión trabajarás ${p.grammar.join("; ")}. Observa los modelos y practica las estructuras en situaciones cotidianas.`, tip: "Lee el ejemplo completo, escucha su pronunciación y cambia una palabra cada vez para crear una frase nueva.", patterns: p.grammar.slice(0,4).map((pattern, i) => ({ label: `Estructura ${i+1}`, pattern, examples: phrases.slice(i,i+2) })) };
    } else if (key === "practice") {
      items = vocab.map((word,i) => ({ itemId: `english-a1-m${id}-practice-${i+1}`, position:i+1, prompt:`Choose the Spanish meaning of “${word.english}”.`, answer:word.spanish, options:[word.spanish, ...vocab.filter((_,j)=>j!==i).slice(0,2).map(x=>x.spanish)], taskType:"vocabulary", evaluation:{type:"single_choice"} }));
    } else if (key === "grammar") {
      items = (id === "034" ? mission034Grammar : id === "033" ? mission033Grammar : id === "032" ? mission032Grammar : id === "031" ? mission031Grammar : id === "030" ? mission030Grammar : id === "023" ? mission023Grammar : id === "021" ? mission021Grammar : id === "020" ? mission020Grammar : id === "019" ? mission019Grammar : id === "018" ? mission018Grammar : id === "017" ? mission017Grammar : id === "016" ? mission016Grammar : id === "015" ? mission015Grammar : Array.from({length:10},(_,i) => ({ prompt:"Which grammar structure is practised in this mission?", answer:p.grammar[i%p.grammar.length], options:[p.grammar[i%p.grammar.length],p.grammar[(i+1)%p.grammar.length],p.grammar[(i+2)%p.grammar.length]] }))).map((q:any,i:number) => ({ itemId:`english-a1-m${id}-grammar-${i+1}`, position:i+1, ...q, evaluation:{type:"single_choice"} }));
    } else if (key === "pronunciation") {
      items = vocab.flatMap((word,i) => word.english.split(" / ").map((term,partIndex) => { const normalizedTerm = term.trim().toLowerCase().replace(/’/g, "'").replace(/[?….,!;:]/g, "").replace(/\s+/g, " "); const mission028PhraseGuides: Record<string, string> = { "how long can i borrow this": "jáu long kan ai bó-rou dis", "where can i find": "uér kan ai fáind", "i must return this book": "ai mast ri-térn dis buk", "what do you do": "uót du iu dú", "where do you work": "uér du iu uérk", "i'm a teacher": "áim e tí-cher", "he works in a hospital": "ji uérks in e jós-pi-tal", "she works in a shop": "shi uérks in e shóp", "what time does the library close": "uót táim daz de lái-bre-ri klóuz" }; const pronunciationGuide = (id === "028" || id === "029") ? mission028PhraseGuides[normalizedTerm] ?? getSpanishPronunciationGuide(term) ?? getSpanishPronunciationGuide(word.english) : getSpanishPronunciationGuide(term); return { itemId:`english-a1-m${id}-pronunciation-${i+1}-${partIndex+1}`, position:i+1, word:term, translation:word.spanish.split(" / ")[partIndex] ?? word.spanish, pronunciationGuide, audio:"tts:en-GB", prompt:(id === "028" || id === "029") && pronunciationGuide ? `Listen, read this pronunciation guide: ${pronunciationGuide}. Then repeat the word.` : "Listen, read the guide and repeat the word.", options:[term,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english], answer:term, taskType:"listening_and_guided_production" }; }));
    } else if (key === "reading") {
      content = { passageId:`english-a1-m${id}-reading-passage`, passage:passages[id] ?? p.goal };
      items = (id === "034" ? mission034Reading : id === "033" ? mission033Reading : id === "032" ? mission032Reading : id === "031" ? mission031Reading : id === "030" ? mission030Reading : id === "029" ? mission029Reading : id === "028" ? mission028Reading : id === "027" ? mission027Reading : id === "026" ? mission026Reading : id === "023" ? mission023Reading : id === "021" ? mission021Reading : id === "020" ? mission020Reading : id === "019" ? mission019Reading : id === "018" ? mission018Reading : id === "017" ? mission017Reading : id === "016" ? mission016Reading : id === "015" ? mission015Reading : Array.from({length:10},(_,i) => ({ prompt:`Read the text and identify information about: ${vocab[i%vocab.length].english}.`, answer:vocab[i%vocab.length].english, options:[vocab[i%vocab.length].english,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english] }))).map((q:any,i:number) => ({ itemId:`english-a1-m${id}-reading-${i+1}`, position:i+1, ...q, evaluation:{type:"single_choice"} }));
    } else if (key === "writing") {
      items = phrases.map((sentence,i) => ({ itemId:`english-a1-m${id}-writing-${i+1}`, position:i+1, kind:"sentence", audio:"tts:en-GB", audioLocale:"en-GB", repeatCount:3, segments:[{segmentId:`english-a1-m${id}-writing-segment-${i+1}`,text:sentence}], expectedAnswer:sentence, evaluation:{type:"normalised_text"} }));
    } else if (key === "speaking") {
      items = phrases.map((sentence,i) => ({ itemId:`english-a1-m${id}-speaking-${i+1}`, position:i+1, prompt:`Say this sentence: ${sentence}`, modelAnswer:sentence, evaluation:{type:"rubric",transcriptionSeparateFromPronunciation:true} }));
    } else {
      const listeningStories: Record<string, { transcript: string; words: string[] }> = {
        "003": { transcript: "Welcome to our language club. Ana is from Portugal, and she is Portuguese. She lives in Lisbon with her family. Her first language is Portuguese, but she also speaks English. Luca is from Italy. He is Italian and speaks Italian and English too. They meet every Tuesday to practise languages and learn about each other's countries.", words: ["Portugal","Portuguese","Lisbon","language","English","Italy","Italian","family","countries","practise"] },
        "004": { transcript: "Good morning. Welcome to the community centre. My name is Laura Bennett. Laura is my first name, and Bennett is my surname. I need a visitor card, please. Can you spell Bennett? Of course: B, E, double N, E, double T. Thank you. Is the first letter a capital letter? Yes, it is. Please write the name slowly so I can check every letter.", words: ["Laura","Bennett","first name","surname","visitor","card","spell","double","capital letter","letter"] },
        "005": { transcript: "This is Emma Wilson. She is twenty years old and she is a student. She lives in Brighton with her parents and her younger brother. Her English class is on Monday afternoon. Her teacher is Mr Brown. Emma enjoys meeting new people, so she asks her classmates simple questions about their names, jobs and favourite activities.", words: ["Emma","twenty","student","Brighton","parents","brother","Monday","teacher","classmates","activities"] },
        "006": { transcript: "Ben is at the sports centre reception. He wants to join a class, so the receptionist asks for his contact details. His house number is thirty-five. His phone number is 07123 456 890. He says each digit slowly. The receptionist repeats the number and checks it. Ben also gives a five-digit postcode and writes everything on the form.", words: ["Ben","reception","thirty-five","phone number","digit","slowly","repeats","postcode","five-digit","form"] },
        "007": { transcript: "Sara works in a small hotel and uses English with visitors. She speaks Spanish and English every day. She can read simple messages in French, but she cannot speak French confidently yet. Her brother Daniel speaks German. They practise together after dinner. Sara asks guests to speak slowly when she does not understand a question.", words: ["Sara","hotel","English","Spanish","French","read","speak","brother","German","practise"] },
        "008": { transcript: "Alex is new in Bristol. He was born in Seville, but he lives in England now. He works in a bookshop near the station and studies English twice a week. His favourite hobby is reading, especially adventure stories. At the weekend, he plays tennis with a friend. He is making a short profile for his college website.", words: ["Alex","Bristol","born","Seville","lives","bookshop","station","studies","reading","tennis"] },
        "009": { transcript: "It is the first day in Room Twelve. There are twelve students in the class and one teacher. Anna is the teacher. Tom sits next to Sara, and a new student sits near the window. The students work in small groups and introduce themselves. Everyone has a partner for the first English activity.", words: ["Room Twelve","twelve","students","class","teacher","Anna","Tom","Sara","window","partner"] },
        "010": { transcript: "Marta arrives early for her first English lesson. Luis is waiting outside the classroom. They say hello and introduce themselves. Marta is from Portugal and Luis is from Spain. They ask each other about languages and age. Luis does not hear Marta's surname, so he asks her to repeat it slowly. Then they go into class together.", words: ["Marta","English lesson","Luis","classroom","Portugal","Spain","languages","age","surname","slowly"] },
        "011": { transcript: "Daniel has a busy weekday routine. He wakes up at seven and gets up ten minutes later. He has breakfast at half past seven, then takes the bus to work. He starts at nine and finishes at five. In the evening, he usually cooks dinner and reads. He sometimes watches a film before going to bed at ten thirty.", words: ["Daniel","weekday","wakes up","seven","breakfast","bus","work","finishes","usually","bed"] },
        "012": { transcript: "Emma lives in a comfortable flat near the park. There are two bedrooms and one bathroom. The kitchen is next to the living room, where there is a large sofa and a small table. Her favourite place is the balcony because she can see the garden below. On Saturdays, she cleans the flat and visits a neighbour.", words: ["Emma","flat","park","bedrooms","bathroom","kitchen","living room","sofa","balcony","garden"] },
        "013": { transcript: "Peter is preparing lunch for his family. For breakfast, he usually has bread and milk. Today he is making rice with chicken and vegetables. His sister is washing an apple for dessert. Peter drinks water with his meal, while his father prefers coffee after lunch. They enjoy eating together at the kitchen table.", words: ["Peter","lunch","family","breakfast","bread","milk","rice","chicken","vegetables","apple"] },
        "014": { transcript: "Tom and Anna are having lunch at Green Café. The waiter brings them two menus. Tom would like a cheese sandwich and a cup of coffee. Anna orders vegetable soup and a glass of water. They ask if the soup is hot and choose a table by the window. At the end, Tom asks for the bill and pays by card.", words: ["Tom","Anna","Green Café","waiter","menus","sandwich","coffee","soup","water","bill"] },
        "015": { transcript: "Mia and Leo are at the sports centre after school. Mia can swim and ride a bicycle, but she cannot play tennis yet. Leo can play football and basketball. He runs fast, although he cannot swim. Mia wants to learn basketball, so Leo offers to help her on Saturday. They check the training timetable before going home.", words: ["Mia","Leo","sports centre","swim","bicycle","tennis","football","basketball","Saturday","training"] },
        "016": { transcript: "Mia is shopping for clothes with her brother Leo. She is wearing a blue T-shirt and black jeans. She wants a new pair of trainers for school. The assistant brings size thirty-eight, but they are too small. Mia tries size forty and likes the white pair. Leo chooses a red jacket and grey trousers.", words: ["Mia","Leo","clothes","blue","T-shirt","jeans","trainers","size","white","jacket"] },
        "017": { transcript: "Alex and Nina are talking about their free time at the library café. Alex likes listening to music and cycling, but he does not enjoy cooking. Nina loves reading and taking photos. She also likes dancing with her friends. They decide to meet on Sunday and go for a bike ride if the weather is good.", words: ["Alex","Nina","free time","library café","music","cycling","cooking","reading","photos","Sunday"] },
        "018": { transcript: "A visitor is looking for the station in Green Town. A local woman helps him with a town map. She says, Go straight from the square and turn left at the bank. The supermarket is next to the bank. The park is opposite the hospital, and the post office is near the square. The visitor thanks her and follows the directions.", words: ["visitor","station","Green Town","local","town map","square","bank","supermarket","park","hospital"] },
        "019": { transcript: "Alex is travelling from London to Cambridge by train. He buys a return ticket at the station and checks the timetable. His train leaves at quarter past nine from platform four. The journey takes fifty minutes. He arrives before ten fifteen and meets a friend outside the station. The return train leaves at half past four.", words: ["Alex","London","Cambridge","train","return ticket","station","timetable","platform","journey","friend"] },
        "020": { transcript: "Sam arrives at the Green Park Hotel in the afternoon. He has a reservation for a double room for two nights. At reception, a member of staff gives him a key and explains that breakfast is included. There is a shower in the bathroom and the hotel has a lift. Sam asks for another towel and checks the check-out time.", words: ["Sam","Green Park Hotel","reservation","double room","two nights","reception","key","breakfast","shower","towel"] },
        "021": { transcript: "Alex is at the airport for his flight to Madrid. He checks in at Terminal Two and puts one suitcase on the scales. He keeps a book and phone in his hand luggage. At security, he shows his passport and boarding pass. The screen says gate fourteen, but the flight is delayed by twenty minutes. Alex waits near the gate for another announcement.", words: ["Alex","airport","Madrid","Terminal Two","suitcase","hand luggage","security","passport","boarding pass","gate"] },
        "022": { transcript: "Good morning. Here is the weather forecast for Green Town. Monday is sunny and warm, with a temperature of twenty degrees. On Tuesday it is cloudy and windy, so take a jacket. Wednesday is rainy in the morning. The weekend looks better: Saturday is sunny, and Sunday is cool but dry. It is a good weekend for a walk in the park.", words: ["weather forecast","Green Town","Monday","sunny","warm","temperature","Tuesday","cloudy","windy","jacket"] },
        "023": { transcript: "Jamie has an appointment at Green Street Clinic at ten o'clock. Jamie tells the nurse, I don't feel well. I have a sore throat and a headache. The nurse asks Jamie to sit down and offers a glass of water. The appointment is short. Before leaving, Jamie checks the next appointment time and thanks the nurse for the help.", words: ["Jamie","appointment","Green Street Clinic","ten o'clock","nurse","sore throat","headache","sit down","water","help"] },
        "024": { transcript: "At the community art club, Mia describes two characters for a drawing game. Alex is tall and has short, curly brown hair. He wears glasses. His friend Sam is shorter and has long, straight black hair. Sam has a small beard. The group listens carefully and chooses the correct portraits. They describe only visible features, not opinions.", words: ["Mia","community art club","Alex","tall","short","curly","brown hair","glasses","Sam","straight black hair"] },
        "025": { transcript: "Olivia is showing a family photo to her new friend Noah. This is my mother, Helen, and this is my father, Mark. I have one brother, Ben, and one sister, Lucy. Their grandparents live near us. My aunt and uncle visit on Sundays, and my cousin Leo often comes too. Noah asks who everyone is, and Olivia explains each family relationship.", words: ["Olivia","family photo","Noah","mother","father","brother","sister","grandparents","aunt","cousin"] },
        "026": { transcript: "Maya is writing an invitation for her friend Oliver. She is having a birthday party at the Green Street Community Centre. The party is on Saturday, the fourteenth of June, at three o’clock. Oliver asks what he can bring. Maya says, Please bring some juice. Her sister is making a cake, and Maya is putting candles on it. They are decorating the room with balloons. Oliver is happy to come and help. Maya says, Thank you! See you at the party!", words: ["invitation","birthday party","community centre","Saturday","fourteenth of June","three o’clock","juice","cake","candles","balloons"] },
        "029": { transcript: "Emma works at Green Town School. She is a teacher. Daniel is a doctor at Green Street Hospital. He works with Rosa, a nurse. Leo is a shop assistant. He works in a small shop and helps customers. They enjoy their jobs and meet on Saturday.", words: ["Green Town School","teacher","doctor","Green Street Hospital","Rosa","nurse","shop assistant","small shop","customers","Saturday"] },
        "028": { transcript: "Noah visits Green Street Library on Tuesday afternoon with his friend Mia. He wants a book about animals, so the librarian helps him get a library card. He can borrow three books for two weeks. Noah chooses a book about wild animals and a story about a friendly dog. He must return them by Friday, 12 September. Mia finds the adventure books on the second floor. The library closes at six o’clock. Noah thanks the librarian before they leave.", words: ["Green Street Library","Tuesday afternoon","library card","three books","two weeks","wild animals","friendly dog","Friday, 12 September","second floor","six o’clock"] },
        "027": { transcript: "Ella visits Green Street Shop on Saturday morning. She needs two notebooks, a blue pen and a small bottle of water. The notebooks are two pounds each. The pen is one pound fifty, and the water is eighty pence. Ella asks how much the notebooks are. She pays by card and asks for a receipt. The shop assistant puts the things in a bag. Ella checks her shopping list and says thank you before she leaves.", words: ["Green Street Shop","Saturday morning","two notebooks","blue pen","bottle of water","two pounds","one pound fifty","eighty pence","card","receipt"] },
        "030": { transcript: "On Monday, Alex studies English after work. He usually goes swimming on Tuesday. On Thursday, he visits his grandmother. He sometimes meets friends on Friday evening. He always has lunch at one. He plays tennis once a week. He never works on Sunday.", words: ["Monday","English","Tuesday","swimming","Thursday","grandmother","Friday","lunch","tennis","Sunday"] },
        "031": { transcript: "Leo gets up at seven. He has breakfast with his family. He goes to school by bus at eight. He has lunch at one. After school, he goes home and does his homework. At six, he plays football. He has dinner at eight and goes to bed at ten.", words: ["seven","breakfast","family","bus","eight","lunch","homework","six","football","ten"] },
        "032": { transcript: "In the morning, Anna drinks tea. At midday, the family has lunch. In the afternoon, the children play after school. In the evening, they watch television. Before bed, the children wash their faces and read a story. Everyone sleeps at night.", words: ["morning","tea","midday","lunch","afternoon","school","evening","television","story","night"] },
        "033": { transcript: "The English lesson starts at nine o'clock. The art class starts at half past ten. The café opens at quarter past twelve. The music lesson begins at quarter to two. The last class finishes at four o'clock. The centre closes at five. On Friday, a film starts at half past six.", words: ["English lesson","nine o'clock","art class","half past ten","café","quarter past twelve","music lesson","quarter to two","four o'clock","half past six"] },
        "034": { transcript: "Today is Monday. Mia has English class on Tuesday. She plays tennis on Wednesday and visits her grandmother on Thursday. Friday is her favourite day. The shop is open on Saturday. She relaxes on Sunday. Her birthday is in January, and her brother's birthday is in February. Lily's birthday is on the fifth of May.", words: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","January","February","May"] }

      };
      const story = listeningStories[id] ?? { transcript: passages[id] ?? p.goal, words: vocab.slice(0,10).map((word) => word.english) };
      const bank = story.words.map((word) => ({ english: word }));
      let template = story.transcript;
      bank.forEach((word, i) => {
        const position = template.toLowerCase().indexOf(word.english.toLowerCase());
        if (position >= 0) template = template.slice(0, position) + `[[gap-${String(i+1).padStart(2,"0")}]]` + template.slice(position + word.english.length);
      });
      content = { audio:"tts:en-GB", audioLocale:"en-GB", audioTranscript:story.transcript, transcriptTemplate:template, wordBank:bank.map((word,i)=>({wordId:`english-a1-m${id}-listening-word-${i+1}`,word:word.english})), interaction:"select_place_move_replace" };
      items = bank.map((word,i) => ({ itemId:`english-a1-m${id}-listening-${i+1}`, position:i+1, gapToken:`[[gap-${String(i+1).padStart(2,"0")}]]`, expectedWordId:`english-a1-m${id}-listening-word-${i+1}` }));
    }
    return { sectionId:`english-a1-m${id}-${key}`, sectionKey:key, position:index+1, title:["Explore","Practice","Grammar","Pronunciation","Reading","Writing","Speaking","Listening"][index], exercise:{ exerciseId, type:types[index], items, ...(content?{content}:{}), ...(lesson?{lesson}:{}), ...(theory?{theory}:{}) } };
  });
  return { course:{level:"A1"}, unit:{title:"A1 · Everyday communication"}, mission:{title:p.title,position:Number(id)}, sections } as Mission;
}

const previewAsCanonical = Object.fromEntries(previewMissions.map((p) => [p.id, makeCanonicalMission(p)])) as Record<string, Mission>;
const allMissions = { ...canonicalMissions, ...previewAsCanonical };
const previous = (id: string) => String(Number(id) - 1).padStart(3, "0");
const next = (id: string) => String(Number(id) + 1).padStart(3, "0");

export const dynamicParams = false;
export function generateStaticParams() { return ids.map((mission) => ({ mission })); }
export async function generateMetadata({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  const data = allMissions[mission];
  return data ? { title: `${data.mission.title} · Vista previa A1 · Linguafly Academy`, robots: { index:false, follow:false } } : {};
}

export default async function A1CurriculumPreviewMission({ params }: { params: Promise<{ mission: string }> }) {
  const { mission } = await params;
  if (!ids.includes(mission)) notFound();
  const data = allMissions[mission];
  const proposed = getPreviewMission(mission);
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/academia/a1/curriculum-preview" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Todas las misiones de la vista previa</Link>
        {proposed && (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-bold text-amber-950">Propuesta curricular · pendiente de validación</p><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">Vista previa</span></div>
            <p className="mt-2 text-sm leading-6 text-amber-900">{proposed.audit}</p>
          </section>
        )}
        <div className="mt-5"><CanonicalMission missionData={data} /></div>
        <nav className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
          {mission !== "001" ? <Link href={`/academia/a1/curriculum-preview/${previous(mission)}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-300">← Misión anterior</Link> : <span />}
          {mission !== "029" ? <Link href={`/academia/a1/curriculum-preview/${next(mission)}`} className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">Misión siguiente →</Link> : <Link href="/academia/a1/curriculum-preview" className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white">Volver al índice →</Link>}
        </nav>
      </div>
    </main>
  );
}
