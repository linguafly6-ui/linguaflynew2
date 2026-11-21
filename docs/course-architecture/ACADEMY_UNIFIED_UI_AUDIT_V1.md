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
