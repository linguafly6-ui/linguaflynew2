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
  "maths": "matemáticas",
  "English": "inglés",
  "science": "ciencias",
  "history": "historia",
  "geography": "geografía",
  "art": "arte",
  "music": "música",
  "PE": "educación física",
  "timetable": "horario",
  "school bag": "mochila",
  "open your book": "abre tu libro",
  "close your book": "cierra tu libro",
  "listen": "escucha",
  "repeat": "repite",
  "write": "escribe",
  "read": "lee",
  "work in pairs": "trabajad en parejas",
  "look at the board": "mira la pizarra",
  "question": "pregunta",
  "answer": "respuesta",
  "teacher": "profesor/a",
  "doctor": "médico/a",
  "nurse": "enfermero/a",
  "driver": "conductor/a",
  "shop assistant": "dependiente/a",
  "office": "oficina",
  "school": "escuela",
  "hospital": "hospital",
  "shop": "tienda",
  "help": "ayudar",
  "What do you do?": "¿A qué te dedicas?",
  "job": "trabajo",
  "work": "trabajar",
  "student": "estudiante",
  "engineer": "ingeniero/a",
  "study": "estudiar",
  "company": "empresa",
  "at the moment": "en este momento",
  "start work": "empezar a trabajar",
  "finish work": "terminar de trabajar",
  "break": "descanso",
  "meeting": "reunión",
  "customer": "cliente",
  "computer": "ordenador",
  "lunch": "almuerzo",
  "busy": "ocupado/a",
  "colleague": "compañero/a",
  "every morning": "cada mañana",
  "laptop": "portátil",
  "tablet": "tableta",
  "mobile phone": "teléfono móvil",
  "keyboard": "teclado",
  "screen": "pantalla",
  "mouse": "ratón",
  "internet": "internet",
  "website": "sitio web",
  "send a message": "enviar un mensaje",
  "message": "mensaje",
  "email": "correo electrónico",
  "subject": "asunto",
  "hello": "hola",
  "dear": "estimado/a",
  "please": "por favor",
  "thanks": "gracias",
  "see you": "hasta luego",
  "send": "enviar",
  "reply": "responder",
  "speaking": "hablando",
  "call": "llamada",
  "phone": "teléfono",
  "number": "número",
  "hold on": "espera",
  "wrong number": "número equivocado",
  "call back": "devolver la llamada",
  "goodbye": "adiós",
  "rule": "norma",
  "must": "deber",
  "mustn't": "no deber",
  "wear": "llevar puesto",
  "uniform": "uniforme",
  "be on time": "ser puntual",
  "keep quiet": "guardar silencio",
  "clean": "limpio",
  "safe": "seguro",
  "profile": "perfil",
  "worker": "trabajador/a",
  "skills": "habilidades",
  "experience": "experiencia",
  "future": "futuro",
  "coin": "moneda",
  "note": "billete",
  "ten pence": "diez peniques",
  "fifty pence": "cincuenta peniques",
  "one pound": "una libra",
  "two pounds": "dos libras",
  "colour": "color",
  "Can I help you?": "¿Puedo ayudarle?",
  "Do you have…?": "¿Tiene…?",
  "Can I pay by card?": "¿Puedo pagar con tarjeta?",
  "wallet": "cartera",
  "keys": "llaves",
  "umbrella": "paraguas",
  "watch": "reloj",
  "glasses": "gafas",
  "purse": "monedero",
  "outfit": "conjunto",
  "comfortable": "cómodo/a",
  "smart": "elegante",
  "market": "mercado",
  "stall": "puesto",
  "kilo": "kilo",
  "half a kilo": "medio kilo",
  "How many…?": "¿Cuántos…?",
  "How much…?": "¿Cuánto…?",
  "shopping basket": "cesta de la compra",
  "shopping list": "lista de la compra",
  "cash": "efectivo",
  "card": "tarjeta",
  "receipt": "recibo",
  "price": "precio",
  "total": "total",
  "change": "cambio",
  "free time": "tiempo libre",
  "hobby": "afición",
  "reading": "lectura",
  "cycling": "ciclismo",
  "dancing": "baile",
  "watch films": "ver películas",
  "listen to music": "escuchar música",
  "go out": "salir",
  "relax": "relajarse",
  "at the weekend": "el fin de semana",
  "football": "fútbol",
  "tennis": "tenis",
  "basketball": "baloncesto",
  "swimming": "natación",
  "running": "correr",
  "team": "equipo",
  "player": "jugador/a",
  "match": "partido",
  "training": "entrenamiento",
  "swim": "nadar",
  "ride a bike": "montar en bicicleta",
  "skate": "patinar",
  "dance": "bailar",
  "sing": "cantar",
  "draw": "dibujar",
  "cook": "cocinar",
  "climb": "escalar",
  "run": "correr",
  "play the guitar": "tocar la guitarra",
  "invitation": "invitación",
  "Would you like to…?": "¿Te gustaría…?",
  "come": "venir",
  "join us": "unirte a nosotros",
  "party": "fiesta",
  "concert": "concierto",
  "this evening": "esta tarde/noche",
  "Saturday": "sábado",
  "free": "libre",
  "Sorry, I can't": "Lo siento, no puedo",
  "doing": "haciendo",
  "talking": "hablando",
  "working": "trabajando",
  "studying": "estudiando",
  "cooking": "cocinando",
  "watching": "viendo",
  "playing": "jugando",
  "waiting": "esperando",
  "listening": "escuchando",
  "sports centre": "centro deportivo",
  "swimming pool": "piscina",
  "gym": "gimnasio",
  "court": "pista",
  "changing room": "vestuario",
  "locker": "taquilla",
  "membership": "abono",
  "opening hours": "horario de apertura",
  "reception": "recepción",
  "class": "clase",
  "favourite": "favorito/a",
  "collect": "coleccionar",
  "photography": "fotografía",
  "gardening": "jardinería",
  "painting": "pintura",
  "because": "porque",
  "interesting": "interesante",
  "fun": "divertido",
  "plan": "plan",
  "tomorrow": "mañana",
  "this weekend": "este fin de semana",
  "meet": "quedar",
  "visit": "visitar",
  "go shopping": "ir de compras",
  "go to the cinema": "ir al cine",
  "at three o'clock": "a las tres",
  "I agree": "estoy de acuerdo",
  "I don't agree": "no estoy de acuerdo",
  "That's a good idea": "es una buena idea",
  "Maybe": "quizá",
  "I think so": "eso creo",
  "I don't think so": "no lo creo",
  "of course": "por supuesto",
  "not really": "no mucho",
  "what about…?": "¿qué tal…?",
  "weather": "tiempo",
  "sunny": "soleado",
  "cloudy": "nublado",
  "rainy": "lluvioso",
  "windy": "ventoso",
  "snowy": "nevado",
  "hot": "caluroso",
  "cold": "frío",
  "spring": "primavera",
  "winter": "invierno",
  "forecast": "previsión",
  "temperature": "temperatura",
  "degrees": "grados",

  "coat": "abrigo",
  "boots": "botas",
  "scarf": "bufanda",

  "today": "hoy",
  "weekend": "fin de semana",
  "animal": "animal",
  "pet": "mascota",
  "dog": "perro",
  "cat": "gato",
  "rabbit": "conejo",
  "bird": "pájaro",
  "fish": "pez",
  "feed": "dar de comer",
  "walk": "pasear",
  "vet": "veterinario",
  "farm": "granja",
  "farmer": "granjero",
  "cow": "vaca",
  "horse": "caballo",
  "sheep": "oveja",
  "chicken": "gallina",
  "duck": "pato",
  "goat": "cabra",
  "field": "campo",
  "eggs": "huevos",
  "countryside": "campo",
  "mountain": "montaña",
  "river": "río",
  "lake": "lago",
  "forest": "bosque",
  "tree": "árbol",
  "flower": "flor",
  "grass": "hierba",
  "picnic": "pícnic",
  "bedroom": "dormitorio",
  "bathroom": "baño",
  "living room": "salón",
  "dining room": "comedor",
  "sofa": "sofá",
  "armchair": "sillón",
  "wardrobe": "armario",
  "mirror": "espejo",
  "shelf": "estantería",
  "bed": "cama",

  "tidy": "ordenar",
  "wash": "lavar",
  "dry": "secar",

  "make the bed": "hacer la cama",
  "do the washing": "poner la lavadora",
  "do the dishes": "lavar los platos",
  "take out the rubbish": "sacar la basura",

  "in": "en",
  "on": "sobre",
  "under": "debajo",
  "behind": "detrás",
  "in front of": "delante",
  "next to": "al lado",
  "between": "entre",
  "above": "encima",
  "below": "debajo",
  "inside": "dentro",
  "at home": "en casa",

  "watch television": "ver la televisión",
  "read a book": "leer un libro",
  "set the table": "poner la mesa",
  "water the plants": "regar las plantas",
  "feed the pet": "dar de comer a la mascota",
  "after dinner": "después de cenar",
  "in the evening": "por la tarde/noche",
  "every day": "todos los días",
  "neighbourhood": "barrio",
  "flat": "piso",
  "house": "casa",
  "street": "calle",
  "near": "cerca",
  "quiet": "tranquilo",

  "playground": "parque infantil",
  "supermarket": "supermercado",
  "bus stop": "parada de autobús",
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
"030":["I study English on Monday and Wednesday.","I usually go swimming on Tuesday.","I visit my grandmother on Thursday.","I sometimes meet friends on Friday.","I always have lunch at one.","I never work on Sunday.","I play tennis once a week.","We go to the cinema twice a month.","What do you do at the weekend?","My week is busy but fun."],
"031":["I get up at seven every morning.","She has breakfast at home.","He goes to work by bus.","We go to school at eight.","I have lunch at one o'clock.","They go home after school.","He does his homework in the afternoon.","We have dinner at eight.","I go to bed at ten.","The children sleep at night."],
"032":["I drink tea in the morning.","She studies in the afternoon.","We watch television in the evening.","The baby sleeps at night.","I get up early.","He goes to bed late.","I wash my face before breakfast.","We play football after school.","The sun rises in the morning.","We have lunch at midday."],
"033":["What time is it?","It is seven o'clock.","It is half past eight.","It is quarter past nine.","It is quarter to ten.","The lesson starts at nine.","It is five minutes past three.","We meet at half past six.","The train leaves at noon.","I go to bed at midnight."],
"034":["Today is Monday.","My English class is on Tuesday.","We play tennis on Wednesday.","I visit my grandmother on Thursday.","Friday is my favourite day.","The shop is open on Saturday.","I relax on Sunday.","My birthday is in January.","February is a short month.","Her birthday is on the fifth of May."],

"035":["How often do you exercise?","I always walk to work.","She usually studies in the evening.","We often meet after class.","He sometimes cooks dinner.","They hardly ever watch television.","I never work on Sunday.","I go swimming once a week.","She visits her parents twice a week.","How often do you meet your friends?"],
"036":["Do you get up early?","Yes, I do.","No, I don't.","Does he have breakfast at seven?","Yes, he does.","Does she go to bed late?","No, she doesn't.","What time do you start work?","What time does school finish?","Do they walk to school?"],
"037":["I study English on Monday morning.","We play tennis on Tuesday afternoon.","She visits her friends on Wednesday evening.","I work on Thursday.","They go shopping on Friday.","We relax on Saturday.","He visits his family every Sunday.","My week is busy.","Sunday is my free day.","What do you do during the week?"],
"038":["What do you do at the weekend?","I usually meet my friends.","We go out on Saturday.","She stays at home on Sunday.","They visit friends in the afternoon.","I like watching a film.","He goes shopping with his sister.","We relax at home.","Do you go out at the weekend?","Let's meet on Saturday."],
"039":["What time does your lesson start?","It starts at nine o'clock.","What time does work finish?","It finishes at five.","My classes are from nine to twelve.","We have a break at eleven.","The timetable is on the wall.","I have lunch at lunchtime.","Friday is my day off.","Do you work on Saturday?"],
  "040":["I wake up at seven every day.","I get up and have breakfast.","She goes to school at eight.","He goes to work by bus.","We have lunch at midday.","I do my homework after school.","They have dinner at seven.","She goes to bed at ten.","I read a book before bed.","What time do you get up?"],
  "041":["I eat bread for breakfast.","We have rice with chicken.","She likes fish and vegetables.","He drinks milk every morning.","I like fruit and pasta.","They don't like coffee.","Do you like orange juice?","My favourite food is chicken.","We drink water with lunch.","He likes apples but not bananas."],
  "042":["I eat an apple every day.","She has a banana for a snack.","We buy oranges at the market.","There are some grapes in the bowl.","He likes tomatoes and carrots.","I have a sandwich for lunch.","We make a salad with vegetables.","Do you have any potatoes?","This is a healthy snack.","My favourite fruit is the orange."],
  "043":["I have breakfast at seven.","We have lunch at midday.","They have dinner in the evening.","I usually eat fruit in the morning.","She has a snack after school.","What do you have for breakfast?","He drinks water with every meal.","We eat dinner at eight.","I don't have lunch at home.","What time do you have dinner?"],
  "044":["Good morning. Can I see the menu, please?","I'd like a cup of tea, please.","Can I have a cheese sandwich?","Would you like a piece of cake?","Yes, please. Thank you.","No, thank you. Just a coffee.","Here you are.","How much is the tea?","Can I have the bill, please?","Thank you. Have a nice day."],
  "045":["We have a table for two.","The restaurant is very busy.","The waiter brings the menu.","There are two glasses on the table.","Would you like a starter?","I'd like the tomato soup, please.","The main course is chicken and rice.","Can we see the dessert menu?","The waiter brings the bill.","Thank you. We had a lovely meal."],
  "046":["Can I see the menu, please?","The soup is four pounds.","How much is the chicken?","The fish costs eight pounds fifty.","These drinks are two pounds each.","The lunch menu includes a dessert.","I'd like the set menu, please.","The side dish is extra.","The total is twelve pounds.","Here is your receipt."],
  "047":["I'd like a glass of water, please.","Can I have orange juice?","Would you like still or sparkling water?","Sparkling water, please.","I'd like tea without milk.","Can we order now?","Anything else for you?","No, that's all, thank you.","Could we have the menu, please?","Here you are. Enjoy your meal."],
  "048":["I like pasta and rice.","She loves chocolate cake.","I don't like spicy food.","Do you prefer tea or coffee?","He prefers fish to chicken.","My favourite drink is orange juice.","They hate very salty food.","Does Mia like vegetables?","Yes, she does.","We prefer a vegetarian meal."],
  "049":["Good evening. Do you have a reservation?","Yes, a table for two, please.","Would you like a table by the window?","Can we see the menu, please?","What do you recommend?","I'd like the vegetable soup.","Can I have the chicken, please?","Would you like anything for dessert?","Could we have the bill, please?","Thank you. Have a good evening."],
  "050":["I'm hungry. Can we have lunch?","I'd like a cheese sandwich, please.","Can I have some water?","Would you like some juice?","We have soup and salad today.","Are there any vegetarian dishes?","I'd like a table near the window.","Can we order now, please?","Could we have the bill?","The food is very good, thank you."],
  "051":["I have a blue T-shirt.","She is wearing a black dress.","These shoes are very nice.","That jacket is red.","My jeans are dark blue.","He has got a white shirt.","I like your green skirt.","Are those your shoes?","This is my favourite coat.","The trousers are grey."],
  "052":["What are you wearing today?","I'm wearing a warm coat.","She is wearing a red scarf.","He is wearing black boots.","Are you wearing gloves?","No, I'm not wearing gloves.","They are wearing school uniforms.","What is your brother wearing?","He is wearing a blue jumper.","I'm wearing my favourite hat."],
  "053":["Can you help me, please?","I'm looking for a blue shirt.","What size are you?","Have you got this in medium?","Can I try it on?","Where is the fitting room?","It is too small for me.","This one fits very well.","Where is the cash desk?","Can I have the receipt, please?"],
  "054":["How much are these shoes?","They are thirty pounds.","How much is that jacket?","It is forty-five pounds.","These trainers are cheap.","Those boots are expensive.","Can I try this pair on?","Do you have these in black?","That price is very good.","I'll take them, please."]
,
  "055": ["How much is this coin?","This note is worth ten pounds.","The apples cost two pounds.","It is fifty pence.","The total is five pounds.","Here is your change.","How much are these oranges?","They cost one pound each.","I have two pound coins.","Can I pay in cash?"],
  "056": ["Can I help you?","Do you have this shirt in blue?","What size do you need?","Can I try it on?","Where is the fitting room?","How much is this jacket?","Do you have a smaller size?","Can I pay by card?","Yes, of course.","Thank you for your help."],
  "057": ["This is my wallet.","These are my keys.","Is this your phone?","Those glasses are hers.","My umbrella is black.","His watch is on the table.","Whose bag is this?","It is her bag.","I have a water bottle.","The notebook is mine."],
  "058": ["This is my favourite outfit.","I like comfortable clothes.","I'm wearing blue jeans today.","My favourite jumper is green.","She wears a smart jacket.","These trainers are very comfortable.","I like this skirt and scarf.","He is wearing a white shirt.","My outfit is simple but nice.","What are you wearing today?"],
  "059": ["Good morning. Can I have a kilo of apples?","Of course. Anything else?","I'd like half a kilo of tomatoes.","How many bananas do you need?","Six bananas, please.","How much are the potatoes?","They are two pounds a kilo.","Can I have some carrots?","That's four pounds, please.","Here you are. Thank you."],
  "060": ["Can I help you?","I'm looking for a notebook.","Where are the baskets?","How much is this item?","I'd like to pay by card.","Can I have a receipt?","The total is twelve pounds.","Here is your change.","Would you like a bag?","Have a nice day."],
  "061": ["What do you do in your free time?","I enjoy reading books.","She likes listening to music.","We go cycling at the weekend.","He loves watching films.","Do you like dancing?","I go out with friends.","My hobby is photography.","They relax on Sundays.","What is your favourite activity?"],
  "062": ["I play football on Saturdays.","She plays tennis after school.","We play basketball in the park.","He goes swimming twice a week.","They go running in the morning.","Do you play any sports?","My favourite sport is tennis.","Our team has ten players.","The match starts at four.","I have training on Friday."],
  "063": ["Can you swim?","Yes, I can swim well.","No, I can't skate.","Can she ride a bike?","He can play the guitar.","They can't cook dinner.","Can you draw a picture?","My brother can climb trees.","I can sing, but I can't dance.","What can you do?"],
  "064": ["Would you like to come to my party?","Yes, I'd love to.","Sorry, I can't come on Saturday.","Are you free this evening?","Let's meet at six.","Would you like to see a film?","That sounds great.","Thanks for the invitation.","Can I bring a friend?","See you on Saturday."],
  "065": ["What are you doing?","I'm reading a book.","She is talking to her friend.","They are playing football.","He isn't working today.","Are you listening to music?","We are studying English now.","The children are waiting outside.","My mother is cooking dinner.","It is raining now."],
  "066": ["Where is the swimming pool?","The gym is next to reception.","There are two tennis courts.","Is there a changing room?","The centre opens at seven.","You can use this locker.","I have a membership card.","The fitness class starts at six.","Can I ask at reception?","The pool is closed on Sunday."],
  "067": ["My favourite hobby is photography.","I enjoy taking pictures.","She loves gardening.","He collects old postcards.","Painting is fun and relaxing.","Why do you like music?","I like it because it is interesting.","What is your favourite hobby?","We sometimes paint together.","I want to play the piano."],
  "068": ["What are your plans for Saturday?","I'm meeting Emma at three.","We are going to the cinema.","I'm visiting my grandparents tomorrow.","Would you like to go shopping?","Let's meet outside the station.","The film starts at seven.","Are you free this weekend?","I'm not working on Saturday.","See you tomorrow."],
  "069": ["I agree with you.","That's a good idea.","I don't think so.","Maybe we can go later.","I think this film is great.","I don't agree because it's expensive.","Of course! Let's do that.","Not really. I prefer football.","What about meeting at six?","Yes, that sounds good."],
  "071": ["My favourite subject is science.","We have English on Monday.","Maths is at nine o'clock.","I need my school bag.","Our history lesson is interesting.","PE is in the afternoon.","The art room is next to the library.","I have music on Friday.","What is your favourite subject?","The lesson finishes at three."],
  "072": ["Open your book on page ten.","Please listen to the teacher.","Can you repeat that, please?","Write the answer in your notebook.","Look at the board.","Work in pairs, please.","Don't speak during the test.","Read the question carefully.","I don't understand this word.","Can I ask a question?"],
  "073": ["My aunt is a nurse.","She works in a hospital.","He is a bus driver.","A teacher works at a school.","The shop assistant helps customers.","My father works in an office.","Doctors help people.","Where does she work?","He works in a small shop.","I want to be a teacher."],
  "074": ["What do you do?","I'm a student.","Where do you work?","I work in a hotel.","Do you study English?","Yes, I do.","Do you work on Saturdays?","No, I don't.","She is an engineer.","He works for a small company."],
  "075": ["I start work at eight.","She finishes at five.","We have a break at eleven.","I check my emails every morning.","He has lunch with his colleagues.","The meeting starts at ten.","I help customers in the shop.","After lunch, I use the computer.","My working day is busy.","What time do you finish work?"],
  "076": ["I use a laptop for work.","She has a new tablet.","The keyboard is next to the screen.","I send messages on my phone.","We use the internet at home.","He can use this computer.","Open the website, please.","My mouse is on the desk.","Do you have a mobile phone?","I study English online."],
  "077": ["Hi Sam, how are you?","Thanks for your message.","Please send me the address.","I am free on Friday.","See you tomorrow.","What is the email about?","The subject is English homework.","Please reply today.","Dear Ms Green,","Best wishes, Alex"],
  "078": ["Hello, this is Anna speaking.","Can I speak to Mr Lee?","Hold on, please.","I'm sorry, he's not here.","Can I take a message?","Please ask her to call me back.","I think you have the wrong number.","Thanks for calling.","Goodbye. Speak to you soon.","Can you repeat your number?"],
  "079": ["You must be on time.","You mustn't use your phone in class.","Please keep the room clean.","Students must wear a uniform.","You must listen carefully.","You mustn't run in the corridor.","We must follow the safety rules.","Do not touch this machine.","You must wash your hands.","You must ask before you leave."],
  "080": ["My name is Daniel.","I am a student.","I study English every evening.","I work in a café.","My favourite subject is science.","I can use a computer.","I start work at nine.","I finish classes at three.","In the future, I want to be a nurse.","This is my study and work profile."]
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

const mission045Grammar = [{"prompt":"Choose the correct phrase for a booked table.","answer":"We have a reservation.","options":["We has a reservation.","We are reservation."]},{"prompt":"Complete: The waiter ___ the menu.","answer":"brings","options":["bring","bringing"]},{"prompt":"Choose the correct offer.","answer":"Would you like a starter?","options":["Do you like a starter?","Are you like a starter?"]},{"prompt":"Complete: There ___ two glasses on the table.","answer":"are","options":["is","am"]},{"prompt":"Which word means postre?","answer":"dessert","options":["starter","waiter"]},{"prompt":"Choose the polite request.","answer":"Can I have the soup, please?","options":["I have soup now.","Do I can soup?"]},{"prompt":"Complete: She ___ chicken and rice.","answer":"orders","options":["order","ordering"]},{"prompt":"Choose the correct phrase.","answer":"the main course","options":["the course main","main the course"]},{"prompt":"What does bill mean?","answer":"cuenta","options":["menú","mesa"]},{"prompt":"Choose the natural closing.","answer":"Thank you. We had a lovely meal.","options":["Thank you. We meal lovely.","We had meal a lovely."]}];
const mission046Grammar = [{"prompt":"Complete: The soup costs four ___.","answer":"pounds","options":["pound","pences"]},{"prompt":"Choose the correct price question.","answer":"How much is the chicken?","options":["How many is the chicken?","How much the chicken?"]},{"prompt":"Complete: The fish is eight pounds ___.","answer":"fifty","options":["fiftieth","fifteen"]},{"prompt":"Choose the correct plural question.","answer":"How much are these drinks?","options":["How much is these drinks?","How many is these drinks?"]},{"prompt":"Which item is a side dish?","answer":"A side salad","options":["A waiter","A receipt"]},{"prompt":"Complete: The ___ is twelve pounds.","answer":"total","options":["menu","table"]},{"prompt":"Choose the correct sentence.","answer":"Tea costs two pounds.","options":["Tea cost two pound.","Tea costing two pounds."]},{"prompt":"What does price mean?","answer":"precio","options":["plato","pedido"]},{"prompt":"Choose the correct phrase.","answer":"The lunch menu includes dessert.","options":["The lunch menu include dessert.","The lunch menu including dessert."]},{"prompt":"Complete: Here is your ___.","answer":"receipt","options":["recipe","reservation"]}];
const mission047Grammar = [{"prompt":"Choose the polite order.","answer":"I'd like orange juice, please.","options":["I liking orange juice.","I like have orange juice."]},{"prompt":"Complete: Can I ___ a glass of water?","answer":"have","options":["has","having"]},{"prompt":"Choose the correct offer.","answer":"Would you like tea?","options":["Do you like tea now?","Are you like tea?"]},{"prompt":"Choose the correct reply.","answer":"Sparkling water, please.","options":["Sparkle water, please.","Water sparkling please?"]},{"prompt":"Complete: tea ___ milk.","answer":"without","options":["between","under"]},{"prompt":"Choose the natural question.","answer":"Can we order now?","options":["We can order now?","Do we can order?"]},{"prompt":"Choose the correct response to Anything else?","answer":"No, that's all, thank you.","options":["No, that's all, please you.","No, thank all."]},{"prompt":"Complete: Here ___ are.","answer":"you","options":["your","yours"]},{"prompt":"Which phrase asks for a menu?","answer":"Could we have the menu, please?","options":["We menu please have?","Could menu we?"]},{"prompt":"Choose the natural closing.","answer":"Enjoy your meal.","options":["Enjoy you meal.","Enjoy meal your."]}];
const mission048Grammar = [{"prompt":"Choose the correct sentence.","answer":"I like pasta.","options":["I likes pasta.","I liking pasta."]},{"prompt":"Complete: She ___ chocolate cake.","answer":"loves","options":["love","loving"]},{"prompt":"Choose the correct negative.","answer":"I don't like spicy food.","options":["I doesn't like spicy food.","I not like spicy food."]},{"prompt":"Complete: ___ you prefer tea or coffee?","answer":"Do","options":["Does","Are"]},{"prompt":"Choose the correct third-person question.","answer":"Does Mia like vegetables?","options":["Do Mia like vegetables?","Is Mia like vegetables?"]},{"prompt":"Choose the correct short answer.","answer":"Yes, she does.","options":["Yes, she do.","Yes, she is."]},{"prompt":"Complete: He prefers fish ___ chicken.","answer":"to","options":["than","for"]},{"prompt":"Which word means picante?","answer":"spicy","options":["sweet","salty"]},{"prompt":"Choose the correct phrase.","answer":"My favourite drink is juice.","options":["My favourite drink are juice.","My favourite drink be juice."]},{"prompt":"Complete: We ___ a vegetarian meal.","answer":"prefer","options":["prefers","preferring"]}];
const mission050Grammar = [{"prompt":"Choose the correct word: I'd like ___ water.","answer":"some","options":["any","many"]},{"prompt":"Choose the polite request.","answer":"Can I have a sandwich, please?","options":["I have sandwich now.","Do I can sandwich?"]},{"prompt":"Complete: Are there ___ vegetarian dishes?","answer":"any","options":["some","much"]},{"prompt":"Choose the correct phrase.","answer":"Would you like some juice?","options":["Would you like any juice?","Do you like some juice now?"]},{"prompt":"Which word means cuenta?","answer":"bill","options":["menu","drink"]},{"prompt":"Complete: Emma ___ tomato soup.","answer":"orders","options":["order","ordering"]},{"prompt":"Choose the natural question.","answer":"Can we order now?","options":["We can order now?","Do we can order?"]},{"prompt":"Choose the correct noun phrase.","answer":"a chicken salad","options":["a salad chicken","chicken a salad"]},{"prompt":"Complete: The food ___ very good.","answer":"is","options":["are","be"]},{"prompt":"Choose the correct closing.","answer":"Thank you for the meal.","options":["Thank you meal for.","For the meal thank."]}];
const mission051Grammar = [{"prompt":"Choose the correct colour phrase.","answer":"a blue T-shirt","options":["a T-shirt blue","blue a T-shirt"]},{"prompt":"Complete: These ___ are nice.","answer":"shoes","options":["shoe","a shoe"]},{"prompt":"Choose the correct demonstrative.","answer":"That jacket is red.","options":["Those jacket is red.","These jacket is red."]},{"prompt":"Complete: She ___ a black dress.","answer":"has got","options":["have got","is got"]},{"prompt":"Which word means falda?","answer":"skirt","options":["shirt","shoes"]},{"prompt":"Choose the correct adjective order.","answer":"dark blue jeans","options":["blue dark jeans","jeans dark blue"]},{"prompt":"Complete: ___ shoes are mine.","answer":"Those","options":["That","This"]},{"prompt":"Choose the correct sentence.","answer":"He has got a white shirt.","options":["He have got a white shirt.","He has a got white shirt."]},{"prompt":"Which colour is black?","answer":"negro","options":["azul","verde"]},{"prompt":"Choose the natural question.","answer":"Are those your shoes?","options":["Is those your shoes?","Do those your shoes?"]}];
const mission052Grammar = [{"prompt":"Complete: I ___ wearing a coat.","answer":"am","options":["is","are"]},{"prompt":"Choose the correct question.","answer":"What are you wearing?","options":["What you are wearing?","What do wearing you?"]},{"prompt":"Complete: She is ___ a red scarf.","answer":"wearing","options":["wear","wears"]},{"prompt":"Choose the correct negative.","answer":"I'm not wearing gloves.","options":["I not am wearing gloves.","I'm no wearing gloves."]},{"prompt":"Complete: They ___ wearing uniforms.","answer":"are","options":["is","am"]},{"prompt":"Choose the correct sentence.","answer":"He is wearing boots.","options":["He wearing is boots.","He are wearing boots."]},{"prompt":"Which tense describes what is happening now?","answer":"Present continuous","options":["Present simple","Past simple"]},{"prompt":"Complete: What ___ your brother wearing?","answer":"is","options":["are","am"]},{"prompt":"Choose the correct short answer.","answer":"No, I'm not.","options":["No, I isn't.","No, I don't."]},{"prompt":"Choose the correct contrast.","answer":"I wear a uniform every day.","options":["I wearing a uniform every day.","I am wear a uniform every day."]}];
const mission053Grammar = [{"prompt":"Choose the correct request.","answer":"Can you help me, please?","options":["Do you can help me?","You help can me?"]},{"prompt":"Complete: What ___ are you?","answer":"size","options":["colour","price"]},{"prompt":"Choose the correct phrase.","answer":"Have you got this in medium?","options":["Have you this got medium?","Do you got this in medium?"]},{"prompt":"Complete: Can I try it ___?","answer":"on","options":["in","at"]},{"prompt":"Where do you try on clothes?","answer":"In the fitting room.","options":["At the cash desk.","At the bus stop."]},{"prompt":"Choose the correct sentence.","answer":"It is too small for me.","options":["It are too small for me.","It too small is for me."]},{"prompt":"Which word means recibo?","answer":"receipt","options":["change","size"]},{"prompt":"Complete: Where ___ the cash desk?","answer":"is","options":["are","am"]},{"prompt":"Choose the natural phrase.","answer":"This one fits very well.","options":["This one fit very well.","This one fitting very well."]},{"prompt":"Choose the polite request.","answer":"Can I have the receipt, please?","options":["I have receipt now.","Give receipt me."]}];
const mission054Grammar = [{"prompt":"Choose the correct question for plural shoes.","answer":"How much are these shoes?","options":["How much is these shoes?","How many are these shoes?"]},{"prompt":"Complete: How much ___ that jacket?","answer":"is","options":["are","am"]},{"prompt":"Choose the correct demonstrative.","answer":"These trainers are cheap.","options":["This trainers are cheap.","That trainers are cheap."]},{"prompt":"Complete: They ___ thirty pounds.","answer":"are","options":["is","am"]},{"prompt":"Which word means caro?","answer":"expensive","options":["cheap","pair"]},{"prompt":"Choose the correct singular phrase.","answer":"this pair","options":["these pair","those pair"]},{"prompt":"Complete: ___ boots are expensive.","answer":"Those","options":["That","This"]},{"prompt":"Choose the natural shop question.","answer":"Do you have these in black?","options":["Do you has these in black?","Are you have these in black?"]},{"prompt":"Choose the correct answer to How much are they?","answer":"They are twenty-five pounds.","options":["It is twenty-five pounds.","They is twenty-five pounds."]},{"prompt":"Choose the natural purchase phrase.","answer":"I'll take them, please.","options":["I'll takes them, please.","I take them please will."]}];
const mission049Grammar = [{"prompt":"Choose the correct question at the door.","answer":"Do you have a reservation?","options":["Are you have a reservation?","Have you a reservation do?"]},{"prompt":"Choose the natural reply.","answer":"A table for two, please.","options":["Two table for, please.","A table two for."]},{"prompt":"Complete: Would you ___ a table by the window?","answer":"like","options":["likes","liking"]},{"prompt":"Choose the polite request.","answer":"Can we see the menu, please?","options":["We see menu now.","Do we can see menu?"]},{"prompt":"Complete: What do you ___?","answer":"recommend","options":["recommendation","recommends"]},{"prompt":"Choose the correct order.","answer":"I'd like the vegetable soup.","options":["I like would vegetable soup.","I'd the soup vegetable like."]},{"prompt":"Choose the natural dessert offer.","answer":"Would you like anything for dessert?","options":["Do you like anything dessert?","Are you like dessert?"]},{"prompt":"Complete: Could we have the ___, please?","answer":"bill","options":["bills","billing"]},{"prompt":"Choose the correct phrase.","answer":"Thank you. Have a good evening.","options":["Thank you. Have good evening a.","Have you evening good."]},{"prompt":"Which expression is used to ask for advice?","answer":"What do you recommend?","options":["What you recommend do?","What are recommend?"]}];

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

const mission045Reading = [{"prompt":"Where do Mia and Daniel eat?","answer":"At the Green Garden Restaurant.","options":["At a café.","At home."]},{"prompt":"What time is their reservation?","answer":"Seven o'clock.","options":["Six o'clock.","Eight o'clock."]},{"prompt":"Where is their table?","answer":"By the window.","options":["Near the kitchen.","Outside."]},{"prompt":"What does Mia order for a starter?","answer":"Tomato soup.","options":["A small salad.","Fish."]},{"prompt":"What does Daniel choose?","answer":"A small salad.","options":["Tomato soup.","Chicken."]},{"prompt":"What is Mia's main course?","answer":"Chicken with rice.","options":["Fish with potatoes.","Pasta."]},{"prompt":"What does Daniel order for his main course?","answer":"Fish with potatoes.","options":["Chicken with rice.","Soup."]},{"prompt":"Do they order dessert?","answer":"No, they don't.","options":["Yes, they do.","The text doesn't say."]},{"prompt":"What does the waiter bring at the end?","answer":"The bill.","options":["A dessert menu.","A second starter."]},{"prompt":"What is the text about?","answer":"A meal at a restaurant.","options":["A shopping trip.","A family breakfast."]}];
const mission046Reading = [{"prompt":"When is the lunch menu available?","answer":"Monday to Friday.","options":["At weekends.","Every evening."]},{"prompt":"How much is tomato soup?","answer":"Four pounds.","options":["Three pounds.","Five pounds."]},{"prompt":"How much is a small salad?","answer":"Three pounds fifty.","options":["Four pounds.","Two pounds."]},{"prompt":"What is the price of chicken and rice?","answer":"Eight pounds.","options":["Eight pounds fifty.","Seven pounds."]},{"prompt":"How much is fish with potatoes?","answer":"Eight pounds fifty.","options":["Eight pounds.","Nine pounds."]},{"prompt":"How much is a side salad?","answer":"Two pounds.","options":["Three pounds.","Four pounds."]},{"prompt":"How much are tea and coffee?","answer":"Two pounds each.","options":["Three pounds each.","One pound each."]},{"prompt":"What cake is on the menu?","answer":"Apple cake.","options":["Chocolate cake.","Carrot cake."]},{"prompt":"What does Mia choose?","answer":"Soup and chicken.","options":["Salad and fish.","Cake and tea."]},{"prompt":"Why do they check the prices?","answer":"Before they order.","options":["After they leave.","At breakfast."]}];
const mission047Reading = [{"prompt":"Where is the family?","answer":"At the Riverside Restaurant.","options":["At Green Café.","At home."]},{"prompt":"What does the waiter ask?","answer":"If they are ready to order.","options":["If they have a reservation for tomorrow.","If they want the bill."]},{"prompt":"What does the mother order?","answer":"Sparkling water.","options":["Orange juice.","Tea."]},{"prompt":"What does the father order?","answer":"Orange juice.","options":["Sparkling water.","Coffee."]},{"prompt":"What does the daughter choose?","answer":"Tea with milk.","options":["Coffee without milk.","Water."]},{"prompt":"What soup do they order?","answer":"Vegetable soup.","options":["Tomato soup.","Chicken soup."]},{"prompt":"How many sandwiches do they order?","answer":"Two.","options":["One.","Three."]},{"prompt":"What does the waiter do?","answer":"Repeats the order.","options":["Changes the menu.","Brings the bill."]},{"prompt":"What do they say to Anything else?","answer":"No, that's all, thank you.","options":["Yes, the bill now.","Good morning."]},{"prompt":"What does the waiter bring first?","answer":"The drinks.","options":["Dessert.","The bill."]}];
const mission048Reading = [{"prompt":"What food does Mia love?","answer":"Pasta.","options":["Fish.","Coffee."]},{"prompt":"What kind of food does Mia dislike?","answer":"Spicy food.","options":["Sweet food.","Vegetarian food."]},{"prompt":"What does Ben prefer?","answer":"Fish to chicken.","options":["Chicken to fish.","Pasta to rice."]},{"prompt":"What is Ben's favourite drink?","answer":"Orange juice.","options":["Tea.","Coffee."]},{"prompt":"What does Sara like?","answer":"Vegetables.","options":["Chocolate cake.","Fish."]},{"prompt":"What kind of meal does Sara often choose?","answer":"A vegetarian meal.","options":["A spicy meal.","A meat meal."]},{"prompt":"What does Tom love?","answer":"Chocolate cake.","options":["Coffee.","Salad."]},{"prompt":"What does Tom dislike?","answer":"Coffee.","options":["Cake.","Pasta."]},{"prompt":"What do the friends do together?","answer":"Look at the menu.","options":["Cook at home.","Go shopping."]},{"prompt":"What is the text mainly about?","answer":"Food preferences.","options":["Restaurant prices.","A cooking lesson."]}];
const mission050Reading = [{"prompt":"Where are Emma and Jack?","answer":"At a café near the station.","options":["At a clothes shop.","At home."]},{"prompt":"Why do they look at the menu?","answer":"They are hungry.","options":["They want to leave.","They need a receipt."]},{"prompt":"What does Emma order?","answer":"Tomato soup and a cheese sandwich.","options":["A chicken salad.","Orange juice."]},{"prompt":"What does Jack choose?","answer":"A chicken salad and water.","options":["A cheese sandwich.","Tomato soup."]},{"prompt":"What does the waiter offer?","answer":"Orange juice.","options":["Coffee.","Cake."]},{"prompt":"Do Emma and Jack want orange juice?","answer":"No, they don't.","options":["Yes, they do.","Only Emma does."]},{"prompt":"What do they talk about?","answer":"Their afternoon plans.","options":["Their new clothes.","Their school exams."]},{"prompt":"Who asks for the bill?","answer":"Jack.","options":["Emma.","The waiter."]},{"prompt":"Where do they pay?","answer":"At the counter.","options":["At the table.","Outside."]},{"prompt":"What is the text about?","answer":"Having lunch at a café.","options":["Buying food at a supermarket.","Cooking dinner at home."]}];
const mission051Reading = [{"prompt":"Why is Lily getting ready?","answer":"For a family party.","options":["For school.","For a football match."]},{"prompt":"What does Lily choose to wear?","answer":"A white T-shirt and a black skirt.","options":["A blue dress.","A green shirt."]},{"prompt":"What colour is Lily's dress?","answer":"Blue.","options":["Red.","Black."]},{"prompt":"What does Ben wear?","answer":"Dark blue jeans and a green shirt.","options":["A black skirt.","A red jacket."]},{"prompt":"What colour is their mother's jacket?","answer":"Red.","options":["Brown.","Green."]},{"prompt":"What shoes does Lily ask about?","answer":"Her black shoes.","options":["Ben's boots.","Her mother's shoes."]},{"prompt":"What does Ben think?","answer":"The black shoes look great.","options":["The shoes are too small.","The shoes are expensive."]},{"prompt":"Who is Ben?","answer":"Lily's brother.","options":["Lily's teacher.","Lily's father."]},{"prompt":"What event are they preparing for?","answer":"A family party.","options":["A school lesson.","A holiday trip."]},{"prompt":"What is the text mainly about?","answer":"Choosing clothes for a party.","options":["Buying a new uniform.","Washing clothes."]}];
const mission052Reading = [{"prompt":"What is the weather like?","answer":"Cold.","options":["Hot.","Rainy and warm."]},{"prompt":"What is Anna wearing?","answer":"A grey coat and a red scarf.","options":["A blue jumper.","A green jacket."]},{"prompt":"What colour is Peter's jumper?","answer":"Blue.","options":["Grey.","Red."]},{"prompt":"What trousers is Peter wearing?","answer":"Black trousers.","options":["Blue jeans.","Grey trousers."]},{"prompt":"What footwear is Peter wearing?","answer":"Brown boots.","options":["Black shoes.","White trainers."]},{"prompt":"What are two students wearing?","answer":"Hats and gloves.","options":["Dresses and skirts.","Shorts and sandals."]},{"prompt":"Where is the teacher?","answer":"Inside the classroom.","options":["Outside the school.","At home."]},{"prompt":"Why is the teacher not wearing a coat?","answer":"She is inside the classroom.","options":["It is very hot.","She has no coat."]},{"prompt":"What do the students talk about?","answer":"Their clothes.","options":["Their homework.","Their lunch."]},{"prompt":"Why does Anna like Peter's jumper?","answer":"It is a bright colour.","options":["It is very expensive.","It is too big."]}];
const mission053Reading = [{"prompt":"Why does Tom go to the shop?","answer":"He needs a new shirt for work.","options":["He needs new shoes.","He wants a jacket for a party."]},{"prompt":"What colour is the first shirt?","answer":"Blue.","options":["White.","Black."]},{"prompt":"What size does Tom ask for?","answer":"Medium.","options":["Small.","Large."]},{"prompt":"What size is available in blue?","answer":"Large.","options":["Medium.","Small."]},{"prompt":"Where does Tom try the shirt on?","answer":"In the fitting room.","options":["At the cash desk.","At home."]},{"prompt":"How does the large shirt fit?","answer":"It is too big.","options":["It is too small.","It fits perfectly."]},{"prompt":"What colour is the second shirt?","answer":"White.","options":["Blue.","Green."]},{"prompt":"What size is the white shirt?","answer":"Medium.","options":["Large.","Small."]},{"prompt":"Where does Tom pay?","answer":"At the cash desk.","options":["In the fitting room.","At the entrance."]},{"prompt":"What does Tom keep?","answer":"The receipt.","options":["The menu.","The price tag."]}];
const mission054Reading = [{"prompt":"Who is Sophie shopping with?","answer":"Mia.","options":["Anna.","Lily."]},{"prompt":"What does Sophie see first?","answer":"Black trainers.","options":["Brown boots.","Blue shoes."]},{"prompt":"How much are the black trainers?","answer":"Thirty pounds.","options":["Sixty pounds.","Twenty-five pounds."]},{"prompt":"How much are the brown boots?","answer":"Sixty pounds.","options":["Thirty pounds.","Twenty-five pounds."]},{"prompt":"Why doesn't Sophie buy the boots?","answer":"They are too expensive.","options":["They are too small.","They are the wrong colour."]},{"prompt":"Who shows Sophie the blue shoes?","answer":"Mia.","options":["The assistant.","Her sister."]},{"prompt":"Where are the blue shoes?","answer":"Near the door.","options":["By the window.","At the cash desk."]},{"prompt":"How much are the blue shoes?","answer":"Twenty-five pounds.","options":["Thirty pounds.","Sixty pounds."]},{"prompt":"What does Sophie decide to buy?","answer":"The blue shoes.","options":["The black trainers.","The brown boots."]},{"prompt":"What is the text about?","answer":"Choosing and buying shoes.","options":["Buying a new coat.","Returning a pair of boots."]}];
const mission049Reading = [{"prompt":"Where do the couple arrive?","answer":"At the Oak Tree Restaurant.","options":["At Green Café.","At the station."]},{"prompt":"What time is their table?","answer":"Half past seven.","options":["Seven o'clock.","Half past eight."]},{"prompt":"How many people is the table for?","answer":"Two.","options":["Three.","Four."]},{"prompt":"Where would they like to sit?","answer":"By the window.","options":["Outside.","Near the kitchen."]},{"prompt":"What do they ask to see?","answer":"The menu.","options":["The bill.","The dessert trolley."]},{"prompt":"What do they ask the waiter?","answer":"What he recommends.","options":["Where the station is.","What time the shop closes."]},{"prompt":"What does he recommend?","answer":"Vegetable soup and grilled chicken.","options":["Fish and chips.","Apple cake and tea."]},{"prompt":"What do they order?","answer":"Soup and two chicken dishes.","options":["Two salads.","Fish and potatoes."]},{"prompt":"What do they ask for after dinner?","answer":"The bill.","options":["The menu.","A reservation."]},{"prompt":"What is the text about?","answer":"A restaurant conversation.","options":["A café opening.","A food shop."]}];

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
  "027":"On Saturday morning, Ella visits Green Street Shop with a short shopping list. She needs two notebooks, a blue pen and a small bottle of water. The shop assistant shows her the notebooks. They are two pounds each. The pen is one pound fifty, and the water is eighty pence. Ella asks, “How much are these notebooks?” The assistant says, “They are four pounds.” Ella pays by card and asks for a receipt. She puts everything in a bag and checks the list. She has all the things she needs, so she says, “That’s all, thank you. Goodbye!”",
"030":"Alex has a busy week. On Monday and Wednesday, he studies English after work. He usually goes swimming on Tuesday. On Thursday, he visits his grandmother. He sometimes meets friends on Friday evening. He always has lunch at one o'clock. He plays tennis once a week and visits the cinema twice a month. At the weekend, he relaxes. He never works on Sunday.",
"031":"Leo gets up at seven every morning. He has breakfast with his family at half past seven. He goes to school by bus at eight. He has lunch at one o'clock. After school, he goes home and does his homework. At six, he plays football with his friends. He has dinner at eight and goes to bed at ten. He sleeps well because he has a busy day.",
"032":"The Green family has different activities during the day. In the morning, Anna drinks tea and her son gets ready for school. At midday, they have lunch. In the afternoon, Anna works and the children play after school. In the evening, they watch television together. Before bed, the children wash their faces and read a story. Everyone sleeps at night.",
"033":"Green Town Community Centre has a simple timetable. The English lesson starts at nine o'clock. The art class starts at half past ten. At quarter past twelve, the café opens for lunch. The music lesson begins at quarter to two. The last class finishes at four o'clock. The centre closes at five. On Friday, a film starts at half past six.",
"035":"Lucy has a busy week. She always has breakfast at home and usually walks to work. She often goes swimming after work, but she sometimes meets her friends for coffee. She hardly ever watches television in the evening. She never works on Sunday. Lucy goes swimming once a week and visits her parents twice a week.",
"036":"Ben gets up at seven every morning. His friend asks him about his routine. Ben says he gets up early and has breakfast at home. He starts work at nine and finishes at five. His sister Emma gets up later. She does not have breakfast at seven, and she goes to school by bus. They both go to bed before eleven.",
"037":"Mia and Tom have a busy week. Mia studies English on Monday morning and plays tennis on Tuesday afternoon. On Wednesday evening, she visits her friend. Tom works on Monday and Thursday, and he goes shopping on Friday. They both relax on Saturday. On Sunday, Mia visits her family and Tom reads at home. Sunday is their favourite free day.",
"038":"Alex and Nina enjoy the weekend. On Saturday, Alex usually meets his friends and they go out for lunch. Nina sometimes goes shopping with her sister. In the evening, they watch a film. On Sunday, Alex stays at home and relaxes. Nina visits her grandparents. They like their weekends because they have time for family and friends.",
"039":"Emma studies at Green Town College from Monday to Thursday. Her first lesson starts at nine o'clock and finishes at ten. She has a break at eleven and has lunch at lunchtime. On Friday, she works in a bookshop from ten to four. Her brother Daniel works in an office. His schedule starts at eight and finishes at five. Sunday is his day off.",
"034":"Mia has a small calendar on her desk. Today is Monday, and her English class is on Tuesday. She plays tennis on Wednesday and visits her grandmother on Thursday. Friday is her favourite day because she meets her friends. The shop is open on Saturday, and she relaxes on Sunday. Her birthday is in January. Her brother's birthday is in February. Their friend Lily has a birthday on the fifth of May.",

  "040":"Leo has a busy day. He wakes up at seven and gets up ten minutes later. He has breakfast with his sister, then he goes to school by bus. Lessons start at nine. He has lunch at one and finishes school at three. After school, he does his homework and plays football. In the evening, he has dinner with his family. He reads before bed and goes to bed at ten.",
  "041":"Mia and her brother Ben talk about food they like. Mia likes rice, chicken and vegetables, but she doesn't like fish. Ben likes fish and pasta. They both eat fruit every day. Mia drinks water with lunch, and Ben usually has milk for breakfast. At the weekend, they make a simple meal together. They choose a chicken dish and a salad, and they have orange juice.",
  "042":"On Saturday, Ella goes to the market with her dad. They buy apples, bananas and oranges. Ella chooses some grapes too. Her dad buys tomatoes, potatoes and carrots for dinner. At home, they make a salad and prepare sandwiches for a picnic. Ella puts an apple and a banana in her bag. She says fruit is a good snack after a walk.",
  "043":"The Green family have breakfast at seven in the morning. They usually eat bread and fruit and drink tea. The children have lunch at school at midday. Their parents have lunch at work. In the evening, everyone has dinner together at half past six. On Saturday, they sometimes have a snack in the park. Their favourite meal is dinner because they can talk about the day.",
  "044":"Tom and Anna are at Green Café. They look at the menu. Tom says, I'd like a cheese sandwich and a coffee, please. Anna asks for a cup of tea and a piece of cake. The waiter brings their order and says, Here you are. They enjoy their food and talk about the weekend. At the end, Tom asks for the bill. He pays, and they thank the waiter.",
"045":"Mia and Daniel have a reservation at the Green Garden Restaurant for seven o'clock. The waiter takes them to a table by the window and gives them two menus. Mia orders tomato soup for a starter. Daniel chooses a small salad. For the main course, Mia has chicken with rice and Daniel has fish with potatoes. They do not order dessert because they are full. The waiter brings the bill, and they thank him before leaving.",
"046":"The Green Garden has a lunch menu from Monday to Friday. Tomato soup costs £4.00 and a small salad costs £3.50. For the main course, chicken and rice is £8.00. Fish with potatoes is £8.50. A side salad costs £2.00. Tea and coffee are £2.00 each, and apple cake is £3.00. Mia chooses soup and chicken. Daniel orders salad and fish. They check the prices before they order.",
"047":"At the Riverside Restaurant, a family is ready to order. The mother asks for a glass of sparkling water. The father would like orange juice. Their daughter chooses tea with milk. They order vegetable soup and two chicken sandwiches. The waiter asks if they want anything else. The family says no, thank you. The waiter repeats the drinks and food to check the order, then takes the menus away.",
"048":"Mia and her friends are talking about food. Mia loves pasta, but she does not like spicy food. Ben prefers fish to chicken, and his favourite drink is orange juice. Sara likes vegetables and often chooses a vegetarian meal. Tom loves chocolate cake, but he does not like coffee. They look at the menu together and choose different dishes. Everyone finds something they like.",
"049":"A couple arrives at the Oak Tree Restaurant. The host asks if they have a reservation. They say they have a table for two at half past seven. The waiter takes them to their table and gives them the menus. They ask what he recommends. He suggests the vegetable soup and the grilled chicken. They order the soup and two main courses. After dinner, they ask for the bill and thank the staff.",
"050":"Emma and Jack are having lunch at a small café near the station. They look at the menu and choose different meals. Emma orders tomato soup and a cheese sandwich. Jack asks for a chicken salad and a glass of water. The waiter offers them orange juice, but they say no, thank you. They enjoy their lunch and talk about their afternoon plans. Before they leave, Jack asks for the bill. They pay at the counter and thank the waiter.",
"051":"Lily is getting ready for a family party. She has got a blue dress, but today she wants to wear something different. She chooses a white T-shirt and a black skirt. Her brother Ben wears dark blue jeans and a green shirt. Their mother has a red jacket and brown shoes. Lily looks at the clothes and asks Ben which shoes are best. He thinks her black shoes look great with the skirt.",
"052":"It is cold today, and the students are wearing warm clothes. Anna is wearing a long grey coat and a red scarf. Her friend Peter is wearing a blue jumper, black trousers and brown boots. Two other students are wearing hats and gloves. Their teacher is not wearing a coat because she is inside the classroom. The students are talking about their clothes before the lesson starts. Anna likes Peter's jumper because it is a bright colour.",
"053":"Tom goes to a clothes shop because he needs a new shirt for work. He finds a blue shirt and asks the shop assistant for a medium size. The assistant checks the shelf but only has a large one. Tom tries it on in the fitting room, but it is too big. The assistant finds a white shirt in medium. Tom likes it and decides to buy it. He pays at the cash desk and keeps the receipt.",
"054":"Sophie is shopping for new shoes with her friend Mia. Sophie sees a pair of black trainers and asks the assistant how much they are. They cost thirty pounds. She also looks at some brown boots, but they are sixty pounds and too expensive. Mia points to a pair of blue shoes near the door. They are twenty-five pounds. Sophie tries them on and likes them. She decides to buy the blue shoes and thanks the assistant."
,
  "055": "Emma buys fruit at a market. A kilo of apples costs two pounds. Oranges cost one pound fifty, and two bottles of water cost one pound. The total is four pounds fifty. Emma gives the assistant a five-pound note and receives fifty pence change. She checks the receipt and puts the coins in her purse.",
  "056": "Leo is looking for a blue shirt. The shop assistant asks what size he needs. He wants a medium, but the shirt is not available. The assistant finds another shirt, and Leo tries it on in the fitting room. It fits well. He asks how much it is and pays by card. The assistant gives him the receipt.",
  "057": "Nina finds a wallet and a set of keys on a chair at the community centre. There is a phone next to them, but it belongs to her friend Sam. Nina asks the teacher whose things they are. The wallet belongs to Alex. Sam collects his phone, and Alex comes back for his wallet and keys. Everyone is happy to find their things.",
  "058": "Maya is getting ready for a family lunch. Her favourite outfit is a green jumper, blue jeans and comfortable trainers. She wears a scarf when it is cold. Her brother prefers a smart jacket and black trousers. Their mother likes colourful dresses. Maya says clothes do not need to be expensive; they need to be comfortable and suitable for the day.",
  "059": "Ben visits the market with his grandmother. They buy a kilo of apples and six bananas at the fruit stall. At the next stall, they ask for half a kilo of tomatoes and some carrots. The seller weighs the vegetables and tells them the price. Ben gives the seller a ten-pound note. His grandmother checks the change and puts the food in a shopping bag.",
  "060": "Lucy visits a small shop after work. She has a shopping list and a basket. She chooses a notebook, a bottle of water and two pens. The shop assistant tells her the total is eight pounds. Lucy pays by card and asks for a receipt. The assistant puts the items in a bag and gives her the receipt. Lucy checks the receipt and says thank you before she leaves.",
  "061": "Tom enjoys his free time. He likes reading and listening to music at home. On Saturdays, he often goes cycling with his friend Ben. His sister Mia likes dancing and watching films. They sometimes go out together for a coffee. Tom prefers outdoor activities. On Sunday evening, he relaxes and reads a book.",
  "062": "A group of friends enjoys different sports. Ella plays tennis on Monday and goes swimming on Wednesday. Jack plays football for a local team. His sister likes basketball and has training on Friday. At the weekend, they sometimes go running in the park. Their favourite sport is football, but they enjoy trying new activities together.",
  "063": "At the school sports day, the teacher asks the students about their skills. Ben can swim and ride a bike, but he cannot skate. Mia can dance and sing. Alex can play the guitar, but he cannot cook. Their teacher can run very fast. The students write three things they can do and one thing they cannot do.",
  "064": "Nina is having a birthday party on Saturday afternoon. She invites her friend Oliver by message. She asks, Would you like to come to my party? Oliver would love to come, but he is busy in the morning. They agree to meet at three o'clock. Oliver asks if he can bring a friend. Nina says yes and thanks him.",
  "065": "It is six o'clock in the evening. Emma is sitting in the living room and reading a book. Her brother is listening to music. Their father is cooking dinner, and their mother is talking on the phone. The dog is sleeping near the sofa. Nobody is watching television. Emma's friend asks, What are you doing? Emma replies, I'm reading.",
  "066": "The Green Street Sports Centre has a gym, a swimming pool and two tennis courts. The reception desk is near the main door. Members can use the changing rooms and lockers. The swimming pool opens at seven in the morning and closes at eight in the evening. A fitness class starts at six on Tuesdays.",
  "067": "Sofia's favourite hobby is photography. She enjoys taking pictures of parks, buildings and flowers. Her brother likes gardening and grows tomatoes in the summer. Their friend Leo collects postcards. They sometimes meet on Sunday afternoon to share their hobbies. Sofia likes photography because it is creative and relaxing.",
  "068": "Ben is making plans for Saturday. In the morning, he is visiting his grandparents. At three o'clock, he is meeting Emma outside the station. They are going to the cinema because a new film starts at four. After the film, they are having dinner in a café. Ben sends Emma a message to confirm the plan.",
  "069": "Maya and Leo are choosing an activity for Saturday. Maya suggests going to the cinema. Leo thinks it is a good idea, but he does not agree about the film because it is too long. He suggests playing tennis instead. Maya prefers the cinema because it may rain. They decide to check the weather and meet at six.",
  "071": "Lucy goes to Green Hill School. Her favourite subject is science because they do experiments. She has maths on Monday and Wednesday. English is on Tuesday morning, and art is on Friday. Music starts at eleven. She keeps her books in her school bag. PE is in the sports hall after lunch. School finishes at half past three.",
  "072": "In our English class, Mr Brown starts with a greeting. He writes five new words on the board. First, we listen and repeat. Then we open our books on page twelve and read a short dialogue. We work in pairs and write three answers in our notebooks. If a word is difficult, we ask the teacher. At the end, we close our books.",
  "073": "Daniel is a doctor at City Hospital. He works with a nurse called Anna. Anna helps patients and works at reception in the morning. Daniel starts at eight and finishes at four. His sister Mia is a teacher. She works at a primary school and teaches English. Their uncle is a bus driver. He drives people around the city every day.",
  "074": "Hello, my name is Alex. I am a student and I study English in the evening. I also work in a hotel at the weekend. My friend Nina is an engineer. She works for a company in the city centre. Her brother is a shop assistant. He works in a sports shop. We sometimes meet after work and talk about our jobs and studies.",
  "075": "Maria works in a small office. She starts work at half past eight and checks her emails first. At ten, she has a meeting with two colleagues. They talk about a new project. At eleven, Maria has a short break and drinks tea. She has lunch at one o'clock. In the afternoon, she answers calls and writes reports. She finishes work at five.",
  "076": "Jamie uses technology every day. He has a laptop for school and a mobile phone for messages. At home, he sometimes uses a tablet to read books. His sister uses the family computer to do her homework. The keyboard is on the desk and the mouse is next to it. They use the internet to study English and find information for projects.",
  "077": "To: Sam. Subject: English project. Hi Sam, thanks for your message. Our English project is about animals. Can we meet in the library on Thursday at four? Please bring your notes and the pictures. I can send you my questions this evening. Let me know if Thursday is good for you. See you soon, Alex.",
  "078": "At nine o'clock, Tom calls the school office. He wants to speak to his English teacher, Mr Lee. The secretary says Mr Lee is in a meeting. Tom leaves a message: the class starts at ten today, not nine. He gives his phone number and asks Mr Lee to call back. The secretary repeats the number to check it.",
  "079": "At Green School, students must arrive before nine. They must bring their books and wear the school uniform. They must keep the classroom clean. Students mustn't use mobile phones during lessons. In the science room, everyone must listen to the teacher and mustn't touch equipment without permission. At lunchtime, students can talk quietly in the dining room.",
  "080": "My name is Sofia and I am a student. I study at West College from Monday to Thursday. My favourite subject is English because I enjoy speaking with people. I also work in a café on Friday and Saturday. I start at nine and finish at two. I can use a computer and speak two languages. In the future, I want to work in a hotel.",
  "081": "In Bristol, the weather changes during the year. Spring is often sunny, but it can be rainy. Summer is usually warm. Autumn is cool and windy. In winter, it is sometimes very cold and it can snow. Today it is cloudy, so Mia takes her coat and umbrella.",
  "082": "The forecast says it will be sunny on Saturday and rainy on Sunday. Leo wants to go cycling, so he plans the trip for Saturday morning. The temperature will be sixteen degrees. He takes a light jacket and water. On Sunday, he is going to stay at home because it will be wet and windy.",
  "083": "Ella has got two pets: a dog called Max and a small rabbit. Max is friendly and likes playing in the garden. Ella takes him for a walk every afternoon. The rabbit eats carrots and green leaves. Ella gives both animals fresh water every day. On Friday, she takes Max to the vet.",
  "084": "Green Farm is near a small village. There are six cows, four horses and many sheep. The chickens live in a large house and lay eggs every morning. Mr Hill is the farmer. He gets up at six and feeds the animals. His daughter helps after school. They sell eggs at the village market.",
  "085": "Ben and his family spend Sunday in the countryside. They walk through a forest and follow a path to a lake. There are tall trees and small flowers near the water. Ben's sister takes photos of the mountains. At midday, they have a picnic under a tree. They take their rubbish home.",
  "086": "Tom lives in a flat with his parents. His bedroom is next to the bathroom. There is a bed, a desk and a large wardrobe in his room. His books are on a shelf above the desk. The living room has a sofa and two armchairs. The kitchen is opposite the dining room.",
  "087": "In the Green family, everyone helps at home. Dad cooks dinner on Mondays and Wednesdays. Mum does the washing at the weekend. Alex tidies his bedroom every Saturday, and his sister makes her bed every morning. They do the dishes after dinner. The family shares the chores.",
  "088": "Nina cannot find her school bag. Her brother helps her look for it. First, they check under the table and behind the sofa. The bag is not there. Then Nina sees it next to the front door. Her keys are inside the small pocket, and her notebook is on the chair. Now she is ready to leave.",
  "089": "After school, Mia gets home at four o'clock. She puts her bag in her bedroom and has a snack in the kitchen. Then she does her homework at her desk. At six, she waters the plants and feeds the cat. Her family has dinner at seven. After dinner, they relax in the living room.",
  "090": "I live in a small flat in a quiet neighbourhood. There is a supermarket opposite my building and a bus stop near the corner. The local library is next to a café. There are two parks in the area, and children play in the playground after school. The streets are busy in the morning but quiet in the evening.",
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
      const grammarBanks: Record<string, any[]> = { "050": mission050Grammar, "051": mission051Grammar, "052": mission052Grammar, "053": mission053Grammar, "054": mission054Grammar, "045": mission045Grammar, "046": mission046Grammar, "047": mission047Grammar, "048": mission048Grammar, "049": mission049Grammar, "034": mission034Grammar, "033": mission033Grammar, "032": mission032Grammar, "031": mission031Grammar, "030": mission030Grammar, "023": mission023Grammar, "021": mission021Grammar, "020": mission020Grammar, "019": mission019Grammar, "018": mission018Grammar, "017": mission017Grammar, "016": mission016Grammar, "015": mission015Grammar ,
  "071": [{"prompt":"Choose the correct sentence about school subjects.","answer":"My favourite subject is science.","options":["We have English on Monday.","Maths is at nine o'clock."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"We have English on Monday.","options":["Maths is at nine o'clock.","I need my school bag."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"Maths is at nine o'clock.","options":["I need my school bag.","Our history lesson is interesting."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"I need my school bag.","options":["Our history lesson is interesting.","PE is in the afternoon."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"Our history lesson is interesting.","options":["PE is in the afternoon.","The art room is next to the library."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"PE is in the afternoon.","options":["The art room is next to the library.","I have music on Friday."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"The art room is next to the library.","options":["I have music on Friday.","What is your favourite subject?"]},{"prompt":"Choose the correct sentence about school subjects.","answer":"I have music on Friday.","options":["What is your favourite subject?","The lesson finishes at three."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"What is your favourite subject?","options":["The lesson finishes at three.","My favourite subject is science."]},{"prompt":"Choose the correct sentence about school subjects.","answer":"The lesson finishes at three.","options":["My favourite subject is science.","We have English on Monday."]}],
  "072": [{"prompt":"Choose the correct sentence about classroom english.","answer":"Open your book on page ten.","options":["Please listen to the teacher.","Can you repeat that, please?"]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Please listen to the teacher.","options":["Can you repeat that, please?","Write the answer in your notebook."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Can you repeat that, please?","options":["Write the answer in your notebook.","Look at the board."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Write the answer in your notebook.","options":["Look at the board.","Work in pairs, please."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Look at the board.","options":["Work in pairs, please.","Don't speak during the test."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Work in pairs, please.","options":["Don't speak during the test.","Read the question carefully."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Don't speak during the test.","options":["Read the question carefully.","I don't understand this word."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Read the question carefully.","options":["I don't understand this word.","Can I ask a question?"]},{"prompt":"Choose the correct sentence about classroom english.","answer":"I don't understand this word.","options":["Can I ask a question?","Open your book on page ten."]},{"prompt":"Choose the correct sentence about classroom english.","answer":"Can I ask a question?","options":["Open your book on page ten.","Please listen to the teacher."]}],
  "073": [{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"My aunt is a nurse.","options":["She works in a hospital.","He is a bus driver."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"She works in a hospital.","options":["He is a bus driver.","A teacher works at a school."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"He is a bus driver.","options":["A teacher works at a school.","The shop assistant helps customers."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"A teacher works at a school.","options":["The shop assistant helps customers.","My father works in an office."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"The shop assistant helps customers.","options":["My father works in an office.","Doctors help people."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"My father works in an office.","options":["Doctors help people.","Where does she work?"]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"Doctors help people.","options":["Where does she work?","He works in a small shop."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"Where does she work?","options":["He works in a small shop.","I want to be a teacher."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"He works in a small shop.","options":["I want to be a teacher.","My aunt is a nurse."]},{"prompt":"Choose the correct sentence about jobs and workplaces.","answer":"I want to be a teacher.","options":["My aunt is a nurse.","She works in a hospital."]}],
  "074": [{"prompt":"Choose the correct sentence about what do you do?.","answer":"What do you do?","options":["I'm a student.","Where do you work?"]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"I'm a student.","options":["Where do you work?","I work in a hotel."]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"Where do you work?","options":["I work in a hotel.","Do you study English?"]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"I work in a hotel.","options":["Do you study English?","Yes, I do."]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"Do you study English?","options":["Yes, I do.","Do you work on Saturdays?"]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"Yes, I do.","options":["Do you work on Saturdays?","No, I don't."]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"Do you work on Saturdays?","options":["No, I don't.","She is an engineer."]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"No, I don't.","options":["She is an engineer.","He works for a small company."]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"She is an engineer.","options":["He works for a small company.","What do you do?"]},{"prompt":"Choose the correct sentence about what do you do?.","answer":"He works for a small company.","options":["What do you do?","I'm a student."]}],
  "075": [{"prompt":"Choose the correct sentence about a working day.","answer":"I start work at eight.","options":["She finishes at five.","We have a break at eleven."]},{"prompt":"Choose the correct sentence about a working day.","answer":"She finishes at five.","options":["We have a break at eleven.","I check my emails every morning."]},{"prompt":"Choose the correct sentence about a working day.","answer":"We have a break at eleven.","options":["I check my emails every morning.","He has lunch with his colleagues."]},{"prompt":"Choose the correct sentence about a working day.","answer":"I check my emails every morning.","options":["He has lunch with his colleagues.","The meeting starts at ten."]},{"prompt":"Choose the correct sentence about a working day.","answer":"He has lunch with his colleagues.","options":["The meeting starts at ten.","I help customers in the shop."]},{"prompt":"Choose the correct sentence about a working day.","answer":"The meeting starts at ten.","options":["I help customers in the shop.","After lunch, I use the computer."]},{"prompt":"Choose the correct sentence about a working day.","answer":"I help customers in the shop.","options":["After lunch, I use the computer.","My working day is busy."]},{"prompt":"Choose the correct sentence about a working day.","answer":"After lunch, I use the computer.","options":["My working day is busy.","What time do you finish work?"]},{"prompt":"Choose the correct sentence about a working day.","answer":"My working day is busy.","options":["What time do you finish work?","I start work at eight."]},{"prompt":"Choose the correct sentence about a working day.","answer":"What time do you finish work?","options":["I start work at eight.","She finishes at five."]}],
  "076": [{"prompt":"Choose the correct sentence about technology around us.","answer":"I use a laptop for work.","options":["She has a new tablet.","The keyboard is next to the screen."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"She has a new tablet.","options":["The keyboard is next to the screen.","I send messages on my phone."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"The keyboard is next to the screen.","options":["I send messages on my phone.","We use the internet at home."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"I send messages on my phone.","options":["We use the internet at home.","He can use this computer."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"We use the internet at home.","options":["He can use this computer.","Open the website, please."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"He can use this computer.","options":["Open the website, please.","My mouse is on the desk."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"Open the website, please.","options":["My mouse is on the desk.","Do you have a mobile phone?"]},{"prompt":"Choose the correct sentence about technology around us.","answer":"My mouse is on the desk.","options":["Do you have a mobile phone?","I study English online."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"Do you have a mobile phone?","options":["I study English online.","I use a laptop for work."]},{"prompt":"Choose the correct sentence about technology around us.","answer":"I study English online.","options":["I use a laptop for work.","She has a new tablet."]}],
  "077": [{"prompt":"Choose the correct sentence about messages and emails.","answer":"Hi Sam, how are you?","options":["Thanks for your message.","Please send me the address."]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"Thanks for your message.","options":["Please send me the address.","I am free on Friday."]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"Please send me the address.","options":["I am free on Friday.","See you tomorrow."]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"I am free on Friday.","options":["See you tomorrow.","What is the email about?"]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"See you tomorrow.","options":["What is the email about?","The subject is English homework."]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"What is the email about?","options":["The subject is English homework.","Please reply today."]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"The subject is English homework.","options":["Please reply today.","Dear Ms Green,"]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"Please reply today.","options":["Dear Ms Green,","Best wishes, Alex"]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"Dear Ms Green,","options":["Best wishes, Alex","Hi Sam, how are you?"]},{"prompt":"Choose the correct sentence about messages and emails.","answer":"Best wishes, Alex","options":["Hi Sam, how are you?","Thanks for your message."]}],
  "078": [{"prompt":"Choose the correct sentence about phone conversations.","answer":"Hello, this is Anna speaking.","options":["Can I speak to Mr Lee?","Hold on, please."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Can I speak to Mr Lee?","options":["Hold on, please.","I'm sorry, he's not here."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Hold on, please.","options":["I'm sorry, he's not here.","Can I take a message?"]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"I'm sorry, he's not here.","options":["Can I take a message?","Please ask her to call me back."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Can I take a message?","options":["Please ask her to call me back.","I think you have the wrong number."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Please ask her to call me back.","options":["I think you have the wrong number.","Thanks for calling."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"I think you have the wrong number.","options":["Thanks for calling.","Goodbye. Speak to you soon."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Thanks for calling.","options":["Goodbye. Speak to you soon.","Can you repeat your number?"]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Goodbye. Speak to you soon.","options":["Can you repeat your number?","Hello, this is Anna speaking."]},{"prompt":"Choose the correct sentence about phone conversations.","answer":"Can you repeat your number?","options":["Hello, this is Anna speaking.","Can I speak to Mr Lee?"]}],
  "079": [{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You must be on time.","options":["You mustn't use your phone in class.","Please keep the room clean."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You mustn't use your phone in class.","options":["Please keep the room clean.","Students must wear a uniform."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"Please keep the room clean.","options":["Students must wear a uniform.","You must listen carefully."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"Students must wear a uniform.","options":["You must listen carefully.","You mustn't run in the corridor."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You must listen carefully.","options":["You mustn't run in the corridor.","We must follow the safety rules."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You mustn't run in the corridor.","options":["We must follow the safety rules.","Do not touch this machine."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"We must follow the safety rules.","options":["Do not touch this machine.","You must wash your hands."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"Do not touch this machine.","options":["You must wash your hands.","You must ask before you leave."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You must wash your hands.","options":["You must ask before you leave.","You must be on time."]},{"prompt":"Choose the correct sentence about rules at school and work.","answer":"You must ask before you leave.","options":["You must be on time.","You mustn't use your phone in class."]}],
  "080": [{"prompt":"Choose the correct sentence about study and work profile.","answer":"My name is Daniel.","options":["I am a student.","I study English every evening."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I am a student.","options":["I study English every evening.","I work in a café."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I study English every evening.","options":["I work in a café.","My favourite subject is science."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I work in a café.","options":["My favourite subject is science.","I can use a computer."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"My favourite subject is science.","options":["I can use a computer.","I start work at nine."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I can use a computer.","options":["I start work at nine.","I finish classes at three."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I start work at nine.","options":["I finish classes at three.","In the future, I want to be a nurse."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"I finish classes at three.","options":["In the future, I want to be a nurse.","This is my study and work profile."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"In the future, I want to be a nurse.","options":["This is my study and work profile.","My name is Daniel."]},{"prompt":"Choose the correct sentence about study and work profile.","answer":"This is my study and work profile.","options":["My name is Daniel.","I am a student."]}]
};
      const grammarQuestions = grammarBanks[id] ?? Array.from({ length: 10 }, (_, i) => ({ prompt: "Which grammar structure is practised in this mission?", answer: p.grammar[i % p.grammar.length], options: [p.grammar[i % p.grammar.length], p.grammar[(i + 1) % p.grammar.length], p.grammar[(i + 2) % p.grammar.length]] }));
      items = grammarQuestions.map((q: any, i: number) => ({ itemId: `english-a1-m${id}-grammar-${i + 1}`, position: i + 1, ...q, evaluation: { type: "single_choice" } }));
    } else if (key === "pronunciation") {
      items = vocab.flatMap((word,i) => word.english.split(" / ").map((term,partIndex) => { const normalizedTerm = term.trim().toLowerCase().replace(/’/g, "'").replace(/[?….,!;:]/g, "").replace(/\s+/g, " "); const mission028PhraseGuides: Record<string, string> = { "how long can i borrow this": "jáu long kan ai bó-rou dis", "where can i find": "uér kan ai fáind", "i must return this book": "ai mast ri-térn dis buk", "what do you do": "uót du iu dú", "where do you work": "uér du iu uérk", "i'm a teacher": "áim e tí-cher", "he works in a hospital": "ji uérks in e jós-pi-tal", "she works in a shop": "shi uérks in e shóp", "what time does the library close": "uót táim daz de lái-bre-ri klóuz", "what time is it": "uót táim iz it", "it is seven o'clock": "it iz sé-ven e-klók", "it is half past eight": "it iz jáf past éit", "it is quarter past nine": "it iz kuór-ter past náin", "it is quarter to ten": "it iz kuór-ter tu tén", "my birthday is in january": "mái bérz-dei iz in yán-iu-e-ri", "her birthday is on the fifth of may": "jer bérz-dei iz on de fífz ov méi" }; const pronunciationGuide = (id >= "028" && id <= "034") ? mission028PhraseGuides[normalizedTerm] ?? getSpanishPronunciationGuide(term) ?? getSpanishPronunciationGuide(word.english) : getSpanishPronunciationGuide(term); return { itemId:`english-a1-m${id}-pronunciation-${i+1}-${partIndex+1}`, position:i+1, word:term, translation:word.spanish.split(" / ")[partIndex] ?? word.spanish, pronunciationGuide, audio:"tts:en-GB", prompt:(id >= "028" && id <= "034") && pronunciationGuide ? `Listen, read this pronunciation guide: ${pronunciationGuide}. Then repeat the word.` : "Listen, read the guide and repeat the word.", options:[term,vocab[(i+1)%vocab.length].english,vocab[(i+2)%vocab.length].english], answer:term, taskType:"listening_and_guided_production" }; }));
    } else if (key === "reading") {
      content = { passageId:`english-a1-m${id}-reading-passage`, passage:passages[id] ?? p.goal };
      const readingBanks: Record<string, any[]> = { "050": mission050Reading, "051": mission051Reading, "052": mission052Reading, "053": mission053Reading, "054": mission054Reading, "045": mission045Reading, "046": mission046Reading, "047": mission047Reading, "048": mission048Reading, "049": mission049Reading, "034": mission034Reading, "033": mission033Reading, "032": mission032Reading, "031": mission031Reading, "030": mission030Reading, "029": mission029Reading, "028": mission028Reading, "027": mission027Reading, "026": mission026Reading, "023": mission023Reading, "021": mission021Reading, "020": mission020Reading, "019": mission019Reading, "018": mission018Reading, "017": mission017Reading, "016": mission016Reading, "015": mission015Reading ,
  "071": [{"prompt":"What is Lucy's favourite subject?","answer":"science","options":[["maths","history"],null]},{"prompt":"Why does she like it?","answer":"They do experiments.","options":[["It is on Friday.","The teacher is funny."],null]},{"prompt":"When does she have maths?","answer":"Monday and Wednesday","options":[["Tuesday and Friday","Every afternoon"],null]},{"prompt":"When is English?","answer":"Tuesday morning","options":[["Friday morning","Monday afternoon"],null]},{"prompt":"What time does music start?","answer":"eleven o'clock","options":[["nine o'clock","half past three"],null]},{"prompt":"Where is PE?","answer":"in the sports hall","options":[["in Room Twelve","in the library"],null]},{"prompt":"When does school finish?","answer":"half past three","options":[["two o'clock","eleven thirty"],null]},{"prompt":"Which school does Lucy attend?","answer":"Green Hill School","options":[["City School","West College"],null]},{"prompt":"Which subject does she have on Friday?","answer":"art","options":[["history","maths"],null]},{"prompt":"What does she keep in her school bag?","answer":"her books","options":[["her lunch","her trainers"],null]}],
  "072": [{"prompt":"Who teaches the class?","answer":"Mr Brown","options":[["Mr Green","Miss Smith"],null]},{"prompt":"How many new words does he write?","answer":"five","options":[["three","twelve"],null]},{"prompt":"What do students do first?","answer":"listen and repeat","options":[["write answers","work in pairs"],null]},{"prompt":"Which page do they open?","answer":"page twelve","options":[["page ten","page fifteen"],null]},{"prompt":"How many answers do they write?","answer":"three","options":[["five","twelve"],null]},{"prompt":"What do they do if a word is difficult?","answer":"ask the teacher","options":[["close the book","leave the room"],null]},{"prompt":"What do students read?","answer":"a short dialogue","options":[["a long story","a timetable"],null]},{"prompt":"How do students work?","answer":"in pairs","options":[["in groups of ten","alone all lesson"],null]},{"prompt":"Where do they write their answers?","answer":"in their notebooks","options":[["on the board","on the door"],null]},{"prompt":"What do they do at the end?","answer":"close their books","options":[["open the window","write five words"],null]}],
  "073": [{"prompt":"Where does Daniel work?","answer":"City Hospital","options":[["a school","a bookshop"],null]},{"prompt":"Who works with Daniel?","answer":"Anna","options":[["Mia","Tom"],null]},{"prompt":"What does Anna do in the morning?","answer":"works at reception","options":[["drives a bus","teaches English"],null]},{"prompt":"When does Daniel finish?","answer":"four o'clock","options":[["six o'clock","seven o'clock"],null]},{"prompt":"What does Mia teach?","answer":"English","options":[["science","maths"],null]},{"prompt":"What does the uncle drive?","answer":"a bus","options":[["a taxi","a train"],null]},{"prompt":"Where does Mia work?","answer":"at a primary school","options":[["at a hospital","in a bookshop"],null]},{"prompt":"What does Anna help?","answer":"patients","options":[["customers","students"],null]},{"prompt":"When does Daniel start?","answer":"eight","options":[["seven","nine"],null]},{"prompt":"What does the uncle do every day?","answer":"drives people around the city","options":[["teaches English","helps patients"],null]}],
  "074": [{"prompt":"What is Alex?","answer":"a student","options":[["an engineer","a teacher"],null]},{"prompt":"When does Alex work at the hotel?","answer":"at the weekend","options":[["every morning","on Monday"],null]},{"prompt":"What is Nina's job?","answer":"engineer","options":[["shop assistant","student"],null]},{"prompt":"Where does Nina work?","answer":"in the city centre","options":[["in a hotel","at a school"],null]},{"prompt":"Where does Nina's brother work?","answer":"in a sports shop","options":[["in a café","in a hotel"],null]},{"prompt":"When does Alex study English?","answer":"in the evening","options":[["in the morning","at lunchtime"],null]},{"prompt":"What does Alex do at the weekend?","answer":"works in a hotel","options":[["works in a sports shop","teaches English"],null]},{"prompt":"What does Nina do?","answer":"she is an engineer","options":[["she is a student","she is a teacher"],null]},{"prompt":"Where does Nina's brother work?","answer":"in a sports shop","options":[["in a hotel","in a school"],null]},{"prompt":"When do the friends sometimes meet?","answer":"after work","options":[["before breakfast","at lunchtime"],null]}],
  "075": [{"prompt":"Where does Maria work?","answer":"in a small office","options":[["in a school","in a shop"],null]},{"prompt":"What does she do first?","answer":"checks her emails","options":[["has lunch","writes reports"],null]},{"prompt":"When is her meeting?","answer":"at ten","options":[["at eleven","at one"],null]},{"prompt":"Who is at the meeting?","answer":"two colleagues","options":[["customers","her family"],null]},{"prompt":"What does she drink during her break?","answer":"tea","options":[["coffee","water"],null]},{"prompt":"When does Maria have lunch?","answer":"at one","options":[["at ten","at five"],null]},{"prompt":"What does she do in the afternoon?","answer":"answers calls and writes reports","options":[["opens the doors","checks the stock"],null]},{"prompt":"How many colleagues are at the meeting?","answer":"two","options":[["three","five"],null]},{"prompt":"When does Maria have a break?","answer":"at eleven","options":[["at ten","at one"],null]},{"prompt":"What time does Maria finish work?","answer":"five","options":[["four","half past five"],null]}],
  "076": [{"prompt":"What does Jamie use for school?","answer":"a laptop","options":[["a tablet","a mobile phone"],null]},{"prompt":"What does he use his phone for?","answer":"messages","options":[["reading books","homework"],null]},{"prompt":"What does his sister use?","answer":"the family computer","options":[["Jamie's laptop","a phone"],null]},{"prompt":"Where is the mouse?","answer":"next to the keyboard","options":[["under the desk","on the screen"],null]},{"prompt":"Why do they use the internet?","answer":"to study and find information","options":[["to play games only","to watch films"],null]},{"prompt":"What does Jamie use to read books?","answer":"a tablet","options":[["a mobile phone","a keyboard"],null]},{"prompt":"What does his sister do on the computer?","answer":"her homework","options":[["send work emails","play games"],null]},{"prompt":"Where is the keyboard?","answer":"on the desk","options":[["under the chair","in the bag"],null]},{"prompt":"What is next to the keyboard?","answer":"the mouse","options":[["the tablet","the phone"],null]},{"prompt":"What do they study online?","answer":"English","options":[["history","music"],null]}],
  "077": [{"prompt":"What is Alex's project about?","answer":"animals","options":[["technology","sports"],null]},{"prompt":"Where do Alex and Sam want to meet?","answer":"in the library","options":[["at school","in a café"],null]},{"prompt":"When do they want to meet?","answer":"Thursday at four","options":[["Friday at four","Thursday at five"],null]},{"prompt":"What should Sam bring?","answer":"notes and pictures","options":[["lunch and water","a computer"],null]},{"prompt":"When can Alex send questions?","answer":"this evening","options":[["tomorrow morning","on Friday"],null]},{"prompt":"Who is Alex writing to?","answer":"Sam","options":[["Lucy","Emma"],null]},{"prompt":"What is the subject of the email?","answer":"English project","options":[["class trip","school rules"],null]},{"prompt":"What time do they want to meet?","answer":"four","options":[["three","five"],null]},{"prompt":"What can Alex send this evening?","answer":"his questions","options":[["the bus ticket","a school uniform"],null]},{"prompt":"How does Alex finish the message?","answer":"See you soon","options":[["Good night, teacher","Goodbye forever"],null]}],
  "078": [{"prompt":"When does Tom call the school office?","answer":"at nine o'clock","options":[["at ten","at eight"],null]},{"prompt":"Who does he want to speak to?","answer":"Mr Lee","options":[["the secretary","Ms Brown"],null]},{"prompt":"Why is Mr Lee unavailable?","answer":"He is in a meeting.","options":[["He is at home.","He is on holiday."],null]},{"prompt":"What time does the class start today?","answer":"ten","options":[["nine","eleven"],null]},{"prompt":"What does Tom ask Mr Lee to do?","answer":"call back","options":[["send an email","visit the office"],null]},{"prompt":"Who answers the phone?","answer":"the secretary","options":[["Mr Lee","Tom's friend"],null]},{"prompt":"What does Tom leave?","answer":"a message","options":[["a parcel","an email attachment"],null]},{"prompt":"What information does the secretary repeat?","answer":"the phone number","options":[["the class book","the teacher's address"],null]},{"prompt":"When does Tom call?","answer":"at nine o'clock","options":[["at ten","at lunchtime"],null]},{"prompt":"Where is Mr Lee?","answer":"in a meeting","options":[["at home","on holiday"],null]}],
  "079": [{"prompt":"When must students arrive?","answer":"before nine","options":[["after ten","at lunchtime"],null]},{"prompt":"What must students wear?","answer":"the school uniform","options":[["a name badge","sports clothes"],null]},{"prompt":"What must students keep clean?","answer":"the classroom","options":[["the corridor","the dining room"],null]},{"prompt":"When mustn't students use phones?","answer":"during lessons","options":[["at lunchtime","after school"],null]},{"prompt":"What must students not touch without permission?","answer":"equipment","options":[["their books","their uniforms"],null]},{"prompt":"When must students arrive at school?","answer":"before nine","options":[["at ten","at lunchtime"],null]},{"prompt":"What do students bring?","answer":"their books","options":[["a name badge","a password"],null]},{"prompt":"What must everyone do in the science room?","answer":"listen to the teacher","options":[["use mobile phones","run in the corridor"],null]},{"prompt":"Where can students talk quietly?","answer":"in the dining room","options":[["in the science room","in the corridor"],null]},{"prompt":"What can students do at lunchtime?","answer":"talk quietly","options":[["use phones during lessons","touch equipment"],null]}],
  "080": [{"prompt":"Where does Sofia study?","answer":"West College","options":[["City School","Green Hotel"],null]},{"prompt":"Which days does she study?","answer":"Monday to Thursday","options":[["Friday and Saturday","Monday to Wednesday"],null]},{"prompt":"What is her favourite subject?","answer":"English","options":[["science","business"],null]},{"prompt":"Where does she work?","answer":"in a café","options":[["in a hotel","in a bookshop"],null]},{"prompt":"When does she work?","answer":"Friday and Saturday","options":[["Monday to Thursday","Thursday and Friday"],null]},{"prompt":"Why does Sofia like English?","answer":"She enjoys speaking with people.","options":[["She likes doing maths.","She works in a library."],null]},{"prompt":"What time does Sofia start work?","answer":"nine","options":[["ten","two"],null]},{"prompt":"What time does she finish?","answer":"two","options":[["three","six"],null]},{"prompt":"What skills does Sofia have?","answer":"She can use a computer and speak two languages.","options":[["She can drive a bus.","She can teach science."],null]},{"prompt":"Where does Sofia want to work in the future?","answer":"in a hotel","options":[["in a school","in a hospital"],null]}]};
      const readingQuestions = readingBanks[id] ?? Array.from({ length: 10 }, (_, i) => ({ prompt: `Read the text and identify information about: ${vocab[i % vocab.length].english}.`, answer: vocab[i % vocab.length].english, options: [vocab[i % vocab.length].english, vocab[(i + 1) % vocab.length].english, vocab[(i + 2) % vocab.length].english] }));
      items = readingQuestions.map((q: any, i: number) => ({ itemId: `english-a1-m${id}-reading-${i + 1}`, position: i + 1, ...q, options: Array.isArray(q.options) ? q.options.flat(Infinity).filter((option: unknown): option is string => typeof option === "string") : [], evaluation: { type: "single_choice" } }));
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
        "035": { transcript: "Hello, I'm Lucy. I want to tell you about my week. I always have breakfast at home before I leave. I usually walk to work because the office is near my flat. I often go swimming after work, but I sometimes meet my friends for a coffee instead. I hardly ever watch television in the evening because I like reading. I never work on Sunday. I go swimming once a week and I visit my parents twice a week. What about you? How often do you exercise?", words: ["Lucy","always","usually","often","sometimes","hardly ever","never","once a week","twice a week","Sunday"] },
"036": { transcript: "Interviewer: Ben, what time do you get up on weekdays? Ben: I get up at seven. I have breakfast with my sister, Emma, and then I get ready for work. I start at nine and finish at five. Interviewer: Does Emma get up at the same time? Ben: No, she gets up later because her first class starts at half past eight. She goes to school by bus. She doesn't have breakfast at seven; she eats at home before she leaves. We both try to go to bed before eleven.", words: ["Ben","seven","breakfast","nine","five","Emma","later","school","bus","eleven"] },
"037": { transcript: "Mia and Tom are talking about their plans for the week. Mia: On Monday morning, I study English at the library. On Tuesday afternoon, I play tennis with my cousin. I visit my friend on Wednesday evening. Tom: I work on Monday and Thursday, so I'm busy then. I go shopping on Friday after work. We can meet on Saturday and relax in the park. Mia: Good idea. On Sunday, I visit my family. Tom: I usually read at home on Sunday, but I can come for lunch first.", words: ["Mia","Monday morning","Tuesday afternoon","Wednesday evening","Tom","Thursday","Friday","Saturday","Sunday","family"] },
"038": { transcript: "Alex: What do you usually do at the weekend, Nina? Nina: I like being busy. On Saturday morning, I go shopping with my sister. In the afternoon, I sometimes meet friends in town. Alex: I meet my friends too. We often have lunch together, and in the evening we watch a film at my house. Nina: That sounds nice. What about Sunday? Alex: I stay at home and relax. Nina: I visit my grandparents on Sunday. We have tea and talk about the week. It's a lovely way to finish the weekend.", words: ["Alex","Nina","weekend","Saturday","friends","lunch","shopping","film","Sunday","grandparents"] },
"039": { transcript: "Welcome to Green Town College. Emma studies here from Monday to Thursday. Her first lesson starts at nine o'clock and finishes at ten. She has a short break before her next class, and she usually eats lunch at midday. On Friday, Emma works in a bookshop from ten to four. Her brother Daniel has a different schedule. He works in an office from eight in the morning until five in the afternoon. He is free on Sunday because it is his day off. They often have dinner together after work.", words: ["Emma","Green Town College","Monday","Thursday","lesson","nine","ten","break","Friday","day off"] },
        "040": { transcript: "Leo wakes up at seven. He gets up and has breakfast with his sister. He goes to school by bus. His lessons start at nine. He has lunch at one and finishes school at three. After school, he does his homework and plays football. In the evening, he has dinner with his family. He reads before bed and goes to bed at ten.", words: ["Leo","seven","breakfast","sister","school","bus","nine","lunch","homework","football"] },
        "041": { transcript: "Mia and Ben talk about food. Mia likes rice, chicken and vegetables, but she doesn't like fish. Ben likes fish and pasta. They both eat fruit every day. Mia drinks water with lunch. Ben has milk for breakfast. At the weekend, they make a meal together and drink orange juice.", words: ["Mia","Ben","rice","chicken","vegetables","fish","pasta","fruit","water","milk"] },
        "042": { transcript: "Ella goes to the market with her dad on Saturday. They buy apples, bananas, oranges and grapes. Her dad also buys tomatoes, potatoes and carrots. At home, they make a salad and prepare sandwiches for a picnic. Ella puts an apple and a banana in her bag. She has fruit as a snack after the walk.", words: ["Ella","market","Saturday","apples","bananas","oranges","grapes","tomatoes","carrots","sandwiches"] },
        "043": { transcript: "The Green family have breakfast at seven in the morning. They eat bread and fruit and drink tea. The children have lunch at school at midday. In the evening, everyone has dinner together at half past six. On Saturday, they sometimes have a snack in the park. Their favourite meal is dinner because they can talk about the day.", words: ["breakfast","seven","bread","fruit","tea","lunch","school","midday","dinner","Saturday"] },
        "045": { transcript: "Mia and Daniel arrive at the Green Garden Restaurant at seven. They have a reservation for two people. The waiter shows them a table by the window and gives them the menu. Mia would like tomato soup for a starter. Daniel asks for a salad. For the main course, Mia chooses chicken and rice, while Daniel orders fish and potatoes. They do not have dessert. At the end, they ask for the bill and thank the waiter.", words: ["Mia","Daniel","Green Garden Restaurant","seven","reservation","window","soup","salad","chicken","bill"] },
        "046": { transcript: "At the Green Garden, the lunch menu has two starters and two main courses. Tomato soup costs four pounds. A small salad is three pounds fifty. Chicken and rice is eight pounds, and fish with potatoes is eight pounds fifty. Tea and coffee are two pounds each. Apple cake costs three pounds. Mia chooses soup and chicken. Daniel orders salad and fish. They look at the menu and check the prices before ordering.", words: ["Green Garden","lunch menu","soup","four pounds","salad","three pounds fifty","chicken","eight pounds","coffee","cake"] },
        "047": { transcript: "A family is sitting at a table in the Riverside Restaurant. The waiter asks if they are ready to order. The mother asks for sparkling water. The father would like orange juice, and their daughter orders tea with milk. They also choose vegetable soup and two chicken sandwiches. The waiter repeats the order. He asks, Anything else? The family says, No, that's all, thank you. He brings the drinks first.", words: ["Riverside Restaurant","waiter","order","sparkling water","orange juice","daughter","tea","vegetable soup","sandwiches","drinks"] },
        "048": { transcript: "Four friends are talking about their favourite food. Mia loves pasta but does not like spicy dishes. Ben prefers fish to chicken. Sara likes vegetables and usually chooses a vegetarian meal. Tom loves sweet food, especially chocolate cake, but he does not like coffee. They decide to order different meals. They ask each other about their preferences and find a drink everyone can enjoy.", words: ["Mia","friends","pasta","spicy","Ben","fish","Sara","vegetables","vegetarian","chocolate cake"] },
        "049": { transcript: "Good evening. Welcome to the Oak Tree Restaurant. Do you have a reservation? Yes, a table for two at half past seven. Certainly. Would you like a table by the window? Yes, please. Can we see the menu? Of course. What do you recommend? The vegetable soup is very popular, and the grilled chicken is excellent. Thank you. We'd like the soup and two chicken dishes, please. Certainly. I'll bring your order shortly.", words: ["Oak Tree Restaurant","reservation","table for two","half past seven","window","menu","recommend","vegetable soup","grilled chicken","order"] },
        "044": { transcript: "Tom and Anna are at Green Café. They look at the menu. Tom would like a cheese sandwich and a coffee, please. Anna asks for a cup of tea and a piece of cake. The waiter brings their order and says, Here you are. At the end, Tom asks for the bill. He pays, and they thank the waiter.", words: ["Tom","Anna","Green Café","menu","sandwich","coffee","tea","cake","waiter","bill"] },
        "034": { transcript: "Today is Monday. Mia has English class on Tuesday. She plays tennis on Wednesday and visits her grandmother on Thursday. Friday is her favourite day. The shop is open on Saturday. She relaxes on Sunday. Her birthday is in January, and her brother's birthday is in February. Lily's birthday is on the fifth of May.", words: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","January","February","May"] }
,
        "050": { transcript: "Emma and Jack are at a café near the station. They look at the menu because they are hungry. Emma orders tomato soup and a cheese sandwich. Jack chooses a chicken salad and a glass of water. The waiter offers orange juice, but they do not want any. The food is good, and they enjoy their lunch. At the end, Jack asks for the bill. They pay at the counter and thank the waiter.", words: ["Emma","Jack","café","menu","tomato soup","cheese sandwich","chicken salad","water","orange juice","bill"] },
        "051": { transcript: "Lily is getting ready for a family party. She has got a blue dress, but she chooses a white T-shirt and a black skirt today. Her brother Ben wears dark blue jeans and a green shirt. Their mother has a red jacket and brown shoes. Lily asks Ben about her shoes. He says the black shoes look great with her skirt. They are ready to leave at six o'clock.", words: ["Lily","family party","blue dress","white T-shirt","black skirt","Ben","dark blue jeans","green shirt","red jacket","brown shoes"] },
        "052": { transcript: "It is cold outside today. Anna is wearing a long grey coat and a red scarf. Her friend Peter is wearing a blue jumper, black trousers and brown boots. Two students are wearing hats and gloves. Their teacher is inside the classroom and is not wearing a coat. The students are talking about their clothes before the lesson. Anna likes Peter's jumper because the colour is bright.", words: ["cold","Anna","grey coat","red scarf","Peter","blue jumper","black trousers","brown boots","hats","gloves"] },
        "053": { transcript: "Tom needs a new shirt for work, so he visits a clothes shop. He finds a blue shirt and asks for a medium size. The shop assistant checks the shelf, but only a large one is available. Tom tries it on in the fitting room. It is too big. The assistant finds a white shirt in medium. Tom likes it, pays at the cash desk and takes his receipt.", words: ["Tom","clothes shop","shirt","medium","shop assistant","large","fitting room","white shirt","cash desk","receipt"] },
        "054": { transcript: "Sophie is shopping with her friend Mia. She sees some black trainers and asks the assistant how much they are. They cost thirty pounds. Sophie also looks at brown boots, but they are sixty pounds. Mia shows her some blue shoes near the door. They cost twenty-five pounds. Sophie tries them on and likes them. She decides to buy the blue shoes and thanks the assistant.", words: ["Sophie","Mia","black trainers","thirty pounds","brown boots","sixty pounds","blue shoes","twenty-five pounds","tries","assistant"] }
      ,
  "055": {"transcript":"Good morning. I would like a kilo of apples, please. They cost two pounds. These oranges are one pound fifty, and the water is one pound. The total is four pounds fifty. I give the assistant a five-pound note and receive fifty pence change. I put the coins in my purse and keep the receipt.","words":["kilo","apples","two pounds","oranges","one pound fifty","water","total","five-pound note","fifty pence","receipt"]},
  "056": {"transcript":"A customer is looking for a blue shirt. The shop assistant asks what size he needs. He would like a medium, but the shirt is not available. The assistant finds another shirt, and the customer tries it on in the fitting room. It fits well. He asks how much it is and pays by card. The assistant gives him the receipt.","words":["customer","blue shirt","shop assistant","size","medium","available","tries it on","fitting room","pays by card","receipt"]},
  "057": {"transcript":"Hello, is this your wallet? No, it is not mine. Those are my keys, and this is my phone. Whose umbrella is that? It belongs to Nina. Her glasses are in the bag, and his watch is on the table. We also have a notebook and a water bottle. Please take your things before you leave the room.","words":["wallet","keys","phone","umbrella","Nina","glasses","bag","watch","notebook","water bottle"]},
  "058": {"transcript":"Maya is wearing her favourite outfit today. She has a green jumper, blue jeans and comfortable trainers. Her brother is wearing a smart jacket and black trousers. Maya also has a warm scarf because it is cold outside. She likes simple clothes, but her sister prefers colourful dresses. They take a photo before going to lunch with their family.","words":["Maya","favourite outfit","green jumper","blue jeans","comfortable trainers","brother","smart jacket","black trousers","warm scarf","colourful dresses"]},
  "059": {"transcript":"Ben goes to the market with his grandmother. They buy a kilo of apples and six bananas at the fruit stall. Then they visit a vegetable stall and ask for half a kilo of tomatoes. The seller adds some carrots and weighs everything. The total is six pounds. Ben pays with a ten-pound note and checks the change before they leave.","words":["market","grandmother","kilo","apples","bananas","fruit stall","vegetable stall","half a kilo","tomatoes","change"]},
  "060": { transcript: "Good afternoon. Can I help you? Yes, I'm looking for a shopping basket. The baskets are next to the door. I also need a notebook and two pens. The notebook is three pounds and the pens are two pounds. The total is five pounds. Can I pay by card? Of course. Here is your receipt. Have a nice day.", words: ["basket","notebook","pens","three pounds","two pounds","total","five pounds","card","receipt","day"] },
  "061": { transcript: "At the weekend, Tom enjoys his free time outdoors. He often goes cycling with Ben and sometimes goes running in the park. At home, he likes reading and listening to music. His sister enjoys dancing and watching films. They like sharing activities. On Sunday, they relax and meet friends for coffee.", words: ["weekend","free time","cycling","running","park","reading","listening to music","dancing","watching films","activities"] },
  "062": { transcript: "Hello, I'm Ella. I play tennis on Monday and go swimming on Wednesday. My friend Jack plays football for a local team. His sister plays basketball and has training on Friday. We sometimes go running in the park. Football is Jack's favourite sport, but I prefer tennis. We watch a match together on Saturday.", words: ["Ella","tennis","Monday","swimming","Jack","football","team","basketball","training","Saturday"] },
  "063": { transcript: "Our teacher asks what we can do. I can swim and ride a bike, but I can't skate. Mia can sing and dance. Alex can play the guitar, but he can't cook. The teacher can run very fast. We write three things we can do and one thing we can't do. Then we ask a partner, Can you swim?", words: ["teacher","swim","ride a bike","skate","sing","dance","guitar","cook","run","partner"] },
  "064": { transcript: "Hi Oliver. Would you like to come to my birthday party on Saturday? Yes, I'd love to. It starts at three o'clock. I'm busy in the morning, but I'm free in the afternoon. Can I bring my friend Sam? Of course. Thanks for the invitation. See you on Saturday!", words: ["Oliver","birthday party","Saturday","three o'clock","busy","afternoon","friend","Sam","invitation","see you"] },
  "065": { transcript: "It is six o'clock. Emma is reading a book in the living room. Her brother is listening to music, and their father is cooking dinner. Their mother is talking on the phone. The dog is sleeping near the sofa. Nobody is watching television. Emma's friend asks what she is doing. Emma replies, I'm reading a book.", words: ["six o'clock","Emma","reading","living room","brother","listening to music","father","cooking dinner","mother","sleeping"] },
  "066": { transcript: "Welcome to Green Street Sports Centre. The gym is on the left, and the swimming pool is behind reception. There are two tennis courts outside. Members can use the changing rooms and lockers. The pool opens at seven. A fitness class starts at six on Tuesday. Ask at reception for membership information.", words: ["Green Street Sports Centre","gym","swimming pool","reception","tennis courts","changing rooms","lockers","seven","fitness class","membership"] },
  "067": { transcript: "Sofia's favourite hobby is photography. She enjoys taking pictures of parks, buildings and flowers. Her brother likes gardening and grows tomatoes. Their friend Leo collects postcards. They meet on Sunday afternoon to share their hobbies. Sofia likes photography because it is creative and relaxing. She wants to buy a new camera.", words: ["Sofia","favourite hobby","photography","taking pictures","gardening","tomatoes","Leo","postcards","Sunday afternoon","camera"] },
  "068": { transcript: "Ben is making plans for Saturday. In the morning, he is visiting his grandparents. At three o'clock, he is meeting Emma outside the station. They are going to the cinema at four. After the film, they are having dinner in a café. Ben is not working this weekend. He sends Emma a message to confirm the plan.", words: ["Ben","Saturday","grandparents","three o'clock","Emma","station","cinema","four","dinner","café"] },
  "069": { transcript: "Maya and Leo are choosing an activity for Saturday. Maya suggests the cinema. Leo agrees, but he does not like the film because it is too long. He suggests tennis instead. Maya prefers the cinema because it may rain. They decide to check the weather and meet at six. They are happy with the plan.", words: ["Maya","Leo","activity","Saturday","cinema","agrees","film","tennis","weather","six"] },
  "071": {"transcript":"Today, Year Seven has English at nine, maths at ten and science after break. At eleven thirty, students have history. Art is in the afternoon, at two o'clock. Please bring your school bag and a pencil case. The music club meets in Room Twelve after lessons. PE is outside today, so bring your trainers.","words":["English","nine","maths","ten","science","break","history","eleven thirty","art","two o'clock"]},
  "072": {"transcript":"Please look at the board. Open your books on page fifteen. Listen to the dialogue first. Do not write yet. Now repeat the sentences after me. Work in pairs and read the dialogue aloud. Write the answers in your notebooks. If you have a question, raise your hand. Finally, close your books and put them in your bags.","words":["board","books","fifteen","listen","dialogue","repeat","pairs","answers","notebooks","hand"]},
  "073": {"transcript":"Sara is a teacher and works at a school. Her brother Tom is a shop assistant in a bookshop. He helps customers and puts books on the shelves. Their mother is a nurse at the local hospital. She starts work at seven in the morning. Their father is a driver. He drives a bus and finishes at six.","words":["teacher","school","shop assistant","bookshop","customers","books","nurse","hospital","seven","driver"]},
  "074": {"transcript":"Interviewer: What do you do, Ben? Ben: I'm a student. I study at college and work in a café on Saturdays. Interviewer: Do you like your job? Ben: Yes, I do. I meet many people. Interviewer: Where does your sister work? Ben: She is a teacher. She works at a primary school. She works from Monday to Friday.","words":["Ben","student","college","café","Saturdays","people","sister","teacher","primary school","Monday"]},
  "075": {"transcript":"I'm Peter and I work in a shop. I arrive at eight thirty and open the doors at nine. In the morning, I help customers and put new products on the shelves. I have a break at eleven. At one, I have lunch with my colleague Sam. After lunch, I check the stock and clean the counter. I finish work at half past five.","words":["Peter","shop","eight thirty","nine","customers","eleven","one","Sam","stock","half past five"]},
  "076": {"transcript":"At the library, students can use the computers for one hour. Please switch on the screen and use the keyboard to write your name. You can open the library website and look for books. Do not download games. If you need help, ask the assistant. You can also use a tablet, but please keep the sound off. Remember to log out before you leave.","words":["library","computers","one hour","screen","keyboard","name","website","books","tablet","sound"]},
  "077": {"transcript":"Hi Emma, it's Lucy. I'm sending you a message about the class trip. We are going to the science museum on Friday. Please meet at the school gate at quarter past eight. Bring your lunch and a bottle of water. The bus leaves at half past eight. Can you reply to my message tonight? Thanks. See you tomorrow.","words":["Emma","Lucy","class trip","science museum","Friday","school gate","quarter past eight","lunch","half past eight","reply"]},
  "078": {"transcript":"Reception: Good afternoon, Green Hotel. Caller: Hello, can I speak to Ms Brown, please? Reception: I'm sorry, she isn't here at the moment. Would you like to leave a message? Caller: Yes, please. Tell her that Mark called about the meeting tomorrow. Reception: Certainly. Can I have your number? Caller: It's 07700 123456. Reception: Thank you. I'll give her the message.","words":["Green Hotel","Ms Brown","isn't here","message","Mark","meeting","tomorrow","number","07700","called"]},
  "079": {"transcript":"Welcome to the new staff room. Please read the rules. You must wear your name badge at work. You must arrive on time and keep your desk clean. You mustn't share your password with anyone. You mustn't use your mobile phone near the machines. If you see a problem, tell your manager. Safety is important for everyone.","words":["name badge","on time","desk","clean","password","anyone","mobile phone","machines","problem","manager"]},
  "080": {"transcript":"Hello, my name is Daniel. I am twenty years old and I study business at college. I have classes from Monday to Wednesday. On Thursday and Friday, I work in a bookshop. I start work at ten and finish at six. I can use a computer and help customers. My favourite subject is English. In the future, I want to manage a small shop.","words":["Daniel","twenty","business","college","Monday","Wednesday","bookshop","ten","six","customers"]},
  "081": { transcript: "The weather forecast for today is simple. In the north, it is cold and cloudy, with rain in the afternoon. In the south, it is sunny and warm. The temperature is eighteen degrees. Tomorrow will be windy, so take a coat. The weekend looks sunny.", words: ["The","weather","forecast","for","today","is","simple.","In","the","north,"] },
  "082": { transcript: "The forecast for Saturday is good. It will be sunny from nine in the morning. The temperature will reach twenty degrees at midday. Sunday will be rainy, with strong winds in the evening. Take an umbrella if you go out. Monday will be colder.", words: ["The","forecast","for","Saturday","is","good.","It","will","be","sunny"] },
  "083": { transcript: "Oliver has got a pet cat. Her name is Millie. She is three years old and very quiet. She sleeps on a chair in the kitchen. Oliver feeds her in the morning and evening. On Saturdays, he cleans her water bowl. His friend has got a dog, and they sometimes walk together in the park.", words: ["Oliver","has","got","a","pet","cat.","Her","name","is","Millie."] },
  "084": { transcript: "Welcome to Sunny Farm. There are ten chickens near the red barn and three ducks by the pond. The cows are in the big field. Please do not feed the animals. You can visit the farm shop at ten o'clock. There are fresh eggs, milk and cheese. The café closes at four.", words: ["Welcome","to","Sunny","Farm.","There","are","ten","chickens","near","the"] },
  "085": { transcript: "Our nature club meets at the village centre at half past nine. We walk to the forest together. Please wear comfortable shoes and bring water. The walk takes one hour. We stop near the lake for a picnic. You can take photos, but do not pick the flowers. We return at two.", words: ["Our","nature","club","meets","at","the","village","centre","at","half"] },
  "086": { transcript: "In our new house, there is a kitchen, a dining room and a living room downstairs. The sofa is opposite the television. There are two bedrooms upstairs. My room is next to the bathroom. There is a desk under the window and a wardrobe behind the door. The garden is at the back.", words: ["In","our","new","house,","there","is","a","kitchen,","a","dining"] },
  "087": { transcript: "This is the housework plan for this week. On Monday, Ben cleans the kitchen. On Tuesday, Lucy does the washing. Dad cooks on Wednesday, and Mum does the shopping on Thursday. At the weekend, the children tidy their bedrooms and take out the rubbish. Everyone helps for fifteen minutes each day.", words: ["This","is","the","housework","plan","for","this","week.","On","Monday,"] },
  "088": { transcript: "My glasses are on the desk, and my phone is under the newspaper. The keys are in the blue bowl next to the door. My bag is behind the chair. The book is on the shelf above the television. Thank you. Everything is here now.", words: ["My","glasses","are","on","the","desk,","and","my","phone","is"] },
  "089": { transcript: "On weekdays, I get home at half past four. I do my homework before dinner. My brother feeds our dog, and I water the plants. Mum sets the table at seven. After dinner, we wash the dishes together. At eight, I read a book in my bedroom. I go to bed at half past nine.", words: ["On","weekdays,","I","get","home","at","half","past","four.","I"] },
  "090": { transcript: "I live on King Street, near the town centre. There is a small park opposite my house and a supermarket next to the bus stop. The library is behind the café. My school is ten minutes away on foot. I like my neighbourhood because it is friendly and there are many places to visit.", words: ["I","live","on","King","Street,","near","the","town","centre.","There"] },
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
const previous = (id: string) => id === "071" ? "069" : String(Number(id) - 1).padStart(3, "0");
const next = (id: string) => id === "069" ? "071" : String(Number(id) + 1).padStart(3, "0");

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
          {mission !== "090" ? <Link href={`/academia/a1/curriculum-preview/${next(mission)}`} className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-800">Misión siguiente →</Link> : <Link href="/academia/a1/curriculum-preview" className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-semibold text-white">Volver al índice →</Link>}
        </nav>
      </div>
    </main>
  );
}
