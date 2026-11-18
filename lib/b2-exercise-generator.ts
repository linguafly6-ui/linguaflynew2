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
