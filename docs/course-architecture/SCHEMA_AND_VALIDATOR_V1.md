# Contrato JSON y validador de misión v1.1.0

Este paquete formaliza el contrato de datos definido en MASTER_COURSE_TEMPLATE_V1.md. No convierte páginas ni modifica el runtime.

## Archivos
- schemas/course-mission.schema.json: JSON Schema Draft 2020-12 para estructura, tipos y cantidades.
- scripts/validate_mission.py: validador complementario en Python estándar, sin paquetes externos.

## Ejecución
Desde la raíz del repositorio:

    python3 scripts/validate_mission.py ruta/a/mission.json

Códigos de salida: 0 = válida; 1 = datos no conformes; 2 = error de uso, lectura o JSON. Para validación interoperable, aplicar también el JSON Schema con cualquier motor compatible con Draft 2020-12.

## Forma canónica
La raíz contiene schemaVersion, contentVersion, course, unit, mission y exactamente ocho secciones. Cada sección contiene un ejercicio con elementos ordenados.

| Sección | Tipo de ejercicio | Cantidad |
|---|---|---:|
| explore | vocabulary_pairs | 10 parejas |
| practice | mixed_practice | 20 retos |
| grammar | grammar | 10 |
| pronunciation | pronunciation_cards | 10 tarjetas |
| reading | reading_comprehension | 1 pasaje + 10 preguntas |
| writing | dictation | 10 dictados |
| speaking | speaking_prompts | 10 prompts |
| listening | listening_gap_fill | 10 huecos + banco de 10 palabras |

## Convenciones
- Todos los IDs son únicos dentro de la misión y no dependen del texto visible ni de la posición visual.
- position es explícita y empieza en 1 en cada colección.
- Los IDs del banco Listening son wordId; cada hueco referencia una palabra con expectedWordId. Los diez huecos usan las diez palabras una sola vez.
- transcriptTemplate contiene diez tokens {{gap:...}}.
- Pronunciation incluye palabra, traducción, guía aproximada y audio británico; la guía no se etiqueta como IPA.
- Writing incluye audio, respuesta esperada y evaluación.
- Speaking exige transcriptionSeparateFromPronunciation=true: la transcripción no se presenta como medición fonética.
- Las claves de respuesta y rúbricas completas deben permanecer protegidas en servidor; este esquema no autoriza exponerlas al navegador.

## Límites
El JSON Schema valida forma y tipos. El script añade unicidad de IDs y referencias del banco Listening. No comprueba que un audio responda, que sea realmente británico, la calidad pedagógica del pasaje ni el funcionamiento visual/interactivo en navegador. Eso requiere pruebas de assets y runtime posteriores.

Este contrato todavía no está conectado al runtime ni a la base de datos. La fase siguiente será convertir cuatro misiones piloto (Pre-A1 001/050 y A1 001/021), validar los datos y revisar su fidelidad antes de migrar lotes.
