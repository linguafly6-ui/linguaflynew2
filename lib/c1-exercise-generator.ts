import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";
import type { A2PdfUnit } from "@/lib/a2-pdf-unit-types";

export const buildC1ExerciseSections = (unit: A2PdfUnit) => buildA2ExerciseSections(unit);
export const getC1ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);


const c1GrammarBanks: Record<number, A2PdfExercise[]> = {
1: [
{question:"Completa con Present Perfect Continuous o Past Perfect Continuous: The team ______ (analyse) the data for months before the new evidence emerged.",answer:"had been analysing",note:"Past Perfect Continuous destaca la duración de una actividad anterior a otro momento pasado."},
{question:"Elige la forma que presenta un resultado actual: She ______ three chapters so far. (has written / has been writing)",answer:"has written",note:"El foco está en la cantidad terminada; el continuo destacaría el proceso."},
{question:"Corrige el error: By the time the lecture started, I have been waiting for an hour.",answer:"By the time the lecture started, I had been waiting for an hour.",note:"El punto de referencia es pasado, por lo que corresponde had been waiting."},
{question:"Reformula con inversión: I had never encountered such resistance before. (Never...)",answer:"Never had I encountered such resistance before.",note:"Un adverbio negativo inicial exige inversión entre auxiliar y sujeto."},
{question:"Completa: This is the first time the committee ______ (consider) such a proposal.",answer:"has considered",note:"This is the first time suele combinarse con Present Perfect."},
{question:"Explica la diferencia: I have read the report / I have been reading the report.",answer:"La primera presenta la lectura como experiencia o tarea completada; la segunda destaca la actividad, posiblemente aún en curso.",note:"El aspecto perfectivo enfoca el resultado; el continuo, la duración o el proceso."}
],
2: [
{question:"Completa con el tiempo narrativo adecuado: By the time Mara arrived, the witnesses ______ (leave).",answer:"had left",note:"Past Perfect marca el acontecimiento anterior al punto narrativo pasado."},
{question:"Elige: He ______ (had been driving / was driving) for six hours when the engine failed.",answer:"had been driving",note:"La duración anterior al fallo se expresa con Past Perfect Continuous."},
{question:"Reescribe para indicar anterioridad: She checked the figures and then submitted the report. (Having...)",answer:"Having checked the figures, she submitted the report.",note:"Having + participio presenta la primera acción como anterior."},
{question:"Corrige el salto temporal: I opened the door and realise that someone had entered.",answer:"I opened the door and realised that someone had entered.",note:"La forma pasada realised mantiene la secuencia narrativa; had entered expresa anterioridad."},
{question:"Completa: He speaks as though he ______ (witness) the event, although he was abroad.",answer:"had witnessed",note:"As though + Past Perfect expresa una comparación hipotética referida al pasado."},
{question:"Transforma a estilo indirecto con backshift: 'I have never seen this document,' she said.",answer:"She said that she had never seen that document.",note:"En el estilo indirecto, Present Perfect suele retroceder a Past Perfect cuando el marco pasado lo requiere."}
],
3: [
{question:"Reescribe con inversión: I had rarely heard such a convincing argument. (Rarely...)",answer:"Rarely had I heard such a convincing argument.",note:"Rarely al inicio provoca inversión sujeto-auxiliar."},
{question:"Completa: Not only ______ the deadline, but she also improved the final draft.",answer:"did she meet",note:"Not only al inicio de la cláusula principal exige do-support e inversión en pasado simple."},
{question:"Reformula con Under no circumstances: You must disclose these figures.",answer:"Under no circumstances must you disclose these figures.",note:"La expresión negativa inicial va seguida de auxiliar/modal y sujeto."},
{question:"Corrige: No sooner the talks had begun than the power failed.",answer:"No sooner had the talks begun than the power failed.",note:"No sooner + Past Perfect invertido + than."},
{question:"Completa: Only after the audit ______ the discrepancy become apparent.",answer:"did",note:"Only after al inicio desplaza la inversión a la oración principal."},
{question:"Reescribe con Little: We knew that the decision would have such consequences.",answer:"Little did we know that the decision would have such consequences.",note:"Little con sentido negativo requiere inversión con did en pasado simple."}
],
4: [
{question:"Transforma en it-cleft destacando the funding: The funding made the project possible.",answer:"It was the funding that made the project possible.",note:"It-cleft focaliza un elemento con It + be + foco + that/who."},
{question:"Transforma en wh-cleft: We need greater transparency.",answer:"What we need is greater transparency.",note:"What-clause presenta la información focal como complemento de be."},
{question:"Completa: It was the final paragraph ______ persuaded the panel.",answer:"that",note:"That es habitual en it-clefts para destacar cosas o ideas."},
{question:"Corrige: What the report demonstrates are that the policy failed.",answer:"What the report demonstrates is that the policy failed.",note:"La cláusula what funciona como sujeto singular."},
{question:"Reescribe destacando the reason: The chair resigned because of the conflict of interest.",answer:"The reason the chair resigned was the conflict of interest.",note:"La estructura the reason ... was permite focalizar la causa."},
{question:"Explica el efecto de foco: It was the timing that undermined the proposal.",answer:"La oración presenta el momento como el elemento contrastivo o informativamente central.",note:"Las cleft sentences organizan la información y resaltan un constituyente."}
],
5: [
{question:"Completa el condicional formal: ______ the evidence be verified, the claim would gain credibility.",answer:"Were",note:"Were + sujeto + infinitivo sustituye a if + Past Simple en una hipótesis formal."},
{question:"Reescribe sin if: If the figures had been checked, the error would have been detected.",answer:"Had the figures been checked, the error would have been detected.",note:"Had + sujeto + participio permite invertir el tercer condicional."},
{question:"Completa: If she ______ (take) the alternative route, she would be here by now.",answer:"had taken",note:"La condición pasada produce un resultado hipotético presente: mixed conditional."},
{question:"Corrige: If I would have realised the risk, I would have objected.",answer:"If I had realised the risk, I would have objected.",note:"En la cláusula condicional estándar no se usa would have."},
{question:"Completa con unless: The contract will remain valid ______ either party terminates it.",answer:"unless",note:"Unless equivale a if not y expresa la excepción que anula el resultado."},
{question:"Reformula con provided that: You may use the dataset if you acknowledge its source.",answer:"You may use the dataset provided that you acknowledge its source.",note:"Provided that introduce una condición necesaria."}
],
6: [
{question:"Completa el mixed conditional: If he were less impulsive, he ______ (not / resign) yesterday.",answer:"would not have resigned",note:"Una característica presente/general explica un resultado hipotético pasado."},
{question:"Completa: If I had accepted the fellowship, I ______ (work) in Geneva now.",answer:"would be working",note:"La condición irreal pasada tiene una consecuencia presente."},
{question:"Reescribe con inversión: If the premise were true, the conclusion would follow.",answer:"Were the premise true, the conclusion would follow.",note:"Were puede colocarse antes del sujeto para omitir if."},
{question:"Elige: If they had invested earlier, they (would own / would have owned) the property now.",answer:"would own",note:"La consecuencia se sitúa ahora, aunque la condición pertenece al pasado."},
{question:"Corrige: If she studied harder, she would have passed last week's exam.",answer:"If she had studied harder, she would have passed last week's exam.",note:"Para una condición irreal pasada se usa Past Perfect en la cláusula if."},
{question:"Completa: But for your advice, I ______ (make) a serious mistake.",answer:"would have made",note:"But for introduce una condición implícita; aquí evita un resultado pasado."}
],
7: [
{question:"Completa el subjuntivo mandativo: The board insisted that the proposal ______ (be) revised.",answer:"be",note:"En el mandative subjunctive se usa la forma base, también be."},
{question:"Reformula con should: It is essential that every applicant submit two references.",answer:"It is essential that every applicant should submit two references.",note:"En variedades británicas, should puede alternar con el subjuntivo mandativo."},
{question:"Corrige: The doctor recommended that he rests for a week.",answer:"The doctor recommended that he rest for a week.",note:"Recommend that + sujeto + forma base en subjuntivo mandativo."},
{question:"Completa: The regulation requires that each vehicle ______ (carry) identification.",answer:"carry",note:"Require that selecciona una cláusula mandativa con forma base."},
{question:"Elige: The manager demanded that the figures (are / be) checked independently.",answer:"be",note:"La forma be es invariable en el subjuntivo mandativo."},
{question:"Reescribe en registro formal: They suggested that the committee should reconsider the decision.",answer:"They suggested that the committee reconsider the decision.",note:"La forma base reconsider expresa la recomendación en estilo formal."}
],
8: [
{question:"Completa la deducción presente: Given the locked doors, the building ______ (must / be) empty.",answer:"must be",note:"Must expresa una deducción afirmativa fuerte sobre el presente."},
{question:"Completa la deducción negativa: That ______ (can't / be) the original manuscript; the date is wrong.",answer:"can't be",note:"Can't expresa imposibilidad o incompatibilidad con la evidencia."},
{question:"Matiza la inferencia: The figures ______ (may / indicate) a shift in demand.",answer:"may indicate",note:"May presenta la interpretación como posible, no segura."},
{question:"Corrige: She must to know the answer by now.",answer:"She must know the answer by now.",note:"Los modales van seguidos de infinitivo sin to."},
{question:"Completa con should: The parcel ______ (should / arrive) by noon if the service is operating normally.",answer:"should arrive",note:"Should expresa expectativa razonable."},
{question:"Distingue must y can't: The lights are off and nobody answers; they ______ be at home.",answer:"can't",note:"Con esos indicios, can't expresa una deducción negativa; la frase completa es they can't be at home."}
],
9: [
{question:"Completa la especulación pasada: The figures are missing; someone ______ (must / remove) them.",answer:"must have removed",note:"Must have + participio expresa una deducción fuerte sobre el pasado."},
{question:"Completa con posibilidad pasada: The witness ______ (might / misread) the number.",answer:"might have misread",note:"Might have expresa una explicación pasada posible, no confirmada."},
{question:"Expresa crítica retrospectiva: You ______ (should / tell) us about the delay.",answer:"should have told",note:"Should have + participio señala una acción pasada que habría sido conveniente."},
{question:"Corrige: They can't had understood the instructions.",answer:"They can't have understood the instructions.",note:"La forma perfecta modal es modal + have + participio."},
{question:"Completa: He needn't ______ (bring) a laptop; one was provided.",answer:"have brought",note:"Needn't have + participio indica que se hizo algo innecesario."},
{question:"Distingue las formas: She didn't need to attend / She needn't have attended.",answer:"Didn't need to attend: no era necesario y normalmente no asistió. Needn't have attended: asistió, pero no hacía falta.",note:"La segunda construcción implica que la acción sí ocurrió."}
],
10: [
{question:"Pasa a pasiva impersonal: People believe that the minister knew about the leak.",answer:"The minister is believed to have known about the leak.",note:"El infinitivo perfecto sitúa el conocimiento antes de la creencia actual."},
{question:"Completa la pasiva con modal: The files must ______ (encrypt) before transmission.",answer:"be encrypted",note:"Modal + be + participio forma la pasiva."},
{question:"Reescribe con It is reported that: Witnesses say the bridge is unsafe.",answer:"It is reported that the bridge is unsafe.",note:"It + be + participio de reporting verb + that-clause crea una estructura impersonal."},
{question:"Completa: The suspect is alleged ______ (leave) the country.",answer:"to have left",note:"To have + participio indica que el hecho alegado es anterior al presente."},
{question:"Corrige: The proposal is expected approving next week.",answer:"The proposal is expected to be approved next week.",note:"La pasiva de infinitivo se forma con to be + participio."},
{question:"Transforma: They are repairing the road. (The road...)",answer:"The road is being repaired.",note:"Present Continuous passive: is/are being + participio."}
]
};

export const buildC1ExerciseSections = (unit: A2PdfUnit) => {
 const shared = buildA2ExerciseSections(unit);
 const grammar = c1GrammarBanks[unit.number];
 return [
  ...(grammar ? [{ title: `GRAMMAR — ${grammar.length} ejercicios revisados`, exercises: grammar }] : []),
  ...shared.filter((section) => !section.title.startsWith("GRAMMAR")),
 ];
};
export const getC1ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);
