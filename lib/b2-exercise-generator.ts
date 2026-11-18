import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";
import type { A2PdfUnit, A2PdfExercise } from "@/lib/a2-pdf-unit-types";

const grammarBanks: Record<number, A2PdfExercise[]> = {
  "1": [
    {
      "question": "Completa con el Past Perfect Continuous: By the time the manager arrived, we ______ (wait) for forty minutes.",
      "answer": "had been waiting",
      "note": "Se usa had been + -ing para destacar la duración anterior a otro momento pasado."
    },
    {
      "question": "Elige la forma correcta: While I ______ (drive) home, I ______ (hear) a strange noise.",
      "answer": "was driving; heard",
      "note": "Past Continuous describe la acción en curso; Past Simple, el hecho que ocurrió durante ella."
    },
    {
      "question": "Une las ideas usando No sooner...than: We sat down. The lights went out.",
      "answer": "No sooner had we sat down than the lights went out.",
      "note": "Después de No sooner al inicio se invierte el auxiliar y el sujeto: had we sat down."
    },
    {
      "question": "Corrige el error: She had been study for hours when the exam began.",
      "answer": "She had been studying for hours when the exam began.",
      "note": "Después de had been se utiliza el gerundio (-ing)."
    },
    {
      "question": "Completa con Past Simple o Past Perfect: The film ______ (already / start) when we ______ (reach) the cinema.",
      "answer": "had already started; reached",
      "note": "El comienzo de la película ocurrió antes de llegar al cine."
    },
    {
      "question": "Reescribe con Hardly...when: We had just arrived. The meeting began.",
      "answer": "Hardly had we arrived when the meeting began.",
      "note": "Hardly + Past Perfect va seguido de when + Past Simple."
    }
  ],
  "2": [
    {
      "question": "Completa con Future Perfect: By next Friday, they ______ (finish) the report.",
      "answer": "will have finished",
      "note": "Future Perfect expresa una acción que estará terminada antes de un momento futuro."
    },
    {
      "question": "Completa con Future Continuous: This time tomorrow, I ______ (fly) to Rome.",
      "answer": "will be flying",
      "note": "Future Continuous describe una acción que estará en curso en un momento futuro."
    },
    {
      "question": "Completa con Future Perfect Continuous: In July, she ______ (work) here for ten years.",
      "answer": "will have been working",
      "note": "Se destaca la duración de una actividad hasta un punto futuro."
    },
    {
      "question": "Elige la forma correcta: Don't call at 8 p.m.; we (will have dinner / will be having dinner).",
      "answer": "will be having dinner",
      "note": "La acción estará desarrollándose a las ocho."
    },
    {
      "question": "Corrige el error: By 2030, the company will has opened three offices.",
      "answer": "By 2030, the company will have opened three offices.",
      "note": "La estructura es will have + participio pasado."
    },
    {
      "question": "Completa: By the time you get home, I ______ (prepare) everything.",
      "answer": "will have prepared",
      "note": "La preparación estará terminada antes de que llegues."
    }
  ],
  "3": [
    {
      "question": "Completa el mixed conditional: If I had taken that job, I ______ (live) in Berlin now.",
      "answer": "would be living",
      "note": "La condición irreal pertenece al pasado; el resultado hipotético se refiere al presente."
    },
    {
      "question": "Completa: If she ______ (be) more careful, she wouldn't have made that mistake yesterday.",
      "answer": "were",
      "note": "Una condición presente/general puede explicar un resultado pasado: if + Past Simple, would have + participio."
    },
    {
      "question": "Elige la opción correcta: If they had left earlier, they (would arrive / would have arrived) on time yesterday.",
      "answer": "would have arrived",
      "note": "El resultado también pertenece al pasado."
    },
    {
      "question": "Corrige el error: If I would have known, I would have called you.",
      "answer": "If I had known, I would have called you.",
      "note": "En la cláusula con if no se usa would have en este tercer condicional."
    },
    {
      "question": "Completa con might have: We ______ (avoid) the delay if we had checked the traffic.",
      "answer": "might have avoided",
      "note": "Might have expresa un resultado pasado posible, pero no seguro."
    },
    {
      "question": "Reformula como mixed conditional: He didn't study medicine, so he isn't a doctor now. (If...)",
      "answer": "If he had studied medicine, he would be a doctor now.",
      "note": "La condición pasada tiene una consecuencia hipotética presente."
    }
  ],
  "4": [
    {
      "question": "Completa con inversión: Never ______ I ______ (see) such a confusing document.",
      "answer": "have; seen",
      "note": "Never al inicio exige inversión: auxiliar + sujeto + participio."
    },
    {
      "question": "Reescribe empezando por Not until: They announced the decision only after the meeting had ended.",
      "answer": "Not until the meeting had ended did they announce the decision.",
      "note": "Tras Not until + cláusula, la oración principal lleva inversión."
    },
    {
      "question": "Completa: Hardly ______ the train ______ (leave) when it began to snow.",
      "answer": "had; left",
      "note": "Hardly + had + sujeto + participio + when + Past Simple."
    },
    {
      "question": "Corrige el error: Rarely people have witnessed such a rapid change.",
      "answer": "Rarely have people witnessed such a rapid change.",
      "note": "Con Rarely al inicio, el auxiliar precede al sujeto."
    },
    {
      "question": "Reescribe con No sooner...than: I had closed the door. The phone rang.",
      "answer": "No sooner had I closed the door than the phone rang.",
      "note": "No sooner se combina con Past Perfect y than."
    },
    {
      "question": "Completa: Under no circumstances ______ you ______ (share) these details.",
      "answer": "should; share",
      "note": "La expresión negativa inicial provoca inversión; con should se usa el infinitivo sin to."
    }
  ],
  "5": [
    {
      "question": "Transforma destacando Maya: Maya suggested the solution. (It...)",
      "answer": "It was Maya who suggested the solution.",
      "note": "La estructura It was + foco + who destaca a una persona."
    },
    {
      "question": "Transforma destacando la solución: We need a clearer strategy. (What...)",
      "answer": "What we need is a clearer strategy.",
      "note": "What-clause + be + foco destaca la información nueva."
    },
    {
      "question": "Completa: It was the final chapter ______ changed my opinion.",
      "answer": "that",
      "note": "Se usa that para destacar una cosa o elemento no personal."
    },
    {
      "question": "Reescribe destacando el lugar: We first met in Oxford. (It...)",
      "answer": "It was in Oxford that we first met.",
      "note": "La estructura it-cleft permite focalizar el complemento de lugar."
    },
    {
      "question": "Corrige el error: What I need are more time.",
      "answer": "What I need is more time.",
      "note": "El verbo concuerda con el núcleo singular time."
    },
    {
      "question": "Completa: The reason ______ she resigned was the long commute.",
      "answer": "why",
      "note": "The reason why introduce la explicación que se quiere destacar."
    }
  ],
  "6": [
    {
      "question": "Pasa a pasiva: They must encrypt the files before sending them.",
      "answer": "The files must be encrypted before they are sent.",
      "note": "Modal + be + participio pasado."
    },
    {
      "question": "Completa la pasiva de infinitivo: The bridge is believed ______ (build) in the 18th century.",
      "answer": "to have been built",
      "note": "Para una acción pasiva anterior: to have been + participio."
    },
    {
      "question": "Reescribe con It is said that: People say that the actor lives abroad.",
      "answer": "It is said that the actor lives abroad.",
      "note": "La estructura impersonal es It + be + participio de reporting verb + that-clause."
    },
    {
      "question": "Completa con gerundio pasivo: She dislikes ______ (interrupt) during meetings.",
      "answer": "being interrupted",
      "note": "El gerundio pasivo se forma con being + participio."
    },
    {
      "question": "Corrige el error: The documents should submitted by Monday.",
      "answer": "The documents should be submitted by Monday.",
      "note": "Después del modal, la pasiva requiere be + participio."
    },
    {
      "question": "Reescribe con He is thought to: People think that he stole the painting.",
      "answer": "He is thought to have stolen the painting.",
      "note": "El infinitivo perfecto expresa que el supuesto robo ocurrió antes del pensamiento actual."
    }
  ],
  "7": [
    {
      "question": "Completa con -ing: He denied ______ (copy) the confidential file.",
      "answer": "copying",
      "note": "Deny va seguido de gerundio."
    },
    {
      "question": "Completa con infinitivo: They promised ______ (send) the results by Friday.",
      "answer": "to send",
      "note": "Promise selecciona to-infinitive."
    },
    {
      "question": "Completa con objeto + infinitivo: The tutor encouraged us ______ (apply) for the scholarship.",
      "answer": "to apply",
      "note": "Encourage + objeto + to-infinitive."
    },
    {
      "question": "Completa la advertencia: She warned me ______ (not / share) the password.",
      "answer": "not to share",
      "note": "Warn + objeto + not to-infinitive."
    },
    {
      "question": "Corrige el error: He suggested to postpone the meeting.",
      "answer": "He suggested postponing the meeting.",
      "note": "Suggest suele ir seguido de gerundio o de una cláusula con that."
    },
    {
      "question": "Reescribe usando accused: They said that Mark had taken the money.",
      "answer": "They accused Mark of taking the money.",
      "note": "Accuse + objeto + of + gerundio."
    }
  ],
  "8": [
    {
      "question": "Completa la deducción: The lights are on. They ______ (must / be) at home.",
      "answer": "must be",
      "note": "Must expresa una deducción afirmativa fuerte sobre el presente."
    },
    {
      "question": "Completa sobre el pasado: She ______ (might / miss) the last train; I'm not sure.",
      "answer": "might have missed",
      "note": "Might have + participio expresa posibilidad sobre un hecho pasado."
    },
    {
      "question": "Completa la imposibilidad: He ______ (can't / finish) already; he only started ten minutes ago.",
      "answer": "can't have finished",
      "note": "Can't have + participio expresa que algo pasado es prácticamente imposible."
    },
    {
      "question": "Completa la crítica: You ______ (should / check) the figures before submitting the report.",
      "answer": "should have checked",
      "note": "Should have + participio expresa una acción que habría sido conveniente, pero no se hizo."
    },
    {
      "question": "Corrige el error: They must had forgotten the appointment.",
      "answer": "They must have forgotten the appointment.",
      "note": "Los modales perfectos siguen modal + have + participio."
    },
    {
      "question": "Elige: The parcel isn't here. The courier (must have delivered / can't have delivered) it to the wrong address.",
      "answer": "must have delivered",
      "note": "La ausencia del paquete permite inferir que probablemente lo entregó en otro lugar."
    }
  ],
  "9": [
    {
      "question": "Completa con subjuntivo formal: The committee recommended that he ______ (resign).",
      "answer": "resign",
      "note": "Tras recommend that se puede usar el subjuntivo mandativo: forma base sin -s."
    },
    {
      "question": "Completa: It is essential that every applicant ______ (be) informed.",
      "answer": "be",
      "note": "En el subjuntivo formal, be permanece invariable."
    },
    {
      "question": "Reescribe con insist: They insisted that the report ______ (remain) confidential.",
      "answer": "remain",
      "note": "Insist that + sujeto + forma base expresa una exigencia."
    },
    {
      "question": "Corrige el error: The manager suggested that she applies again.",
      "answer": "The manager suggested that she apply again.",
      "note": "En esta construcción formal se usa la forma base apply."
    },
    {
      "question": "Completa con lest: They checked the figures twice lest an error ______ (go) unnoticed.",
      "answer": "go",
      "note": "Lest introduce una finalidad preventiva y va seguido de forma base en este registro."
    },
    {
      "question": "Elige la opción correcta: It is vital that the data (is / be) protected.",
      "answer": "be",
      "note": "El subjuntivo mandativo utiliza be, no is."
    }
  ],
  "10": [
    {
      "question": "Completa con artículo: ______ research published yesterday challenges the earlier findings.",
      "answer": "The",
      "note": "The identifica una investigación concreta ya delimitada."
    },
    {
      "question": "Completa sin artículo o con a/an: ______ Education can improve social mobility.",
      "answer": "— (sin artículo)",
      "note": "Education se usa en sentido general y es incontable."
    },
    {
      "question": "Completa: She works as ______ architect in the city centre.",
      "answer": "an",
      "note": "Se usa an antes de un sonido vocálico; aquí se clasifica la profesión."
    },
    {
      "question": "Corrige el error: The life is difficult for many people.",
      "answer": "Life is difficult for many people.",
      "note": "Life en sentido general no lleva artículo."
    },
    {
      "question": "Completa: I read a report yesterday. ______ report was extremely detailed.",
      "answer": "The",
      "note": "En la segunda mención se usa the porque el referente ya es conocido."
    },
    {
      "question": "Elige: (The / —) information in this email is confidential.",
      "answer": "The",
      "note": "El complemento in this email identifica información específica."
    }
  ],
  "11": [
    {
      "question": "Completa: There is ______ evidence to support the allegation. (little / few)",
      "answer": "little",
      "note": "Evidence es incontable; se usa little."
    },
    {
      "question": "Elige la forma verbal: A number of applicants (has / have) requested feedback.",
      "answer": "have",
      "note": "A number of + plural countable noun concuerda normalmente con verbo plural."
    },
    {
      "question": "Completa: The amount of traffic ______ (increase) every year.",
      "answer": "increases",
      "note": "The amount of + sustantivo incontable lleva verbo singular."
    },
    {
      "question": "Corrige el error: There are a great deal of information online.",
      "answer": "There is a great deal of information online.",
      "note": "A great deal of acompaña incontables y exige verbo singular."
    },
    {
      "question": "Completa: ______ proportion of residents support the proposal. (A considerable / A great deal)",
      "answer": "A considerable",
      "note": "Proportion es un sustantivo contable singular; a considerable proportion es la combinación adecuada."
    },
    {
      "question": "Elige: We received (a large number of / a large amount of) complaints.",
      "answer": "a large number of",
      "note": "Complaints es contable plural; number se usa con contables."
    }
  ],
  "12": [
    {
      "question": "Completa con whom o which: The colleague to ______ I spoke was extremely helpful.",
      "answer": "whom",
      "note": "Whom se refiere a personas después de una preposición en una relativa formal."
    },
    {
      "question": "Completa con whose: The researcher, ______ article was published last week, gave a lecture.",
      "answer": "whose",
      "note": "Whose expresa posesión y va seguido de un sustantivo."
    },
    {
      "question": "Completa con which para referirte a toda la idea: The board rejected the proposal, ______ surprised everyone.",
      "answer": "which",
      "note": "Which puede retomar la cláusula anterior completa."
    },
    {
      "question": "Reescribe usando preposición + which: This is the issue. We need to find a solution to it.",
      "answer": "This is the issue to which we need to find a solution.",
      "note": "En el registro formal, la preposición puede preceder a which."
    },
    {
      "question": "Reduce la relativa: The company, which was founded in 1984, now operates worldwide.",
      "answer": "The company, founded in 1984, now operates worldwide.",
      "note": "Una relativa pasiva puede reducirse a participio pasado."
    },
    {
      "question": "Corrige el error: The person to which I sent the email replied.",
      "answer": "The person to whom I sent the email replied.",
      "note": "Para personas se usa whom, no which, tras una preposición."
    }
  ],
  "13": [
    {
      "question": "Une usando una cláusula -ing: She walked through the old town. She noticed the restored theatre.",
      "answer": "Walking through the old town, she noticed the restored theatre.",
      "note": "El sujeto de la cláusula participial debe coincidir con el sujeto de la principal."
    },
    {
      "question": "Reduce la pasiva: The platform, which was designed for remote teams, is easy to use.",
      "answer": "The platform, designed for remote teams, is easy to use.",
      "note": "La cláusula pasiva se reduce a participio pasado."
    },
    {
      "question": "Completa con having + participio: ______ (review) the evidence, the committee reached a decision.",
      "answer": "Having reviewed",
      "note": "Having + participio indica que la acción terminó antes de la acción principal."
    },
    {
      "question": "Corrige el error de sujeto: Walking to the station, the rain started.",
      "answer": "Walking to the station, I got caught in the rain.",
      "note": "El sujeto implícito de la cláusula participial debe ser quien camina."
    },
    {
      "question": "Completa con el participio correcto: ______ (warn) about the delay, passengers sought alternative routes.",
      "answer": "Having been warned",
      "note": "La forma pasiva perfecta expresa que los pasajeros recibieron el aviso antes de buscar alternativas."
    },
    {
      "question": "Reescribe reduciendo la cláusula: Because he was exhausted, he went straight to bed.",
      "answer": "Being exhausted, he went straight to bed.",
      "note": "Being + adjetivo puede expresar causa en una cláusula participial."
    }
  ],
  "14": [
    {
      "question": "Elige: I remember (meeting / to meet) her at the conference last year.",
      "answer": "meeting",
      "note": "Remember + -ing recuerda una experiencia pasada."
    },
    {
      "question": "Elige: Please remember (locking / to lock) the archive before you leave.",
      "answer": "to lock",
      "note": "Remember + to-infinitive indica que no debes olvidar realizar una tarea."
    },
    {
      "question": "Completa: He stopped ______ (smoke) two years ago.",
      "answer": "smoking",
      "note": "Stop + -ing significa abandonar una actividad."
    },
    {
      "question": "Completa: We stopped ______ (buy) some water on the way.",
      "answer": "to buy",
      "note": "Stop + to-infinitive indica que se interrumpe otra actividad para hacer algo."
    },
    {
      "question": "Elige: If the app doesn't work, try (restarting / to restart) your device.",
      "answer": "restarting",
      "note": "Try + -ing significa probar un método como experimento."
    },
    {
      "question": "Corrige según el significado: I tried opening the heavy door, but it was locked, so I made an effort to force it open.",
      "answer": "I tried to open the heavy door, but it was locked.",
      "note": "Try + to-infinitive expresa hacer el esfuerzo de conseguir algo."
    }
  ],
  "19": [
    {
      "question": "Cambia a un registro formal: We need to put off the meeting.",
      "answer": "We need to postpone the meeting.",
      "note": "Postpone es más formal que put off."
    },
    {
      "question": "Elige la opción formal: Could you (get / obtain) a copy of the report?",
      "answer": "obtain",
      "note": "Obtain suele ser más formal que get."
    },
    {
      "question": "Reescribe sin contracción: We can't confirm the booking yet.",
      "answer": "We cannot confirm the booking yet.",
      "note": "En informes formales se suelen evitar contracciones."
    },
    {
      "question": "Completa con el verbo formal: The department will ______ further information. (get / obtain)",
      "answer": "obtain",
      "note": "Obtain es adecuado en comunicaciones formales."
    },
    {
      "question": "Corrige el registro: Hey, I'm asking about the documents you sent.",
      "answer": "I am enquiring about the documents you sent.",
      "note": "En una consulta formal se prefiere enquire y se evita el saludo coloquial."
    },
    {
      "question": "Elige la versión adecuada para un informe: (Kids / Children) need access to reliable information.",
      "answer": "Children",
      "note": "Children es la opción neutral/formal frente a kids."
    }
  ],
  "20": [
    {
      "question": "Reformula con cautela usando appears to: The policy is effective.",
      "answer": "The policy appears to be effective.",
      "note": "Appears to reduce la certeza de la afirmación."
    },
    {
      "question": "Completa con un modal de posibilidad: The figures ______ indicate a gradual recovery.",
      "answer": "may",
      "note": "May expresa posibilidad sin afirmar certeza."
    },
    {
      "question": "Reescribe usando arguably: This is the most important factor.",
      "answer": "Arguably, this is the most important factor.",
      "note": "Arguably presenta una valoración como argumento razonable, no como hecho indiscutible."
    },
    {
      "question": "Completa: The change has improved access, ______ to some extent. (at least / entirely)",
      "answer": "at least",
      "note": "To some extent limita el alcance de la afirmación."
    },
    {
      "question": "Corrige la afirmación demasiado categórica usando might: The new system will solve every problem.",
      "answer": "The new system might solve some of the problems.",
      "note": "Might introduce cautela y some evita una generalización absoluta."
    },
    {
      "question": "Elige la opción más prudente: The results (prove / appear to suggest) a link.",
      "answer": "appear to suggest",
      "note": "Appear to suggest expresa una interpretación provisional."
    }
  ],
  "21": [
    {
      "question": "Completa con despite + sustantivo: ______ the heavy rain, the event went ahead.",
      "answer": "Despite",
      "note": "Despite va seguido de un sustantivo o gerundio, no de una oración completa."
    },
    {
      "question": "Completa con in spite of + -ing: ______ (feel) tired, she finished the report.",
      "answer": "In spite of feeling",
      "note": "In spite of puede ir seguido de gerundio."
    },
    {
      "question": "Une usando even though: The task was difficult. They completed it on time.",
      "answer": "Even though the task was difficult, they completed it on time.",
      "note": "Even though introduce una cláusula con sujeto y verbo."
    },
    {
      "question": "Elige: Much as I (admire / am admiring) the proposal, I have some concerns.",
      "answer": "admire",
      "note": "Much as introduce una concesión y suele ir con presente simple para una opinión general."
    },
    {
      "question": "Corrige: Despite it was late, we continued working.",
      "answer": "Although it was late, we continued working. / Despite the late hour, we continued working.",
      "note": "Despite no introduce directamente una cláusula finita con sujeto y verbo."
    },
    {
      "question": "Completa con un conector: The plan is expensive; ______, it may be worth the investment.",
      "answer": "nevertheless",
      "note": "Nevertheless introduce un contraste con la idea anterior."
    }
  ],
  "22": [
    {
      "question": "Completa con owing to: The flight was cancelled ______ bad weather.",
      "answer": "owing to",
      "note": "Owing to va seguido de un sustantivo o grupo nominal."
    },
    {
      "question": "Une usando thereby + -ing: The team reduced waste. It saved money.",
      "answer": "The team reduced waste, thereby saving money.",
      "note": "Thereby va seguido de gerundio e indica el resultado de la acción anterior."
    },
    {
      "question": "Completa con so as to: She left early ______ avoid the traffic.",
      "answer": "so as to",
      "note": "So as to introduce finalidad y va seguido de infinitivo."
    },
    {
      "question": "Elige: The scheme was introduced (with the aim of reduce / with the aim of reducing) costs.",
      "answer": "with the aim of reducing",
      "note": "Aim of va seguido de gerundio."
    },
    {
      "question": "Corrige: Due to the road was closed, we took another route.",
      "answer": "Because the road was closed, we took another route. / Due to the road closure, we took another route.",
      "note": "Due to va seguido de un sustantivo, no de una cláusula completa."
    },
    {
      "question": "Reescribe expresando finalidad: He saved money because he wanted to buy a car. (in order to)",
      "answer": "He saved money in order to buy a car.",
      "note": "In order to + infinitivo expresa el propósito."
    }
  ],
  "23": [
    {
      "question": "Completa: She is committed to ______ (improve) working conditions.",
      "answer": "improving",
      "note": "En committed to, to es preposición y va seguida de gerundio."
    },
    {
      "question": "Completa: All staff should have access ______ the online platform.",
      "answer": "to",
      "note": "La colocación fija es have access to."
    },
    {
      "question": "Completa: It is important to distinguish ______ fact and opinion.",
      "answer": "between",
      "note": "La estructura es distinguish between A and B."
    },
    {
      "question": "Completa: Several residents objected to ______ (build) a new road.",
      "answer": "building",
      "note": "En object to, to es preposición y va seguida de gerundio."
    },
    {
      "question": "Corrige: We look forward to meet you.",
      "answer": "We look forward to meeting you.",
      "note": "Look forward to contiene una preposición seguida de gerundio."
    },
    {
      "question": "Elige: The charity is dedicated to (support / supporting) local families.",
      "answer": "supporting",
      "note": "Dedicated to + gerundio porque to funciona como preposición."
    }
  ],
  "24": [
    {
      "question": "Convierte en pregunta indirecta: Where is the station? (Could you tell me...)",
      "answer": "Could you tell me where the station is?",
      "note": "En preguntas indirectas se usa orden afirmativo: sujeto + verbo."
    },
    {
      "question": "Añade una question tag: You have finished the report, ______?",
      "answer": "haven't you?",
      "note": "Una afirmación positiva suele llevar una tag negativa con el mismo auxiliar."
    },
    {
      "question": "Añade una question tag: They weren't informed, ______?",
      "answer": "were they?",
      "note": "Una oración negativa lleva una tag positiva."
    },
    {
      "question": "Reformula como pregunta indirecta: What time does the shop close? (Do you know...)",
      "answer": "Do you know what time the shop closes?",
      "note": "Se elimina do-support y se mantiene el orden sujeto-verbo."
    },
    {
      "question": "Corrige: Could you tell me where is the nearest bank?",
      "answer": "Could you tell me where the nearest bank is?",
      "note": "Después de Could you tell me se usa orden de frase afirmativa."
    },
    {
      "question": "Completa la reacción: So you did ______ the email? (send)",
      "answer": "send",
      "note": "So you did...? puede expresar sorpresa y se completa con la forma base tras did."
    }
  ],
  "25": [
    {
      "question": "Completa: The negotiations are ______ to continue next week. (likely)",
      "answer": "likely",
      "note": "Be likely to + infinitivo expresa probabilidad."
    },
    {
      "question": "Reformula con bound to: She will certainly notice the mistake.",
      "answer": "She is bound to notice the mistake.",
      "note": "Be bound to expresa una expectativa muy alta o casi certeza."
    },
    {
      "question": "Completa con may well: The proposal ______ attract considerable support.",
      "answer": "may well",
      "note": "May well expresa una posibilidad bastante probable."
    },
    {
      "question": "Elige: He is (unlikely / unlikely to) accept the offer.",
      "answer": "unlikely to",
      "note": "La estructura es be unlikely to + infinitivo."
    },
    {
      "question": "Reescribe usando apparently: It seems that the building is empty.",
      "answer": "Apparently, the building is empty.",
      "note": "Apparently presenta información como algo que parece ser cierto según indicios."
    },
    {
      "question": "Corrige: They are likely winning the competition.",
      "answer": "They are likely to win the competition.",
      "note": "Likely va seguido de to-infinitive en esta estructura."
    }
  ],
  "26": [
    {
      "question": "Completa: This version is ______ (far / very) more reliable than the previous one.",
      "answer": "far",
      "note": "Far puede intensificar un comparativo."
    },
    {
      "question": "Completa: It was by ______ the most challenging stage.",
      "answer": "far",
      "note": "By far intensifica un superlativo."
    },
    {
      "question": "Completa la correlativa: The more you practise, the ______ (confident) you become.",
      "answer": "more confident",
      "note": "La estructura the + comparative, the + comparative expresa relación proporcional."
    },
    {
      "question": "Elige: The second route is (slightly / by far) shorter than the first.",
      "answer": "slightly",
      "note": "Slightly modera la diferencia en un comparativo."
    },
    {
      "question": "Corrige: This is the most easiest option.",
      "answer": "This is the easiest option.",
      "note": "No se combinan most y el sufijo -est en el mismo superlativo."
    },
    {
      "question": "Completa: The ______ (early) we leave, the less traffic we will encounter.",
      "answer": "earlier",
      "note": "En la correlativa se usa comparativo en ambas partes."
    }
  ],
  "27": [
    {
      "question": "Pasa a causativa con have: A technician repaired my laptop yesterday.",
      "answer": "I had my laptop repaired yesterday.",
      "note": "Have + objeto + participio indica que otra persona realiza el servicio."
    },
    {
      "question": "Completa: We need to get the heating system ______ (check).",
      "answer": "checked",
      "note": "Get + objeto + participio expresa que se encarga una acción a otra persona."
    },
    {
      "question": "Reescribe con have + persona + infinitivo: The manager asked the assistant to print the documents.",
      "answer": "The manager had the assistant print the documents.",
      "note": "Have + persona + infinitivo sin to expresa dar instrucciones o encargar una tarea."
    },
    {
      "question": "Completa: She had her portrait ______ (take) by a professional photographer.",
      "answer": "taken",
      "note": "En la causativa pasiva se usa have + objeto + participio."
    },
    {
      "question": "Corrige: I got my car to repair last week.",
      "answer": "I got my car repaired last week.",
      "note": "Get + objeto + participio, sin to."
    },
    {
      "question": "Elige: They had the electrician (install / installed) new lights.",
      "answer": "install",
      "note": "Con have + persona, se utiliza infinitivo sin to."
    }
  ],
  "28": [
    {
      "question": "Completa: I'd rather ______ (stay) at home tonight.",
      "answer": "stay",
      "note": "Would rather + infinitivo sin to cuando el sujeto es el mismo."
    },
    {
      "question": "Completa: I'd rather you ______ (not / mention) the issue at the meeting.",
      "answer": "didn't mention",
      "note": "Would rather + sujeto distinto + Past Simple expresa preferencia presente/futura."
    },
    {
      "question": "Completa: It's high time we ______ (take) action.",
      "answer": "took",
      "note": "It's high time va seguido de Past Simple con sentido presente."
    },
    {
      "question": "Completa: I wish I ______ (accept) the offer last year.",
      "answer": "had accepted",
      "note": "Wish + Past Perfect expresa arrepentimiento sobre el pasado."
    },
    {
      "question": "Corrige: I'd rather to go by train.",
      "answer": "I'd rather go by train.",
      "note": "Would rather no lleva to antes del verbo."
    },
    {
      "question": "Elige: I wish I (knew / had known) about the delay yesterday.",
      "answer": "had known",
      "note": "Yesterday sitúa el arrepentimiento en el pasado; se usa Past Perfect."
    }
  ],
  "29": [
    {
      "question": "Responde usando so: I enjoy working remotely. (you)",
      "answer": "So do I.",
      "note": "So + auxiliar + sujeto expresa que se comparte una afirmación."
    },
    {
      "question": "Responde usando neither: She hasn't seen the film. (I)",
      "answer": "Neither have I.",
      "note": "Neither + auxiliar + sujeto expresa acuerdo con una afirmación negativa."
    },
    {
      "question": "Evita repetir el verbo: He said he would help, and he did ______.",
      "answer": "so",
      "note": "Do so sustituye una acción mencionada anteriormente."
    },
    {
      "question": "Completa con one u ones: I prefer the blue ______ to the black ones.",
      "answer": "one",
      "note": "One sustituye un sustantivo contable singular mencionado."
    },
    {
      "question": "Corrige: I don't like these shoes; I prefer the red one (plural).",
      "answer": "I don't like these shoes; I prefer the red ones.",
      "note": "Ones sustituye un sustantivo contable plural."
    },
    {
      "question": "Completa la elipsis: Although (he was) ______ tired, he continued working.",
      "answer": "Although tired, he continued working.",
      "note": "Se puede omitir sujeto y verbo be cuando el sentido queda claro."
    }
  ],
  "30": [
    {
      "question": "Une usando furthermore: The proposal is affordable. It is easy to implement.",
      "answer": "The proposal is affordable; furthermore, it is easy to implement.",
      "note": "Furthermore añade un argumento o información adicional."
    },
    {
      "question": "Une con that said: The deadline is tight. We can still deliver the project.",
      "answer": "The deadline is tight. That said, we can still deliver the project.",
      "note": "That said introduce una reserva o contraste con lo anterior."
    },
    {
      "question": "Reformula aclarando con in other words: The plan is not feasible.",
      "answer": "In other words, the plan cannot be carried out successfully.",
      "note": "In other words introduce una reformulación explicativa."
    },
    {
      "question": "Completa con namely para especificar: Two departments will lead the project, ______ Finance and Operations.",
      "answer": "namely",
      "note": "Namely introduce los elementos concretos a los que se refiere una expresión general."
    },
    {
      "question": "Completa el resultado: The supplier failed to deliver; ______, production was delayed.",
      "answer": "as a consequence",
      "note": "As a consequence introduce el resultado de la situación anterior."
    },
    {
      "question": "Elige el conector adecuado: The data is incomplete. (Moreover / Having said that), the trend is still clear.",
      "answer": "Having said that",
      "note": "Having said that introduce una matización o contraste, no una suma de argumentos."
    }
  ]
};

export const buildB2ExerciseSections = (unit: A2PdfUnit) => {
  const shared = buildA2ExerciseSections(unit);
  const grammar = grammarBanks[unit.number] ?? unit.exercises;
  return [
    { title: `GRAMMAR — ${grammar.length} ejercicios`, exercises: grammar },
    ...shared.filter((section) => !section.title.startsWith("GRAMMAR")),
  ];
};

export const getB2ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);
