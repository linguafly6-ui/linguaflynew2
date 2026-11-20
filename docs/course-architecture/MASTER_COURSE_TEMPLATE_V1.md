# Plantilla maestra de cursos LinguaFly — v1

Estado: estándar funcional aprobado para diseño y migración.  
Alcance: todos los niveles y cursos (Pre-A1, A1, A2, B1, B2 y futuros).  
Referencia funcional: las mecánicas mejoradas de A1.  
Idioma de interfaz: español; idioma objetivo y dificultad: configurables por curso.

## 1. Principio rector

Todos los cursos usan la misma arquitectura, el mismo orden de secciones, las mismas cantidades y las mismas mecánicas de ejercicio. Entre niveles solo varía el contenido pedagógico y su dificultad. No se permiten variantes de implementación por nivel para una misma actividad.

El contenido, la interfaz y el registro de progreso son capas separadas. El contenido declara identificadores y datos; el runtime común presenta e interactúa; el sistema de progreso registra eventos e intentos usando esos identificadores.

## 2. Estructura obligatoria por misión

Orden fijo de las ocho secciones:

| Orden | section_key | Nombre | Cantidad y mecánica obligatorias |
|---:|---|---|---|
| 1 | explore | Exploración / Vocabulary | 10 parejas inglés-español para relacionar; audio de modelo cuando corresponda |
| 2 | practice | Practice / Repaso | 20 retos variados, con contador, progreso, feedback, corrección y resultado |
| 3 | grammar | Grammar | 10 ejercicios autocorregibles vinculados al objetivo gramatical de la misión |
| 4 | pronunciation | Pronunciation | 10 elementos de vocabulario; palabra, traducción, guía aproximada para hispanohablantes y audio británico |
| 5 | reading | Reading | 1 pasaje completo y visible + 10 preguntas de comprensión autocorregibles |
| 6 | writing | Writing | 10 dictados de palabras y frases; audio británico, entrada de respuesta, corrección y resultado |
| 7 | speaking | Speaking | 10 tareas/prompts; modelo de referencia, grabación, transcripción/análisis y feedback. No presentar la transcripción como medición fonética |
| 8 | listening | Listening | 1 audio reproducible en en-GB + texto con 10 huecos inline + banco de 10 palabras mezcladas; seleccionar, colocar, mover y sustituir palabras, corregir, mostrar soluciones y puntuación |

Las cantidades son exactas, no mínimos. Una misión incompleta no se considera conforme. Si una sección necesita una adaptación pedagógica, debe conservar la misma cantidad y el mismo contrato de interacción.

### 2.1 Contrato de interacción por sección

- **Exploración:** exactamente diez parejas. El alumno selecciona un término y su traducción; se registra cada pareja.
- **Practice:** exactamente veinte retos. Puede variar el subtipo (traducción, reconocimiento, escucha, etc.), pero el flujo de responder, recibir feedback y avanzar es común.
- **Grammar:** exactamente diez preguntas. Cada pregunta tiene respuesta esperada, opciones cuando aplique y feedback.
- **Pronunciation:** exactamente diez tarjetas de práctica; reproducción individual en inglés británico y guía de pronunciación aproximada. La guía española nunca se etiqueta como IPA.
- **Reading:** el pasaje se muestra como bloque independiente antes de las preguntas. Exactamente diez preguntas vinculadas al pasaje; el alumno puede volver a consultarlo.
- **Writing:** exactamente diez dictados, combinando palabras y frases. Cada elemento tiene audio, respuesta esperada y evaluación; los intentos deben conservarse.
- **Speaking:** exactamente diez prompts evaluables. Se permite volver a grabar. La respuesta del servicio de voz distingue transcripción, coincidencia textual y feedback. No se afirma que una coincidencia de Whisper mida la calidad fonética.
- **Listening (formato canónico único para todos los niveles):** audio reproducible en `en-GB`; texto completo con exactamente diez huecos inline `[[gap-01]]` a `[[gap-10]]`; banco de diez palabras distintas, mezcladas por intento; seleccionar, colocar, mover y sustituir palabras. Al sustituir, la palabra desplazada vuelve al banco. Al comprobar se muestran aciertos, errores, soluciones y puntuación. No se admiten preguntas tipo test ni transcripción diferida como sustituto del gap-fill.

## 3. Identificadores estables

Los identificadores son obligatorios, únicos, opacos respecto al texto visible y persistentes entre cambios de diseño. No se generan a partir del título traducido ni del índice visual en tiempo de ejecución.

Formato legible recomendado para nuevos contenidos:

- `course_id`: `english-a1`
- `unit_id`: `english-a1-unit-001`
- `mission_id`: `english-a1-m001`
- `section_id`: `english-a1-m001-reading`
- `exercise_id`: `english-a1-m001-reading-ex01`
- `item_id`: `english-a1-m001-reading-ex01-q01`

Para parejas o elementos que no sean preguntas se usa un `item_id` con el mismo patrón y un sufijo semántico estable, por ejemplo `-pair01`, `-word01` o `-gap01`. No reutilizar un ID para otro elemento. Los IDs antiguos se mantienen mediante una tabla de correspondencias durante la migración.

Cada entidad de contenido incluye `schema_version` y `content_version`. Cambios editoriales menores pueden incrementar `content_version`; cambios que alteren la respuesta esperada, la mecánica o el significado evaluado crean una nueva versión del ejercicio o elemento y conservan la anterior para el historial.

## 4. Contrato de datos recomendado

Ejemplo ilustrativo de una misión. El JSON es una referencia de diseño; no implica que el runtime actual ya lo consuma:

```json
{
  "schemaVersion": "1.0.0",
  "contentVersion": 1,
  "course": {
    "courseId": "english-a1",
    "language": "en-GB",
    "level": "A1"
  },
  "unit": {
    "unitId": "english-a1-unit-001"
  },
  "mission": {
    "missionId": "english-a1-m001",
    "title": "Who Am I?",
    "sections": [
      {
        "sectionId": "english-a1-m001-reading",
        "sectionKey": "reading",
        "exercises": [
          {
            "exerciseId": "english-a1-m001-reading-ex01",
            "type": "reading_comprehension",
            "content": {
              "passageId": "english-a1-m001-reading-passage01",
              "passage": "A complete reading passage goes here."
            },
            "items": [
              {
                "itemId": "english-a1-m001-reading-ex01-q01",
                "position": 1,
                "type": "single_choice",
                "prompt": "Example question",
                "options": ["A", "B", "C"],
                "answerKey": "A"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

El ejemplo abreviado no sustituye las diez preguntas requeridas. El validador de misión debe exigir los ocho apartados y sus cantidades exactas.

### Campos comunes mínimos

- Curso: `courseId`, `level`, `language`, `schemaVersion`.
- Unidad: `unitId`, `courseId`, `position`, `title`.
- Misión: `missionId`, `unitId`, `position`, `title`, `contentVersion`.
- Sección: `sectionId`, `missionId`, `sectionKey`, `position`.
- Ejercicio: `exerciseId`, `sectionId`, `exerciseType`, `position`, `evaluationType`.
- Elemento: `itemId`, `exerciseId`, `position`, `itemType`, `prompt`/contenido y configuración de evaluación.

Las respuestas correctas y rúbricas se almacenan en el contenido protegido del ejercicio; nunca se confía en una respuesta enviada por el cliente para decidir la puntuación.

## 5. Contrato de progreso del alumno

El modelo de progreso debe registrar, como mínimo:

- `student_id` (identidad del alumno autenticada por el servidor).
- `course_id`, `unit_id`, `mission_id`, `section_id`, `exercise_id`, `item_id`.
- `content_version` y versión del esquema.
- `attempt_id` único, número de intento, respuesta enviada y resultado.
- Puntuación obtenida y máxima, estado (started, answered, correct, incorrect, completed), duración y marcas de tiempo.
- Para audio: referencia segura al recurso, metadatos y resultado del análisis; evitar almacenar audio bruto si no es necesario y definir consentimiento/retención.
- Para Speaking: transcripción y feedback separados de la puntuación; dejar explícito que la coincidencia textual no es evaluación fonética.

Cada envío debe ser idempotente mediante un identificador de evento/intento. Los intentos anteriores no se sobrescriben. Los agregados de progreso por ejercicio, sección, misión y curso se calculan a partir de esos eventos o se mantienen como vistas/materializaciones reconciliables.

## 6. Reglas de evaluación

1. Cada ejercicio declara su tipo de evaluación: exacta, selección, dictado normalizado, rúbrica o análisis asistido.
2. Se guardan respuesta original, respuesta normalizada cuando aplique, resultado y criterio usado.
3. La puntuación de Speaking no se confunde con precisión fonética cuando el servicio solo devuelve transcripción o coincidencia.
4. Una respuesta correcta no debe perderse al reintentar; el historial conserva cada intento.
5. El servidor valida IDs, pertenencia a la misión, versión y respuesta. No acepta puntuaciones calculadas por el navegador como autoridad.

## 7. Auditoría inicial Pre-A1 vs A1

Primera inspección de código de referencia en `main` (incluye Pre-A1 misión 001, runtime Pre-A1 y runtime común A1). Es una auditoría inicial, no una certificación de las 100+ misiones.

| Sección | A1: referencia deseada | Pre-A1: diferencia observada en la muestra |
|---|---|---|
| Exploración | 10 parejas | 10 parejas; coincide |
| Practice | 20 retos | La misión 001 contiene una colección más extensa de retos y etiquetas/contadores heredados; debe normalizarse a 20 |
| Grammar | 10 preguntas | Usa un bloque extra con numeración heredada; verificar contenido y adaptar al contrato de 10 |
| Pronunciation | 10 tarjetas con significado, guía y audio | Tiene 10 tarjetas, pero añade además un bloque de 10 retos de discriminación auditiva que no forma parte del patrón A1 de tarjetas |
| Reading | Pasaje independiente + 10 preguntas | Hay pasaje + 10 preguntas; verificar el render y normalizar el bloque visual |
| Writing | 10 dictados de palabra/frase | La muestra Pre-A1 muestra 22 dictados y una interfaz de dictado letra a letra; debe migrarse a 10 y al flujo común acordado |
| Speaking | 10 prompts con grabación y análisis por elemento | La muestra Pre-A1 permite seleccionar palabras y grabar, pero no presenta una secuencia completa de 10 prompts |
| Listening | Audio + 10 huecos inline + banco movible de palabras | La muestra Pre-A1 usa 10 preguntas tipo test y transcripción diferida; debe migrarse al formato gap-fill de A1 |

### Consecuencia de la auditoría

Pre-A1 no debe conservar esas variantes. Se adaptará al contrato A1. También se revisará cada misión A1, porque compartir runtime no garantiza que todas las misiones tengan datos completos, IDs estables ni exactamente diez elementos válidos.

## 8. Arquitectura técnica objetivo

1. **Content schema:** definición versionada y validable del curso y sus misiones.
2. **Course runtime común:** renderiza las ocho secciones y mecánicas, independientemente del nivel.
3. **Adaptadores temporales:** convierten las estructuras actuales Pre-A1/A1 al nuevo contrato durante la transición.
4. **Progress API:** recibe intentos/eventos, valida referencias y registra al alumno autenticado.
5. **Database:** tablas normalizadas para cursos, unidades, misiones, secciones, ejercicios, elementos, versiones, intentos y respuestas.
6. **Reporting:** agregados de avance por alumno, curso y destreza.

No se debe duplicar el runtime por nivel. Las diferencias pedagógicas se expresan en datos y configuración, no en ramas de código.

## 9. Plan de migración y criterios de aceptación

1. Inventariar todas las misiones Pre-A1 y A1 y sus fuentes de datos.
2. Asignar IDs estables y crear un mapa de IDs heredados.
3. Convertir una misión representativa de Pre-A1 y una de A1 al nuevo esquema.
4. Implementar un validador automático que rechace misiones si falta una sección, la cantidad no es exacta, hay IDs duplicados o faltan datos de evaluación.
5. Unificar los ocho componentes interactivos en el runtime común.
6. Migrar el resto de misiones por lotes, preservando el contenido y el historial disponible.
7. Definir y probar la API y las tablas de progreso.
8. Ejecutar pruebas automatizadas y visuales en móvil y escritorio antes de integrar o desplegar.

Criterios de aceptación por misión:
- Las ocho secciones aparecen en el orden fijado.
- Cantidades exactas: 10 parejas, 20 retos, 10 ejercicios de Grammar, 10 tarjetas de Pronunciation, 1 pasaje + 10 preguntas, 10 dictados, 10 prompts Speaking y 1 audio + 10 huecos Listening.
- Cada ejercicio y elemento tiene un ID único, persistente y verificable.
- Todas las interacciones producen eventos de progreso vinculados a IDs.
- Se conservan los intentos y resultados anteriores durante la migración.
- El mismo runtime y los mismos componentes se usan en todos los niveles.

## 10. Esquema formal y validación

El contrato ejecutable se define en:
- `schemas/course-mission.schema.json` (JSON Schema Draft 2020-12).
- `scripts/validate_mission.py` (validador complementario en Python estándar).
- `docs/course-architecture/SCHEMA_AND_VALIDATOR_V1.md` (guía de uso y límites).

Toda nueva misión debe pasar ambas validaciones antes de incorporarse a un lote de migración. El JSON Schema valida estructura, tipos y cantidades; el script comprueba además unicidad de IDs, coherencia de referencias entre curso/unidad/misión y correspondencia exacta de los tokens `[[gap-01]]` a `[[gap-10]]` con las diez palabras distintas del banco y el contrato de interacción común.

## 11. Límites de esta versión

Este documento define el estándar; no significa que la migración, la API o las tablas estén implementadas. Antes de tocar el runtime se debe completar el inventario de todas las misiones y acordar el mapeo de datos heredados. No fusionar ni desplegar cambios sin autorización explícita.
