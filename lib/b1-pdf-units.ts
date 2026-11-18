import type { A2PdfUnit } from "./a2-pdf-unit-types";

const B1_SEEDS: Omit<A2PdfUnit, "readingPassages">[] =  [
  {
    "number": 1,
    "slug": "unidad-1-present-perfect-vs-past-simple",
    "title": "Present Perfect vs Past Simple",
    "focus": "Distinguir experiencias y acciones pasadas con un momento terminado.",
    "explanation": "El Present Perfect conecta una experiencia o resultado con el presente y no suele indicar cuándo ocurrió. El Past Simple sitúa la acción en un periodo terminado o en un momento concreto. Compara Have you ever visited Dublin? con When did you visit Dublin?",
    "structure": [
      "Present Perfect: have/has + participio",
      "Past Simple: verbo en pasado",
      "ever/never/already/yet suelen acompañar al Present Perfect",
      "yesterday/last year/ago suelen acompañar al Past Simple."
    ],
    "examples": [
      "I've tried sushi several times.",
      "I tried it for the first time last summer.",
      "Have you finished the report yet?"
    ],
    "vocabulary": [
      "experience — experiencia",
      "recently — recientemente",
      "so far — hasta ahora",
      "last year — el año pasado"
    ],
    "exercises": [
      {
        "question": "I ___ (never / see) snow before.",
        "answer": "have never seen",
        "note": "Never sitúa la experiencia en relación con el presente."
      },
      {
        "question": "We ___ (go) to Edinburgh in 2022.",
        "answer": "went",
        "note": "In 2022 es un momento pasado terminado."
      },
      {
        "question": "___ you ever ___ (meet) a famous person?",
        "answer": "Have; met",
        "note": "Ever pregunta por experiencias vitales."
      },
      {
        "question": "Corrige: I have bought this coat yesterday.",
        "answer": "I bought this coat yesterday.",
        "note": "Yesterday requiere Past Simple."
      },
      {
        "question": "She ___ (not / finish) her work yet.",
        "answer": "hasn't finished",
        "note": "Yet aparece habitualmente en negativas con Present Perfect."
      },
      {
        "question": "When ___ they ___ (arrive)?",
        "answer": "did; arrive",
        "note": "La pregunta por un momento concreto usa did + verbo base."
      }
    ]
  },
  {
    "number": 2,
    "slug": "unidad-2-present-perfect-continuous",
    "title": "Present Perfect Continuous",
    "focus": "Explicar actividades que empezaron en el pasado y continúan o muestran un resultado presente.",
    "explanation": "Se forma con have/has been + verbo-ing. Destaca la duración o el proceso de una actividad, especialmente con for y since. El Present Perfect simple suele destacar el resultado o la cantidad completada.",
    "structure": [
      "have/has been + -ing",
      "How long have you been…?",
      "for + periodo",
      "since + punto inicial."
    ],
    "examples": [
      "I've been studying for two hours.",
      "She has been working here since March.",
      "Your hands are dirty. Have you been gardening?"
    ],
    "vocabulary": [
      "duration — duración",
      "recently — últimamente",
      "exhausted — agotado",
      "improve — mejorar"
    ],
    "exercises": [
      {
        "question": "I ___ (learn) English for three years.",
        "answer": "have been learning",
        "note": "La actividad empezó en el pasado y continúa."
      },
      {
        "question": "He is tired because he ___ (run).",
        "answer": "has been running",
        "note": "El resultado presente muestra una actividad reciente."
      },
      {
        "question": "How long ___ you ___ (wait)?",
        "answer": "have; been waiting",
        "note": "Pregunta de duración con have + sujeto + been + -ing."
      },
      {
        "question": "Corrige: She has working all morning.",
        "answer": "She has been working all morning.",
        "note": "Falta been en la forma continua."
      },
      {
        "question": "They ___ (not / sleep) well recently.",
        "answer": "haven't been sleeping",
        "note": "Present Perfect Continuous negativo."
      },
      {
        "question": "We ___ (paint) the kitchen since nine.",
        "answer": "have been painting",
        "note": "Since introduce el momento de inicio."
      }
    ]
  },
  {
    "number": 3,
    "slug": "unidad-3-past-perfect",
    "title": "Past Perfect",
    "focus": "Ordenar dos acontecimientos pasados indicando cuál ocurrió primero.",
    "explanation": "El Past Perfect se forma con had + participio y presenta una acción anterior a otro momento pasado. Se utiliza para aclarar la secuencia en narraciones y explicar causas o resultados pasados.",
    "structure": [
      "had + participio",
      "hadn't + participio",
      "Had + sujeto + participio?",
      "by the time, already, before, after."
    ],
    "examples": [
      "The train had left before we arrived.",
      "She was nervous because she hadn't flown before.",
      "Had you met him before the conference?"
    ],
    "vocabulary": [
      "by the time — para cuando",
      "previously — anteriormente",
      "miss — perder",
      "realise — darse cuenta"
    ],
    "exercises": [
      {
        "question": "When I arrived, the meeting ___ already ___ (start).",
        "answer": "had; started",
        "note": "La reunión empezó antes de mi llegada."
      },
      {
        "question": "He couldn't enter because he ___ (forget) his key.",
        "answer": "had forgotten",
        "note": "El olvido ocurrió antes del problema."
      },
      {
        "question": "___ they ___ (book) the tickets before Friday?",
        "answer": "Had; booked",
        "note": "Pregunta con had antes del sujeto."
      },
      {
        "question": "Corrige: After she had ate, she went out.",
        "answer": "After she had eaten, she went out.",
        "note": "El participio de eat es eaten."
      },
      {
        "question": "We ___ (not / hear) the news before you called.",
        "answer": "hadn't heard",
        "note": "La acción no había ocurrido antes de la llamada."
      },
      {
        "question": "By 8 p.m., I ___ (finish) the report.",
        "answer": "had finished",
        "note": "By + momento pasado suele combinarse con Past Perfect."
      }
    ]
  },
  {
    "number": 4,
    "slug": "unidad-4-narrative-tenses",
    "title": "Narrative tenses",
    "focus": "Combinar Past Simple, Past Continuous y Past Perfect para contar historias con claridad.",
    "explanation": "En una narración, Past Simple presenta los acontecimientos principales; Past Continuous describe el contexto o una acción en progreso; Past Perfect explica lo que había ocurrido antes. Los conectores ayudan a ordenar los hechos.",
    "structure": [
      "Past Simple: acción principal",
      "Past Continuous: contexto",
      "Past Perfect: acción anterior",
      "while/when/as soon as/by the time."
    ],
    "examples": [
      "I was walking home when I heard a noise.",
      "The lights went out while we were having dinner.",
      "She realised she had left her phone at work."
    ],
    "vocabulary": [
      "suddenly — de repente",
      "meanwhile — mientras tanto",
      "eventually — finalmente",
      "unexpected — inesperado"
    ],
    "exercises": [
      {
        "question": "While we ___ (drive), it started to snow.",
        "answer": "were driving",
        "note": "La acción en progreso usa Past Continuous."
      },
      {
        "question": "By the time we arrived, the shop ___ (close).",
        "answer": "had closed",
        "note": "El cierre ocurrió antes de nuestra llegada."
      },
      {
        "question": "I ___ (hear) a loud noise and looked outside.",
        "answer": "heard",
        "note": "El acontecimiento principal usa Past Simple."
      },
      {
        "question": "Corrige: I was see him when I crossed the road.",
        "answer": "I saw him when I crossed the road.",
        "note": "See es el acontecimiento puntual."
      },
      {
        "question": "She was upset because she ___ (lose) her wallet.",
        "answer": "had lost",
        "note": "Past Perfect explica la causa anterior."
      },
      {
        "question": "What ___ you ___ (do) when the alarm rang?",
        "answer": "were; doing",
        "note": "Pregunta por una acción en progreso."
      }
    ]
  },
  {
    "number": 5,
    "slug": "unidad-5-used-to-would-and-be-used-to",
    "title": "Used to, would and be used to",
    "focus": "Describir hábitos pasados y diferenciar costumbres de situaciones familiares.",
    "explanation": "Used to describe hábitos o estados pasados que han cambiado. Would puede describir acciones repetidas del pasado, pero no suele emplearse para estados. Be used to significa estar acostumbrado y va seguido de sustantivo o verbo-ing.",
    "structure": [
      "used to + verbo base",
      "would + verbo base para acciones repetidas",
      "be used to + sustantivo/-ing",
      "get used to = acostumbrarse."
    ],
    "examples": [
      "I used to live near the sea.",
      "Every summer, we would visit our grandparents.",
      "I'm used to getting up early."
    ],
    "vocabulary": [
      "childhood — infancia",
      "get accustomed to — acostumbrarse",
      "routine — rutina",
      "familiar — familiar"
    ],
    "exercises": [
      {
        "question": "I ___ (play) outside every afternoon when I was young.",
        "answer": "used to play",
        "note": "Describe un hábito pasado que ya no continúa."
      },
      {
        "question": "She is used to ___ (work) at night.",
        "answer": "working",
        "note": "Después de be used to usamos -ing."
      },
      {
        "question": "We ___ visit our cousins every August.",
        "answer": "would",
        "note": "Would puede describir acciones repetidas en el pasado."
      },
      {
        "question": "Corrige: I am used to wake up early.",
        "answer": "I am used to waking up early.",
        "note": "Be used to va seguido de gerundio."
      },
      {
        "question": "There ___ be a cinema here, but it closed.",
        "answer": "used to",
        "note": "Used to también describe estados o lugares."
      },
      {
        "question": "He is slowly getting used to ___ (drive) on the left.",
        "answer": "driving",
        "note": "Get used to expresa el proceso de adaptación."
      }
    ]
  },
  {
    "number": 6,
    "slug": "unidad-6-future-plans-and-arrangements",
    "title": "Future plans and arrangements",
    "focus": "Elegir entre will, going to y Present Continuous según la intención y el grado de organización.",
    "explanation": "Will expresa decisiones espontáneas, promesas y predicciones; going to indica intenciones previas o predicciones con evidencia; Present Continuous expresa arreglos concretos ya organizados.",
    "structure": [
      "will + verbo",
      "be going to + verbo",
      "be + -ing para arreglos",
      "Present Simple para horarios oficiales."
    ],
    "examples": [
      "I'll help you with those bags.",
      "We're going to move house in July.",
      "I'm meeting the director at ten."
    ],
    "vocabulary": [
      "arrangement — acuerdo",
      "intention — intención",
      "forecast — previsión",
      "appointment — cita"
    ],
    "exercises": [
      {
        "question": "The phone is ringing. I ___ answer it.",
        "answer": "will",
        "note": "Decisión espontánea."
      },
      {
        "question": "Look at those clouds! It ___ rain.",
        "answer": "is going to",
        "note": "Predicción basada en evidencia visible."
      },
      {
        "question": "We ___ meeting the client at 11; it's in the diary.",
        "answer": "are",
        "note": "Arreglo futuro organizado."
      },
      {
        "question": "Corrige: I going to apply for the job.",
        "answer": "I'm going to apply for the job.",
        "note": "La estructura necesita be."
      },
      {
        "question": "The train ___ at 6:45 tomorrow.",
        "answer": "leaves",
        "note": "Los horarios oficiales usan Present Simple."
      },
      {
        "question": "I promise I ___ call you tonight.",
        "answer": "will",
        "note": "Will expresa una promesa."
      }
    ]
  },
  {
    "number": 7,
    "slug": "unidad-7-conditionals-zero-first-and-second",
    "title": "Conditionals: zero, first and second",
    "focus": "Expresar hechos generales, posibilidades reales e hipótesis poco probables.",
    "explanation": "Zero Conditional expresa hechos o rutinas; First Conditional, posibilidades futuras reales; Second Conditional, situaciones imaginarias o poco probables. La forma verbal de cada cláusula determina el significado.",
    "structure": [
      "Zero: if + Present, Present",
      "First: if + Present, will + base",
      "Second: if + Past, would + base."
    ],
    "examples": [
      "If you heat ice, it melts.",
      "If it rains, we'll stay inside.",
      "If I had more time, I'd learn Japanese."
    ],
    "vocabulary": [
      "condition — condición",
      "likely — probable",
      "unlikely — poco probable",
      "consequence — consecuencia"
    ],
    "exercises": [
      {
        "question": "If you mix blue and yellow, you ___ green.",
        "answer": "get",
        "note": "Zero Conditional expresa un hecho general."
      },
      {
        "question": "If I finish early, I ___ (call) you.",
        "answer": "will call",
        "note": "First Conditional: resultado posible."
      },
      {
        "question": "If I ___ (be) you, I'd apologise.",
        "answer": "were",
        "note": "Second Conditional expresa una hipótesis."
      },
      {
        "question": "Corrige: If it will rain, we'll cancel.",
        "answer": "If it rains, we'll cancel.",
        "note": "No usamos will normalmente en la cláusula if."
      },
      {
        "question": "She would travel more if she ___ (have) money.",
        "answer": "had",
        "note": "Second Conditional usa Past Simple en la condición."
      },
      {
        "question": "If people don't sleep enough, they ___ tired.",
        "answer": "feel",
        "note": "Zero Conditional: hecho general."
      }
    ]
  },
  {
    "number": 8,
    "slug": "unidad-8-third-conditional",
    "title": "Third Conditional",
    "focus": "Imaginar resultados diferentes para situaciones pasadas que ya no pueden cambiarse.",
    "explanation": "El Third Conditional habla de una condición irreal en el pasado y de su resultado hipotético. Se forma con if + Past Perfect y would have + participio. A menudo expresa arrepentimiento o crítica.",
    "structure": [
      "If + had + participio",
      "would have + participio",
      "could/might have + participio para otros resultados."
    ],
    "examples": [
      "If I had left earlier, I would have caught the train.",
      "She wouldn't have missed the call if her phone had been on.",
      "If they had asked, we could have helped."
    ],
    "vocabulary": [
      "regret — arrepentimiento",
      "miss — perder",
      "opportunity — oportunidad",
      "otherwise — de otro modo"
    ],
    "exercises": [
      {
        "question": "If we ___ (leave) earlier, we would have arrived on time.",
        "answer": "had left",
        "note": "La condición pasada usa Past Perfect."
      },
      {
        "question": "He would have passed if he ___ (study) more.",
        "answer": "had studied",
        "note": "La condición explica un resultado pasado imaginario."
      },
      {
        "question": "If I had known, I ___ (help) you.",
        "answer": "would have helped",
        "note": "Resultado: would have + participio."
      },
      {
        "question": "Corrige: If she studied, she would have passed.",
        "answer": "If she had studied, she would have passed.",
        "note": "Third Conditional requiere Past Perfect."
      },
      {
        "question": "They ___ (not / get) lost if they had used a map.",
        "answer": "wouldn't have got / gotten",
        "note": "Resultado hipotético negativo."
      },
      {
        "question": "If you had called, I ___ (come).",
        "answer": "would have come",
        "note": "La acción no ocurrió porque la condición no se cumplió."
      }
    ]
  },
  {
    "number": 9,
    "slug": "unidad-9-wish-and-if-only",
    "title": "Wish and if only",
    "focus": "Expresar deseos sobre el presente, arrepentimientos pasados y situaciones que queremos cambiar.",
    "explanation": "Wish e if only introducen deseos. Para una situación presente que queremos diferente usamos Past Simple; para arrepentimientos pasados, Past Perfect; para quejas o deseos de cambio usamos wish + would cuando queremos que algo cambie.",
    "structure": [
      "wish + Past Simple",
      "wish + Past Perfect",
      "wish + would + verbo",
      "if only tiene un énfasis mayor."
    ],
    "examples": [
      "I wish I had more free time.",
      "She wishes she hadn't said that.",
      "I wish the neighbours would turn the music down."
    ],
    "vocabulary": [
      "regret — arrepentirse",
      "annoying — molesto",
      "change — cambiar",
      "impossible — imposible"
    ],
    "exercises": [
      {
        "question": "I wish I ___ (speak) French.",
        "answer": "spoke",
        "note": "Past Simple expresa un deseo sobre el presente."
      },
      {
        "question": "He wishes he ___ (not / miss) the train yesterday.",
        "answer": "hadn't missed",
        "note": "Past Perfect expresa arrepentimiento pasado."
      },
      {
        "question": "I wish you ___ (stop) interrupting me.",
        "answer": "would stop",
        "note": "Wish + would expresa deseo de cambio."
      },
      {
        "question": "Corrige: I wish I have a bigger flat.",
        "answer": "I wish I had a bigger flat.",
        "note": "Después de wish usamos Past Simple para el presente irreal."
      },
      {
        "question": "If only we ___ (book) earlier!",
        "answer": "had booked",
        "note": "Expresa arrepentimiento sobre el pasado."
      },
      {
        "question": "She wishes it ___ (not / rain) so much.",
        "answer": "wouldn't rain",
        "note": "Desea que una situación cambie."
      }
    ]
  },
  {
    "number": 10,
    "slug": "unidad-10-modals-of-obligation-and-advice",
    "title": "Modals of obligation and advice",
    "focus": "Distinguir obligación, ausencia de obligación, prohibición y consejo.",
    "explanation": "Must y have to expresan obligación; mustn't indica prohibición; don't have to significa que no es necesario. Should y ought to expresan consejo. Had better ofrece una recomendación fuerte sobre una situación concreta.",
    "structure": [
      "must/have to + base",
      "mustn't = prohibición",
      "don't have to = no obligación",
      "should/ought to/had better + base."
    ],
    "examples": [
      "You must wear a helmet.",
      "You don't have to come early.",
      "You should speak to your tutor.",
      "We'd better leave now."
    ],
    "vocabulary": [
      "compulsory — obligatorio",
      "permission — permiso",
      "advice — consejo",
      "rule — norma"
    ],
    "exercises": [
      {
        "question": "You ___ wear a seat belt by law.",
        "answer": "must / have to",
        "note": "Expresa obligación legal."
      },
      {
        "question": "You ___ bring food; lunch is included.",
        "answer": "don't have to",
        "note": "No es necesario."
      },
      {
        "question": "You ___ park here; it's forbidden.",
        "answer": "mustn't",
        "note": "Mustn't expresa prohibición."
      },
      {
        "question": "Corrige: You should to rest.",
        "answer": "You should rest.",
        "note": "Should va seguido del verbo base sin to."
      },
      {
        "question": "We'd better ___ now or we'll be late.",
        "answer": "leave",
        "note": "Had better + verbo base."
      },
      {
        "question": "Students ___ submit the form by Friday.",
        "answer": "have to / must",
        "note": "Obligación con fecha límite."
      }
    ]
  },
  {
    "number": 11,
    "slug": "unidad-11-modals-of-deduction-present",
    "title": "Modals of deduction: present",
    "focus": "Hacer deducciones sobre situaciones presentes usando distintos grados de certeza.",
    "explanation": "Must expresa una deducción muy probable; can't indica que algo es imposible o muy improbable; might, may y could expresan posibilidad. No describen obligación cuando se usan para deducir.",
    "structure": [
      "must + base",
      "can't + base",
      "may/might/could + base",
      "be + adjetivo para estados."
    ],
    "examples": [
      "She must be at work; her car is outside.",
      "That can't be the right answer.",
      "They might be waiting for us."
    ],
    "vocabulary": [
      "evidence — prueba",
      "certain — seguro",
      "unlikely — improbable",
      "possibility — posibilidad"
    ],
    "exercises": [
      {
        "question": "He has a key, so he ___ be inside.",
        "answer": "must",
        "note": "La evidencia permite una deducción probable."
      },
      {
        "question": "That ___ be Julia; she's abroad.",
        "answer": "can't",
        "note": "La información hace que sea imposible."
      },
      {
        "question": "They ___ be stuck in traffic; I'm not sure.",
        "answer": "might / may / could",
        "note": "Expresa posibilidad sin certeza."
      },
      {
        "question": "Corrige: She must to be tired.",
        "answer": "She must be tired.",
        "note": "Los modales van seguidos de verbo base o be."
      },
      {
        "question": "The lights are off. They ___ be at home.",
        "answer": "might not",
        "note": "Deducción negativa posible."
      },
      {
        "question": "You ___ be hungry after that long walk.",
        "answer": "must",
        "note": "Conclusión lógica basada en evidencia."
      }
    ]
  },
  {
    "number": 12,
    "slug": "unidad-12-passive-voice-present-and-past",
    "title": "Passive voice: present and past",
    "focus": "Poner el foco en la acción o el resultado en lugar de quién la realiza.",
    "explanation": "La voz pasiva se forma con be + participio. El tiempo verbal aparece en be: is made, was built. Se usa cuando el agente es desconocido, evidente o menos importante. El complemento agente se introduce con by cuando interesa mencionarlo.",
    "structure": [
      "Present: am/is/are + participio",
      "Past: was/were + participio",
      "by + agente",
      "el objeto de la activa pasa a sujeto."
    ],
    "examples": [
      "The office is cleaned every evening.",
      "The bridge was built in 1920.",
      "These products are made in Spain."
    ],
    "vocabulary": [
      "manufacture — fabricar",
      "invent — inventar",
      "discover — descubrir",
      "agent — agente"
    ],
    "exercises": [
      {
        "question": "English ___ (speak) in many countries.",
        "answer": "is spoken",
        "note": "Pasiva en Present Simple."
      },
      {
        "question": "The building ___ (open) in 1998.",
        "answer": "was opened",
        "note": "Pasiva en Past Simple."
      },
      {
        "question": "These cars ___ (make) in Germany.",
        "answer": "are made",
        "note": "Plural: are + participio."
      },
      {
        "question": "Pasa a pasiva: They repaired the road.",
        "answer": "The road was repaired.",
        "note": "El objeto pasa a sujeto."
      },
      {
        "question": "The letters ___ (not / deliver) yesterday.",
        "answer": "weren't delivered",
        "note": "Negativa en Past Simple pasivo."
      },
      {
        "question": "Who ___ this picture ___ (paint) by?",
        "answer": "was; painted",
        "note": "Pregunta pasiva con was antes del sujeto."
      }
    ]
  },
  {
    "number": 13,
    "slug": "unidad-13-passive-with-modals-and-future-forms",
    "title": "Passive with modals and future forms",
    "focus": "Construir pasivas con modales y referencias al futuro.",
    "explanation": "Después de un modal usamos be + participio: must be completed. Para el futuro usamos will be + participio. La forma pasiva mantiene el foco en la acción, la norma o el resultado.",
    "structure": [
      "modal + be + participio",
      "will be + participio",
      "have to be + participio",
      "should be + participio."
    ],
    "examples": [
      "The form must be signed.",
      "The results will be published tomorrow.",
      "This problem should be discussed."
    ],
    "vocabulary": [
      "requirement — requisito",
      "publish — publicar",
      "approve — aprobar",
      "complete — completar"
    ],
    "exercises": [
      {
        "question": "The application must ___ (send) today.",
        "answer": "be sent",
        "note": "Modal + be + participio."
      },
      {
        "question": "The new library ___ (open) next year.",
        "answer": "will be opened",
        "note": "Futuro pasivo: will be + participio."
      },
      {
        "question": "All the rooms should ___ (clean) before noon.",
        "answer": "be cleaned",
        "note": "Should be + participio."
      },
      {
        "question": "Corrige: The work must finished today.",
        "answer": "The work must be finished today.",
        "note": "Falta be en la pasiva modal."
      },
      {
        "question": "The decision ___ (announce) next week.",
        "answer": "will be announced",
        "note": "Acción futura en pasiva."
      },
      {
        "question": "Mobile phones have to ___ (switch off).",
        "answer": "be switched off",
        "note": "Have to + be + participio."
      }
    ]
  },
  {
    "number": 14,
    "slug": "unidad-14-reported-speech-statements",
    "title": "Reported speech: statements",
    "focus": "Transmitir afirmaciones de otra persona ajustando tiempos, pronombres y referencias temporales.",
    "explanation": "En estilo indirecto, si el verbo introductor está en pasado, el tiempo verbal suele retroceder: Present Simple a Past Simple, will a would, Present Perfect a Past Perfect. Los pronombres y expresiones como today o here cambian según el contexto.",
    "structure": [
      "say/tell + (that) + oración",
      "present → past",
      "will → would",
      "today → that day",
      "tell necesita objeto."
    ],
    "examples": [
      "'I'm busy.' → She said she was busy.",
      "'We'll help.' → They said they would help.",
      "He told me that he had lost his keys."
    ],
    "vocabulary": [
      "report — contar",
      "statement — afirmación",
      "explain — explicar",
      "promise — prometer"
    ],
    "exercises": [
      {
        "question": "'I live here,' he said. → He said he ___ there.",
        "answer": "lived",
        "note": "Present Simple suele pasar a Past Simple."
      },
      {
        "question": "'We will call,' they said. → They said they ___ call.",
        "answer": "would",
        "note": "Will pasa a would."
      },
      {
        "question": "'I've finished,' she said. → She said she ___ finished.",
        "answer": "had",
        "note": "Present Perfect retrocede a Past Perfect."
      },
      {
        "question": "Corrige: He said me he was tired.",
        "answer": "He told me he was tired. / He said he was tired.",
        "note": "Tell lleva objeto; say no se usa así."
      },
      {
        "question": "'I am working,' Tom said. → Tom said he ___ working.",
        "answer": "was",
        "note": "Present Continuous pasa a Past Continuous."
      },
      {
        "question": "'I can swim,' she said. → She said she ___ swim.",
        "answer": "could",
        "note": "Can pasa a could."
      }
    ]
  },
  {
    "number": 15,
    "slug": "unidad-15-reported-questions-and-commands",
    "title": "Reported questions and commands",
    "focus": "Contar preguntas, peticiones y órdenes sin mantener el orden interrogativo directo.",
    "explanation": "Las preguntas indirectas usan orden afirmativo y no llevan signo de interrogación dentro de la cláusula. Las preguntas yes/no suelen introducirse con if o whether. Las órdenes se reportan con tell/ask + objeto + to-infinitive; la negativa usa not to.",
    "structure": [
      "ask + wh-word + sujeto + verbo",
      "ask if/whether",
      "tell/ask + objeto + to",
      "not to + verbo."
    ],
    "examples": [
      "'Where do you live?' → He asked where I lived.",
      "'Are you ready?' → She asked if I was ready.",
      "'Don't touch it.' → He told us not to touch it."
    ],
    "vocabulary": [
      "whether — si",
      "request — petición",
      "order — orden",
      "warn — advertir"
    ],
    "exercises": [
      {
        "question": "'Where is the station?' → She asked where the station ___.",
        "answer": "was",
        "note": "La pregunta indirecta usa orden afirmativo."
      },
      {
        "question": "'Do you work here?' → He asked me ___ I worked there.",
        "answer": "if / whether",
        "note": "If o whether introducen preguntas yes/no."
      },
      {
        "question": "'Please sit down.' → She asked us ___ sit down.",
        "answer": "to",
        "note": "Ask + objeto + to-infinitive."
      },
      {
        "question": "Corrige: He asked me where did I live.",
        "answer": "He asked me where I lived.",
        "note": "No usamos inversión en preguntas indirectas."
      },
      {
        "question": "'Don't be late.' → Mum told me ___ be late.",
        "answer": "not to",
        "note": "Orden negativa: told + objeto + not to."
      },
      {
        "question": "'Can you help?' → They asked whether I ___ help.",
        "answer": "could",
        "note": "Can suele pasar a could."
      }
    ]
  },
  {
    "number": 16,
    "slug": "unidad-16-defining-and-non-defining-relative-clauses",
    "title": "Defining and non-defining relative clauses",
    "focus": "Añadir información esencial o adicional sobre personas, lugares y cosas.",
    "explanation": "Las defining relative clauses identifican el sustantivo y no llevan comas. Las non-defining añaden información extra y van entre comas; no se usa that en ellas. Who se refiere a personas, which a cosas y whose a posesión.",
    "structure": [
      "Defining: who/which/that",
      "non-defining: who/which/whose entre comas",
      "where para lugares",
      "el relativo objeto puede omitirse en defining."
    ],
    "examples": [
      "The woman who works here is my aunt.",
      "My car, which is ten years old, still runs well.",
      "That's the student whose project won."
    ],
    "vocabulary": [
      "relative clause — oración de relativo",
      "essential — esencial",
      "additional — adicional",
      "refer to — referirse a"
    ],
    "exercises": [
      {
        "question": "The man ___ lives next door is a pilot.",
        "answer": "who / that",
        "note": "Defining clause sobre una persona."
      },
      {
        "question": "My laptop, ___ I bought last year, is already slow.",
        "answer": "which",
        "note": "Non-defining clause con información adicional."
      },
      {
        "question": "That's the girl ___ father is a chef.",
        "answer": "whose",
        "note": "Whose expresa posesión."
      },
      {
        "question": "Corrige: My brother, that lives in London, is visiting.",
        "answer": "My brother, who lives in London, is visiting.",
        "note": "No usamos that en non-defining clauses."
      },
      {
        "question": "The café ___ we met has closed.",
        "answer": "where",
        "note": "Where se refiere al lugar."
      },
      {
        "question": "The book (that) I borrowed was excellent. ¿Puede omitirse that?",
        "answer": "Yes, because it is the object.",
        "note": "El relativo objeto puede omitirse en defining clauses."
      }
    ]
  },
  {
    "number": 17,
    "slug": "unidad-17-gerunds-and-infinitives",
    "title": "Gerunds and infinitives",
    "focus": "Elegir gerundio o infinitivo según el verbo y el significado.",
    "explanation": "Algunos verbos van seguidos de -ing (enjoy, avoid, suggest); otros de to-infinitive (decide, hope, plan). Algunos admiten ambas formas con poco cambio y otros cambian de significado, como stop, remember y try.",
    "structure": [
      "verb + -ing",
      "verb + to-infinitive",
      "stop doing = dejar de hacer",
      "stop to do = parar para hacer."
    ],
    "examples": [
      "I enjoy learning languages.",
      "They decided to move abroad.",
      "Remember to lock the door.",
      "I remember meeting her at school."
    ],
    "vocabulary": [
      "avoid — evitar",
      "manage — conseguir",
      "consider — considerar",
      "afford — permitirse"
    ],
    "exercises": [
      {
        "question": "I can't afford ___ (buy) a new car.",
        "answer": "to buy",
        "note": "Afford va seguido de to-infinitive."
      },
      {
        "question": "She avoids ___ (drive) at night.",
        "answer": "driving",
        "note": "Avoid va seguido de gerundio."
      },
      {
        "question": "We decided ___ (stay) another day.",
        "answer": "to stay",
        "note": "Decide + to-infinitive."
      },
      {
        "question": "Corrige: He enjoys to cook.",
        "answer": "He enjoys cooking.",
        "note": "Enjoy + -ing."
      },
      {
        "question": "Please remember ___ (call) your grandmother.",
        "answer": "to call",
        "note": "Remember to do = no olvidar una tarea futura."
      },
      {
        "question": "I stopped ___ (smoke) two years ago.",
        "answer": "smoking",
        "note": "Stop doing = abandonar un hábito."
      }
    ]
  },
  {
    "number": 18,
    "slug": "unidad-18-phrasal-verbs-separable-and-inseparable",
    "title": "Phrasal verbs: separable and inseparable",
    "focus": "Comprender cómo funcionan los phrasal verbs y dónde colocar el objeto.",
    "explanation": "Algunos phrasal verbs son separables (turn the radio off / turn off the radio); si el objeto es un pronombre, debe ir en medio (turn it off). Otros son inseparables (look after someone, run into someone).",
    "structure": [
      "separable: verb + particle + object",
      "pronoun in the middle",
      "inseparable: look after, run into, get over."
    ],
    "examples": [
      "Please turn the lights off.",
      "Please turn them off.",
      "She looks after her younger brother."
    ],
    "vocabulary": [
      "particle — partícula",
      "switch off — apagar",
      "look after — cuidar",
      "run into — encontrarse con"
    ],
    "exercises": [
      {
        "question": "Please turn ___ off; it's too loud. (the TV)",
        "answer": "the TV / it",
        "note": "El objeto puede ir antes de off; el pronombre debe ir en medio."
      },
      {
        "question": "I need to look ___ my nephew tonight.",
        "answer": "after",
        "note": "Look after es inseparable."
      },
      {
        "question": "She picked ___ the children at six.",
        "answer": "up",
        "note": "Pick up admite separación."
      },
      {
        "question": "Corrige: Turn off it.",
        "answer": "Turn it off.",
        "note": "El pronombre objeto va entre el verbo y la partícula."
      },
      {
        "question": "I ran ___ an old friend yesterday.",
        "answer": "into",
        "note": "Run into es inseparable."
      },
      {
        "question": "Can you fill ___ this form?",
        "answer": "in / out",
        "note": "Fill in/out se combina con un objeto."
      }
    ]
  },
  {
    "number": 19,
    "slug": "unidad-19-dependent-prepositions-after-verbs",
    "title": "Dependent prepositions after verbs",
    "focus": "Aprender las preposiciones que acompañan a verbos frecuentes.",
    "explanation": "Muchos verbos requieren una preposición concreta, como depend on, belong to, apologise for, insist on, succeed in y apply for. Conviene aprender cada combinación como una unidad y recordar que una preposición puede ir seguida de sustantivo o gerundio.",
    "structure": [
      "depend on",
      "belong to",
      "apologise for",
      "insist on + -ing",
      "succeed in + -ing",
      "apply for."
    ],
    "examples": [
      "It depends on the weather.",
      "She apologised for being late.",
      "He succeeded in finding a solution."
    ],
    "vocabulary": [
      "depend on — depender de",
      "apologise for — disculparse por",
      "succeed in — tener éxito en",
      "apply for — solicitar"
    ],
    "exercises": [
      {
        "question": "It depends ___ the price.",
        "answer": "on",
        "note": "Depend se combina con on."
      },
      {
        "question": "She apologised ___ arriving late.",
        "answer": "for",
        "note": "Apologise for + -ing."
      },
      {
        "question": "He succeeded ___ passing the exam.",
        "answer": "in",
        "note": "Succeed in + gerundio."
      },
      {
        "question": "Corrige: This book belongs with me.",
        "answer": "This book belongs to me.",
        "note": "Belong se combina con to."
      },
      {
        "question": "Are you applying ___ the position?",
        "answer": "for",
        "note": "Apply for significa solicitar un puesto."
      },
      {
        "question": "They insisted ___ paying for dinner.",
        "answer": "on",
        "note": "Insist on + gerundio."
      }
    ]
  },
  {
    "number": 20,
    "slug": "unidad-20-adjective-and-preposition-combinations",
    "title": "Adjective and preposition combinations",
    "focus": "Usar correctamente combinaciones frecuentes de adjetivos y preposiciones.",
    "explanation": "Algunos adjetivos suelen ir con una preposición fija: keen on, responsible for, proud of, aware of, capable of, similar to y disappointed with. Después de una preposición, un verbo aparece normalmente en -ing.",
    "structure": [
      "keen on",
      "responsible for",
      "proud of",
      "aware of",
      "capable of",
      "disappointed with",
      "interested in."
    ],
    "examples": [
      "She's responsible for organising the event.",
      "I'm proud of finishing the course.",
      "Are you aware of the risks?"
    ],
    "vocabulary": [
      "capable of — capaz de",
      "responsible for — responsable de",
      "proud of — orgulloso de",
      "aware of — consciente de"
    ],
    "exercises": [
      {
        "question": "He's responsible ___ the budget.",
        "answer": "for",
        "note": "Responsible se combina con for."
      },
      {
        "question": "I'm proud ___ my team.",
        "answer": "of",
        "note": "Proud se combina con of."
      },
      {
        "question": "She's keen ___ learning photography.",
        "answer": "on",
        "note": "Keen on + -ing."
      },
      {
        "question": "Corrige: We are capable to solve it.",
        "answer": "We are capable of solving it.",
        "note": "Capable of + gerundio."
      },
      {
        "question": "Are you aware ___ the changes?",
        "answer": "of",
        "note": "Aware se combina con of."
      },
      {
        "question": "They were disappointed ___ the result.",
        "answer": "with / by",
        "note": "Disappointed with/by describe una reacción."
      }
    ]
  },
  {
    "number": 21,
    "slug": "unidad-21-articles-and-zero-article",
    "title": "Articles and zero article",
    "focus": "Dominar el uso de a/an, the y la ausencia de artículo en contextos habituales.",
    "explanation": "A/an presenta un sustantivo singular no específico; the identifica algo conocido o concreto. No usamos artículo normalmente con plurales e incontables en sentido general, nombres de idiomas, comidas y la mayoría de países. Hay excepciones con nombres geográficos y organizaciones.",
    "structure": [
      "a/an + singular no específico",
      "the + referente concreto",
      "zero article con plurales/incontables generales, idiomas y comidas."
    ],
    "examples": [
      "She works in a hospital near the station.",
      "The hospital is very modern.",
      "Children need sleep.",
      "We speak English at work."
    ],
    "vocabulary": [
      "definite — definido",
      "indefinite — indefinido",
      "general — general",
      "institution — institución"
    ],
    "exercises": [
      {
        "question": "She is ___ architect.",
        "answer": "an",
        "note": "An precede un sonido vocálico."
      },
      {
        "question": "___ information you sent was useful.",
        "answer": "The",
        "note": "The identifica información concreta."
      },
      {
        "question": "___ people need clean water.",
        "answer": "— (no article)",
        "note": "Generalización con plural."
      },
      {
        "question": "Corrige: The life is difficult sometimes.",
        "answer": "Life is difficult sometimes.",
        "note": "No usamos the para hablar de la vida en general."
      },
      {
        "question": "He plays ___ piano.",
        "answer": "the",
        "note": "Los instrumentos musicales suelen llevar the."
      },
      {
        "question": "They visited ___ Netherlands last year.",
        "answer": "the",
        "note": "Algunos nombres de países llevan the."
      }
    ]
  },
  {
    "number": 22,
    "slug": "unidad-22-quantifiers-and-expressions-of-quantity",
    "title": "Quantifiers and expressions of quantity",
    "focus": "Expresar cantidades con precisión y distinguir sustantivos contables e incontables.",
    "explanation": "Much y many se usan en preguntas y negativas; a lot of funciona con ambos tipos. Few/little indican una cantidad pequeña, mientras que a few/a little expresan que hay algo, aunque no mucho. Plenty of y a great deal of añaden matices de cantidad.",
    "structure": [
      "many/few/a few + plural contable",
      "much/little/a little + incontable",
      "plenty of + ambos",
      "a great deal of + incontable."
    ],
    "examples": [
      "We have a few options.",
      "There is little information available.",
      "A great deal of work remains."
    ],
    "vocabulary": [
      "amount — cantidad",
      "quantity — cantidad",
      "plenty — abundancia",
      "scarce — escaso"
    ],
    "exercises": [
      {
        "question": "There are ___ people waiting outside. (much/many)",
        "answer": "many",
        "note": "People es contable plural."
      },
      {
        "question": "We have ___ time, so don't hurry. (a little/little)",
        "answer": "a little",
        "note": "A little indica una cantidad pequeña pero suficiente."
      },
      {
        "question": "There is ___ information about the event. (few/little)",
        "answer": "little",
        "note": "Information es incontable."
      },
      {
        "question": "Corrige: There are much cars in the street.",
        "answer": "There are many cars in the street.",
        "note": "Cars es contable plural."
      },
      {
        "question": "We have ___ of food for everyone.",
        "answer": "plenty",
        "note": "Plenty of indica cantidad suficiente o abundante."
      },
      {
        "question": "Only ___ students understood the question, so it was difficult.",
        "answer": "a few",
        "note": "A few acompaña a sustantivos contables plurales."
      }
    ]
  },
  {
    "number": 23,
    "slug": "unidad-23-comparatives-and-modifiers",
    "title": "Comparatives and modifiers",
    "focus": "Comparar con mayor precisión utilizando intensificadores y estructuras de igualdad.",
    "explanation": "Los comparativos pueden modificarse con much, far, a lot, slightly y a bit. As…as expresa igualdad; not as…as expresa inferioridad. The more…the more muestra que dos cambios están relacionados.",
    "structure": [
      "much/far/a lot + comparative",
      "slightly/a bit + comparative",
      "as + adjective + as",
      "the more…the more."
    ],
    "examples": [
      "This route is far shorter than the other one.",
      "The new model is slightly more expensive.",
      "The more you practise, the more confident you become."
    ],
    "vocabulary": [
      "slightly — ligeramente",
      "considerably — considerablemente",
      "roughly — aproximadamente",
      "similar — similar"
    ],
    "exercises": [
      {
        "question": "This exercise is ___ easier than the last one. (much)",
        "answer": "much",
        "note": "Much intensifica un comparativo."
      },
      {
        "question": "The train isn't ___ fast ___ the plane.",
        "answer": "as; as",
        "note": "Not as…as expresa que algo es menos rápido."
      },
      {
        "question": "This option is slightly ___ (cheap) than that one.",
        "answer": "cheaper",
        "note": "Slightly modifica el comparativo."
      },
      {
        "question": "Corrige: My bag is more heavier than yours.",
        "answer": "My bag is much heavier than yours. / My bag is heavier than yours.",
        "note": "No combinamos more con -er."
      },
      {
        "question": "The ___ you read, the more vocabulary you learn.",
        "answer": "more",
        "note": "The more…the more expresa relación proporcional."
      },
      {
        "question": "Her results are far ___ (good) this year.",
        "answer": "better",
        "note": "Good tiene comparativo irregular better."
      }
    ]
  },
  {
    "number": 24,
    "slug": "unidad-24-so-such-too-and-enough",
    "title": "So, such, too and enough",
    "focus": "Expresar intensidad, exceso y suficiencia con adjetivos y sustantivos.",
    "explanation": "So modifica adjetivos y adverbios; such acompaña a un sustantivo o a un grupo nominal. Too indica exceso y enough indica suficiencia. Enough va antes de un sustantivo, pero después de un adjetivo o adverbio.",
    "structure": [
      "so + adjective/adverb",
      "such (a/an) + adjective + noun",
      "too + adjective",
      "adjective + enough",
      "enough + noun."
    ],
    "examples": [
      "It was so cold that we stayed inside.",
      "It was such an interesting talk.",
      "The box is too heavy to lift.",
      "We have enough time."
    ],
    "vocabulary": [
      "sufficient — suficiente",
      "excessive — excesivo",
      "crowded — lleno",
      "convenient — práctico"
    ],
    "exercises": [
      {
        "question": "It was ___ a difficult test that many students failed.",
        "answer": "such",
        "note": "Such acompaña a un grupo nominal."
      },
      {
        "question": "The coffee is ___ hot to drink.",
        "answer": "too",
        "note": "Too indica exceso."
      },
      {
        "question": "She's old ___ to drive.",
        "answer": "enough",
        "note": "Enough va después del adjetivo."
      },
      {
        "question": "Corrige: It was so a beautiful day.",
        "answer": "It was such a beautiful day.",
        "note": "Such + a/an + adjective + noun."
      },
      {
        "question": "We haven't got ___ chairs for everyone.",
        "answer": "enough",
        "note": "Enough precede al sustantivo."
      },
      {
        "question": "The film was ___ interesting that I watched it twice.",
        "answer": "so",
        "note": "So + adjective + that."
      }
    ]
  },
  {
    "number": 25,
    "slug": "unidad-25-adverbs-and-adverbial-phrases",
    "title": "Adverbs and adverbial phrases",
    "focus": "Describir cómo, cuándo, dónde y con qué frecuencia ocurren las acciones.",
    "explanation": "Los adverbios modifican verbos, adjetivos u otros adverbios. Muchos se forman con -ly, aunque existen excepciones como fast, hard y well. Las expresiones adverbiales pueden indicar frecuencia, grado, tiempo o punto de vista.",
    "structure": [
      "adjective + -ly",
      "good → well",
      "fast/hard/late tienen formas iguales",
      "adverbios de frecuencia antes del verbo principal y después de be."
    ],
    "examples": [
      "She explained the problem clearly.",
      "He works hard and learns quickly.",
      "Fortunately, nobody was hurt."
    ],
    "vocabulary": [
      "carefully — cuidadosamente",
      "hardly — apenas",
      "fortunately — afortunadamente",
      "apparently — aparentemente"
    ],
    "exercises": [
      {
        "question": "He drives very ___. (careful)",
        "answer": "carefully",
        "note": "El adverbio modifica el verbo drives."
      },
      {
        "question": "She sings ___. (good)",
        "answer": "well",
        "note": "Good es adjetivo; well es el adverbio."
      },
      {
        "question": "They arrived ___. (late)",
        "answer": "late",
        "note": "Late funciona como adverbio sin -ly."
      },
      {
        "question": "Corrige: He speaks English fluent.",
        "answer": "He speaks English fluently.",
        "note": "Necesitamos el adverbio fluently."
      },
      {
        "question": "I can ___ hear you. (hard)",
        "answer": "hardly",
        "note": "Hardly significa apenas, no hard."
      },
      {
        "question": "___, the weather improved in the afternoon. (fortunate)",
        "answer": "Fortunately",
        "note": "Un adverbio de punto de vista puede ir al inicio."
      }
    ]
  },
  {
    "number": 26,
    "slug": "unidad-26-linkers-of-contrast",
    "title": "Linkers of contrast",
    "focus": "Conectar ideas opuestas con although, despite, however y whereas.",
    "explanation": "Although y though introducen una oración con sujeto y verbo. Despite e in spite of van seguidos de sustantivo o gerundio. However suele conectar dos oraciones y whereas contrasta dos hechos o grupos.",
    "structure": [
      "although + clause",
      "despite/in spite of + noun/-ing",
      "however + clause",
      "whereas + clause."
    ],
    "examples": [
      "Although it was raining, we went out.",
      "Despite the delay, we arrived on time.",
      "The north is crowded, whereas the south is quiet."
    ],
    "vocabulary": [
      "although — aunque",
      "despite — a pesar de",
      "whereas — mientras que",
      "however — sin embargo"
    ],
    "exercises": [
      {
        "question": "___ the rain, the match continued.",
        "answer": "Despite",
        "note": "Despite va seguido de sustantivo."
      },
      {
        "question": "___ it was late, they kept working.",
        "answer": "Although",
        "note": "Although introduce una oración completa."
      },
      {
        "question": "The first plan is cheap, ___ the second is faster.",
        "answer": "whereas",
        "note": "Whereas contrasta dos opciones."
      },
      {
        "question": "Corrige: Despite it was cold, we walked.",
        "answer": "Although it was cold, we walked. / Despite the cold, we walked.",
        "note": "Despite no introduce una oración con sujeto y verbo."
      },
      {
        "question": "It was expensive. ___, we decided to buy it.",
        "answer": "However",
        "note": "However introduce contraste entre oraciones."
      },
      {
        "question": "In spite of ___ tired, she finished the race.",
        "answer": "being",
        "note": "In spite of + gerundio."
      }
    ]
  },
  {
    "number": 27,
    "slug": "unidad-27-linkers-of-reason-result-and-purpose",
    "title": "Linkers of reason, result and purpose",
    "focus": "Explicar causas, consecuencias y finalidades de forma cohesionada.",
    "explanation": "Because y since introducen causas; therefore, so y as a result presentan consecuencias; in order to y so that expresan finalidad. La elección depende de la estructura y del registro.",
    "structure": [
      "because/since + clause",
      "because of/due to + noun",
      "therefore/as a result",
      "in order to + infinitive",
      "so that + clause."
    ],
    "examples": [
      "The flight was delayed because of fog.",
      "It was raining; therefore, we stayed in.",
      "She saved money in order to travel."
    ],
    "vocabulary": [
      "therefore — por lo tanto",
      "as a result — como resultado",
      "due to — debido a",
      "in order to — para"
    ],
    "exercises": [
      {
        "question": "The match was cancelled ___ the heavy rain.",
        "answer": "because of / due to",
        "note": "Estas expresiones van seguidas de sustantivo."
      },
      {
        "question": "He missed the bus; ___, he was late.",
        "answer": "therefore / as a result",
        "note": "Introduce una consecuencia."
      },
      {
        "question": "She studies hard ___ pass the exam.",
        "answer": "to / in order to",
        "note": "Infinitivo de finalidad."
      },
      {
        "question": "Corrige: Because of it was raining, we stayed home.",
        "answer": "Because it was raining, we stayed home.",
        "note": "Because of necesita un sustantivo o gerundio."
      },
      {
        "question": "I spoke slowly so that everyone ___ understand.",
        "answer": "could",
        "note": "So that introduce una finalidad con oración."
      },
      {
        "question": "The road was closed ___ an accident.",
        "answer": "because of / due to",
        "note": "Expresa la causa con un sustantivo."
      }
    ]
  },
  {
    "number": 28,
    "slug": "unidad-28-discourse-markers-and-paragraph-structure",
    "title": "Discourse markers and paragraph structure",
    "focus": "Organizar textos y conversaciones mediante conectores y marcadores discursivos.",
    "explanation": "Los marcadores discursivos ayudan a introducir ideas, añadir información, ejemplificar, contrastar y concluir. En textos formales se usan furthermore, moreover y consequently; en conversación aparecen actually, anyway y by the way.",
    "structure": [
      "addition: furthermore/moreover",
      "example: for instance",
      "contrast: however",
      "result: consequently",
      "sequence: firstly/finally."
    ],
    "examples": [
      "Furthermore, the course includes practical workshops.",
      "For instance, students can join a conversation club.",
      "Consequently, the company changed its policy."
    ],
    "vocabulary": [
      "moreover — además",
      "consequently — por consiguiente",
      "nevertheless — sin embargo",
      "in conclusion — en conclusión"
    ],
    "exercises": [
      {
        "question": "The service is affordable. ___, it is reliable.",
        "answer": "Moreover / Furthermore",
        "note": "Añade una idea relacionada."
      },
      {
        "question": "Many animals are at risk. ___, sea turtles are affected.",
        "answer": "For instance",
        "note": "Introduce un ejemplo."
      },
      {
        "question": "The evidence was limited; ___, the report was cautious.",
        "answer": "therefore / consequently",
        "note": "Conector de resultado."
      },
      {
        "question": "Corrige: On the other hand, I also agree. (quieres añadir)",
        "answer": "Furthermore, I also agree.",
        "note": "On the other hand introduce contraste."
      },
      {
        "question": "___, the proposal could save time and money.",
        "answer": "In conclusion",
        "note": "Marcador para concluir."
      },
      {
        "question": "It was difficult. ___, we completed it.",
        "answer": "Nevertheless",
        "note": "Marcador de contraste inesperado."
      }
    ]
  },
  {
    "number": 29,
    "slug": "unidad-29-question-tags",
    "title": "Question tags",
    "focus": "Confirmar información y buscar acuerdo con preguntas cortas al final de una frase.",
    "explanation": "Las question tags usan un auxiliar y un pronombre. Una afirmación positiva suele llevar tag negativo; una afirmación negativa lleva tag positivo. Si la oración no tiene auxiliar, usamos do/does/did. Hay formas especiales como I'm late, aren't I? y Let's go, shall we?",
    "structure": [
      "positive statement + negative tag",
      "negative statement + positive tag",
      "auxiliar correspondiente",
      "Let's…, shall we?",
      "I'm…, aren't I?"
    ],
    "examples": [
      "You live nearby, don't you?",
      "She hasn't called, has she?",
      "Let's take a break, shall we?"
    ],
    "vocabulary": [
      "tag question — pregunta coletilla",
      "confirm — confirmar",
      "expect — esperar",
      "agreement — acuerdo"
    ],
    "exercises": [
      {
        "question": "You work here, ___ you?",
        "answer": "don't",
        "note": "Afirmativa Present Simple: tag negativo con do."
      },
      {
        "question": "She isn't coming, ___ she?",
        "answer": "is",
        "note": "Negativa con be: tag positivo."
      },
      {
        "question": "They've finished, ___ they?",
        "answer": "haven't",
        "note": "Present Perfect afirmativo: tag negativo."
      },
      {
        "question": "Corrige: He can drive, doesn't he?",
        "answer": "He can drive, can't he?",
        "note": "Repetimos el modal can."
      },
      {
        "question": "Let's start now, ___ we?",
        "answer": "shall",
        "note": "Let's se combina con shall we."
      },
      {
        "question": "I'm next, ___ I?",
        "answer": "aren't",
        "note": "La forma especial es aren't I?"
      }
    ]
  },
  {
    "number": 30,
    "slug": "unidad-30-indirect-questions-and-polite-enquiries",
    "title": "Indirect questions and polite enquiries",
    "focus": "Formular preguntas indirectas para sonar más educado y natural.",
    "explanation": "Las preguntas indirectas suelen comenzar con Could you tell me, Do you know o Would you mind telling me. Dentro de la pregunta usamos orden afirmativo y no repetimos do/does/did. En preguntas yes/no usamos if o whether.",
    "structure": [
      "introductory phrase + wh-word + subject + verb",
      "if/whether para yes/no",
      "Could you tell me…?",
      "Do you happen to know…?"
    ],
    "examples": [
      "Could you tell me where the station is?",
      "Do you know if the shop is open?",
      "Would you mind telling me how this works?"
    ],
    "vocabulary": [
      "enquiry — consulta",
      "polite — educado",
      "wonder — preguntarse",
      "available — disponible"
    ],
    "exercises": [
      {
        "question": "Could you tell me where the bank ___?",
        "answer": "is",
        "note": "Orden afirmativo dentro de la pregunta indirecta."
      },
      {
        "question": "Do you know ___ the train is delayed?",
        "answer": "if / whether",
        "note": "If/whether introduce una pregunta yes/no."
      },
      {
        "question": "Would you mind telling me what time it ___?",
        "answer": "closes",
        "note": "No usamos inversión dentro de la pregunta indirecta."
      },
      {
        "question": "Corrige: Can you tell me where is the museum?",
        "answer": "Can you tell me where the museum is?",
        "note": "El sujeto precede al verbo en la cláusula indirecta."
      },
      {
        "question": "I was wondering ___ you could help me.",
        "answer": "if / whether",
        "note": "Fórmula educada para pedir ayuda."
      },
      {
        "question": "Do you happen to know how much it ___?",
        "answer": "costs",
        "note": "Pregunta indirecta con orden afirmativo."
      }
    ]
  },
  {
    "number": 31,
    "slug": "unidad-31-collocations-with-make-do-take-and-get",
    "title": "Collocations with make, do, take and get",
    "focus": "Aprender combinaciones frecuentes para sonar más natural en inglés.",
    "explanation": "Las collocations son combinaciones habituales de palabras. Make suele aparecer con decisiones y planes; do con tareas y actividades; take con tiempo, medidas y oportunidades; get con resultados y cambios. No siempre se puede deducir la combinación por traducción.",
    "structure": [
      "make a decision/an effort",
      "do homework/research",
      "take a break/responsibility",
      "get ready/permission."
    ],
    "examples": [
      "We need to make a decision.",
      "She does research at university.",
      "Let's take a short break.",
      "I need to get ready."
    ],
    "vocabulary": [
      "collocation — colocación",
      "effort — esfuerzo",
      "responsibility — responsabilidad",
      "research — investigación"
    ],
    "exercises": [
      {
        "question": "You should ___ a decision soon.",
        "answer": "make",
        "note": "Make a decision es una collocation."
      },
      {
        "question": "I have to ___ my homework.",
        "answer": "do",
        "note": "Do homework es la combinación habitual."
      },
      {
        "question": "Let's ___ a break.",
        "answer": "take",
        "note": "Take a break significa hacer una pausa."
      },
      {
        "question": "Corrige: He made his homework.",
        "answer": "He did his homework.",
        "note": "Do homework, no make homework."
      },
      {
        "question": "We need to ___ ready by eight.",
        "answer": "get",
        "note": "Get ready significa prepararse."
      },
      {
        "question": "She took ___ of the opportunity.",
        "answer": "advantage",
        "note": "Take advantage of es una expresión fija."
      }
    ]
  },
  {
    "number": 32,
    "slug": "unidad-32-word-formation-prefixes",
    "title": "Word formation: prefixes",
    "focus": "Cambiar el significado de una palabra mediante prefijos frecuentes.",
    "explanation": "Los prefijos se añaden al principio de una palabra. Un-, in-, im-, il- e ir- suelen expresar negación; re- indica repetición; mis- indica error; over- y under- expresan exceso o insuficiencia. La elección depende de la palabra base.",
    "structure": [
      "un-",
      "in-/im-/il-/ir-",
      "re-",
      "mis-",
      "over-/under-",
      "conserva la categoría gramatical en muchos casos."
    ],
    "examples": [
      "It was an unfair decision.",
      "Please rewrite the paragraph.",
      "He misunderstood the instructions."
    ],
    "vocabulary": [
      "prefix — prefijo",
      "unfair — injusto",
      "misunderstand — malinterpretar",
      "overestimate — sobreestimar"
    ],
    "exercises": [
      {
        "question": "The opposite of possible is ___.",
        "answer": "impossible",
        "note": "Usamos im- antes de p."
      },
      {
        "question": "Please ___write the address; it's incorrect.",
        "answer": "rewrite",
        "note": "Re- indica repetir."
      },
      {
        "question": "I ___understood the question and gave the wrong answer.",
        "answer": "misunderstood",
        "note": "Mis- expresa error."
      },
      {
        "question": "Corrige: This answer is uncorrect.",
        "answer": "This answer is incorrect.",
        "note": "La forma habitual es incorrect."
      },
      {
        "question": "The price was ___estimated; it was much higher.",
        "answer": "over",
        "note": "Over- expresa exceso."
      },
      {
        "question": "The opposite of legal is ___.",
        "answer": "illegal",
        "note": "Il- se usa antes de l."
      }
    ]
  },
  {
    "number": 33,
    "slug": "unidad-33-word-formation-suffixes",
    "title": "Word formation: suffixes",
    "focus": "Formar sustantivos, adjetivos y adverbios mediante sufijos comunes.",
    "explanation": "Los sufijos modifican la categoría o el significado de una palabra. -ment, -tion y -ness forman sustantivos; -ful, -less, -able y -ive forman adjetivos; -ly suele formar adverbios. Puede haber cambios ortográficos.",
    "structure": [
      "-ment/-tion/-ness: nouns",
      "-ful/-less/-able/-ive: adjectives",
      "-ly: adverbs."
    ],
    "examples": [
      "Her explanation was helpful.",
      "The decision caused excitement.",
      "He answered politely."
    ],
    "vocabulary": [
      "development — desarrollo",
      "careless — descuidado",
      "creative — creativo",
      "successfully — con éxito"
    ],
    "exercises": [
      {
        "question": "The act of deciding is a ___.",
        "answer": "decision",
        "note": "-sion forma un sustantivo."
      },
      {
        "question": "This tool is very ___. (use)",
        "answer": "useful",
        "note": "-ful forma un adjetivo."
      },
      {
        "question": "She spoke ___. (polite)",
        "answer": "politely",
        "note": "-ly forma un adverbio."
      },
      {
        "question": "Corrige: He is a success person.",
        "answer": "He is a successful person.",
        "note": "Successful es el adjetivo."
      },
      {
        "question": "The company needs further ___. (develop)",
        "answer": "development",
        "note": "-ment forma un sustantivo."
      },
      {
        "question": "This chair is not very ___. (comfort)",
        "answer": "comfortable",
        "note": "-able forma un adjetivo."
      }
    ]
  },
  {
    "number": 34,
    "slug": "unidad-34-work-and-careers",
    "title": "Work and careers",
    "focus": "Hablar de experiencia profesional, responsabilidades, entrevistas y desarrollo laboral.",
    "explanation": "Esta unidad amplía el vocabulario del trabajo y practica estructuras para describir experiencia, responsabilidades, logros y objetivos. Se utilizan expresiones como be responsible for, apply for, be in charge of y work as.",
    "structure": [
      "apply for a job",
      "be in charge of",
      "be responsible for",
      "have experience in",
      "work full-time/part-time."
    ],
    "examples": [
      "I've been working in sales for five years.",
      "I'm responsible for training new staff.",
      "She applied for a position abroad."
    ],
    "vocabulary": [
      "qualification — titulación",
      "salary — salario",
      "colleague — compañero",
      "promotion — ascenso"
    ],
    "exercises": [
      {
        "question": "She is in charge ___ the sales team.",
        "answer": "of",
        "note": "In charge of indica responsabilidad."
      },
      {
        "question": "I applied ___ a job last week.",
        "answer": "for",
        "note": "Apply for + puesto."
      },
      {
        "question": "He works ___ a graphic designer.",
        "answer": "as",
        "note": "Work as indica profesión."
      },
      {
        "question": "Corrige: I'm responsible of customer service.",
        "answer": "I'm responsible for customer service.",
        "note": "Responsible se combina con for."
      },
      {
        "question": "They offered her a higher ___.",
        "answer": "salary",
        "note": "Salary es el salario."
      },
      {
        "question": "I have five years' experience ___ marketing.",
        "answer": "in",
        "note": "Experience in + campo."
      }
    ]
  },
  {
    "number": 35,
    "slug": "unidad-35-education-and-learning-strategies",
    "title": "Education and learning strategies",
    "focus": "Describir estudios, métodos de aprendizaje, evaluación y objetivos académicos.",
    "explanation": "Se trabajan expresiones para hablar de asignaturas, titulaciones, progreso y estrategias. Las estructuras incluyen take an exam, pass/fail a test, make progress, revise for y be good at.",
    "structure": [
      "take/pass/fail an exam",
      "revise for",
      "make progress",
      "attend a course",
      "hand in an assignment."
    ],
    "examples": [
      "I'm revising for my final exams.",
      "She made rapid progress this term.",
      "He failed the test but learned from it."
    ],
    "vocabulary": [
      "assignment — trabajo",
      "degree — título universitario",
      "revise — repasar",
      "deadline — fecha límite"
    ],
    "exercises": [
      {
        "question": "I need to revise ___ my biology exam.",
        "answer": "for",
        "note": "Revise for an exam."
      },
      {
        "question": "She made great ___ this term.",
        "answer": "progress",
        "note": "Make progress es una collocation."
      },
      {
        "question": "He ___ the exam because he hadn't studied.",
        "answer": "failed",
        "note": "Fail significa suspender."
      },
      {
        "question": "Corrige: I did an exam yesterday.",
        "answer": "I took an exam yesterday.",
        "note": "Take an exam es la combinación habitual."
      },
      {
        "question": "Please hand ___ your assignment by Monday.",
        "answer": "in",
        "note": "Hand in significa entregar."
      },
      {
        "question": "She is studying ___ a degree in law.",
        "answer": "for",
        "note": "Study for a degree."
      }
    ]
  },
  {
    "number": 36,
    "slug": "unidad-36-travel-and-tourism",
    "title": "Travel and tourism",
    "focus": "Describir viajes, experiencias, alojamiento, transporte e incidencias.",
    "explanation": "Se amplía el vocabulario para organizar itinerarios, reservar alojamiento y explicar problemas durante un viaje. Se practican expresiones de duración, recomendaciones y narración de experiencias.",
    "structure": [
      "book accommodation",
      "catch/miss a flight",
      "set off",
      "check in/out",
      "travel abroad",
      "get around."
    ],
    "examples": [
      "We set off before sunrise.",
      "Our flight was delayed for three hours.",
      "The hotel is within walking distance of the centre."
    ],
    "vocabulary": [
      "accommodation — alojamiento",
      "departure — salida",
      "sightseeing — turismo",
      "delay — retraso"
    ],
    "exercises": [
      {
        "question": "We need to check ___ before noon.",
        "answer": "out",
        "note": "Check out significa dejar la habitación."
      },
      {
        "question": "Our flight was delayed ___ bad weather.",
        "answer": "because of",
        "note": "Because of + sustantivo."
      },
      {
        "question": "We set ___ at six in the morning.",
        "answer": "off",
        "note": "Set off significa emprender un viaje."
      },
      {
        "question": "Corrige: We missed to catch the train.",
        "answer": "We missed the train.",
        "note": "Miss + sustantivo; no to-infinitive."
      },
      {
        "question": "The hotel is within walking ___ of the beach.",
        "answer": "distance",
        "note": "Within walking distance."
      },
      {
        "question": "Have you ever travelled ___?",
        "answer": "abroad",
        "note": "Abroad significa al extranjero."
      }
    ]
  },
  {
    "number": 37,
    "slug": "unidad-37-environment-and-sustainability",
    "title": "Environment and sustainability",
    "focus": "Hablar de problemas medioambientales, causas, consecuencias y soluciones.",
    "explanation": "Se trabajan términos sobre contaminación, recursos, biodiversidad y sostenibilidad, junto con pasivas y conectores de causa y resultado para describir medidas y cambios.",
    "structure": [
      "reduce waste",
      "renewable energy",
      "climate change",
      "protect wildlife",
      "be affected by",
      "recycle materials."
    ],
    "examples": [
      "Plastic waste is harming marine life.",
      "More energy should be produced from renewable sources.",
      "Local habitats are protected by volunteers."
    ],
    "vocabulary": [
      "renewable — renovable",
      "pollution — contaminación",
      "wildlife — fauna",
      "carbon footprint — huella de carbono"
    ],
    "exercises": [
      {
        "question": "Solar power is a ___ source of energy.",
        "answer": "renewable",
        "note": "Renewable significa renovable."
      },
      {
        "question": "We should reduce the amount of plastic we ___.",
        "answer": "use",
        "note": "Reduce the amount of + sustantivo."
      },
      {
        "question": "Many species are threatened ___ habitat loss.",
        "answer": "by",
        "note": "Be threatened by."
      },
      {
        "question": "Corrige: People should to recycle more.",
        "answer": "People should recycle more.",
        "note": "Should + verbo base."
      },
      {
        "question": "The forest is home ___ many rare species.",
        "answer": "to",
        "note": "Be home to."
      },
      {
        "question": "Climate change has a serious ___ on wildlife.",
        "answer": "impact",
        "note": "Have an impact on."
      }
    ]
  },
  {
    "number": 38,
    "slug": "unidad-38-technology-and-digital-life",
    "title": "Technology and digital life",
    "focus": "Describir dispositivos, hábitos digitales, ventajas, riesgos y cambios tecnológicos.",
    "explanation": "Se practica vocabulario de tecnología y expresiones para hablar de privacidad, seguridad, comunicación y dependencia digital. También se usan pasivas y modales para reglas y recomendaciones.",
    "structure": [
      "log in/out",
      "download an app",
      "protect personal data",
      "be connected to",
      "online privacy",
      "reliable source."
    ],
    "examples": [
      "Make sure you log out on shared computers.",
      "Personal data should be protected.",
      "The app allows users to track their progress."
    ],
    "vocabulary": [
      "privacy — privacidad",
      "device — dispositivo",
      "reliable — fiable",
      "cybersecurity — ciberseguridad"
    ],
    "exercises": [
      {
        "question": "You should protect your personal ___.",
        "answer": "data",
        "note": "Personal data es información personal."
      },
      {
        "question": "Please log ___ before leaving the website.",
        "answer": "out",
        "note": "Log out significa cerrar sesión."
      },
      {
        "question": "This website is a reliable ___ of information.",
        "answer": "source",
        "note": "Reliable source."
      },
      {
        "question": "Corrige: I downloaded an app from internet.",
        "answer": "I downloaded an app from the internet.",
        "note": "The internet lleva artículo."
      },
      {
        "question": "The files are stored ___ the cloud.",
        "answer": "in",
        "note": "In the cloud."
      },
      {
        "question": "Never share your ___ with strangers.",
        "answer": "password",
        "note": "Password significa contraseña."
      }
    ]
  },
  {
    "number": 39,
    "slug": "unidad-39-health-and-lifestyle",
    "title": "Health and lifestyle",
    "focus": "Hablar de hábitos, bienestar, síntomas, consejos y cambios de estilo de vida.",
    "explanation": "La unidad reúne vocabulario de salud física y mental, hábitos y prevención. Se practican modales de consejo, expresiones de frecuencia y estructuras para explicar causas y resultados.",
    "structure": [
      "balanced diet",
      "get enough sleep",
      "deal with stress",
      "recover from",
      "suffer from",
      "keep fit."
    ],
    "examples": [
      "Regular exercise helps me deal with stress.",
      "You should get enough sleep.",
      "He is recovering from an injury."
    ],
    "vocabulary": [
      "well-being — bienestar",
      "symptom — síntoma",
      "recovery — recuperación",
      "balanced — equilibrado"
    ],
    "exercises": [
      {
        "question": "You should ___ a balanced diet.",
        "answer": "follow / have",
        "note": "Follow/have a balanced diet."
      },
      {
        "question": "He is recovering ___ an operation.",
        "answer": "from",
        "note": "Recover from."
      },
      {
        "question": "Lack of sleep can have a negative ___ on health.",
        "answer": "effect / impact",
        "note": "Have an effect/impact on."
      },
      {
        "question": "Corrige: She suffers of asthma.",
        "answer": "She suffers from asthma.",
        "note": "Suffer from + enfermedad."
      },
      {
        "question": "Try to deal ___ stress in a healthy way.",
        "answer": "with",
        "note": "Deal with."
      },
      {
        "question": "You need to get ___ sleep.",
        "answer": "enough",
        "note": "Get enough sleep."
      }
    ]
  },
  {
    "number": 40,
    "slug": "unidad-40-relationships-and-personality",
    "title": "Relationships and personality",
    "focus": "Describir relaciones, personalidad, emociones y resolución de conflictos.",
    "explanation": "Se amplía el vocabulario para caracterizar personas y relaciones. Se practican adjetivos con preposición, verbos de comunicación y expresiones para expresar empatía, desacuerdo y reconciliación.",
    "structure": [
      "get on with",
      "fall out with",
      "make up",
      "rely on",
      "be keen on",
      "have something in common."
    ],
    "examples": [
      "I get on well with my colleagues.",
      "They fell out over a small misunderstanding.",
      "We have a lot in common."
    ],
    "vocabulary": [
      "reliable — fiable",
      "supportive — comprensivo",
      "argument — discusión",
      "misunderstanding — malentendido"
    ],
    "exercises": [
      {
        "question": "I get on ___ my neighbours.",
        "answer": "with",
        "note": "Get on with."
      },
      {
        "question": "They fell ___ after an argument.",
        "answer": "out",
        "note": "Fall out significa discutir y romper una relación."
      },
      {
        "question": "We have a lot ___ common.",
        "answer": "in",
        "note": "Have something in common."
      },
      {
        "question": "Corrige: You can rely in me.",
        "answer": "You can rely on me.",
        "note": "Rely on."
      },
      {
        "question": "They finally made ___ after the disagreement.",
        "answer": "up",
        "note": "Make up significa reconciliarse."
      },
      {
        "question": "She is very supportive ___ her friends.",
        "answer": "of",
        "note": "Supportive of."
      }
    ]
  },
  {
    "number": 41,
    "slug": "unidad-41-money-shopping-and-consumer-choices",
    "title": "Money, shopping and consumer choices",
    "focus": "Hablar de gastos, presupuestos, compras, devoluciones y decisiones de consumo.",
    "explanation": "Se trabajan expresiones de dinero y consumo, incluidos phrasal verbs y collocations. Se practican comparaciones, cantidades y lenguaje para reclamar o explicar problemas con productos.",
    "structure": [
      "afford to",
      "spend money on",
      "save up for",
      "get a refund",
      "be worth",
      "pay by card."
    ],
    "examples": [
      "I'm saving up for a new laptop.",
      "The jacket wasn't worth the price.",
      "You can ask for a refund if the item is faulty."
    ],
    "vocabulary": [
      "refund — reembolso",
      "receipt — recibo",
      "bargain — ganga",
      "afford — poder permitirse"
    ],
    "exercises": [
      {
        "question": "I can't afford ___ buy a new phone.",
        "answer": "to",
        "note": "Afford + to-infinitive."
      },
      {
        "question": "Keep the ___ in case you need to return it.",
        "answer": "receipt",
        "note": "Receipt es el recibo."
      },
      {
        "question": "I'm saving ___ for a holiday.",
        "answer": "up",
        "note": "Save up for."
      },
      {
        "question": "Corrige: I spent 50 euros for shoes.",
        "answer": "I spent 50 euros on shoes.",
        "note": "Spend money on."
      },
      {
        "question": "The product wasn't worth ___ price.",
        "answer": "the",
        "note": "Worth + sustantivo."
      },
      {
        "question": "You may be able to get a ___.",
        "answer": "refund",
        "note": "Get a refund."
      }
    ]
  },
  {
    "number": 42,
    "slug": "unidad-42-media-and-communication",
    "title": "Media and communication",
    "focus": "Comprender noticias, medios, opiniones y distintas formas de comunicación.",
    "explanation": "Se practica vocabulario de prensa, redes sociales y comunicación pública. Se utilizan verbos de reporte, lenguaje de opinión y expresiones para evaluar la fiabilidad de una fuente.",
    "structure": [
      "breaking news",
      "social media",
      "report on",
      "broadcast",
      "according to",
      "misleading information."
    ],
    "examples": [
      "The story was reported by several newspapers.",
      "According to the survey, most people use social media daily.",
      "The headline was misleading."
    ],
    "vocabulary": [
      "headline — titular",
      "broadcast — emisión",
      "source — fuente",
      "misleading — engañoso"
    ],
    "exercises": [
      {
        "question": "The story appeared on the front ___ of the paper.",
        "answer": "page",
        "note": "Front page."
      },
      {
        "question": "The news was ___ live on television.",
        "answer": "broadcast",
        "note": "Broadcast es emitir."
      },
      {
        "question": "According ___ the report, prices have risen.",
        "answer": "to",
        "note": "According to."
      },
      {
        "question": "Corrige: I read it in social media.",
        "answer": "I read it on social media.",
        "note": "On social media."
      },
      {
        "question": "The article was based ___ a recent survey.",
        "answer": "on",
        "note": "Based on."
      },
      {
        "question": "Be careful with ___ information online.",
        "answer": "misleading",
        "note": "Misleading significa engañoso."
      }
    ]
  },
  {
    "number": 43,
    "slug": "unidad-43-culture-arts-and-entertainment",
    "title": "Culture, arts and entertainment",
    "focus": "Describir obras culturales, espectáculos, reseñas y preferencias personales.",
    "explanation": "Se amplía el lenguaje para hablar de libros, películas, música, exposiciones y espectáculos. Se practican adjetivos de opinión, comparativos y estructuras para recomendar o criticar con ejemplos.",
    "structure": [
      "be based on",
      "be set in",
      "perform live",
      "highly recommended",
      "worth seeing",
      "audience."
    ],
    "examples": [
      "The film is based on a true story.",
      "The play is set in the 19th century.",
      "The exhibition is well worth visiting."
    ],
    "vocabulary": [
      "audience — público",
      "performance — actuación",
      "plot — argumento",
      "venue — recinto"
    ],
    "exercises": [
      {
        "question": "The film is based ___ a novel.",
        "answer": "on",
        "note": "Based on."
      },
      {
        "question": "The story is set ___ the 19th century.",
        "answer": "in",
        "note": "Be set in + periodo/lugar."
      },
      {
        "question": "The concert attracted a large ___.",
        "answer": "audience",
        "note": "Audience es el público."
      },
      {
        "question": "Corrige: I recommend you to watch it.",
        "answer": "I recommend watching it. / I recommend that you watch it.",
        "note": "Recommend + -ing o that-clause."
      },
      {
        "question": "The exhibition is well worth ___.",
        "answer": "visiting",
        "note": "Worth + gerundio."
      },
      {
        "question": "The actors performed ___ to a full theatre.",
        "answer": "live",
        "note": "Perform live."
      }
    ]
  },
  {
    "number": 44,
    "slug": "unidad-44-food-cooking-and-eating-out",
    "title": "Food, cooking and eating out",
    "focus": "Describir recetas, técnicas culinarias, restaurantes y preferencias alimentarias.",
    "explanation": "Se practica vocabulario de ingredientes y preparación, junto con imperativos, secuenciadores, cantidades y expresiones para pedir o valorar comida.",
    "structure": [
      "ingredients",
      "chop/slice/boil",
      "be allergic to",
      "book a table",
      "service charge",
      "takeaway."
    ],
    "examples": [
      "Chop the onions before adding them.",
      "The dish is served with fresh vegetables.",
      "We booked a table for eight."
    ],
    "vocabulary": [
      "ingredient — ingrediente",
      "recipe — receta",
      "portion — ración",
      "allergy — alergia"
    ],
    "exercises": [
      {
        "question": "Chop the onions into small ___.",
        "answer": "pieces",
        "note": "Cut/chop into pieces."
      },
      {
        "question": "I'm allergic ___ nuts.",
        "answer": "to",
        "note": "Allergic to."
      },
      {
        "question": "We'd like to book a ___ for four.",
        "answer": "table",
        "note": "Book a table."
      },
      {
        "question": "Corrige: The soup is made by tomatoes.",
        "answer": "The soup is made with tomatoes.",
        "note": "Made with indica ingredientes."
      },
      {
        "question": "Add the flour ___ the mixture.",
        "answer": "to",
        "note": "Add something to something."
      },
      {
        "question": "Could we have the ___, please?",
        "answer": "bill / menu",
        "note": "Expresión habitual en un restaurante."
      }
    ]
  },
  {
    "number": 45,
    "slug": "unidad-45-housing-and-local-communities",
    "title": "Housing and local communities",
    "focus": "Describir viviendas, servicios locales, problemas vecinales y cambios urbanos.",
    "explanation": "Se trabajan expresiones sobre alquiler, instalaciones, servicios y convivencia. Se practican relativas, pasivas y lenguaje para sugerir mejoras o describir problemas.",
    "structure": [
      "rent a flat",
      "afford a mortgage",
      "local facilities",
      "get renovated",
      "residential area",
      "public transport."
    ],
    "examples": [
      "The flat has recently been renovated.",
      "There are several facilities within walking distance.",
      "Residents have complained about traffic."
    ],
    "vocabulary": [
      "landlord — propietario",
      "tenant — inquilino",
      "facility — instalación",
      "neighbourhood — barrio"
    ],
    "exercises": [
      {
        "question": "The person who rents a property is a ___.",
        "answer": "tenant",
        "note": "Tenant es inquilino."
      },
      {
        "question": "The building has been recently ___.",
        "answer": "renovated",
        "note": "Renovate significa renovar."
      },
      {
        "question": "There are good local ___.",
        "answer": "facilities",
        "note": "Facilities son instalaciones/servicios."
      },
      {
        "question": "Corrige: We live in a residence area.",
        "answer": "We live in a residential area.",
        "note": "Residential es el adjetivo."
      },
      {
        "question": "The flat is within walking ___ of the station.",
        "answer": "distance",
        "note": "Within walking distance."
      },
      {
        "question": "The landlord is responsible ___ repairs.",
        "answer": "for",
        "note": "Responsible for."
      }
    ]
  },
  {
    "number": 46,
    "slug": "unidad-46-crime-rules-and-public-safety",
    "title": "Crime, rules and public safety",
    "focus": "Hablar de normas, delitos, prevención y procedimientos de forma objetiva.",
    "explanation": "Se amplía el vocabulario de seguridad y justicia. Se practica la voz pasiva, los modales de obligación y deducción y el lenguaje para informar de incidentes.",
    "structure": [
      "commit a crime",
      "report an incident",
      "be arrested for",
      "witness",
      "evidence",
      "obey the law."
    ],
    "examples": [
      "The incident was reported to the police.",
      "You must obey the safety rules.",
      "The suspect may have left the area."
    ],
    "vocabulary": [
      "witness — testigo",
      "evidence — pruebas",
      "suspect — sospechoso",
      "prevent — prevenir"
    ],
    "exercises": [
      {
        "question": "The police are looking for a ___.",
        "answer": "suspect",
        "note": "Suspect es sospechoso."
      },
      {
        "question": "You must obey the ___.",
        "answer": "law",
        "note": "Obey the law."
      },
      {
        "question": "The incident was reported ___ the police.",
        "answer": "to",
        "note": "Report something to the police."
      },
      {
        "question": "Corrige: He was arrested of theft.",
        "answer": "He was arrested for theft.",
        "note": "Arrested for."
      },
      {
        "question": "There wasn't enough ___ to prove it.",
        "answer": "evidence",
        "note": "Evidence es incontable."
      },
      {
        "question": "Security cameras can help ___ crime.",
        "answer": "prevent",
        "note": "Prevent crime."
      }
    ]
  },
  {
    "number": 47,
    "slug": "unidad-47-describing-processes-and-instructions",
    "title": "Describing processes and instructions",
    "focus": "Explicar procesos y procedimientos de manera ordenada y precisa.",
    "explanation": "Se utilizan pasivas, imperativos, secuenciadores y conectores temporales para describir cómo se fabrica, prepara o realiza algo.",
    "structure": [
      "first/next/afterwards/finally",
      "be + past participle",
      "once",
      "until",
      "as soon as."
    ],
    "examples": [
      "First, the materials are collected.",
      "The mixture is heated until it becomes liquid.",
      "Finally, the product is checked."
    ],
    "vocabulary": [
      "process — proceso",
      "stage — etapa",
      "mixture — mezcla",
      "equipment — equipo"
    ],
    "exercises": [
      {
        "question": "First, the ingredients ___ (mix).",
        "answer": "are mixed",
        "note": "Pasiva en presente para describir procesos."
      },
      {
        "question": "The liquid is heated ___ it boils.",
        "answer": "until",
        "note": "Until marca el límite temporal."
      },
      {
        "question": "___ that, the mixture is cooled.",
        "answer": "After",
        "note": "After that secuencia pasos."
      },
      {
        "question": "Corrige: The parts assembles by machine.",
        "answer": "The parts are assembled by machine.",
        "note": "Falta be en la pasiva."
      },
      {
        "question": "The product is checked before it ___ (package).",
        "answer": "is packaged",
        "note": "Pasiva en Present Simple."
      },
      {
        "question": "Finally, the machine is switched ___.",
        "answer": "off",
        "note": "Switch off significa apagar."
      }
    ]
  },
  {
    "number": 48,
    "slug": "unidad-48-describing-trends-and-changes",
    "title": "Describing trends and changes",
    "focus": "Explicar tendencias, aumentos, descensos y cambios graduales.",
    "explanation": "Se practica el lenguaje de gráficos y tendencias con increase, decrease, rise, fall, remain stable y gradually. Se combinan adverbios de grado, comparativos y tiempos verbales para describir datos.",
    "structure": [
      "rise/fall/increase/decrease",
      "remain stable",
      "gradually",
      "sharply",
      "compared with."
    ],
    "examples": [
      "Prices have risen gradually this year.",
      "The number of visitors fell sharply in May.",
      "Sales remained stable."
    ],
    "vocabulary": [
      "trend — tendencia",
      "increase — aumento",
      "decline — descenso",
      "gradually — gradualmente"
    ],
    "exercises": [
      {
        "question": "Prices have ___ by ten per cent.",
        "answer": "increased / risen",
        "note": "Increase/rise expresan aumento."
      },
      {
        "question": "The number of users fell ___. (sharp)",
        "answer": "sharply",
        "note": "Adverbio para describir el cambio."
      },
      {
        "question": "Sales remained ___. (stability)",
        "answer": "stable",
        "note": "Remain + adjective."
      },
      {
        "question": "Corrige: The costs have raised this year.",
        "answer": "The costs have risen this year. / The company has raised its prices.",
        "note": "Rise es intransitivo; raise necesita objeto."
      },
      {
        "question": "There was a significant ___ in demand.",
        "answer": "increase",
        "note": "A significant increase."
      },
      {
        "question": "Compared ___ last year, profits are higher.",
        "answer": "with / to",
        "note": "Compared with/to."
      }
    ]
  },
  {
    "number": 49,
    "slug": "unidad-49-giving-presentations-and-public-speaking",
    "title": "Giving presentations and public speaking",
    "focus": "Organizar presentaciones, introducir ideas, destacar información y responder preguntas.",
    "explanation": "Se practican expresiones para estructurar una exposición, presentar datos, aclarar puntos y concluir. Se utilizan marcadores discursivos, lenguaje formal y estrategias de interacción.",
    "structure": [
      "I'd like to begin by",
      "let me move on to",
      "to sum up",
      "as you can see",
      "are there any questions?"
    ],
    "examples": [
      "I'd like to begin by explaining the background.",
      "Let me move on to the results.",
      "To sum up, the project was successful."
    ],
    "vocabulary": [
      "audience — audiencia",
      "outline — esquema",
      "highlight — destacar",
      "conclusion — conclusión"
    ],
    "exercises": [
      {
        "question": "I'd like to begin ___ introducing the topic.",
        "answer": "by",
        "note": "Begin by + gerundio."
      },
      {
        "question": "Let me move ___ to the next point.",
        "answer": "on",
        "note": "Move on to."
      },
      {
        "question": "To ___ up, the results were positive.",
        "answer": "sum",
        "note": "To sum up concluye."
      },
      {
        "question": "Corrige: I will explain you the results.",
        "answer": "I will explain the results to you.",
        "note": "Explain something to someone."
      },
      {
        "question": "As you can ___ on this slide…",
        "answer": "see",
        "note": "As you can see."
      },
      {
        "question": "Are there any ___?",
        "answer": "questions",
        "note": "Cierre para invitar preguntas."
      }
    ]
  },
  {
    "number": 50,
    "slug": "unidad-50-formal-and-informal-email-writing",
    "title": "Formal and informal email writing",
    "focus": "Adaptar el tono, la estructura y las fórmulas de cortesía en correos electrónicos.",
    "explanation": "Un correo formal suele incluir saludo, motivo, información organizada, petición y despedida. En contextos informales se usan contracciones y expresiones más cercanas. Es importante ajustar el registro al destinatario y al propósito.",
    "structure": [
      "formal: Dear…, I am writing to…, I would appreciate…",
      "informal: Hi…, Just wanted to…, See you soon."
    ],
    "examples": [
      "I am writing to enquire about the course.",
      "I would be grateful if you could reply.",
      "Thanks for getting back to me."
    ],
    "vocabulary": [
      "enquire — consultar",
      "further information — más información",
      "regards — saludos",
      "attachment — archivo adjunto"
    ],
    "exercises": [
      {
        "question": "I am writing to ___ about the vacancy.",
        "answer": "enquire",
        "note": "Writing to enquire es formal."
      },
      {
        "question": "I would be grateful ___ you could reply.",
        "answer": "if",
        "note": "Would be grateful if."
      },
      {
        "question": "Please find the document ___ to this email.",
        "answer": "attached",
        "note": "Attached indica adjunto."
      },
      {
        "question": "Corrige: I want information about your course. (más formal)",
        "answer": "I would like some information about your course.",
        "note": "Would like es más cortés."
      },
      {
        "question": "I look forward to ___ from you.",
        "answer": "hearing",
        "note": "Look forward to + -ing."
      },
      {
        "question": "Best ___,",
        "answer": "regards",
        "note": "Best regards es una despedida formal."
      }
    ]
  },
  {
    "number": 51,
    "slug": "unidad-51-complaints-and-problem-solving",
    "title": "Complaints and problem solving",
    "focus": "Explicar problemas, presentar quejas educadas y proponer soluciones.",
    "explanation": "Se practican fórmulas para describir un problema, aportar detalles, pedir una solución y expresar insatisfacción con educación. Se combinan modales, pasivas y conectores.",
    "structure": [
      "I am writing to complain about",
      "the item was damaged",
      "I would like a refund",
      "resolve an issue",
      "make a complaint."
    ],
    "examples": [
      "I am writing to complain about the service.",
      "The item arrived damaged.",
      "I would appreciate a full refund."
    ],
    "vocabulary": [
      "faulty — defectuoso",
      "refund — reembolso",
      "replacement — sustitución",
      "inconvenience — inconveniente"
    ],
    "exercises": [
      {
        "question": "I am writing to complain ___ the delay.",
        "answer": "about",
        "note": "Complain about."
      },
      {
        "question": "The product arrived ___.",
        "answer": "damaged",
        "note": "Arrived damaged."
      },
      {
        "question": "I would like to ___ a refund.",
        "answer": "request",
        "note": "Request a refund."
      },
      {
        "question": "Corrige: I am not satisfied of the service.",
        "answer": "I am not satisfied with the service.",
        "note": "Satisfied with."
      },
      {
        "question": "We apologise ___ the inconvenience.",
        "answer": "for",
        "note": "Apologise for."
      },
      {
        "question": "Could you please ___ this issue?",
        "answer": "resolve",
        "note": "Resolve an issue."
      }
    ]
  },
  {
    "number": 52,
    "slug": "unidad-52-negotiation-and-reaching-agreements",
    "title": "Negotiation and reaching agreements",
    "focus": "Proponer condiciones, negociar alternativas y alcanzar acuerdos sencillos.",
    "explanation": "Se usan expresiones para sugerir, aceptar, rechazar y negociar condiciones. Se practican modales de cortesía, condicionales y lenguaje de compromiso.",
    "structure": [
      "Would you consider…?",
      "How about…?",
      "I'm afraid that's not possible",
      "meet halfway",
      "reach an agreement."
    ],
    "examples": [
      "Could we agree on a later date?",
      "Would you consider reducing the price?",
      "Perhaps we could meet halfway."
    ],
    "vocabulary": [
      "negotiate — negociar",
      "compromise — compromiso",
      "terms — condiciones",
      "agreement — acuerdo"
    ],
    "exercises": [
      {
        "question": "Could we agree ___ a later date?",
        "answer": "on",
        "note": "Agree on + tema/fecha."
      },
      {
        "question": "Would you consider ___ (reduce) the price?",
        "answer": "reducing",
        "note": "Consider + gerundio."
      },
      {
        "question": "Let's try to meet ___ halfway.",
        "answer": "—",
        "note": "Meet halfway significa llegar a un punto intermedio."
      },
      {
        "question": "Corrige: I agree to your suggestion (meaning: share same opinion).",
        "answer": "I agree with your suggestion.",
        "note": "Agree with una idea; agree to una propuesta/condición."
      },
      {
        "question": "I'm afraid that isn't ___ for us.",
        "answer": "acceptable",
        "note": "Acceptable significa aceptable."
      },
      {
        "question": "We finally reached an ___.",
        "answer": "agreement",
        "note": "Reach an agreement."
      }
    ]
  },
  {
    "number": 53,
    "slug": "unidad-53-expressing-opinions-and-supporting-arguments",
    "title": "Expressing opinions and supporting arguments",
    "focus": "Defender una opinión con razones, ejemplos y matices.",
    "explanation": "Para argumentar se utilizan I believe, from my point of view, one reason is, for example y on balance. Se puede matizar una opinión con tend to, seem to y may, evitando afirmaciones absolutas.",
    "structure": [
      "in my view",
      "one reason is",
      "for instance",
      "on balance",
      "it seems that",
      "tend to."
    ],
    "examples": [
      "In my view, public transport should be cheaper.",
      "One reason is that it reduces traffic.",
      "On balance, the advantages outweigh the disadvantages."
    ],
    "vocabulary": [
      "argument — argumento",
      "evidence — pruebas",
      "viewpoint — punto de vista",
      "outweigh — superar"
    ],
    "exercises": [
      {
        "question": "From my point of ___, the plan is realistic.",
        "answer": "view",
        "note": "Point of view."
      },
      {
        "question": "One reason ___ this is the cost.",
        "answer": "for",
        "note": "One reason for."
      },
      {
        "question": "The benefits outweigh the ___.",
        "answer": "disadvantages",
        "note": "Advantages/disadvantages."
      },
      {
        "question": "Corrige: In my opinion, I think it is useful.",
        "answer": "In my opinion, it is useful. / I think it is useful.",
        "note": "Evita duplicar marcadores de opinión."
      },
      {
        "question": "For ___, many cities have introduced cycle lanes.",
        "answer": "instance",
        "note": "For instance introduce un ejemplo."
      },
      {
        "question": "On ___, the proposal is worth considering.",
        "answer": "balance",
        "note": "On balance expresa valoración global."
      }
    ]
  },
  {
    "number": 54,
    "slug": "unidad-54-describing-people-character-and-behaviour",
    "title": "Describing people, character and behaviour",
    "focus": "Describir rasgos de personalidad, comportamientos y relaciones con precisión.",
    "explanation": "Se amplía el repertorio de adjetivos y expresiones para describir personalidad y conducta. Se practican adjetivos con preposición, adverbios y estructuras de contraste.",
    "structure": [
      "reliable",
      "thoughtful",
      "self-confident",
      "open-minded",
      "tend to",
      "behave",
      "get along with."
    ],
    "examples": [
      "She's reliable and always keeps her promises.",
      "He tends to avoid difficult conversations.",
      "They are open-minded about new ideas."
    ],
    "vocabulary": [
      "thoughtful — considerado",
      "stubborn — terco",
      "reliable — fiable",
      "outgoing — extrovertido"
    ],
    "exercises": [
      {
        "question": "A person you can trust is ___.",
        "answer": "reliable",
        "note": "Reliable significa fiable."
      },
      {
        "question": "He tends ___ worry about small things.",
        "answer": "to",
        "note": "Tend to + verbo."
      },
      {
        "question": "She is very open-___ and accepts new ideas.",
        "answer": "minded",
        "note": "Open-minded."
      },
      {
        "question": "Corrige: He behaves very rude.",
        "answer": "He behaves very rudely.",
        "note": "El verbo se modifica con adverbio."
      },
      {
        "question": "I'm proud ___ my younger sister.",
        "answer": "of",
        "note": "Proud of."
      },
      {
        "question": "They get along ___ each other.",
        "answer": "with",
        "note": "Get along with."
      }
    ]
  },
  {
    "number": 55,
    "slug": "unidad-55-feelings-reactions-and-emotions",
    "title": "Feelings, reactions and emotions",
    "focus": "Expresar emociones, reacciones y causas con adjetivos precisos.",
    "explanation": "Se distingue entre adjetivos que describen la causa (-ing) y el sentimiento de una persona (-ed), y se amplía el vocabulario de reacciones. Se practican intensificadores y estructuras con feel.",
    "structure": [
      "-ed: feeling",
      "-ing: cause",
      "feel + adjective",
      "be/get + adjective",
      "overwhelmed by",
      "disappointed with."
    ],
    "examples": [
      "The news was surprising.",
      "I was surprised by the announcement.",
      "She felt embarrassed about the mistake."
    ],
    "vocabulary": [
      "embarrassed — avergonzado",
      "overwhelmed — abrumado",
      "disappointed — decepcionado",
      "relieved — aliviado"
    ],
    "exercises": [
      {
        "question": "The film was really ___. (bore)",
        "answer": "boring",
        "note": "-ing describe la causa del sentimiento."
      },
      {
        "question": "I was ___ by the result. (surprise)",
        "answer": "surprised",
        "note": "-ed describe cómo se siente la persona."
      },
      {
        "question": "She felt ___ after the interview. (relief)",
        "answer": "relieved",
        "note": "Relieved expresa alivio."
      },
      {
        "question": "Corrige: I was very exciting about the trip.",
        "answer": "I was very excited about the trip.",
        "note": "La persona siente excitement: excited."
      },
      {
        "question": "He was embarrassed ___ his mistake.",
        "answer": "about / by",
        "note": "Embarrassed about/by."
      },
      {
        "question": "The instructions were confusing, so we felt ___.",
        "answer": "confused",
        "note": "Confused describe el estado de las personas."
      }
    ]
  },
  {
    "number": 56,
    "slug": "unidad-56-describing-places-and-atmosphere",
    "title": "Describing places and atmosphere",
    "focus": "Describir lugares, ambiente, instalaciones y experiencias con detalles.",
    "explanation": "Se usan adjetivos y expresiones para caracterizar paisajes, ciudades y espacios. Se practican relativas, comparativos y vocabulario sensorial para hacer descripciones más precisas.",
    "structure": [
      "lively atmosphere",
      "breathtaking view",
      "within walking distance",
      "be surrounded by",
      "worth visiting."
    ],
    "examples": [
      "The village is surrounded by green hills.",
      "The old town has a lively atmosphere.",
      "The viewpoint offers breathtaking views."
    ],
    "vocabulary": [
      "breathtaking — impresionante",
      "peaceful — tranquilo",
      "lively — animado",
      "surroundings — alrededores"
    ],
    "exercises": [
      {
        "question": "The house is surrounded ___ trees.",
        "answer": "by",
        "note": "Surrounded by."
      },
      {
        "question": "The town has a lively ___.",
        "answer": "atmosphere",
        "note": "Lively atmosphere."
      },
      {
        "question": "The beach is worth ___.",
        "answer": "visiting",
        "note": "Worth + gerundio."
      },
      {
        "question": "Corrige: The village is near of the lake.",
        "answer": "The village is near the lake.",
        "note": "Near no lleva of."
      },
      {
        "question": "The hotel is within walking ___ of the centre.",
        "answer": "distance",
        "note": "Within walking distance."
      },
      {
        "question": "The view was absolutely ___.",
        "answer": "breathtaking",
        "note": "Breathtaking describe algo impresionante."
      }
    ]
  },
  {
    "number": 57,
    "slug": "unidad-57-idioms-and-everyday-expressions",
    "title": "Idioms and everyday expressions",
    "focus": "Comprender expresiones frecuentes que no se traducen literalmente.",
    "explanation": "Los idioms y expresiones fijas aparecen en conversaciones y textos cotidianos. La unidad introduce expresiones de frecuencia y dificultad moderada, como once in a while, by the way, on time, in a hurry y make up your mind.",
    "structure": [
      "once in a while",
      "by the way",
      "on time",
      "in a hurry",
      "make up your mind",
      "keep in touch."
    ],
    "examples": [
      "I see my cousins once in a while.",
      "By the way, have you met our new manager?",
      "We arrived just in time."
    ],
    "vocabulary": [
      "idiom — modismo",
      "occasionally — ocasionalmente",
      "in a hurry — con prisa",
      "keep in touch — mantener el contacto"
    ],
    "exercises": [
      {
        "question": "I visit them once ___ a while.",
        "answer": "in",
        "note": "Once in a while."
      },
      {
        "question": "We arrived ___ time for the start.",
        "answer": "in",
        "note": "In time = con tiempo suficiente."
      },
      {
        "question": "Please make ___ your mind.",
        "answer": "up",
        "note": "Make up your mind = decidirse."
      },
      {
        "question": "Corrige: I see her one time in a while.",
        "answer": "I see her once in a while.",
        "note": "La expresión fija es once in a while."
      },
      {
        "question": "By the ___, I found your keys.",
        "answer": "way",
        "note": "By the way introduce información adicional."
      },
      {
        "question": "Let's keep in ___ after the course.",
        "answer": "touch",
        "note": "Keep in touch."
      }
    ]
  },
  {
    "number": 58,
    "slug": "unidad-58-integrated-b1-grammar-review",
    "title": "Integrated B1 grammar review",
    "focus": "Integrar los principales tiempos verbales, modales, condicionales, pasivas y estructuras de nivel B1.",
    "explanation": "Esta unidad revisa los contenidos centrales del nivel B1 y exige elegir la estructura según el contexto. Se recomienda identificar primero el marco temporal, la intención y la relación entre las ideas antes de seleccionar la forma verbal.",
    "structure": [
      "Review: present/past/future forms",
      "perfect aspects",
      "conditionals",
      "modals",
      "passive",
      "reported speech",
      "relative clauses",
      "verb patterns."
    ],
    "examples": [
      "If I had known, I would have called.",
      "The report has been completed.",
      "She asked me where I was going."
    ],
    "vocabulary": [
      "review — repaso",
      "accuracy — precisión",
      "fluency — fluidez",
      "context — contexto"
    ],
    "exercises": [
      {
        "question": "By the time we arrived, the film ___. (start)",
        "answer": "had started",
        "note": "Past Perfect marca la acción anterior."
      },
      {
        "question": "If I ___ more time, I'd join you. (have)",
        "answer": "had",
        "note": "Second Conditional."
      },
      {
        "question": "The results ___ tomorrow. (announce, passive)",
        "answer": "will be announced",
        "note": "Future passive."
      },
      {
        "question": "Corrige: He asked me where was I going.",
        "answer": "He asked me where I was going.",
        "note": "Pregunta indirecta con orden afirmativo."
      },
      {
        "question": "I enjoy ___ new languages. (learn)",
        "answer": "learning",
        "note": "Enjoy + gerundio."
      },
      {
        "question": "She must ___ left already; her desk is empty.",
        "answer": "have",
        "note": "Deducción pasada: must have + participio."
      }
    ]
  },
  {
    "number": 59,
    "slug": "unidad-59-integrated-b1-vocabulary-review",
    "title": "Integrated B1 vocabulary review",
    "focus": "Consolidar vocabulario de trabajo, viajes, medioambiente, tecnología, salud y comunicación.",
    "explanation": "Repaso de collocations, phrasal verbs, formación de palabras, preposiciones dependientes y expresiones funcionales. El objetivo es seleccionar combinaciones naturales en distintos contextos.",
    "structure": [
      "Collocations",
      "phrasal verbs",
      "dependent prepositions",
      "word formation",
      "topic vocabulary",
      "discourse markers."
    ],
    "examples": [
      "We carried out research on renewable energy.",
      "I'm looking forward to hearing from you.",
      "The service was reliable and affordable."
    ],
    "vocabulary": [
      "consolidate — consolidar",
      "appropriate — adecuado",
      "expression — expresión",
      "context — contexto"
    ],
    "exercises": [
      {
        "question": "She is responsible ___ organising the event.",
        "answer": "for",
        "note": "Responsible for."
      },
      {
        "question": "We need to carry ___ a survey.",
        "answer": "out",
        "note": "Carry out."
      },
      {
        "question": "I'm looking forward to ___ you.",
        "answer": "hearing",
        "note": "Look forward to + -ing."
      },
      {
        "question": "Corrige: He depends of his parents.",
        "answer": "He depends on his parents.",
        "note": "Depend on."
      },
      {
        "question": "The opposite of reliable is ___.",
        "answer": "unreliable",
        "note": "Un- forma el opuesto."
      },
      {
        "question": "The product is good value ___ money.",
        "answer": "for",
        "note": "Good value for money."
      }
    ]
  },
  {
    "number": 60,
    "slug": "unidad-60-b1-reading-and-communication-strategies",
    "title": "B1 reading and communication strategies",
    "focus": "Desarrollar estrategias para comprender textos, identificar ideas principales e inferir información.",
    "explanation": "Esta unidad integra técnicas de lectura: localizar información específica, reconocer referencias, deducir significado por contexto, distinguir hechos y opiniones e identificar la intención del autor. Se practica resumir y justificar respuestas con evidencia textual.",
    "structure": [
      "skimming",
      "scanning",
      "context clues",
      "main idea",
      "reference words",
      "fact vs opinion",
      "inference."
    ],
    "examples": [
      "Skim the text to identify its main idea.",
      "Scan the article for dates and figures.",
      "Use the surrounding sentence to infer meaning."
    ],
    "vocabulary": [
      "main idea — idea principal",
      "evidence — evidencia",
      "inference — inferencia",
      "attitude — actitud"
    ],
    "exercises": [
      {
        "question": "Reading quickly to understand the general idea is called ___.",
        "answer": "skimming",
        "note": "Skimming busca la idea general."
      },
      {
        "question": "Looking for a particular date or name is ___.",
        "answer": "scanning",
        "note": "Scanning localiza información específica."
      },
      {
        "question": "An idea suggested but not directly stated is an ___.",
        "answer": "inference",
        "note": "Inference significa inferencia."
      },
      {
        "question": "Corrige: The writer's attitude is the main topic. (define attitude)",
        "answer": "The writer's attitude is the writer's opinion or feeling.",
        "note": "Attitude describe la postura del autor."
      },
      {
        "question": "Use context ___ to guess an unfamiliar word.",
        "answer": "clues",
        "note": "Context clues ayudan a inferir significado."
      },
      {
        "question": "A statement that can be checked is a ___.",
        "answer": "fact",
        "note": "Fact se distingue de opinion."
      }
    ]
  }
];

const passageFrames = [
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"A practical decision",body:`A local organisation has been considering a change related to ${t.title.toLowerCase()}. The team collected information, spoke to people with different experiences and compared several possibilities. At first, there was disagreement about the best approach. After reviewing the evidence, they chose a realistic option and agreed to evaluate the results in a few months. The project showed how useful clear communication and careful planning can be.`}),
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"An experience that taught a lesson",body:`When Daniel became involved in a project connected with ${t.title.toLowerCase()}, he expected everything to be straightforward. However, an unexpected difficulty forced him to change his original plan. He asked for advice, checked the available information and tried a different approach. Although the process took longer than expected, he gained valuable experience and became more confident about dealing with similar situations.`}),
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"A community initiative",body:`Residents in a small town have started an initiative focusing on ${t.title.toLowerCase()}. Volunteers meet twice a month to share ideas and organise practical activities. Some people provide specialist knowledge, while others help with communication and planning. The organisers believe that progress depends on cooperation. They hope the project will continue to grow and encourage more residents to take part.`}),
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"A changing workplace",body:`A company recently reviewed the way it deals with ${t.title.toLowerCase()}. Employees were invited to describe what worked well and what needed improvement. Their suggestions led to a number of changes, including clearer procedures and better support for new members of staff. Managers say that the process has improved communication, although they recognise that further adjustments may be necessary.`}),
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"Different points of view",body:`A group of students discussed ${t.title.toLowerCase()} during a class project. Some supported the idea because they thought it would be useful, whereas others were concerned about possible disadvantages. Each student had to give reasons and refer to examples. By the end of the discussion, most participants had understood the opposing arguments, even if they had not completely changed their opinions.`}),
  (t: Omit<A2PdfUnit,"readingPassages">) => ({title:"Looking ahead",body:`Over the next few years, changes connected with ${t.title.toLowerCase()} are likely to affect everyday life. Experts expect new opportunities, but they also warn that people will need to adapt. A recent survey suggests that practical skills and reliable information will become increasingly important. For this reason, many organisations are investing in training and encouraging people to keep learning throughout their lives.`})
];

export const B1_PDF_UNITS: A2PdfUnit[] = B1_SEEDS.map((unit) => ({
  ...unit,
  readingPassages: passageFrames.map((makePassage) => makePassage(unit))
}));
