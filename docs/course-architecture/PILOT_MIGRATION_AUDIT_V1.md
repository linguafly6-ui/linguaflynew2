# Piloto de migración de misiones — informe de fuentes v1

Fecha: 2026-11-20  
Base de trabajo: contrato v1 de la rama `docs/master-course-template-v1`  
Fuentes de contenido: `main` (sin modificaciones)  
Estado: análisis de las cuatro fuentes piloto; todavía no es una conversión pedagógica aprobada.

## Objetivo y criterio de honestidad

Se inspeccionaron las cuatro páginas reales y sus fuentes de datos/runtime. Este paso identifica qué puede migrarse directamente y qué requiere completar o revisar contenido. **No se han inventado preguntas, pasajes, audios ni respuestas para rellenar huecos**. Una misión solo se considerará convertida cuando sus ocho secciones contengan el número exacto de elementos, el material fuente esté trazado y el JSON pase el esquema y el validador.

## Resultado por misión

| Piloto | Familia técnica | Datos fuente confirmados | Gaps / riesgos para la plantilla |
|---|---|---|---|
| Pre-A1 001 — Greetings and Introductions | HTML heredado, scripts embebidos | 10 parejas Vocabulary; 50 retos en `qs`; 10 ítems Grammar en `extraSections`; Writing con 22 dictados; Speaking se construye a partir de Pronunciation; hay paneles Reading y Listening | Practice debe reducirse editorialmente de 50 a 20, no truncarse sin criterio. Writing debe pasar de 22 a 10 conservando variedad y sentido. Speaking necesita 10 prompts completos con respuesta modelo. Verificar extracción de pasaje, diez preguntas Reading y diez huecos Listening. |
| Pre-A1 050 — The Weather Report | `LINGUAFLY_MISSION` + `mission-runtime.js` | 7 parejas Vocabulary; 7 tarjetas Pronunciation; 4 ejercicios Grammar; pasaje `readingText`; 10 preguntas Reading; guion `listeningScript`; 10 preguntas Listening | Faltan 3 parejas y 3 tarjetas Pronunciation para llegar a 10; faltan 6 ejercicios Grammar; Writing y Speaking no están declarados en el objeto fuente. Listening actual es quiz sobre guion, no gap-fill. Requiere creación/revisión editorial explícita de los elementos faltantes y adaptación de la interacción. |
| A1 001 — Who Am I? | HTML + runtime central `a1-first-10-sections.js` | 10 parejas Vocabulary; 50 retos Practice en la página; lección 1 centralizada con Grammar, foco/guía de pronunciación, Reading, Writing, Speaking y Listening | Practice debe normalizarse a 20. La factoría central crea ejercicios derivados del texto fuente: se debe exportar el resultado concreto y verificar los diez elementos por sección, no asumir que la definición textual equivale al contenido final. Pronunciation necesita diez tarjetas con traducción, guía y referencia de audio explícitas. |
| A1 021 — At the Café and Restaurant | HTML autónomo con datos embebidos | 10 parejas Vocabulary; 50 retos en `qs`; página base con navegación/estructura heredada de dos pestañas | La fuente inspeccionada no declara el contenido completo de Grammar, Pronunciation, Reading, Writing, Speaking ni Listening del contrato v1. No se debe reutilizar contenido de otra misión ni copiar el esquema de A1 001. Requiere localizar fuentes adicionales o aprobación editorial para completar esas secciones. |

## Trazabilidad de las fuentes

- `public/missions/pre-a1/001/index.html`
  - `data.words`, `data.qs`, `extraSections.grammar`, `extraSections.pronunciation`, `writingItems` y el generador de Speaking.
  - La implementación heredada contiene lógica específica de la página; no es directamente consumible por el nuevo runtime.
- `public/missions/pre-a1/050/index.html`
  - `window.LINGUAFLY_MISSION`: `words`, `pronunciation`, `grammar`, `readingText`, `readingQuestions`, `listeningScript`, `listeningQuestions`.
  - Runtime: `public/missions/pre-a1/mission-runtime.js`.
- `public/missions/a1/001/index.html`
  - `data.words` y `data.qs`; carga el runtime central.
  - Definición de la lección: clave `1` en `public/missions/a1/a1-first-10-sections.js`.
- `public/missions/a1/021/index.html`
  - `data.words` y `data.qs` embebidos; implementación autónoma.

## Política de conversión aplicada al piloto

1. Conservar los textos originales y sus traducciones como fuente trazable; no alterar el significado para alcanzar un recuento.
2. No convertir automáticamente las primeras 20 preguntas de un bloque de 50 en el Practice final. Seleccionar 20 retos variados y pedagógicamente representativos, con aprobación editorial.
3. No duplicar vocabulario para alcanzar diez parejas o diez tarjetas. Los elementos faltantes se marcan como pendientes hasta su redacción/revisión.
4. Mantener los pasajes Reading completos, con su propio `passageId`; las diez preguntas deben referirse a ese pasaje.
5. Convertir Listening a un único pasaje con diez tokens `{{gap:...}}`, diez palabras únicas en el banco y correspondencia exacta de cada hueco. El quiz de escucha heredado no se presenta como gap-fill.
6. Writing requiere diez dictados con respuesta esperada y audio británico verificable. Una referencia a TTS no se considera un archivo de audio existente.
7. Speaking requiere diez prompts y modelos. La transcripción se almacena separada de cualquier análisis fonético; no se afirmará precisión fonética si solo existe reconocimiento de voz.
8. Los IDs se asignan una vez con patrón estable `english-{level}-m{NNN}-{section}-ex01-{item}`; nunca dependen del texto visible ni se reciclan.

## Matriz de salida prevista

Cada conversión final producirá un JSON de misión independiente, con:
- `schemaVersion` y `contentVersion`;
- IDs de curso, unidad y misión;
- exactamente ocho secciones en el orden del contrato;
- cantidades exactas 10 / 20 / 10 / 10 / 10 / 10 / 10 / 10;
- IDs únicos para sección, ejercicio, elemento, pasaje y banco Listening;
- referencias a fuente heredada y notas de decisiones editoriales en un manifiesto separado (no dentro del JSON canónico si el esquema no las permite).

## Decisión de la fase piloto

**No se certifica todavía ninguna de las cuatro misiones como convertida.** Las cuatro fuentes demuestran las familias técnicas previstas, pero Pre-A1 050 y A1 021 carecen de contenido declarado suficiente para completar honestamente el contrato. Pre-A1 001 y A1 001 tienen más material recuperable, aunque aún necesitan normalización y verificación de cantidades por sección.

La siguiente entrega de implementación debe ser un lote de cuatro JSON canónicos solo después de resolver los gaps anteriores. En particular, A1 021 necesita localizar/confirmar sus datos faltantes; Pre-A1 050 necesita aprobación de los nuevos ítems; las otras dos requieren extracción exacta de los datos generados por sus runtimes. No conectar todavía estos JSON a páginas ni a la base de datos.

## Verificaciones realizadas y no realizadas

Realizado:
- lectura de las cuatro páginas fuente y de los runtimes/ficheros de datos asociados;
- extracción de claves y cantidades explícitas cuando estaban declaradas;
- contraste con las ocho secciones y cantidades de la plantilla v1.

Pendiente:
- exportar y validar los cuatro JSON finales contra JSON Schema Draft 2020-12 y `scripts/validate_mission.py`;
- comprobar audio real, pronunciación británica y respuestas/rúbricas;
- pruebas visuales e interactivas en navegador;
- integración con runtime, API o base de datos.

Este documento es un informe de viabilidad/trazabilidad, no una afirmación de que las misiones piloto ya cumplen v1.
