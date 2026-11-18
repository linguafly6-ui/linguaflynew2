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
 const grammar = c1GrammarBanks[unit.number] ?? c1GrammarBanksExtra[unit.number];
 return [
  ...(grammar ? [{ title: `GRAMMAR — ${grammar.length} ejercicios revisados`, exercises: grammar }] : []),
  ...shared.filter((section) => !section.title.startsWith("GRAMMAR")),
 ];
};
export const getC1ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);


const c1GrammarBanksExtra: Record<number, A2PdfExercise[]> = {
11:[
{question:"Completa con el reporting verb adecuado: The spokesperson ______ that no further details would be released. (maintain)",answer:"maintained",note:"Maintain that presenta una postura o afirmación sostenida por el hablante."},
{question:"Reescribe con deny: 'I did not authorise the payment,' he said.",answer:"He denied having authorised the payment.",note:"Deny puede ir seguido de gerundio perfecto para una acción anterior."},
{question:"Completa: The report ______ (claim) that the figures had been manipulated.",answer:"claims",note:"Claim that introduce el contenido atribuido a una fuente."},
{question:"Corrige: She suggested me to contact the editor.",answer:"She suggested that I contact the editor. / She suggested contacting the editor.",note:"Suggest no selecciona normalmente objeto + to-infinitive."},
{question:"Transforma usando is alleged to: People allege that the firm concealed the losses.",answer:"The firm is alleged to have concealed the losses.",note:"El infinitivo perfecto marca anterioridad respecto a la alegación."},
{question:"Explica la diferencia entre claim, concede y acknowledge como reporting verbs.",answer:"Claim presenta una afirmación; concede admite un punto, a menudo contra la propia postura; acknowledge reconoce un hecho o dificultad.",note:"Los reporting verbs expresan también la actitud del emisor ante el contenido."}
],
12:[
{question:"Reduce la relativa: The proposal, which was submitted yesterday, contains several amendments.",answer:"The proposal, submitted yesterday, contains several amendments.",note:"La relativa pasiva se reduce a participio pasado."},
{question:"Completa: The candidates ______ (shortlist) for interview will be contacted tomorrow.",answer:"shortlisted",note:"El participio pasado reduce una relativa pasiva: candidates who were shortlisted."},
{question:"Reescribe usando whom: The consultant to whom we spoke was highly experienced.",answer:"The consultant we spoke to was highly experienced.",note:"La preposición puede quedar al final en una relativa menos formal; whom conserva el registro formal."},
{question:"Corrige el participio colgante: Having reviewed the application, the missing documents were obvious.",answer:"Having reviewed the application, the officer noticed the missing documents.",note:"El sujeto implícito de la cláusula participial debe ser quien revisa."},
{question:"Completa con whose: The scholar, ______ work challenged the consensus, received an award.",answer:"whose",note:"Whose introduce posesión y puede referirse a personas."},
{question:"Reescribe con which retomando toda la idea: The company withdrew its offer. This surprised the candidates.",answer:"The company withdrew its offer, which surprised the candidates.",note:"Which puede referirse a la cláusula anterior completa."}
],
13:[
{question:"Amplía el grupo nominal con una relativa: the report (which the committee commissioned last year).",answer:"the report which the committee commissioned last year",note:"La relativa especifica qué informe se menciona."},
{question:"Identifica el núcleo del grupo nominal: the unexpectedly rapid decline in regional employment.",answer:"decline",note:"El núcleo es el sustantivo principal; los demás elementos lo modifican o complementan."},
{question:"Reordena como grupo nominal natural: policy / long-term / environmental / the effects / of.",answer:"the long-term environmental effects of the policy",note:"Los adjetivos preceden al núcleo effects y of the policy completa el significado."},
{question:"Completa con un sustantivo compuesto: a ______-wide consultation (nation).",answer:"nation",note:"Nation-wide funciona como modificador compuesto de consultation."},
{question:"Corrige la acumulación de modificadores: the report environmental recent policy.",answer:"the recent environmental policy report",note:"El orden de modificadores debe permitir identificar con claridad el núcleo report."},
{question:"Explica el efecto de nominalizar en: The committee rejected the proposal / the committee's rejection of the proposal.",answer:"La segunda versión empaqueta el proceso como un sustantivo y permite usarlo como núcleo de un grupo nominal.",note:"La densidad nominal es frecuente en registros académicos y administrativos."}
],
14:[
{question:"Nominaliza: The agency decided to postpone the launch.",answer:"The agency's decision to postpone the launch.",note:"Decision convierte el verbo decide en un sustantivo."},
{question:"Completa: The ______ (allocate) of resources remains controversial.",answer:"allocation",note:"Allocation es el sustantivo derivado de allocate."},
{question:"Reescribe con nominalización: The committee investigated how funds had been spent.",answer:"The committee conducted an investigation into the expenditure of funds.",note:"Investigation y expenditure condensan las acciones en sustantivos."},
{question:"Corrige: The implementation of the policy was failed to improve access.",answer:"The implementation of the policy failed to improve access.",note:"Implementation es el sujeto nominal; no necesita was en esta oración activa."},
{question:"Transforma: The researchers analysed the results carefully. (analysis)",answer:"The researchers conducted a careful analysis of the results.",note:"Analysis es la forma nominal de analyse."},
{question:"Explica un riesgo de la nominalización excesiva.",answer:"Puede ocultar quién realiza la acción y producir textos densos o menos directos.",note:"La nominalización aporta concisión, pero debe equilibrarse con claridad y agencia."}
],
15:[
{question:"Completa con so do I / neither do I: I cannot support the amendment, and ______.",answer:"neither can I",note:"Neither + auxiliar + sujeto expresa acuerdo con una oración negativa; se conserva el modal can."},
{question:"Evita repetir el predicado: She said she would review the draft, and she ______.",answer:"did so",note:"Do so sustituye el predicado mencionado."},
{question:"Completa con one/ones: The revised clauses are clearer than the original ______.",answer:"ones",note:"Ones sustituye un sustantivo contable plural."},
{question:"Corrige: I prefer the first option to the later one that you suggested it.",answer:"I prefer the first option to the later one that you suggested.",note:"No se duplica el objeto mediante it dentro de la relativa."},
{question:"Explica la elipsis en: Some agreed with the proposal; others did not.",answer:"Did not omite agree with the proposal, recuperable del contexto.",note:"La elipsis evita repetir información ya conocida."},
{question:"Reescribe con inversión de acuerdo: He rarely attends these briefings. (Neither...)",answer:"Neither do I.",note:"La respuesta expresa que el hablante tampoco asiste; neither va seguido de auxiliar y sujeto."}
],
16:[
{question:"Une con whereas para marcar contraste: The first model is inexpensive. The second is more reliable.",answer:"The first model is inexpensive, whereas the second is more reliable.",note:"Whereas introduce una cláusula contrastiva."},
{question:"Completa con un conector de consecuencia: The sample was too small; ______, the findings cannot be generalised.",answer:"therefore",note:"Therefore señala una consecuencia lógica."},
{question:"Corrige la puntuación: The evidence is limited however the conclusion remains plausible.",answer:"The evidence is limited; however, the conclusion remains plausible.",note:"However como conector oracional suele separarse mediante punto y coma/coma o punto."},
{question:"Reformula evitando repetición: The policy was costly. The policy was also difficult to enforce.",answer:"The policy was costly and, moreover, difficult to enforce.",note:"Moreover añade un argumento sin repetir el sujeto."},
{question:"Elige el conector concesivo: The method is demanding; (nevertheless / furthermore), it produces consistent results.",answer:"nevertheless",note:"Nevertheless introduce una idea que contrasta con la anterior."},
{question:"Explica la diferencia entre consequently y conversely.",answer:"Consequently introduce un resultado; conversely introduce una alternativa o relación opuesta.",note:"La elección del marcador debe reflejar la relación lógica real."}
],
17:[
{question:"Completa con despite: ______ considerable opposition, the measure was adopted.",answer:"Despite",note:"Despite va seguido de un grupo nominal."},
{question:"Reescribe con much as: Although I respect the decision, I cannot endorse it.",answer:"Much as I respect the decision, I cannot endorse it.",note:"Much as introduce una concesión enfática."},
{question:"Corrige: Despite the evidence was incomplete, the panel reached a verdict.",answer:"Although the evidence was incomplete, the panel reached a verdict.",note:"Despite no introduce directamente una cláusula finita."},
{question:"Completa: Admittedly, the proposal is expensive; ______, its long-term benefits are substantial.",answer:"nonetheless",note:"Nonetheless introduce una reserva o contraste con la concesión previa."},
{question:"Reformula con albeit: The solution is effective, although it is costly.",answer:"The solution is effective, albeit costly.",note:"Albeit introduce una concesión reducida, normalmente seguida de adjetivo o cláusula no finita."},
{question:"Explica el matiz de notwithstanding en registro formal.",answer:"Notwithstanding significa 'a pesar de' y puede aparecer antes o después del elemento concesivo; tiene un tono formal.",note:"La posición y la estructura que sigue deben ser gramaticalmente coherentes."}
],
18:[
{question:"Une usando thereby: The company streamlined the process. It reduced administrative costs.",answer:"The company streamlined the process, thereby reducing administrative costs.",note:"Thereby + gerundio expresa el resultado producido por la acción anterior."},
{question:"Completa con owing to: The hearing was postponed ______ a procedural error.",answer:"owing to",note:"Owing to va seguido de un sustantivo o grupo nominal."},
{question:"Corrige: Due to the roads were flooded, the event was cancelled.",answer:"Because the roads were flooded, the event was cancelled.",note:"Due to no introduce una cláusula finita; se usa because o due to + sustantivo."},
{question:"Reformula expresando finalidad: The team encrypted the files because it wanted to protect confidentiality. (in order to)",answer:"The team encrypted the files in order to protect confidentiality.",note:"In order to + infinitivo expresa propósito."},
{question:"Completa: The policy was revised, ______ ensuring greater consistency across departments.",answer:"thus",note:"Thus introduce el resultado de la revisión; puede preceder a un gerundio en esta construcción."},
{question:"Distingue as a result y with a view to.",answer:"As a result introduce consecuencia; with a view to introduce finalidad y va seguido de gerundio o sustantivo.",note:"No deben intercambiarse porque expresan relaciones distintas."}
]
};
