# Linguafly Academy — auditoría y contrato de interfaz unificada v1

Estado: diagnóstico técnico y contrato de diseño propuesto para la rama `work/linguafly-academy-audit`.
Alcance: experiencia del alumno, catálogo de cursos y misiones Pre-A1–C2.
No autoriza borrar contenidos, migrar bases de datos, cambiar bindings ni desplegar.

## 1. Decisión de producto

La academia tendrá una sola identidad visual minimalista. Todos los niveles y cursos compartirán:
- el mismo marco de navegación;
- la misma jerarquía tipográfica, espaciado, colores y componentes;
- la misma plantilla de catálogo, unidad y misión;
- las mismas ocho secciones pedagógicas y contratos de interacción definidos en `MASTER_COURSE_TEMPLATE_V1.md`.

Solo cambiarán el contenido, el nivel, los ejemplos, la dificultad y los metadatos de cada curso. No se aceptan implementaciones visuales independientes por nivel o misión.

## 2. Diagnóstico comprobado en el repositorio

La rama auditada contiene 259 páginas `page.tsx` dentro de `app`; 216 pertenecen a `app/academia`. La experiencia educativa está repartida entre rutas Next.js y documentos HTML autónomos servidos desde `public/missions`.

Inventario observado:
- Pre-A1: 100 rutas de misión y 100 documentos HTML; además hay 100 archivos JSON en `content/missions/pre-a1`.
- A1: 100 rutas de misión y 110 documentos HTML. En las misiones 041–050 coexisten `index.html` y `index-v2.html`; de la 051 a la 100 aparece `index-v2.html`. Las rutas 041 y 042 inspeccionadas ya apuntan a `index-v2.html`.
- A2: 10 rutas de misión y 10 documentos HTML.
- Los catálogos y las páginas de misión están escritos como páginas Next independientes.
- Las páginas de misión envuelven los HTML con `iframe`. Por tanto, cada HTML lleva su propio CSS, estructura y comportamiento; los estilos globales del sitio no unifican el contenido del iframe.
- La misión A1 001 inspeccionada presenta dos pestañas (Exploración y Práctica). La misión A1 041 inspeccionada también presenta dos. Esto no coincide con el estándar pedagógico de ocho secciones.
- Existe `docs/course-architecture/MASTER_COURSE_TEMPLATE_V1.md`, que ya define un estándar funcional común de ocho secciones. El documento indica expresamente que su ejemplo JSON es una referencia y no demuestra que el runtime actual lo consuma.
- `PREA1_001_CANONICAL_UI_ADAPTATION_V1.md` documenta una adaptación Pre-A1 de ocho secciones, pero no acredita que todos los HTML existentes hayan sido migrados a ese contrato.
- La cabecera y navegación globales están en `app/layout.tsx` y `components/NavigationBar.tsx`. El blog usa `lib/blog.ts` y el binding D1 `DB`; el aprendizaje tiene un binding separado `COURSE_DB`.

Conclusión: la mezcla visual no se debe principalmente a los nombres de los niveles. La causa estructural es que el contenido se entrega como páginas HTML autónomas con CSS y runtimes propios, y que existen variantes de misión heredadas y nuevas.

## 3. Contrato visual minimalista

### Principios
1. Fondo neutro claro; superficies blancas; texto principal oscuro y texto secundario gris.
2. Un solo color de marca para acciones y estados activos. El color no cambia según el nivel.
3. Sin gradientes decorativos por curso, paletas arcoíris, sombras pesadas ni tarjetas con estilos incompatibles.
4. Bordes finos, radios consistentes y sombras discretas solo para separar superficies.
5. Una escala tipográfica y una escala de espaciado compartidas.
6. Iconos de una sola familia y grosor visual.
7. Estados de interacción coherentes: hover, foco visible, seleccionado, correcto, incorrecto, bloqueado y completado.
8. Diseño responsive desde móvil; accesibilidad de teclado y contraste.

### Tokens iniciales propuestos
- Fondo de aplicación: `#F8FAFC`
- Superficie: `#FFFFFF`
- Texto principal: `#0F172A`
- Texto secundario: `#64748B`
- Bordes: `#E2E8F0`
- Marca/acción: `#2563EB`
- Éxito: `#16A34A`
- Error: `#DC2626`
- Radio de tarjeta: 16 px
- Radio de control: 10 px
- Ancho de lectura: 760 px; ancho de panel: 1120 px

Estos tokens son una base técnica de la línea minimalista y deben quedar centralizados; no se deben repetir valores visuales dentro de cada curso.

## 4. Arquitectura objetivo

Separar tres capas:

### A. Aplicación y navegación
Un único `AcademyLayout` para la zona de alumno. Contendrá navegación, contenido principal, breadcrumb, estado de sesión y responsive. El blog seguirá siendo una sección independiente y no se debe romper su layout ni su conexión D1.

### B. Plantillas y componentes
Componentes reutilizables, sin datos específicos de un nivel:
- `AcademyShell`: marco y navegación.
- `CourseCatalogTemplate`: catálogo de cursos.
- `UnitOverviewTemplate`: unidades y misiones.
- `MissionTemplate`: cabecera, progreso y navegación de secciones.
- `ExerciseRenderer`: renderizado según el tipo de actividad.
- componentes de vocabulario, preguntas, lectura, dictado, speaking y listening.
- `ProgressSummary`: avance y resultados.

### C. Contenido
Datos pedagógicos independientes de la interfaz. Cada curso, unidad, misión, sección, ejercicio e ítem conservará identificadores estables. Los títulos y las respuestas no deben generar IDs en tiempo de ejecución. El contenido se valida con el esquema antes de publicarse.

## 5. Contrato funcional de misión

La misión estándar conserva el orden y las cantidades del documento maestro:
1. Exploración: 10 parejas y explicación gramatical.
2. Práctica: 20 retos.
3. Gramática: 10 ejercicios.
4. Pronunciación: 10 elementos con audio en-GB y guía aproximada claramente diferenciada de IPA.
5. Reading: un pasaje y 10 preguntas.
6. Writing: 10 dictados.
7. Speaking: 10 tareas; distinguir transcripción y feedback de una evaluación fonética real.
8. Listening: audio/pasaje, 10 huecos y banco de 10 palabras.

El renderer debe mostrar las ocho secciones en el mismo orden para todos los niveles. Una misión que no cumpla las cantidades debe marcarse como incompleta; no se deben ocultar secciones para hacerla parecer equivalente.

## 6. Migración sin pérdida de contenido

1. Inventariar y validar cada fuente de contenido antes de tocarla.
2. Elegir una misión representativa completa como piloto; no elegir una misión solo por su apariencia.
3. Extraer el contenido a un formato canónico validado y mapear los IDs antiguos.
4. Implementar el renderer común y migrar el piloto.
5. Comparar contenido, respuestas, audios, navegación y progreso entre la versión anterior y la nueva.
6. Migrar por lotes y niveles, conservando rutas públicas o creando redirecciones verificadas.
7. Solo después de verificar referencias, retirar HTML duplicados y runtimes antiguos.

No se deben borrar `index.html`, `index-v2.html`, JSON, runtimes, ejercicios ni assets hasta demostrar que ninguna ruta, script, API o flujo los utiliza.

## 7. Límites y protecciones

- Mantener `main` intacta y trabajar solo en la rama de auditoría.
- No desplegar ni ejecutar `wrangler deploy`.
- No modificar `wrangler.jsonc`, bindings, dominios, secretos, migraciones o recursos Cloudflare en esta tarea.
- No cambiar `app/layout.tsx`, `app/globals.css` ni `components/NavigationBar.tsx` sin coordinación del responsable, tal como exige `AGENTS.md`.
- Mantener blog y D1 `DB` separados del aprendizaje y D1 `COURSE_DB`.
- No quitar dependencias de `package.json` hasta revisar todos sus usos.
- No declarar una migración terminada ni una prueba aprobada sin ejecutarla y verificarla.

## 8. Siguiente implementación propuesta

El primer entregable de código debe ser un piloto aislado del shell y la plantilla de misión, con tokens centralizados y datos de una misión real. Debe poder revisarse en Cloudflare Preview sin tocar producción. Tras aprobar visual y funcionalmente el piloto, se integrará con el layout compartido y se migrarán los niveles de forma incremental.


## 9. Piloto visual A1 · Misión 001

Implementado en esta rama como primera prueba aislada:
- Ruta de revisión: `/academia/a1/001-canonical`.
- Componente compartido: `components/academy/CanonicalMissionFrame.tsx`.
- La vista reutiliza el HTML y el runtime existentes de A1 misión 001; no modifica el contenido original ni la ruta pública heredada.
- El componente aplica una capa de estilos minimalistas al documento de la misión después de cargarlo, normalizando fondo, tipografía, navegación, botones, paneles, tarjetas, campos y estados de progreso.
- La página de demostración `/academia/preview` enlaza al piloto.

### Qué valida y qué no valida

Valida una dirección de presentación común sobre el contenido y runtime reales de la misión A1 001. Es un paso de transición, no el renderer canónico final: el contenido sigue ejecutándose dentro de un iframe y conserva el runtime heredado. No se ha migrado todavía a un esquema de contenido tipado ni se ha implementado persistencia de progreso.

No se han ejecutado build, pruebas automatizadas, pruebas de navegador ni validación de audio/micrófono en esta entrega. Antes de ampliar el patrón a otras misiones hay que revisar la ruta en un Preview, verificar que las ocho secciones se muestran, comprobar las interacciones y comparar respuestas/contenido con la versión original.

La siguiente iteración, tras validar el piloto, debe extraer los datos de misión a un formato canónico y reemplazar progresivamente los iframes por un renderer React compartido. No se deben convertir los estilos inyectados en una solución permanente ni duplicar esta técnica por misión.


### Verificación de estructura del piloto

La misión A1 001 carga `public/missions/a1/a1-first-10-sections.js`. Ese runtime conserva Exploración y Práctica del HTML base y añade dinámicamente Gramática, Pronunciación, Reading, Writing, Speaking y Listening: en conjunto, aparecen las ocho secciones. La inspección del código confirma también una diferencia importante frente al estándar maestro: la Práctica heredada está configurada para 50 retos, no 20. La sección Reading inspeccionada usa tres consignas abiertas genéricas, no diez preguntas autocorregibles. Por tanto, el piloto permite revisar la coherencia visual de las ocho áreas, pero no certifica todavía la conformidad pedagógica de la misión. Estas diferencias deben resolverse con revisión del contenido antes de convertirla en plantilla de producción.


## 10. Iteración funcional · renderer canónico A1 001

La siguiente iteración sustituye el iframe en la ruta de revisión por un renderer React compartido y un archivo de contenido independiente:

- Datos: `content/canonical-missions/a1/001.json`, migrados al contrato existente `schemas/course-mission.schema.json` (Draft 2020-12, versión `1.2.0`).
- Renderer: `components/academy/CanonicalMission.tsx`.
- Ruta: `app/academia/a1/001-canonical/page.tsx`.
- El renderer consume el esquema JSON de la misión y genera la navegación de las ocho secciones a partir de los datos; no usa el HTML heredado como interfaz.
- El HTML anterior, sus scripts y sus assets siguen intactos y disponibles para comparación y reversión.

### Contenido migrado y recuentos comprobados

| Sección | Contenido | Elementos |
|---|---|---:|
| Exploración | 10 parejas inglés-español + explicación de TO BE | 10 |
| Practice | 10 términos + 10 frases/preguntas de traducción | 20 |
| Grammar | 10 ejercicios de am/is/are | 10 |
| Pronunciation | 10 palabras, traducción y guía aproximada | 10 |
| Reading | Pasaje de Laura + preguntas de comprensión | 10 |
| Writing | 6 palabras + 4 frases para dictado | 10 |
| Speaking | 10 tareas con modelo de referencia | 10 |
| Listening | Texto de Daniel + 10 huecos y banco de 10 palabras | 10 |

Se ejecutó una comprobación estructural sobre el JSON: las ocho secciones están en el orden requerido y tienen los recuentos exactos (90 elementos en total), los IDs de los elementos son únicos, los ejercicios autocorregibles tienen respuesta y las preguntas de selección incluyen al menos tres opciones con la respuesta correcta. También se comprobaron los campos obligatorios del contrato v1.2.0 y las referencias de los diez huecos a las diez palabras del banco. Es una verificación estructural realizada sobre el contenido recuperado; no equivale a ejecutar un motor JSON Schema ni a probar el renderer en navegador.

### Estado funcional y limitaciones conocidas

- Exploración permite emparejar cada palabra con su traducción mediante selector.
- Practice, Grammar y Reading son preguntas autocorregibles con feedback.
- Pronunciation y los dictados usan la síntesis de voz del navegador configurada en inglés británico (`en-GB`); la disponibilidad y calidad de voces dependen del dispositivo.
- Listening presenta los diez huecos y un banco de diez palabras únicas reutilizable; se puede retirar una palabra de un hueco y colocarla en otro antes de comprobar.
- Speaking presenta diez prompts y modelos de referencia reproducibles; permite grabar y reproducir audio localmente en el navegador. El audio no se envía al servidor y no se genera análisis automático ni nota fonética.
- El progreso y la puntuación son estado local de la sesión: no se guardan en cuenta, D1 ni `COURSE_DB`. Las grabaciones de Speaking también permanecen localmente en la página y no se suben.
- No se afirma que la síntesis de voz sea un audio humano grabado ni que el renderer evalúe fonética.
- El contenido del nuevo JSON se ha adaptado a partir de la misión A1 001 y de su runtime; las nuevas diez preguntas de Grammar y parte de las actividades se han normalizado para cumplir el contrato de cantidades. Deben pasar revisión pedagógica antes de considerarse contenido de producción.

### Pruebas pendientes antes de integrar

No se ha ejecutado build, TypeScript, lint, pruebas unitarias, navegador, móvil, accesibilidad, prueba real de micrófono ni despliegue Preview. El permiso y la grabación se implementaron, pero aún requieren comprobación en navegador. La ruta continúa siendo de revisión y no está enlazada como ruta de curso en producción. No se han tocado bases de datos, bindings, configuración Cloudflare, blog ni la rama `main`.


### Contrato de contenido y estado de validación

El contenido piloto ya no usa el primer borrador de esquema interno. Se ha ajustado al formato del repositorio `schemas/course-mission.schema.json`, versión `1.2.0`: `course`, `unit`, `mission` y las ocho `sections` en la raíz, con `exercise`, tipos de ejercicio, IDs y referencias explícitas. El renderer React se ha actualizado para consumir esa estructura.

La revisión estructural comprobó los campos y cantidades exigidos para cada tipo de sección, pero no se ejecutó un validador JSON Schema Draft 2020-12. Tampoco se encontró `scripts/validate_mission.py` en esta rama; la documentación maestra lo menciona como pieza prevista, pero no debe darse por implementado. La creación de ese validador y su ejecución quedan pendientes.


### Resultado de CI del piloto (21-11-2026)

Se añadió `.github/workflows/academy-pilot-check.yml`, limitado a la rama de auditoría y sin pasos de despliegue. La ejecución de GitHub Actions terminó con conclusión `success`:

- `npm ci`: correcto.
- Validación JSON Schema Draft 2020-12 de `content/canonical-missions/a1/001.json`: correcta.
- `npx tsc --noEmit`: correcto.
- `npm run build`: correcto.

Ejecución: https://github.com/linguafly6-ui/linguaflynew2/actions/runs/44920502362

Esto confirma que el contenido cumple el esquema y que la aplicación completa pasa TypeScript y el build de Next.js en CI. No sustituye las pruebas manuales de interacción en navegador, responsive, audio y permisos de micrófono. No se ejecutó `opennextjs-cloudflare deploy`, ni se publicó un Preview.
