# Auditoría de misiones Pre-A1 y A1

Fecha de inspección: 2026-11-20  
Rama de referencia: `main`  
Repositorio: `linguafly6-ui/linguaflynew2`  
Documento relacionado: `MASTER_COURSE_TEMPLATE_V1.md`

## 1. Alcance y método

Se inspeccionó el árbol Git completo de `public/missions/pre-a1` y `public/missions/a1`, las fuentes de runtime principales y páginas representativas de los distintos tramos. El inventario confirma 100 directorios numerados por nivel (200 misiones en total).

También se revisaron los PRs abiertos que pretenden completar secciones A1 21–100 y el panel Reading A1 1–20.

**Límite de esta auditoría:** es un inventario estructural de carpetas, rutas, runtimes y muestras representativas. No se ha ejecutado un crawler de navegador ni se ha validado automáticamente cada respuesta, audio, interacción y cantidad de cada una de las 200 misiones. Por tanto, no se certifica aún la conformidad individual de todas ellas.

## 2. Inventario estructural confirmado

| Nivel | Rango | Archivos / estrategia observada en main | Observaciones |
|---|---|---|---|
| Pre-A1 | 001–040 | Páginas HTML independientes; hay runtimes de Writing compartidos por tramos | Estructura heredada y variaciones entre páginas |
| Pre-A1 | 041–099 | HTML ligero con `window.LINGUAFLY_MISSION` + `mission-runtime.js` | Runtime común Pre-A1; no equivale al contrato A1 |
| Pre-A1 | 100 | Página independiente especial | Solo cuatro pestañas: Exploración, Práctica, Pronunciación y Speaking |
| A1 | 001–020 | HTML que carga `a1-first-10-sections.js` | Datos centralizados para las primeras 20 misiones |
| A1 | 021–040 | HTML independiente con lógica y datos embebidos | Runtime distinto; práctica heredada de 50 retos |
| A1 | 041–050 | En main existen `index.html` e `index-v2.html` | Duplicidad de rutas/versiones; páginas heredadas independientes |
| A1 | 051–100 | En main existen páginas `index-v2.html` | Páginas heredadas independientes; la ruta `index.html` aparece en PRs de armonización abiertos |

Árboles inspeccionados:
- Pre-A1: 103 blobs (100 páginas de misión + `mission-runtime.js` + dos runtimes de Writing).
- A1: 111 blobs (100 páginas numeradas, incluyendo variantes duplicadas 041–050, + `a1-first-10-sections.js`).

## 3. Diferencias funcionales encontradas

### Pre-A1

1. `mission-runtime.js` genera seis secciones principales (Exploración, Práctica, Gramática, Pronunciación, Reading y Listening) y añade Speaking dinámicamente.
2. El Listening de ese runtime presenta diez preguntas tipo test sobre un guion, con transcripción diferida. No es el gap-fill inline de A1.
3. El runtime tiene Speaking basado en selección/práctica de palabras; no presenta el contrato de diez prompts independientes de A1.
4. La plantilla de runtime no incluye una sección Writing común; Writing aparece resuelto en páginas antiguas mediante otros componentes/scripts.
5. Los datos Pre-A1 usan `words`, `extraVocabulary`, `pronunciation`, `grammar`, `readingText`, `readingQuestions`, `listeningScript` y `listeningQuestions`, no el modelo de datos A1.
6. La misión 050 es un ejemplo de la familia data-driven: carga el runtime común y aporta un objeto `LINGUAFLY_MISSION`. En la muestra su lista de vocabulario contiene siete elementos, por lo que no se puede asumir que todas las misiones ya tengan diez parejas.
7. La misión 001 contiene una interfaz propia con Reading y Listening tipo quiz, Speaking de grabación y un Writing de 22 dictados letra a letra.
8. La misión 100 es una excepción de cuatro secciones y muestra un contador de 50 retos de práctica. No cumple la plantilla de ocho secciones.

### A1

1. `a1-first-10-sections.js` centraliza las primeras 20 lecciones (claves 1–20), no las 100 misiones.
2. Ese runtime construye Grammar, Reading, Writing y Speaking con factorías de tareas de diez elementos y construye Listening como un pasaje con diez huecos y banco de palabras.
3. El código A1 usa estructuras de datos distintas (`lessons`, conjuntos de preguntas, cues de pronunciación y objetos generados para tareas). No declara aún IDs persistentes `courseId`, `missionId`, `sectionId`, `exerciseId` o `itemId`.
4. La misión A1 001 carga el runtime central; la muestra A1 021 es una página autónoma con práctica heredada de 50 retos y solo dos pestañas iniciales en el HTML base.
5. A1 041 tiene dos archivos de página (`index.html` e `index-v2.html`) en main. La variante 051 observada usa `index-v2.html`; ambas familias siguen siendo páginas HTML independientes en main.
6. Las misiones A1 21–100 no están todas integradas en el runtime común de las primeras 20 en main. Los PRs abiertos proponen añadir páginas `index.html`, ficheros de datos por tramos y reutilizar `a1-first-10-sections.js`.
7. El Listening A1 mejorado sí implementa la interacción deseada: diez huecos dentro del texto, diez palabras en banco, asignación/movimiento/sustitución, corrección y soluciones.
8. Speaking distingue explícitamente transcripción y coincidencia textual de una evaluación fonética; esa precisión debe conservarse.

## 4. Estado de cambios pendientes en GitHub

En la inspección, los siguientes PRs estaban abiertos y sin fusionar:

| PR | Alcance declarado |
|---:|---|
| #58 | A1 misiones 61–70 |
| #59 | A1 misiones 71–80 |
| #60 | A1 misiones 51–60 |
| #61 | A1 misiones 41–50 |
| #62 | A1 misiones 21–30 |
| #63 | A1 misiones 31–40 |
| #64 | A1 misiones 81–90 |
| #65 | A1 misiones 91–100 |
| #66 | Panel independiente de Reading A1 1–20 |

Los PRs de tramos añaden páginas y datos por grupo y modifican el runtime compartido. No deben considerarse parte de `main` ni desplegados hasta su integración. Además, completar ocho apartados visuales no basta para satisfacer la plantilla maestra: también hacen falta IDs persistentes, cantidades exactas, versionado y un contrato de progreso.

## 5. Diagnóstico

La divergencia no es solo visual. Hoy existen al menos cuatro familias de implementación:

1. Pre-A1 HTML heredado (001–040).
2. Pre-A1 data-driven con `LINGUAFLY_MISSION` y runtime Pre-A1 (041–099), más una excepción especial (100).
3. A1 centralizado para las primeras 20 misiones.
4. A1 HTML autónomo para las misiones posteriores, con duplicidad de páginas y PRs de migración en curso.

No conviene crear todavía las tablas definitivas de progreso basándose directamente en estos formatos. Ninguno proporciona de forma uniforme la jerarquía completa de IDs estables y versiones que necesita la base de datos.

## 6. Orden de trabajo recomendado

### Fase A — Congelar el contrato (sin migrar páginas)
- Mantener las ocho secciones y cantidades exactas de la plantilla maestra.
- Definir un esquema formal (JSON Schema o validador equivalente).
- Definir IDs permanentes y una tabla de correspondencias para IDs/rutas antiguas.
- Definir los tipos de evaluación y qué datos de intento se guardan.

### Fase B — Prototipos de conversión
- Convertir una misión Pre-A1 data-driven (por ejemplo 050) al nuevo esquema.
- Convertir una misión Pre-A1 heredada (por ejemplo 001) al mismo esquema.
- Convertir una misión A1 centralizada (001) y una A1 heredada (021).
- Comparar las cuatro conversiones: los cuatro documentos deben validar contra el mismo esquema.

### Fase C — Runtime único
- Implementar un runtime que consuma exclusivamente el nuevo contrato.
- Migrar primero una misión piloto por familia.
- Asegurar que Reading muestra el pasaje completo; Listening usa gap-fill; Speaking conserva diez prompts y feedback honesto; Pronunciation conserva diez tarjetas; Writing diez dictados.
- Retirar los runtimes heredados solo cuando las rutas nuevas y el progreso estén verificados.

### Fase D — Progreso y base de datos
- Diseñar API y tablas a partir de IDs/versiones ya estables.
- Mantener intentos históricos y compatibilidad con los IDs antiguos.
- Probar idempotencia, reintentos, restauración y agregados de progreso.

## 7. Criterios de cierre de auditoría

La auditoría podrá declararse completa cuando un validador recorra automáticamente las 200 misiones y emita por misión:
- Secciones encontradas y orden.
- Número real de elementos por sección.
- Presencia de pasaje, audio, banco de palabras y respuestas esperadas.
- Tipo de interacción y tipo de evaluación.
- Duplicados de IDs y ausencia de referencias.
- Versión de contenido y fuente/runtime que sirve la página.

Hasta disponer de ese informe automatizado, el estado de las misiones individuales es **pendiente de validación**, aunque su familia técnica esté identificada.

## 8. Seguridad de cambios

Esta auditoría es documental. No modifica contenido ni runtime de producción, no toca la base de datos, no fusiona PRs ni despliega cambios.
