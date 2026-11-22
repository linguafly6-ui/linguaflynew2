(function () {
  "use strict";
  var data = typeof MISSION !== "undefined" ? MISSION : (typeof M !== "undefined" ? M : null);
  if (!data || !Array.isArray(data.sections)) return;
  var section = data.sections.find(function (s) { return s.sectionKey === "explore"; });
  if (!section || !section.exercise) return;
  var exercise = section.exercise, theory = exercise.theory || {}, items = exercise.items || [];
  var translations = {
    "I am Alex.":"Soy Alex.","You are my friend.":"Eres mi amigo/a.","She is my teacher.":"Ella es mi profesora.","I'm Alex.":"Soy Alex.","You're my friend.":"Eres mi amigo/a.","She's Mia.":"Ella es Mia.","Are you a student?":"¿Eres estudiante?","Is she your teacher?":"¿Ella es tu profesora?","Good morning, Mia!":"¡Buenos días, Mia!","Hello, my name is Alex.":"Hola, me llamo Alex.","Nice to meet you.":"Encantado/a de conocerte.",
    "One apple.":"Una manzana.","Two books.":"Dos libros.","Three balls.":"Tres pelotas.","Six pens.":"Seis bolígrafos.","Seven cards.":"Siete tarjetas.","Ten fingers.":"Diez dedos.","How many books are there?":"¿Cuántos libros hay?","How many balls are there?":"¿Cuántas pelotas hay?","There is one book.":"Hay un libro.","There are three balls.":"Hay tres pelotas.",
    "a red ball":"una pelota roja","a blue sky":"un cielo azul","a green tree":"un árbol verde","It is a red flower.":"Es una flor roja.","It is a blue ball.":"Es una pelota azul.","It is a green leaf.":"Es una hoja verde.",
    "This is my mother.":"Esta es mi madre.","That is your father.":"Ese es tu padre.","He is my brother.":"Él es mi hermano.","The dog is small.":"El perro es pequeño.","The cats are black.":"Los gatos son negros.","A rabbit has got long ears.":"Un conejo tiene las orejas largas.","It is an apple.":"Es una manzana.","I like bread.":"Me gusta el pan.","I do not like milk.":"No me gusta la leche.","This is a book.":"Este es un libro.","These are pencils.":"Estos son lápices.","It is a pen.":"Es un bolígrafo.","I have got two eyes.":"Tengo dos ojos.","She has got brown hair.":"Ella tiene el pelo castaño.","You have got two hands.":"Tienes dos manos.","There is a kitchen.":"Hay una cocina.","There are two bedrooms.":"Hay dos dormitorios.","The bed is in the bedroom.":"La cama está en el dormitorio.","I wake up at seven.":"Me despierto a las siete.","She gets up early.":"Ella se levanta temprano.","He brushes his teeth.":"Él se cepilla los dientes.",
    "I can run.":"Puedo correr.","I can jump.":"Puedo saltar.","I can climb a tree.":"Puedo trepar a un árbol.","A ball is a circle.":"Una pelota es un círculo.","I can see a circle.":"Puedo ver un círculo.","A square has four sides.":"Un cuadrado tiene cuatro lados.","A triangle has three sides.":"Un triángulo tiene tres lados.","An elephant is big.":"Un elefante es grande.","The elephant is big.":"El elefante es grande.","The mouse is small.":"El ratón es pequeño.","The snake is long.":"La serpiente es larga.","I read a book.":"Leo un libro.","I draw with a pencil.":"Dibujo con un lápiz.","I write with a pen.":"Escribo con un bolígrafo.","The teacher is here.":"La profesora está aquí.","I am a student.":"Soy estudiante.","My desk is blue.":"Mi pupitre es azul.","Monday is the first day of my school week.":"El lunes es el primer día de mi semana escolar.","Tuesday is after Monday.":"El martes va después del lunes.","Wednesday is in the middle of the week.":"El miércoles está en mitad de la semana.","It is sunny today.":"Hoy hace sol.","It is rainy outside.":"Está lloviendo fuera.","The sky is cloudy.":"El cielo está nublado.","Spring is a lovely season.":"La primavera es una estación preciosa.","Summer is often warm.":"En verano suele hacer calor.","Autumn has falling leaves.":"En otoño caen las hojas.","I like apples.":"Me gustan las manzanas.","I like a pear.":"Me gusta una pera.","An orange is juicy.":"Una naranja es jugosa.","I eat a carrot.":"Como una zanahoria.","A tomato is red.":"Un tomate es rojo.","A potato grows underground.":"Una patata crece bajo tierra.",
    "Run to the gate.":"Corre hasta la puerta.","I can climb.":"Puedo trepar.","I can swim.":"Puedo nadar.","I ride a bike.":"Monto en bicicleta.","Start the game.":"Empieza el juego.","Stop the ball.":"Para la pelota.","It is a bus.":"Es un autobús.","It is a train.":"Es un tren.","Stop at red.":"Detente cuando el semáforo esté en rojo.","Go at green.":"Avanza cuando el semáforo esté en verde.","There is a school.":"Hay una escuela.","There is a park.":"Hay un parque.","How much?":"¿Cuánto cuesta?","One coin, please.":"Una moneda, por favor.","There is a bed.":"Hay una cama.","The book is on the table.":"El libro está sobre la mesa.","Water the flower.":"Riega la flor.","Seeds grow.":"Las semillas crecen.","There is sand.":"Hay arena.","Find a shell.":"Encuentra una concha.","What’s the weather like?":"¿Qué tiempo hace?","It's rainy.":"Está lloviendo.",
    "I am happy.":"Estoy contento/a.","She is tired.":"Ella está cansada.","He is thirsty.":"Él tiene sed.","This is a book.":"Este es un libro.","That is a chair.":"Esa es una silla.","These are my books.":"Estos son mis libros.","a book":"un libro","an apple":"una manzana","two books":"dos libros","A, B, C, D…":"A, B, C, D…","Spell cat: C-A-T.":"Deletrea «cat»: C-A-T.","Spell bed: B-E-D.":"Deletrea «bed»: B-E-D.","Spell your name.":"Deletrea tu nombre.","The first letter is S.":"La primera letra es la S.","The last letter is M.":"La última letra es la M.","My name is Mia.":"Me llamo Mia.","I'm seven years old.":"Tengo siete años.","This is my friend.":"Este/a es mi amigo/a.","Good morning!":"¡Buenos días!","Hello!":"¡Hola!","See you tomorrow!":"¡Hasta mañana!","Listen to me.":"Escúchame.","Open your book.":"Abre tu libro.","Sit down, please.":"Siéntate, por favor.","What is this?":"¿Qué es esto?","It's a pencil.":"Es un lápiz.","Is it a ruler?":"¿Es una regla?","Is it a cat?":"¿Es un gato?","Yes, it is.":"Sí, lo es.","No, it isn't.":"No, no lo es.",
    "This is my bag.":"Esta es mi mochila.","Is this your book?":"¿Es este tu libro?","It is her toy.":"Es su juguete (de ella).","Whose pencil is it?":"¿De quién es el lápiz?","It's my pencil.":"Es mi lápiz.","It's her bag.":"Es su mochila (de ella).","I've got a book.":"Tengo un libro.","You've got a pencil.":"Tienes un lápiz.","She's got a toy.":"Ella tiene un juguete.","Have you got a pen?":"¿Tienes un bolígrafo?","Yes, I have.":"Sí, tengo.","No, I haven't.":"No, no tengo.","I don't like bananas.":"No me gustan los plátanos.","Do you like carrots?":"¿Te gustan las zanahorias?","It is big.":"Es grande.","It has got a tail.":"Tiene cola.","The turtle is slow.":"La tortuga es lenta.","I'm wearing a hat.":"Llevo un sombrero.","It's blue.":"Es azul.","a red coat":"un abrigo rojo","There is a sofa.":"Hay un sofá.","There are two chairs.":"Hay dos sillas.","The lamp is next to the sofa.":"La lámpara está al lado del sofá.","What is it?":"¿Qué es?","Who is she?":"¿Quién es ella?","Where is the book?":"¿Dónde está el libro?","It is a fox.":"Es un zorro.","The ball is under the chair.":"La pelota está debajo de la silla.",
    "The train is at platform 2.":"El tren está en el andén 2.","The arrival time is nine fifteen.":"La hora de llegada es las nueve y cuarto.","The departure time is nine thirty.":"La hora de salida es las nueve y media.","I wear a swimsuit.":"Llevo un bañador.","I use goggles.":"Uso gafas de natación.","The lifeguard is here.":"El socorrista está aquí.","I have an appointment.":"Tengo una cita.","My arm hurts.":"Me duele el brazo.","The nurse checks my temperature.":"La enfermera me toma la temperatura.","I buy fruit.":"Compro fruta.","The seller has a basket.":"El vendedor tiene una cesta.","How much is the apple?":"¿Cuánto cuesta la manzana?","The lamp is on the bedside table.":"La lámpara está sobre la mesita de noche.","The rug is on the floor.":"La alfombra está en el suelo.","It is sunny.":"Hace sol.","I find a shell.":"Encuentro una concha.","I play in the sand.":"Juego en la arena.","We go to the cinema.":"Vamos al cine.","We watch a film.":"Vemos una película.","We eat popcorn.":"Comemos palomitas.","It is my birthday.":"Es mi cumpleaños.","There is a cake.":"Hay un pastel.","We sing a song.":"Cantamos una canción.","I can see a rabbit.":"Puedo ver un conejo.","The fox is near the river.":"El zorro está cerca del río.","The mountain is far away.":"La montaña está lejos.","I play football.":"Juego al fútbol.","We play on the court.":"Jugamos en la pista.","My team has a trainer.":"Mi equipo tiene un entrenador.",
    "There is a farm shop.":"Hay una tienda en la granja.","There are six eggs.":"Hay seis huevos.","I buy milk and cheese.":"Compro leche y queso.","A firefighter wears a helmet.":"Un bombero lleva un casco.","The fire engine is red.":"El camión de bomberos es rojo.","The firefighter uses a hose.":"El bombero utiliza una manguera.","Where is the hairdresser?":"¿Dónde está la peluquería?","Where is the hair?":"¿Dónde está el pelo?","Where are the scissors?":"¿Dónde están las tijeras?","Where is the comb?":"¿Dónde está el peine?","Where is the brush?":"¿Dónde está el cepillo?","I want a teddy bear.":"Quiero un oso de peluche.","Have you got a toy train?":"¿Tienes un tren de juguete?","The robot is blue.":"El robot es azul.","I am at the campsite.":"Estoy en el camping.","My tent is near the lake.":"Mi tienda de campaña está cerca del lago.","I have a sleeping bag.":"Tengo un saco de dormir.","Where is the pet shop?":"¿Dónde está la tienda de animales?","Where is the pet?":"¿Dónde está la mascota?","Where is the dog?":"¿Dónde está el perro?","Where is the cat?":"¿Dónde está el gato?","Where is the fish?":"¿Dónde está el pez?","Where is the clothes shop?":"¿Dónde está la tienda de ropa?","Where is the shirt?":"¿Dónde está la camisa?","Where are the trousers?":"¿Dónde están los pantalones?","Where is the skirt?":"¿Dónde está la falda?","Where is the dress?":"¿Dónde está el vestido?","Where is the listen?":"¿Dónde está la opción de escuchar?","Where is the repeat?":"¿Dónde está la opción de repetir?","Where is the read?":"¿Dónde está la opción de leer?","Where is the write?":"¿Dónde está la opción de escribir?","Where is the open?":"¿Dónde está la opción de abrir?","I'd like a cup of tea, please.":"Quisiera una taza de té, por favor.","Can I have a sandwich?":"¿Me pones un sándwich?","The juice is in a glass.":"El zumo está en un vaso.","I feel tired today.":"Hoy me siento cansado/a.","I am hungry and thirsty.":"Tengo hambre y sed.","I am better now.":"Ahora me encuentro mejor.",
    "There is a boat in the harbour.":"Hay un barco en el puerto.","The lighthouse is tall.":"El faro es alto.","The sand is warm.":"La arena está caliente.","The horse is big.":"El caballo es grande.","The duck can swim.":"El pato sabe nadar.","The sheep is white.":"La oveja es blanca.","There is a sofa in the living room.":"Hay un sofá en el salón.","The remote control is on the table.":"El mando a distancia está sobre la mesa.","The clock is on the wall.":"El reloj está en la pared.","I can jump and run.":"Puedo saltar y correr.","Let's share the ball.":"Compartamos la pelota.","a bottle of water":"una botella de agua","a packet of rice":"un paquete de arroz","a few apples":"unas cuantas manzanas","I have my passport.":"Tengo mi pasaporte.","The plane is on the runway.":"El avión está en la pista.","The pilot is on the plane.":"El piloto está en el avión.","I have breakfast in the morning.":"Desayuno por la mañana.","I eat lunch in the afternoon.":"Almuerzo por la tarde.","I go to bed at night.":"Me voy a la cama por la noche.","There is a plant in the pot.":"Hay una planta en la maceta.","The seed grows in the soil.":"La semilla crece en la tierra.","I water the rose.":"Riego la rosa.","I clean my room.":"Limpio mi habitación.","I sweep the floor.":"Barro el suelo.","Please wash the cup.":"Por favor, lava la taza.","Hello! I am Alex.":"¡Hola! Soy Alex.","This is my family.":"Esta es mi familia.","I have a book. Thank you!":"Tengo un libro. ¡Gracias!"
  };
  Object.assign(translations, {
    "I have a small nose.":"Tengo la nariz pequeña.","My eyes are brown.":"Mis ojos son marrones.","She has got curly hair.":"Ella tiene el pelo rizado.",
    "I put on my coat.":"Me pongo el abrigo.","Take off your shoes.":"Quítate los zapatos.","I wear a warm hat.":"Llevo un gorro abrigado.",
    "Wash your hands.":"Lávate las manos.","Brush your teeth.":"Cepíllate los dientes.","Clean the table.":"Limpia la mesa.",
    "I take a bath.":"Me baño.","I use shampoo for my hair.":"Uso champú para el pelo.",
    "I wake up in the morning.":"Me despierto por la mañana.","I eat breakfast.":"Desayuno.","I go to school.":"Voy al colegio.",
    "What time is it?":"¿Qué hora es?","It is one o'clock.":"Es la una en punto.","It is seven o'clock.":"Son las siete en punto.",
    "It is my birthday.":"Es mi cumpleaños.","I have a birthday cake.":"Tengo una tarta de cumpleaños.","I make a wish.":"Pido un deseo.",
    "Dance, please.":"Baila, por favor.","A balloon, please.":"Un globo, por favor.","Thank you for the gift.":"Gracias por el regalo.",
    "I love dogs.":"Me encantan los perros.","My favourite toy is a car.":"Mi juguete favorito es un coche.",
    "I can't fly.":"No puedo volar.","I can dance.":"Puedo bailar.",
    "I eat toast for breakfast.":"Desayuno tostadas.","I drink milk in the morning.":"Bebo leche por la mañana.","I have an egg and cereal.":"Tomo un huevo y cereales.",
    "Water, please.":"Agua, por favor.","A sandwich, please.":"Un sándwich, por favor.","Thank you!":"¡Gracias!",
    "It is a cow.":"Es una vaca.","It is a sheep.":"Es una oveja.","It is a duck.":"Es un pato.",
    "There is a cow in the field.":"Hay una vaca en el campo.","There is a barn on the farm.":"Hay un granero en la granja.","There is a hen by the farmer.":"Hay una gallina junto al granjero.",
    "It is a fish.":"Es un pez.","It is a shark.":"Es un tiburón.","It is an octopus.":"Es un pulpo.",
    "Find a bee.":"Encuentra una abeja.","Look for a butterfly.":"Busca una mariposa.","Find an ant.":"Encuentra una hormiga.",
    "It is a big lion.":"Es un león grande.","It is a tall giraffe.":"Es una jirafa alta.","It is a small monkey.":"Es un mono pequeño.",
    "The ball is in the box.":"La pelota está dentro de la caja.","The cat is under the chair.":"El gato está debajo de la silla.",
    "She is my mother.":"Ella es mi madre.","He is my father.":"Él es mi padre.","They are my grandparents.":"Ellos son mis abuelos.",
    "He is a boy.":"Él es un niño.","She is a girl.":"Ella es una niña.","The child is happy.":"El niño está contento.",
    "Where is the scissors?":"¿Dónde están las tijeras?","Where is the trousers?":"¿Dónde están los pantalones?",
    "Where is the listen?":"¿Dónde está la actividad de escucha?","Where is the repeat?":"¿Dónde está la actividad de repetición?","Where is the read?":"¿Dónde está la actividad de lectura?","Where is the write?":"¿Dónde está la actividad de escritura?","Where is the open?":"¿Dónde está la opción de abrir?"
  });
  var patternTranslations = {
    "Subject + am/is/are + information":"Sujeto + am/is/are + información (ser/estar).",
    "I am → I'm · You are → You're · He is → He's · She is → She's":"I am → I'm (yo soy/estoy) · You are → You're (tú eres/estás) · He is → He's (él es/está) · She is → She's (ella es/está).",
    "Am/Is/Are + subject ...?":"Am/Is/Are + sujeto…? (preguntas con el verbo ser/estar).",
    "Good morning · Good afternoon · Hello · Goodbye":"Buenos días · Buenas tardes · Hola · Adiós.",
    "one · two · three · four · five":"uno · dos · tres · cuatro · cinco.",
    "six · seven · eight · nine · ten":"seis · siete · ocho · nueve · diez.",
    "How many + plural noun + are there?":"¿Cuántos/as + sustantivo plural + hay?",
    "There is + one + singular noun / There are + number + plural noun":"There is + un/una + sustantivo singular / There are + número + sustantivo plural (hay).",
    "a + colour + noun":"un/una + color + sustantivo.",
    "It is + a/an + colour + noun":"It is + un/una + color + sustantivo (es…).",
    "I eat + food · I drink + drinks":"Como + alimento · Bebo + bebida.",
    "What is it? · It is a + animal.":"¿Qué es? · Es un/una + animal.",
    "There is a + singular noun.":"Hay + un/una + sustantivo singular.",
    "It is a + animal · It is an + animal.":"Es un/una + animal.",
    "Find + noun · Look for + noun.":"Encuentra + sustantivo · Busca + sustantivo.",
    "It is a + adjective + animal.":"Es un/una + adjetivo + animal.",
    "The + object + is + place word + the + place.":"El/la + objeto + está + preposición de lugar + el/la + lugar.",
    "He is… · She is… · They are…":"Él es/está… · Ella es/está… · Ellos/as son/están…",
    "He is a… · She is a…":"Él es un… · Ella es una…",
    "I have + feature · My hair is + colour or shape.":"Tengo + rasgo · Mi pelo es + color o forma.",
    "Put on + clothes · Take off + clothes.":"Ponte + ropa · Quítate + ropa.",
    "Wash / Brush / Clean + object.":"Lava / Cepilla / Limpia + objeto.",
    "I use + bathroom item · Wash / Brush + body part.":"Uso + artículo de baño · Lava / Cepilla + parte del cuerpo.",
    "I + action · I wake up / get up / eat / go.":"Yo + acción · Me despierto / me levanto / como / voy.",
    "What time is it? · It is + number + o'clock.":"¿Qué hora es? · Es la + número en punto.",
    "It is my birthday · I have + birthday item.":"Es mi cumpleaños · Tengo + elemento de cumpleaños.",
    "[Action or item] + please · Thank you.":"[Acción o artículo] + por favor · Gracias.",
    "I like… · I love… · I don't like… · My favourite… is…":"Me gusta… · Me encanta… · No me gusta… · Mi favorito/a… es…",
    "I can + verb · I can't + verb.":"Puedo + verbo · No puedo + verbo.",
    "This is my mother.":"Esta es mi madre.",
    "The dog is small.":"El perro es pequeño.",
    "It is an apple.":"Es una manzana.",
    "This is a book.":"Este es un libro.",
    "I have got two eyes.":"Tengo dos ojos.",
    "There is a kitchen.":"Hay una cocina.",
    "I wake up at seven.":"Me despierto a las siete.",
    "Run to the gate.":"Corre hasta la puerta.",
    "a + colour + noun":"un/una + color + sustantivo.",
    "I can swim. I ride a bike.":"Puedo nadar. Monto en bicicleta.",
    "Start the game. Stop the ball.":"Empieza el juego. Para la pelota.",
    "It is a bus. It is a train.":"Es un autobús. Es un tren.",
    "Stop at red. Go at green.":"Detente en rojo. Avanza en verde.",
    "There is a school. There is a park.":"Hay una escuela. Hay un parque.",
    "How much? One coin, please.":"¿Cuánto cuesta? Una moneda, por favor.",
    "There is a bed. The book is on the table.":"Hay una cama. El libro está sobre la mesa.",
    "Water the flower. Seeds grow.":"Riega la flor. Las semillas crecen.",
    "There is sand. Find a shell.":"Hay arena. Encuentra una concha.",
    "What’s the weather like? It’s rainy.":"¿Qué tiempo hace? Está lloviendo.",
    "I have got two eyes.":"Tengo dos ojos.",
    "This is my bag.":"Esta es mi mochila.",
    "Whose pencil is it?":"¿De quién es el lápiz?",
    "I've got a book.":"Tengo un libro.",
    "Have you got a pen?":"¿Tienes un bolígrafo?",
    "I like apples.":"Me gustan las manzanas.",
    "It is big.":"Es grande.",
    "I'm wearing a hat.":"Llevo un sombrero.",
    "There is a sofa.":"Hay un sofá.",
    "What is it?":"¿Qué es?",
    "It is a fox.":"Es un zorro.",
    "The train is at platform 2.":"El tren está en el andén 2.",
    "I wear a swimsuit.":"Llevo un bañador.",
    "I have an appointment.":"Tengo una cita.",
    "I buy fruit.":"Compro fruta.",
    "There is a bed.":"Hay una cama.",
    "It is sunny.":"Hace sol.",
    "We go to the cinema.":"Vamos al cine.",
    "It is my birthday.":"Es mi cumpleaños.",
    "I can see a rabbit.":"Puedo ver un conejo.",
    "I play football.":"Juego al fútbol.",
    "There is a farm shop.":"Hay una tienda en la granja.",
    "A firefighter wears a helmet.":"Un bombero lleva un casco.",
    "Where is the hairdresser?":"¿Dónde está la peluquería?",
    "I want a teddy bear.":"Quiero un oso de peluche.",
    "I am at the campsite.":"Estoy en el camping.",
    "Where is the pet shop?":"¿Dónde está la tienda de animales?",
    "Where is the clothes shop?":"¿Dónde está la tienda de ropa?",
    "Where is the listen?":"¿Dónde está la opción de escuchar?",
    "I'd like a cup of tea, please.":"Quisiera una taza de té, por favor.",
    "I feel tired today.":"Hoy me siento cansado/a.",
    "There is a boat in the harbour.":"Hay un barco en el puerto.",
    "The horse is big.":"El caballo es grande.",
    "There is a sofa in the living room.":"Hay un sofá en el salón.",
    "I can climb.":"Puedo trepar.",
    "a bottle of water":"una botella de agua",
    "I have my passport.":"Tengo mi pasaporte.",
    "I have breakfast in the morning.":"Desayuno por la mañana.",
    "There is a plant in the pot.":"Hay una planta en la maceta.",
    "I clean my room.":"Limpio mi habitación.",
    "Hello! I am Alex.":"¡Hola! Soy Alex."
  };
  Object.assign(patternTranslations, {
    "I eat + food · I drink + drinks":"Como + alimento · Bebo + bebida.",
    "[Drink or food] + please · Thank you.":"[Bebida o comida] + por favor · Gracias.",
    "What is it? · It is a + animal.":"¿Qué es? · Es un/una + animal.",
    "There is a + singular noun.":"Hay + un/una + sustantivo singular.",
    "It is a + animal · It is an + animal.":"Es un/una + animal.",
    "Find + noun · Look for + noun.":"Encuentra + sustantivo · Busca + sustantivo.",
    "It is a + adjective + animal.":"Es un/una + adjetivo + animal.",
    "The + object + is + place word + the + place.":"El/la + objeto + está + preposición de lugar + el/la + lugar.",
    "He is… · She is… · They are…":"Él es/está… · Ella es/está… · Ellos/as son/están…",
    "He is a… · She is a…":"Él es un… · Ella es una…",
    "I have + feature · My hair is + colour or shape.":"Tengo + rasgo · Mi pelo es + color o forma.",
    "Put on + clothes · Take off + clothes.":"Ponte + ropa · Quítate + ropa.",
    "Wash / Brush / Clean + object.":"Lava / Cepilla / Limpia + objeto.",
    "I use + bathroom item · Wash / Brush + body part.":"Uso + artículo de baño · Lava / Cepilla + parte del cuerpo.",
    "I + action · I wake up / get up / eat / go.":"Yo + acción · Me despierto / me levanto / como / voy.",
    "What time is it? · It is + number + o'clock.":"¿Qué hora es? · Es la + número en punto.",
    "It is my birthday · I have + birthday item.":"Es mi cumpleaños · Tengo + elemento de cumpleaños.",
    "[Action or item] + please · Thank you.":"[Acción o artículo] + por favor · Gracias.",
    "I like… · I love… · I don't like… · My favourite… is…":"Me gusta… · Me encanta… · No me gusta… · Mi favorito/a… es…",
    "I can + verb · I can't + verb.":"Puedo + verbo · No puedo + verbo.",
    "a + colour + noun":"un/una + color + sustantivo.",
    "It is + a/an + colour + noun":"Es + un/una + color + sustantivo.",
    "a + adjective + noun":"un/una + adjetivo + sustantivo."
  });
  var phraseDisplay = {
    "Where is the scissors?":"Where are the scissors?",
    "Where is the trousers?":"Where are the trousers?",
    "Where is the listen?":"Where is the listening activity?",
    "Where is the repeat?":"Where is the repeat activity?",
    "Where is the read?":"Where is the reading activity?",
    "Where is the write?":"Where is the writing activity?",
    "Where is the open?":"Where is the opening activity?"
  };
  Object.assign(translations, {
    "A ball is a circle.":"Una pelota es un círculo.",
    "This is my book.":"Este es mi libro.",
    "This is a teacher.":"Esta es una profesora.",
    "The first day in this list is Monday.":"El primer día de esta lista es el lunes.",
    "It is sunny today. The sun is shining.":"Hoy hace sol. El sol está brillando.",
    "Flowers often grow in spring.":"Las flores suelen crecer en primavera.",
    "I see a carrot.":"Veo una zanahoria."
  });
  var titleTranslations = {
    "At the Playground":"En el parque infantil",
    "Shapes Around Us":"Las formas que nos rodean",
    "Big and Small":"Grande y pequeño",
    "My School Bag":"Mi mochila escolar",
    "The Classroom":"El aula",
    "Days of the Week":"Los días de la semana",
    "Weather Watchers":"El tiempo atmosférico",
    "Seasons of the Year":"Las estaciones del año",
    "Fruit Market":"El mercado de frutas",
    "Veggie Garden":"El huerto de verduras"
  };
  var topicTranslations = {
    "At the Playground":"el parque infantil",
    "Shapes Around Us":"las formas que nos rodean",
    "Big and Small":"los tamaños grande y pequeño",
    "My School Bag":"el material de mi mochila",
    "The Classroom":"el aula",
    "Days of the Week":"los días de la semana",
    "Weather Watchers":"el tiempo atmosférico",
    "Seasons of the Year":"las estaciones del año",
    "Fruit Market":"las frutas",
    "Veggie Garden":"las verduras del huerto"
  };
  var labelTranslations = {"Useful sentence":"Frase útil"};
  var explanationEs = "";
  if (/^Learn ten useful words/.test(theory.explanation || "")) {
    var topic = topicTranslations[data.mission && data.mission.title] || "este tema";
    explanationEs = "Aprende diez palabras útiles sobre " + topic + ". Escucha cada modelo de inglés británico y repítelo.";
  }
  var tipEs = theory.tip === "Say each new word aloud, then use it in a short sentence."
    ? "Di cada palabra nueva en voz alta y después úsala en una frase corta." : "";
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function speak(text) { if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return; window.speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(String(text)); u.lang = "en-GB"; u.rate = .88; window.speechSynthesis.speak(u); }
  var host = document.getElementById("content") || document.getElementById("p-explore");
  if (!host) return;
  var title = theory.title || "Vocabulario y frases clave";
  var missionTitle = data.mission && data.mission.title || "";
  var titleEs = titleTranslations[missionTitle] || "";
  var explanation = theory.explanation || "Aprende el vocabulario y observa cómo se usa en frases sencillas.";
  var html = '<div class="lf-explore"><header class="lf-explore-head"><span class="lf-explore-kicker">EXPLORE · EXPLORACIÓN</span><h2>' + esc(title) + '</h2>' + (titleEs ? '<p class="lf-explore-title-es">' + esc(titleEs) + '</p>' : '') + '<p class="lf-explore-explanation-en">' + esc(explanation) + '</p>' + (explanationEs ? '<p class="lf-explore-explanation-es">' + esc(explanationEs) + '</p>' : '') + '</header>';
  html += '<section class="lf-vocab-section"><div class="lf-section-heading"><span>01</span><div><h3>Vocabulario clave</h3><p>Inglés y español, siempre juntos.</p></div></div><div class="lf-vocab-grid">';
  items.forEach(function (item) { html += '<article class="lf-vocab-card"><div class="lf-vocab-label">ENGLISH</div><div class="lf-vocab-word">' + esc(item.english || item.word || "") + '</div><div class="lf-vocab-translation">' + esc(item.spanish || item.translation || "") + '</div><button type="button" class="lf-audio" data-audio="' + esc(item.english || item.word || "") + '">🔊 Escuchar</button></article>'; });
  html += '</div></section>';
  html += '<section class="lf-phrases-section"><div class="lf-section-heading"><span>02</span><div><h3>Frases y estructuras</h3><p>Cada frase en inglés incluye su traducción al español.</p></div></div>';
  (theory.patterns || []).forEach(function (pattern, i) {
    var patternEn = phraseDisplay[pattern.pattern] || pattern.pattern; var patternEs = patternTranslations[pattern.pattern] || translations[pattern.pattern] || "";
    html += '<article class="lf-pattern-card"><div class="lf-pattern-top"><span class="lf-pattern-index">' + String(i + 1).padStart(2, "0") + '</span><div><h4>' + esc(labelTranslations[pattern.label] || pattern.label || "Modelo") + '</h4><div class="lf-pattern-en">' + esc(patternEn) + '</div>' + (patternEs ? '<div class="lf-pattern-es">' + esc(patternEs) + '</div>' : '') + '</div></div>';
    (pattern.examples || []).forEach(function (phrase) { var shownPhrase = phraseDisplay[phrase] || phrase; var translated = translations[phrase] || ""; html += '<div class="lf-example"><div><div class="lf-example-en" lang="en">' + esc(shownPhrase) + '</div><div class="lf-example-es">' + (translated ? esc(translated) : "Traducción en español no disponible") + '</div></div><button type="button" class="lf-audio" data-audio="' + esc(shownPhrase) + '" aria-label="Escuchar ' + esc(shownPhrase) + '">🔊</button></div>'; });
    html += '</article>';
  });
  html += '</section>' + (theory.tip ? '<aside class="lf-explore-tip"><strong>Recuerda</strong><p>' + esc(theory.tip) + '</p>' + (tipEs ? '<p class="lf-explore-tip-es">' + esc(tipEs) + '</p>' : '') + '</aside>' : '') + '</div>';
  var style = document.createElement("style");
  style.textContent = '.lf-explore{color:#24385f}.lf-explore-head{padding:22px 24px;border-radius:22px;background:linear-gradient(135deg,#e7f6ff,#f1edff);border:1px solid #dce6fb;margin-bottom:22px}.lf-explore-kicker{font-size:11px;letter-spacing:.14em;font-weight:900;color:#087c91}.lf-explore-head h2{font-size:clamp(23px,3vw,30px);margin:8px 0;color:#253f78}.lf-explore-head p,.lf-section-heading p{color:#667997;line-height:1.6;margin:0}.lf-explore-title-es{font-size:14px;font-weight:800;color:#81532f;margin:4px 0 10px!important}.lf-explore-explanation-en{margin-top:8px!important}.lf-explore-explanation-es,.lf-explore-tip-es{font-size:14px;color:#81532f;line-height:1.55;margin-top:4px!important}.lf-vocab-section,.lf-phrases-section{margin:20px 0 26px}.lf-section-heading{display:flex;align-items:center;gap:12px;margin-bottom:13px}.lf-section-heading>span{display:grid;place-items:center;min-width:34px;height:34px;border-radius:11px;background:#e5f4ff;color:#167c99;font-weight:900}.lf-section-heading h3{font-size:19px;margin:0 0 3px;color:#243e75}.lf-vocab-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:11px}.lf-vocab-card{border:1px solid #dce6f7;border-radius:17px;padding:15px;background:linear-gradient(145deg,#f8fbff,#fff);box-shadow:0 5px 16px #2947770a}.lf-vocab-label{font-size:10px;font-weight:900;letter-spacing:.13em;color:#6f83a4}.lf-vocab-word{font-size:20px;font-weight:900;color:#2c4a85;margin:5px 0}.lf-vocab-translation{font-size:14px;color:#81532f;font-weight:750;min-height:22px}.lf-audio{border:0;border-radius:10px;background:#e4f7fb;color:#087c91;padding:8px 11px;font-weight:800;cursor:pointer;margin-top:8px}.lf-pattern-card{border:1px solid #dce6f7;border-radius:18px;padding:16px 17px;background:#fff;margin:12px 0;box-shadow:0 7px 22px #2947770b}.lf-pattern-top{display:flex;gap:12px;align-items:flex-start;margin-bottom:10px}.lf-pattern-index{display:grid;place-items:center;min-width:30px;height:30px;border-radius:10px;background:#f1edff;color:#5a4c9d;font-weight:900;font-size:12px}.lf-pattern-top h4{margin:0 0 5px;color:#304a7b;font-size:15px}.lf-pattern-en{font-weight:850;color:#3156a4;line-height:1.5}.lf-pattern-es{font-size:13px;color:#6c7b95;margin-top:3px;line-height:1.5}.lf-example{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;border-top:1px solid #edf1f8}.lf-example-en{font-weight:800;color:#2d416d;line-height:1.45}.lf-example-es{font-size:14px;color:#7d552f;line-height:1.45;margin-top:2px}.lf-example .lf-audio{flex-shrink:0;margin:0}.lf-explore-tip{padding:15px 17px;border-radius:15px;background:#f0faf7;border:1px solid #d8eee5;color:#27654e}.lf-explore-tip p{margin:5px 0 0;line-height:1.55}@media(max-width:600px){.lf-explore-head{padding:17px}.lf-vocab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lf-pattern-card{padding:13px}.lf-example{align-items:flex-start}}';
  document.head.appendChild(style);
  host.innerHTML = html;
  host.addEventListener("click", function (event) { var button = event.target.closest("[data-audio]"); if (button) speak(button.dataset.audio); });
})();