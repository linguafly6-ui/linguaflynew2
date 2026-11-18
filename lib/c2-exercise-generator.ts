import { buildA2ExerciseSections, getA2ReadingPassages } from "@/lib/a2-exercise-generator";
import type { A2PdfUnit } from "@/lib/a2-pdf-unit-types";

export const buildC2ExerciseSections = (unit: A2PdfUnit) => buildA2ExerciseSections(unit);
export const getC2ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);


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
 const grammar = c2GrammarBanks[unit.number];
 return [
  ...(grammar ? [{ title: `GRAMMAR — ${grammar.length} ejercicios revisados`, exercises: grammar }] : []),
  ...shared.filter((section) => !section.title.startsWith("GRAMMAR")),
 ];
};
export const getC2ReadingPassages = (unit: A2PdfUnit) => getA2ReadingPassages(unit);
