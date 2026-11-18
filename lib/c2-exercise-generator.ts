import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";
import type { A2PdfUnit, A2PdfExercise } from "@/lib/a2-pdf-unit-types";



const c2GrammarBanks: Record<number, A2PdfExercise[]> = {
1: [
{question:"Elige el aspecto que enfatiza la duración hasta ahora: She ______ on the manuscript all morning. (has worked / has been working)",answer:"has been working",note:"El Present Perfect Continuous enfoca la actividad y su duración; no necesariamente su finalización."},
{question:"Completa: By the time the archive reopened, the documents ______ (remain) inaccessible for decades.",answer:"had remained",note:"Remain es un verbo de estado y aquí el Past Perfect simple expresa la situación que se prolongó hasta otro momento pasado.",},
{question:"Corrige para expresar anterioridad: When the results were published, the team works on the project for five years.",answer:"When the results were published, the team had been working on the project for five years.",note:"Past Perfect Continuous sitúa la actividad antes del acontecimiento pasado."},
{question:"Completa: This is the most compelling explanation I ______ (encounter) so far.",answer:"have encountered",note:"Present Perfect conecta la experiencia acumulada con el presente."},
{question:"Explica el contraste: He has written the introduction / He has been writing the introduction.",answer:"La primera indica que la introducción está escrita; la segunda destaca el proceso y no asegura que esté terminada.",note:"El aspecto cambia el foco entre resultado y desarrollo."},
{question:"Reescribe con inversión: I had seldom seen such a striking example. (Seldom...)",answer:"Seldom had I seen such a striking example.",note:"Seldom inicial desencadena inversión auxiliar-sujeto."}
],
2: [
{question:"Completa la deducción epistémica: Given the contradictory accounts, the witness ______ (may / misunderstand) the question.",answer:"may have misunderstood",note:"May have + participio expresa una hipótesis sobre un hecho pasado."},
{question:"Elige el grado de certeza más alto: The conclusion (must be / might be) correct, given the independent replications.",answer:"must be",note:"Must presenta una inferencia fuerte basada en la evidencia disponible."},
{question:"Corrige: The explanation must to be incomplete.",answer:"The explanation must be incomplete.",note:"El modal must va seguido del infinitivo sin to."},
{question:"Completa con can't have: The manuscript ______ (can't / originate) in the 12th century; the paper was invented later.",answer:"can't have originated",note:"Can't have + participio expresa incompatibilidad lógica con la evidencia."},
{question:"Matiza la afirmación: The policy will reduce inequality. (might)",answer:"The policy might reduce inequality.",note:"Might reduce convierte una predicción categórica en posibilidad."},
{question:"Distingue must have y should have en una frase propia.",answer:"Must have expresa deducción retrospectiva; should have expresa expectativa incumplida o crítica sobre el pasado.",note:"El significado depende de la función modal, no solo de la forma perfecta."}
],
3: [
{question:"Completa: If the data ______ (be) reliable, the hypothesis would be considerably stronger.",answer:"were",note:"Were presenta una condición hipotética irreal o distante."},
{question:"Completa el mixed conditional: If the treaty had been ratified, the region ______ (be) more stable today.",answer:"would be",note:"Una condición pasada tiene un resultado hipotético presente."},
{question:"Reescribe con inversión: If the evidence were conclusive, the debate would end.",answer:"Were the evidence conclusive, the debate would end.",note:"Were puede preceder al sujeto en condicionales formales sin if."},
{question:"Corrige: If she would know the implications, she would object.",answer:"If she knew the implications, she would object.",note:"En el segundo condicional estándar, la cláusula if usa Past Simple."},
{question:"Completa: Had the authors disclosed the conflict, the findings ______ (receive) greater scrutiny.",answer:"would have received",note:"Had + sujeto + participio equivale a if + Past Perfect."},
{question:"Explica el valor de unless en: The claim cannot be sustained unless further evidence emerges.",answer:"Unless introduce la condición necesaria para que la afirmación pueda sostenerse: que aparezcan más pruebas.",note:"Unless equivale a if not."}
],
4: [
{question:"Completa: If it ______ (not / be) for the archival record, the chronology would remain uncertain.",answer:"were not",note:"If it were not for introduce una condición presente que evita un resultado hipotético."},
{question:"Reescribe sin if: If the premise had been accepted, the argument would have collapsed.",answer:"Had the premise been accepted, the argument would have collapsed.",note:"La inversión con had es una alternativa formal al tercer condicional."},
{question:"Completa: But for the intervention, the negotiations ______ (fail).",answer:"would have failed",note:"But for equivale a una condición negativa implícita en este contexto pasado."},
{question:"Elige: I wish the committee (had considered / would consider) the evidence before voting yesterday.",answer:"had considered",note:"Wish + Past Perfect expresa arrepentimiento sobre una situación pasada."},
{question:"Corrige: If I had knew the outcome, I would have acted differently.",answer:"If I had known the outcome, I would have acted differently.",note:"Past Perfect requiere had + participio pasado."},
{question:"Explica la diferencia entre If only I had spoken y If only I spoke.",answer:"Had spoken expresa arrepentimiento sobre el pasado; spoke expresa deseo o insatisfacción respecto al presente.",note:"El tiempo verbal sitúa la hipótesis en distintos marcos temporales."}
],
5: [
{question:"Reescribe con inversión: The institution had never faced such scrutiny. (Never...)",answer:"Never had the institution faced such scrutiny.",note:"Never al inicio requiere inversión con el auxiliar."},
{question:"Completa: Not until the final hearing ______ the inconsistencies become clear.",answer:"did",note:"Not until inicial provoca inversión en la oración principal."},
{question:"Corrige: Only after the review the board acknowledged the error.",answer:"Only after the review did the board acknowledge the error.",note:"Only after al inicio exige auxiliar antes del sujeto en la principal."},
{question:"Reescribe con No sooner...than: The ruling was announced. Protests began immediately.",answer:"No sooner had the ruling been announced than protests began.",note:"No sooner + Past Perfect invertido + than."},
{question:"Completa: Under no circumstances ______ the original data be altered.",answer:"should",note:"Una expresión negativa inicial requiere inversión; should aporta el modal."},
{question:"Explica el efecto de la inversión en: Little did the researchers anticipate the consequences.",answer:"La inversión añade énfasis y presenta la falta de previsión como información destacada.",note:"Little con sentido negativo funciona como disparador de inversión."}
],
6: [
{question:"Transforma destacando the methodology: The methodology undermined the reliability of the study.",answer:"It was the methodology that undermined the reliability of the study.",note:"It-cleft focaliza el elemento que se contrasta o destaca."},
{question:"Reformula como wh-cleft: We need a more nuanced interpretation.",answer:"What we need is a more nuanced interpretation.",note:"What-clause + be presenta el foco informativo."},
{question:"Completa: It was not the outcome ______ concerned the panel, but the process.",answer:"that",note:"That introduce la cláusula relativa de la it-cleft."},
{question:"Corrige: What the analysis reveal is a fundamental contradiction.",answer:"What the analysis reveals is a fundamental contradiction.",note:"El sujeto analysis es singular y exige reveals."},
{question:"Reescribe para destacar the lack of evidence: The proposal failed because there was no supporting evidence.",answer:"The reason the proposal failed was the lack of supporting evidence.",note:"La estructura the reason ... was focaliza la causa."},
{question:"Explica qué se enfatiza: What matters is not the result but the reasoning behind it.",answer:"La estructura contrasta el razonamiento con el resultado y presenta el primero como foco.",note:"Las pseudo-cleft structures organizan y jerarquizan la información."}
],
7: [
{question:"Reformula destacando el objeto: They rejected the proposal, not the underlying principle. (It was...)",answer:"It was the proposal that they rejected, not the underlying principle.",note:"La it-cleft permite contrastar explícitamente el objeto."},
{question:"Completa con fronting: ______ this assumption, the entire argument depends.",answer:"On",note:"El complemento preposicional se antepone para dar prominencia; la frase completa es On this assumption, the entire argument depends."},
{question:"Corrige la dislocación: This conclusion, I cannot accept it.",answer:"This conclusion, I cannot accept.",note:"En una dislocación a la izquierda, el pronombre de reanudación puede aparecer en ciertos registros, pero en esta reformulación estándar se elimina la duplicación."},
{question:"Reescribe con what-cleft: The timing matters most.",answer:"What matters most is the timing.",note:"La cláusula what ocupa la posición temática y el foco aparece después de be."},
{question:"Completa: It was only after the second review ______ the flaw was identified.",answer:"that",note:"That introduce la cláusula focal en esta construcción it-cleft."},
{question:"Explica el contraste entre fronting y clefting.",answer:"Fronting desplaza un constituyente para darle prominencia; clefting divide la oración en una estructura focal y otra presupuesta.",note:"Ambos recursos organizan información, pero con estructuras sintácticas distintas."}
],
8: [
{question:"Completa con so/neither: The first account was unreliable, and ______ was the second.",answer:"so",note:"So + auxiliar + sujeto expresa que la segunda cuenta compartía la característica negativa descrita en la primera oración."},
{question:"Sustituye la repetición con do so: The committee promised to investigate and eventually ______.",answer:"did so",note:"Do so sustituye una acción verbal mencionada previamente."},
{question:"Completa con one/ones: Of the available interpretations, the most plausible ______ is the second.",answer:"one",note:"One sustituye un sustantivo contable singular recuperable del contexto."},
{question:"Corrige: The first proposal was ambitious, but the second ones was impractical.",answer:"The first proposal was ambitious, but the second one was impractical.",note:"One retoma proposal, singular."},
{question:"Explica la elipsis: Some reviewers supported the motion; others did not.",answer:"Did not omite el verbo léxico y su complemento porque se recuperan del contexto: support the motion.",note:"La elipsis evita repetir material ya mencionado."},
{question:"Reformula evitando repetición: She can interpret the text, and he can interpret the text too.",answer:"She can interpret the text, and he can too.",note:"El auxiliar can queda como soporte y se omite el predicado repetido."}
],
9: [
{question:"Une usando una cláusula no finita: Because the evidence was incomplete, the panel postponed its decision.",answer:"The evidence being incomplete, the panel postponed its decision.",note:"Una absolute clause con sujeto propio + participio/adjetivo aporta el marco causal."},
{question:"Completa: ______ (consider) in isolation, the statistic is misleading.",answer:"Considered",note:"El participio pasado introduce una cláusula reducida pasiva."},
{question:"Corrige el participio colgante: Having reviewed the report, several errors were identified.",answer:"Having reviewed the report, the auditors identified several errors.",note:"El sujeto implícito de la cláusula participial debe coincidir con el sujeto de la principal."},
{question:"Completa con infinitivo perfecto: She seems ______ (misinterpret) the original instruction.",answer:"to have misinterpreted",note:"To have + participio expresa anterioridad respecto al verbo principal."},
{question:"Reduce la relativa: The documents that were submitted after the deadline were excluded.",answer:"The documents submitted after the deadline were excluded.",note:"Una relativa pasiva puede reducirse a participio pasado."},
{question:"Explica el valor de having + participio en: Having secured approval, the team proceeded.",answer:"Indica que conseguir la aprobación ocurrió antes de que el equipo continuara.",note:"La forma perfecta no finita marca anterioridad temporal."}
],
10: [
{question:"Reduce la cláusula: The participants who were selected for the second stage received an email.",answer:"The participants selected for the second stage received an email.",note:"La relativa pasiva se reduce a participio pasado."},
{question:"Completa con participio perfecto pasivo: ______ (inform) of the risks, the board requested an independent review.",answer:"Having been informed",note:"Having been + participio expresa una acción pasiva anterior."},
{question:"Corrige el sujeto colgante: Walking through the archive, the manuscripts seemed unusually fragile.",answer:"Walking through the archive, I found the manuscripts unusually fragile.",note:"Quien camina debe ser el sujeto implícito de la cláusula inicial."},
{question:"Reescribe como cláusula reducida: While she was waiting for the verdict, she reviewed her notes.",answer:"While waiting for the verdict, she reviewed her notes.",note:"Se puede omitir el sujeto y be cuando el sujeto coincide con el de la principal."},
{question:"Completa: The proposal, ______ (revise) several times, was finally accepted.",answer:"having been revised",note:"El participio perfecto pasivo indica que las revisiones precedieron a la aceptación."},
{question:"Explica la diferencia entre Having completed the study y Having been completed, the study...",answer:"Having completed the study implica que el sujeto realizó la acción; Having been completed presenta al sujeto como receptor de la acción.",note:"La voz activa o pasiva cambia el papel semántico del sujeto."}
]
};

export const buildC2ExerciseSections = (unit: A2PdfUnit) => {
 const shared = buildA2ExerciseSections(unit);
 const grammar = c2GrammarBanks[unit.number] ?? c2GrammarBanksExtra[unit.number];
 const focused = c2DiscourseBanks[unit.number];
 return [
  ...(grammar ? [{ title: `GRAMMAR — ${grammar.length} ejercicios revisados`, exercises: grammar }] : focused ? [{ title: `SEMANTICS & PRAGMATICS — ${focused.length} ejercicios revisados`, exercises: focused }] : []),
  ...shared.filter((section) => !section.title.startsWith("GRAMMAR")),
 ];
};
export const getC2ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);


const c2GrammarBanksExtra: Record<number, A2PdfExercise[]> = {
11:[
{question:"Completa con nominalización: The committee decided to postpone the vote. The committee's ______ to postpone the vote was unanimous.",answer:"decision",note:"Decision es el sustantivo derivado de decide."},
{question:"Reformula con mayor densidad nominal: The researchers evaluated the reliability of the model.",answer:"The researchers conducted an evaluation of the model's reliability.",note:"Evaluation empaqueta la acción en un grupo nominal."},
{question:"Corrige: The rapid expansion of the system has been occurred since 2020.",answer:"The rapid expansion of the system has occurred since 2020.",note:"Occur es intransitivo y no forma la pasiva con been."},
{question:"Completa: The ______ (interpret) of the findings remains contested.",answer:"interpretation",note:"Interpretation es el sustantivo abstracto derivado de interpret."},
{question:"Explica una desventaja de la densidad sintáctica excesiva.",answer:"Puede ocultar la agencia, aumentar la carga de procesamiento y dificultar la identificación de la relación lógica entre ideas.",note:"La densidad nominal es útil en discurso especializado, pero no debe perjudicar la claridad."},
{question:"Reescribe con nominalización: The agency failed to comply with the directive.",answer:"The agency's failure to comply with the directive.",note:"Failure transforma failed en un sustantivo y permite empaquetar la proposición."}
],
12:[
{question:"Completa: The proposal appears ______ (lack) sufficient empirical support.",answer:"to lack",note:"Appear puede seleccionar to-infinitive."},
{question:"Completa con infinitivo perfecto: The witness is thought ______ (leave) before midnight.",answer:"to have left",note:"To have + participio expresa anterioridad respecto al pensamiento actual."},
{question:"Elige: The policy requires that applicants (provide / to provide) supporting evidence.",answer:"provide",note:"Require that + cláusula mandativa usa la forma base."},
{question:"Corrige: They objected for the proposal to be implemented.",answer:"They objected to the proposal being implemented.",note:"Object to selecciona un complemento con to como preposición y un gerundio."},
{question:"Completa: The findings are likely ______ (challenge) the prevailing account.",answer:"to challenge",note:"Be likely + to-infinitive expresa probabilidad."},
{question:"Explica la diferencia entre remember doing y remember to do.",answer:"Remember doing se refiere a recordar una acción ya realizada; remember to do significa no olvidar realizarla.",note:"El patrón de complementación modifica el significado."}
],
13:[
{question:"Completa el subjuntivo mandativo: It is imperative that the evidence ______ (be) preserved.",answer:"be",note:"El subjuntivo mandativo usa la forma base be."},
{question:"Corrige: The chair demanded that the report is rewritten.",answer:"The chair demanded that the report be rewritten.",note:"Demand that selecciona forma base en la cláusula mandativa."},
{question:"Reformula con should: The court ordered that the documents be disclosed.",answer:"The court ordered that the documents should be disclosed.",note:"Should puede aparecer en la variante británica de la construcción mandativa."},
{question:"Completa: The statute requires that every applicant ______ (submit) a declaration.",answer:"submit",note:"La forma base submit no lleva -s en el subjuntivo."},
{question:"Explica el valor de were en: If I were to accept the offer, what would happen?",answer:"Were marca una hipótesis remota o formal, no un pasado real.",note:"Were to + infinitivo presenta una condición hipotética."},
{question:"Distingue el subjuntivo mandativo de un uso indicativo.",answer:"El mandativo expresa exigencia, recomendación o necesidad y usa la forma base; el indicativo presenta un hecho o una creencia.",note:"La selección depende del significado y del verbo o adjetivo rector."}
],
14:[
{question:"Pasa a pasiva manteniendo el modal: The authorities should have released the findings.",answer:"The findings should have been released by the authorities.",note:"La pasiva modal perfecta se forma con modal + have been + participio."},
{question:"Completa la pasiva de infinitivo: The manuscript is believed ______ (steal) during the war.",answer:"to have been stolen",note:"To have been + participio expresa una acción pasiva anterior."},
{question:"Reescribe con agente omitido: Someone has tampered with the records.",answer:"The records have been tampered with.",note:"La pasiva permite omitir el agente cuando se desconoce o no es relevante."},
{question:"Corrige: The data is being analyse by an independent team.",answer:"The data is being analysed by an independent team.",note:"Present Continuous passive requiere being + participio."},
{question:"Completa: The proposal ______ (report) to have been withdrawn.",answer:"is reported",note:"La estructura impersonal es be + reported + to-infinitive."},
{question:"Explica el efecto pragmático de omitir el agente en una pasiva.",answer:"Desplaza el foco hacia el proceso o el resultado y puede dejar sin especificar quién es responsable.",note:"La supresión del agente puede ser neutral o estratégicamente significativa."}
],
15:[
{question:"Completa con un reporting verb que exprese admisión: The minister ______ that the initial estimates had been inaccurate.",answer:"conceded",note:"Concede expresa que se admite un punto, a menudo desfavorable para la propia postura."},
{question:"Reescribe con deny + gerundio perfecto: 'I had not seen the confidential memo,' she said.",answer:"She denied having seen the confidential memo.",note:"Deny + having + participio expresa la negación de una acción anterior."},
{question:"Transforma con is said to: People say that the manuscript dates from the 14th century.",answer:"The manuscript is said to date from the 14th century.",note:"La pasiva de reporting desplaza el foco al sujeto del contenido."},
{question:"Completa: The article ______ (argue) that the reforms were largely symbolic.",answer:"argues",note:"Argue that presenta una tesis o línea de razonamiento."},
{question:"Corrige: He accused that the figures had been falsified.",answer:"He alleged that the figures had been falsified. / He accused the officials of falsifying the figures.",note:"Accuse requiere objeto + of + gerundio; allege puede introducir una cláusula that."},
{question:"Distingue allege y demonstrate como verbos de atribución.",answer:"Allege atribuye una afirmación que no necesariamente está probada; demonstrate presenta evidencia que respalda una conclusión.",note:"El reporting verb señala el estatus epistemológico de la información."}
],
16:[
{question:"Completa con un conector de concesión: The sample was limited; ______, the pattern was consistent across all sites.",answer:"nevertheless",note:"Nevertheless introduce una idea que contrasta con la limitación anterior."},
{question:"Une con insofar as: The proposal is defensible. It addresses the immediate risks.",answer:"The proposal is defensible insofar as it addresses the immediate risks.",note:"Insofar as limita el alcance de la afirmación."},
{question:"Corrige la puntuación: The evidence is compelling, consequently the claim deserves consideration.",answer:"The evidence is compelling; consequently, the claim deserves consideration.",note:"Consequently es un adverbio conjuntivo y necesita puntuación adecuada."},
{question:"Completa con whereas: The first account relies on oral testimony, ______ the second draws on archival records.",answer:"whereas",note:"Whereas contrapone dos fuentes o perspectivas."},
{question:"Reformula para añadir una consecuencia: The definition is too narrow. It excludes several relevant cases. (thereby)",answer:"The definition is too narrow, thereby excluding several relevant cases.",note:"Thereby + gerundio expresa el efecto de la primera proposición."},
{question:"Explica la diferencia entre notwithstanding y notwithstanding that.",answer:"Notwithstanding puede funcionar como preposición o adverbio; notwithstanding that introduce una cláusula concesiva.",note:"La estructura que sigue determina la función gramatical."}
],
17:[
{question:"Reescribe con albeit: The findings are preliminary, although they are significant.",answer:"The findings are preliminary, albeit significant.",note:"Albeit introduce una concesión reducida."},
{question:"Completa: ______ the objections raised, the proposal was approved.",answer:"Notwithstanding",note:"Notwithstanding + grupo nominal expresa concesión en registro formal."},
{question:"Corrige: Much as I am agreeing with the premise, I reject the conclusion.",answer:"Much as I agree with the premise, I reject the conclusion.",note:"Much as suele introducir una concesión con verbo de estado en presente simple."},
{question:"Une usando even if: The figures are accurate. The conclusion does not follow.",answer:"Even if the figures are accurate, the conclusion does not follow.",note:"Even if introduce una condición concesiva que no cambia el resultado principal."},
{question:"Completa: The policy may be effective, ______ only in the short term.",answer:"albeit",note:"Albeit introduce una limitación o concesión: albeit only in the short term."},
{question:"Explica la diferencia entre although y despite.",answer:"Although introduce una cláusula con sujeto y verbo; despite va seguido de sustantivo, pronombre o gerundio.",note:"La diferencia es de estructura sintáctica."}
],
18:[
{question:"Completa con una expresión de cautela: The results ______ suggest a correlation, but not causation.",answer:"appear to",note:"Appear to reduce la fuerza categórica de la afirmación."},
{question:"Reformula con may well: The intervention is quite likely to produce unintended effects.",answer:"The intervention may well produce unintended effects.",note:"May well expresa una posibilidad relativamente probable."},
{question:"Corrige: The data might suggests a different explanation.",answer:"The data might suggest a different explanation.",note:"Después de un modal se usa la forma base del verbo."},
{question:"Completa: The findings are ______ (arguable) consistent with the earlier study.",answer:"arguably",note:"Arguably presenta una valoración como defendible, no como certeza absoluta."},
{question:"Reescribe evitando una afirmación absoluta: This proves that the policy has failed.",answer:"This appears to indicate that the policy may have been ineffective.",note:"Appear to indicate y may have been introducen cautela y limitan la conclusión."},
{question:"Distingue may, might y could en una afirmación académica.",answer:"Los tres pueden expresar posibilidad; might suele sonar más tentativo, may más neutral y could puede señalar una posibilidad entre varias.",note:"La fuerza exacta depende del contexto y de la variedad de inglés."}
]
};



const c2DiscourseBanks: Record<number, A2PdfExercise[]> = {
19:[
{question:"Identifica la implicatura: 'Some of the reviewers approved the article.' ¿Qué puede inferir el lector?",answer:"Puede inferir que no todos lo aprobaron, aunque la frase no lo afirma lógicamente.",note:"Some suele generar una implicatura escalar frente a all; el contexto puede cancelarla."},
{question:"Explica por qué 'Can you pass the salt?' normalmente no pregunta por capacidad.",answer:"Funciona como petición indirecta convencional, no como pregunta literal sobre habilidad.",note:"La fuerza ilocutiva se interpreta a partir de convenciones y contexto."},
{question:"Distingue significado literal e implicatura en: 'It is getting late' dicho al final de una reunión.",answer:"Literalmente informa de la hora; pragmáticamente puede sugerir que la reunión debería terminar.",note:"La intención depende del contexto compartido y de la relevancia."},
{question:"¿Qué implicatura puede producir 'He is technically competent' en una evaluación?",answer:"Puede sugerir que la competencia es limitada a lo técnico y que faltan otras cualidades, según el contexto.",note:"La elección de un elogio restringido puede generar una inferencia contrastiva."},
{question:"Explica cómo se cancela una implicatura escalar: 'Some, in fact all, participants agreed.'",answer:"La continuación explícita all cancela la inferencia inicial de que no todos estuvieron de acuerdo.",note:"Las implicaturas conversacionales son defeasibles, no consecuencias lógicas."},
{question:"Distingue implicatura y presuposición.",answer:"La implicatura es una inferencia pragmática contextual y cancelable; la presuposición es información tratada como dada y suele proyectarse bajo ciertos operadores.",note:"No son equivalentes aunque ambas aporten contenido no expresado directamente."}
],
20:[
{question:"Identifica la presuposición de: 'Mara stopped revising the chapter.'",answer:"Que Mara revisaba el capítulo antes.",note:"Stop es un verbo aspectual que presupone la actividad previa."},
{question:"¿Qué presupone 'The director regrets approving the plan'?",answer:"Que el director aprobó el plan.",note:"Regret suele presuponer la verdad de la cláusula subordinada."},
{question:"Explica la proyección: 'Mara did not stop revising the chapter.'",answer:"Se mantiene la presuposición de que Mara revisaba el capítulo; se niega que dejara de hacerlo.",note:"La presuposición de stop tiende a sobrevivir bajo negación."},
{question:"Distingue presuposición y entailment en 'The king of Norland resigned'.",answer:"Presupone que existe un rey de Norland; entraña que esa persona dimitió, si la oración es verdadera.",note:"La presuposición se da por sentada; el entailment forma parte de las consecuencias lógicas."},
{question:"Identifica el disparador: 'Even Lina managed to solve the problem.'",answer:"Even activa la presuposición de que Lina era una candidata inesperada o menos probable para resolverlo.",note:"El elemento focal even introduce una escala de expectativas."},
{question:"¿Qué ocurre con la presuposición en 'If the chair realises that the figures are wrong, the meeting will be postponed'?",answer:"La cláusula that the figures are wrong puede seguir proyectando que las cifras son incorrectas, aunque el contexto condicional puede debilitar esa lectura.",note:"La proyección depende del entorno y de la interpretación del predicado factivo."}
],
21:[
{question:"Distingue homonimia y polisemia con un ejemplo en inglés.",answer:"Bank puede ser polisémico si conecta la institución financiera con el edificio o actividad asociada; bat (animal / implemento deportivo) suele tratarse como homonimia.",note:"La distinción depende de si los sentidos se relacionan semánticamente o son léxicamente independientes."},
{question:"Identifica la relación: purchase / buy.",answer:"Sinonimia aproximada; purchase suele ser más formal que buy.",note:"Los sinónimos rara vez son intercambiables en todos los registros y colocaciones."},
{question:"Explica la antonimia graduable en hot / cold.",answer:"Son extremos de una escala y admiten grados intermedios como warm o cool.",note:"Los antónimos graduables permiten modificadores como very y comparativos."},
{question:"¿Qué relación existe entre rose y flower?",answer:"Hiponimia: rose es un tipo de flower; flower es el hiperónimo.",note:"La relación va de categoría específica a categoría general."},
{question:"Desambigua bank en: 'She sat on the bank and watched the boats.'",answer:"Ribera u orilla de un río, no entidad financiera.",note:"Los elementos del contexto seleccionan el sentido pertinente."},
{question:"Explica por qué fast y quick no son sinónimos perfectos en 'fast car' y 'quick glance'.",answer:"Las colocaciones restringen la elección: fast car y quick glance son combinaciones convencionales.",note:"La equivalencia semántica no elimina las preferencias combinatorias."}
],
22:[
{question:"Desambigua 'The journalist saw the man with the telescope'.",answer:"Puede significar que el periodista usó el telescopio o que el hombre tenía el telescopio.",note:"El sintagma preposicional presenta ambigüedad de adjunción."},
{question:"Distingue ambigüedad léxica y estructural.",answer:"La léxica procede de varios sentidos de una palabra; la estructural, de más de un análisis sintáctico posible.",note:"El origen de la ambigüedad determina cómo se resuelve."},
{question:"Identifica los dos sentidos de sanction.",answer:"Puede significar autorizar oficialmente o imponer una penalización.",note:"Es un caso de palabra con sentidos aparentemente opuestos según el contexto."},
{question:"Reescribe para eliminar la ambigüedad: 'Visiting relatives can be boring'.",answer:"Visiting one's relatives can be boring. / Relatives who visit can be boring.",note:"La primera expresa que visitar familiares puede aburrir; la segunda que los familiares visitantes pueden aburrir."},
{question:"Explica qué pista desambigua 'The bank raised its interest rates'.",answer:"Interest rates favorece el sentido de institución financiera.",note:"La selección léxica del contexto restringe el sentido de bank."},
{question:"¿Por qué el contexto no siempre elimina la ambigüedad?",answer:"Porque puede faltar información suficiente o pueden mantenerse dos lecturas plausibles hasta recibir más contexto.",note:"La desambiguación es gradual y depende del conocimiento compartido."}
],
23:[
{question:"Distingue denotación y connotación de slim y skinny.",answer:"Ambos denotan delgadez; slim suele tener connotación positiva y skinny puede sugerir delgadez excesiva o negativa.",note:"La carga evaluativa varía con el registro y la comunidad."},
{question:"Analiza la prosodia semántica de cause en 'cause problems / cause concern'.",answer:"Cause aparece con frecuencia en entornos de efecto negativo o preocupación.",note:"La prosodia semántica es la orientación evaluativa adquirida por patrones de coocurrencia."},
{question:"Elige: 'The initiative has ______ potential.' (great / big)",answer:"great",note:"Great potential es una colocación convencional; big potential es menos idiomática en este contexto."},
{question:"Explica la diferencia connotativa entre politician y statesperson.",answer:"Politician es neutral pero puede adquirir una connotación negativa; statesperson suele elogiar juicio y servicio público.",note:"La connotación depende de asociaciones culturales y del contexto."},
{question:"Reformula sin sesgo valorativo: The scheme was a disastrous waste of money.",answer:"The scheme incurred substantial costs and did not achieve its stated objectives.",note:"La versión separa los hechos de la evaluación emocional."},
{question:"¿Qué sugiere la prosodia de utterly en 'utterly ridiculous'?",answer:"Refuerza una valoración muy negativa; utterly suele intensificar adjetivos extremos o evaluativos.",note:"La coocurrencia habitual contribuye a las expectativas de uso."}
],
24:[
{question:"Interpreta el idiom 'to move the goalposts'.",answer:"Cambiar las condiciones o criterios de una situación mientras está en curso, normalmente de forma injusta.",note:"La imagen procede de alterar la meta durante un juego."},
{question:"Completa: The witness finally let the ______ out of the bag.",answer:"cat",note:"Let the cat out of the bag significa revelar un secreto."},
{question:"Distingue collocation e idiom.",answer:"Una collocation es una combinación léxica habitual cuyo significado suele ser transparente; un idiom tiene un significado convencional no totalmente deducible de sus componentes.",note:"Hay un continuo entre combinaciones transparentes y expresiones opacas."},
{question:"Reformula en registro neutro: The negotiations were a bit of a minefield.",answer:"The negotiations involved numerous sensitive and potentially problematic issues.",note:"Minefield es una metáfora idiomática para una situación delicada."},
{question:"Explica el significado de 'by and large'.",answer:"En general o considerando la situación en conjunto.",note:"Es un adverbial idiomático de alcance global."},
{question:"¿Por qué 'make a decision' es collocation y no necesariamente idiom?",answer:"Porque el significado es transparente, pero make es el verbo convencional que combina con decision.",note:"La restricción es combinatoria, no una sustitución completa del significado literal."}
],
25:[
{question:"Completa con colligación: The findings are consistent ______ the proposed explanation.",answer:"with",note:"Consistent suele aparecer con la preposición with."},
{question:"Elige la estructura habitual: The evidence suggests (that the claim is valid / the claim to be valid).",answer:"that the claim is valid",note:"Suggest suele seleccionar una cláusula that o un gerundio, no un infinitivo con to en este sentido."},
{question:"Completa: There is growing evidence ______ a link between sleep and memory.",answer:"of",note:"Evidence of a link es una construcción nominal frecuente."},
{question:"Explica la diferencia entre collocation y colligation.",answer:"Collocation describe coocurrencia entre palabras; colligation describe asociaciones entre una palabra y patrones gramaticales.",note:"Una es principalmente léxica y la otra gramatical."},
{question:"Corrige: The study depends of three variables.",answer:"The study depends on three variables.",note:"Depend on es la pauta preposicional estándar."},
{question:"Identifica la colligación en 'be committed to improving access'.",answer:"Committed to + grupo nominal o gerundio; to funciona como preposición.",note:"La pauta gramatical determina la forma -ing del complemento verbal."}
],
26:[
{question:"Identifica la metáfora conceptual en 'She attacked the weakness in his argument'.",answer:"ARGUMENT IS WAR: la crítica se conceptualiza como un ataque.",note:"La metáfora estructura cómo hablamos y pensamos sobre la argumentación."},
{question:"Explica la metonimia en 'The White House issued a statement'.",answer:"White House representa a la administración o a sus portavoces, no solo al edificio.",note:"La metonimia usa una entidad relacionada para referirse a otra."},
{question:"Distingue metáfora y metonimia.",answer:"La metáfora proyecta una estructura entre dominios distintos; la metonimia establece una relación de contigüidad dentro de un mismo marco conceptual.",note:"La relación conceptual es de semejanza/proyección frente a asociación."},
{question:"Analiza el encuadre en 'tax relief' frente a 'tax cuts'.",answer:"Tax relief presenta la reducción como alivio de una carga; tax cuts la presenta de forma más descriptiva como disminución.",note:"El framing activa evaluaciones y perspectivas distintas sobre el mismo fenómeno."},
{question:"Reformula neutralmente: The minister's plan is a lifeline for struggling families.",answer:"The minister's plan may provide financial support to families facing hardship.",note:"La versión reduce la metáfora positiva y explicita la afirmación con cautela."},
{question:"Explica cómo el framing puede influir sin cambiar los hechos básicos.",answer:"Selecciona qué aspecto se hace saliente y qué asociaciones activa, orientando la interpretación y la evaluación del receptor.",note:"El encuadre organiza la presentación, no necesariamente altera los datos."}
]
};

