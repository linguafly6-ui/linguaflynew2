# Plan de consolidación de progreso y datos V1

Fecha: 2026-11-21  
Rama: `work/linguafly-academy-audit`

## 1. Objetivo y límites

Consolidar la identidad, la repetición espaciada, el progreso de ejercicios y el progreso de misiones canónicas en `COURSE_DB`, sin perder registros históricos ni afectar al blog.

Este documento es un plan técnico, no una autorización para ejecutar migraciones. En esta entrega no se ha ejecutado SQL, no se han movido datos, no se han cambiado bindings ni se ha desplegado.

## 2. Inventario confirmado

### Bases de datos y bindings

En `wrangler.jsonc`:

- `DB` apunta a la base `blog`; su uso debe quedar aislado al blog y a los servicios que ya dependan explícitamente de ella.
- `COURSE_DB` apunta a `linguafly-learning`; contiene identidad, sesiones y tablas del aprendizaje.
- El entorno de previews define bases separadas para blog y aprendizaje.

No se deben intercambiar los bindings ni apuntar las rutas de aprendizaje a `DB`.

### Repetición espaciada

- `migrations/001_lingua_features.sql` crea `sr_items` y `sr_reviews` en la base identificada en el propio encabezado como `DB` (blog).
- Las rutas `/api/repetition/add`, `/due` y `/review` leen y escriben esas tablas mediante `env.DB`.
- El propietario se representa como `student-<id>`, derivado de la sesión de alumno.
- La migración original no declara una clave foránea desde `user_id` hacia `students`, ya que las cuentas viven en otra base.
- Las rutas ya exigen sesión y la revisión filtra por `item_id` y `user_id`, pero los datos de aprendizaje siguen físicamente en la base del blog.

### Progreso de aprendizaje en COURSE_DB

El repositorio incluye migraciones para:

- `students`, `student_sessions` y `student_progress`.
- `exercise_units`, `exercise_items`, `exercise_progress` y `exercise_answers`.
- `learning_exercise_progress`, `learning_speaking_progress` y `learning_streaks`.
- `unified_progress` y tablas de speaking por nivel.

Las migraciones `learning_translation_progress.sql` y `unified_system.sql` ya importan parte del progreso heredado a tablas unificadas. No se debe volver a importar sin deduplicación: varias tablas son proyecciones o resúmenes de las mismas actividades.

### Misiones canónicas Pre-A1

- El árbol de la rama contiene 100 rutas `/api/canonical-missions/pre-a1/:mission/submit`.
- Se inspeccionaron las rutas 001, 002 y 100: requieren sesión, comprueban la respuesta contra una clave de respuestas en servidor y devuelven el resultado.
- Esas rutas de muestra no insertan intentos ni actualizan progreso en D1.
- Por tanto, no existe un historial persistido de esas evaluaciones que pueda importarse desde esos endpoints. El avance debe empezar a guardarse cuando se implemente el nuevo contrato.

### Suscripciones

- La tabla `students` ya conserva `plan`, `stripe_customer_id`, `subscription_status`, `current_period_end` y `billing_interval`.
- El webhook actual procesa checkout y eventos de suscripción, pero no registra de forma idempotente `event.id`.
- Las comprobaciones de acceso existentes leen principalmente `student.plan`. `getStudent` transforma algunos `pro_test` caducados, pero no deriva de forma general el acceso Premium del estado Stripe y del periodo vigente.
- No se debe cambiar esta política hasta definir el tratamiento de cancelaciones, pagos fallidos, periodos de gracia y cuentas administrativas/de prueba.

## 3. Hallazgos que requieren decisión antes del corte

1. La repetición espaciada está en la base del blog. Debe trasladarse a `COURSE_DB` para que los datos personales de aprendizaje queden junto a la identidad y el progreso.
2. La tabla de origen no tiene FK entre `sr_items.user_id` y `students.id`; hay que inventariar registros huérfanos y normalizar el vínculo sin inventar propietarios.
3. Las rutas canónicas antiguas no guardan intentos; no hay datos históricos de esas rutas que migrar.
4. `exercise_progress`, `exercise_answers`, `learning_exercise_progress` y `unified_progress` se solapan parcialmente. Se deben preservar las tablas históricas y definir qué tabla es fuente de verdad para cada tipo de actividad.
5. La política de acceso Premium puede quedarse obsoleta si un webhook se pierde o si llega fuera de orden. Se requiere resolver entitlements desde un estado comercial coherente, con reconciliación.
6. La revisión SM-2 actual actualiza el elemento y luego inserta la revisión en operaciones separadas. La futura versión debe hacer ambas cosas de forma atómica y validar el propietario en la misma operación lógica.

## 4. Esquema aditivo propuesto en COURSE_DB

Los nombres y campos siguientes son una propuesta de diseño, no SQL ejecutado.

### 4.1 Repetición espaciada

Crear en `COURSE_DB` las tablas equivalentes:

**`sr_items`**
- `id TEXT PRIMARY KEY` — conservar el ID actual para que los clientes no pierdan referencias.
- `student_id INTEGER NOT NULL REFERENCES students(id)` — propietario normalizado.
- `legacy_user_id TEXT` — conservar temporalmente el valor original `student-<id>` para auditoría.
- `word`, `translation`, `language`, `context_sentence`.
- `interval_days`, `ease_factor`, `repetitions`, `next_review_at`, `last_reviewed_at`, `total_reviews`, `correct_reviews`, `created_at`.

Índices: propietario y fecha de siguiente repaso; índice único/primario por `id`.

**`sr_reviews`**
- `id TEXT PRIMARY KEY` — conservar ID actual.
- `student_id INTEGER NOT NULL REFERENCES students(id)`.
- `item_id TEXT NOT NULL REFERENCES sr_items(id)`.
- `rating`, `was_correct`, `ai_generated_content`, `created_at`.

Índices: `student_id, created_at` y `item_id`.

El campo `legacy_user_id` es temporal y se puede retirar solo tras una fase posterior de retención aprobada. No copiar registros sin un alumno de destino verificable.

### 4.2 Intentos y progreso de misiones

Crear un modelo independiente de las unidades numéricas heredadas:

**`mission_attempts`**
- `id TEXT PRIMARY KEY` (UUID generado por servidor).
- `student_id INTEGER NOT NULL REFERENCES students(id)`.
- `mission_id TEXT NOT NULL` (por ejemplo `pre-a1-001` o `a1-001`).
- `content_version TEXT NOT NULL`.
- `section_key TEXT NOT NULL`, `item_id TEXT NOT NULL`.
- `request_id TEXT NOT NULL` (idempotencia de la petición).
- `is_correct INTEGER NOT NULL`, `score_delta INTEGER`, `created_at TEXT NOT NULL`.

Restricción única sugerida: `student_id, request_id`. Índices por alumno/misión/fecha y alumno/misión/sección.

No guardar por defecto la respuesta libre literal ni audio. Para actividades de escritura, almacenar el resultado de corrección y el mínimo dato necesario; una retención de texto deberá justificarse aparte.

**`mission_section_progress`**
- `student_id`, `mission_id`, `section_key` como clave compuesta.
- `status`, `attempt_count`, `correct_count`, `best_score`, `last_activity_at`, `completed_at`, `content_version`.

**`mission_progress`**
- `student_id`, `mission_id` como clave compuesta.
- `status` (`not_started`, `in_progress`, `completed`, `mastered`).
- `progress_percent`, `best_score`, `attempt_count`, `first_started_at`, `last_activity_at`, `completed_at`, `content_version`.

El servidor calcula estado, puntuación, XP y finalización. El cliente no envía `student_id), no elige su propio estado y no puede marcar una misión como completada sin satisfacer el contrato.

### 4.3 Idempotencia de webhooks Stripe

Crear `stripe_webhook_events` en `COURSE_DB`:

- `event_id TEXT PRIMARY KEY`.
- `event_type TEXT NOT NULL`, `stripe_created_at INTEGER`.
- `processing_status TEXT NOT NULL` (`processing`, `processed`, `failed`).
- `received_at TEXT NOT NULL`, `processed_at TEXT`, `last_error TEXT`.

No guardar el payload completo por defecto. El registro del evento y la actualización de la proyección local deben diseñarse para que los reintentos no dupliquen efectos. Si el motor/operación D1 no permite agrupar el control de idempotencia y los cambios de forma segura, usar un patrón de reclamación/reintento explícito y probar fallos parciales.

La tabla no resuelve por sí sola el orden de eventos. Guardar `stripe_created_at` y consultar la suscripción actual a Stripe durante reconciliaciones; no permitir que un evento antiguo revierta un estado más reciente.

## 5. Plan de migración por fases

### Fase A — Inventario de solo lectura

Antes de cualquier escritura:

1. Obtener snapshot/export de las bases origen y destino.
2. Consultar `COUNT(*)`, rango temporal, IDs duplicados, propietarios distintos y registros huérfanos de `sr_items` y `sr_reviews` en `DB`.
3. Comprobar que cada `user_id` tiene formato `student-<entero>` y que ese alumno existe en `COURSE_DB.students`.
4. Contar referencias de `sr_reviews.item_id` sin item correspondiente.
5. Inventariar consumidores y UI para conocer contratos de respuesta, paginación y orden.
6. Obtener recuentos y checksums por propietario para las tablas de progreso de `COURSE_DB`; detectar duplicados y discrepancias entre tablas fuente y resúmenes.
7. Documentar los resultados y acordar ventana de corte.

No exponer emails ni texto de palabras en los informes; usar IDs agregados y recuentos.

### Fase B — Migración aditiva en entorno aislado

1. Aplicar solo en una base de pruebas de aprendizaje la DDL nueva de repetición, progreso canónico y eventos Stripe.
2. Copiar `sr_items` preservando IDs y valores SM-2; convertir `student-123` a `student_id=123` solo tras verificar que el alumno existe.
3. Copiar `sr_reviews` preservando IDs y referencias; mapear el propietario con la misma regla.
4. No borrar ni alterar las tablas de origen en `DB`.
5. Ejecutar reconciliación: recuentos globales y por alumno, IDs ausentes, reviews huérfanas, fechas y valores SM-2 idénticos.
6. Probar alta, consulta, repaso correcto/incorrecto, usuario ajeno, reintentos y concurrencia con cuentas sintéticas.

### Fase C — Corte de repetición

1. Pausar temporalmente escrituras de repetición o activar un modo de mantenimiento breve.
2. Tomar snapshot final y copiar delta desde `DB` a `COURSE_DB`.
3. Verificar igualdad de recuentos y checksums.
4. Desplegar el código que lee y escribe exclusivamente `COURSE_DB`.
5. Verificar que ninguna ruta de repetición consulta `DB`.
6. Reabrir escrituras y comprobar métricas/errores.

No mantener doble escritura indefinida. La doble escritura sin una cola/outbox y reconciliación puede dejar divergencias silenciosas.

### Fase D — Progreso canónico

1. Implementar API de progreso que derive alumno de la sesión.
2. Validar `mission_id`, sección, `item_id` y `content_version` contra el contenido publicado en servidor.
3. Guardar intento idempotente y actualizar los resúmenes de sección/misión de forma transaccional o recuperable.
4. Conectar el renderer canónico y probar que cambiar de dispositivo conserva el avance.
5. Migrar datos heredados solo cuando haya una correspondencia inequívoca. No convertir `student_progress.unit_number` en `mission_id` por semejanza numérica.
6. Mantener las tablas antiguas durante el periodo de verificación.

### Fase E — Suscripciones y permisos

1. Definir una matriz formal de entitlements para Free, Premium, pruebas y administración.
2. Derivar acceso desde el estado Stripe y el periodo vigente; definir cancelación al final del periodo, impago y gracia, reactivación, reembolso y disputa.
3. Añadir registro idempotente de eventos y reconciliación programada/manual.
4. Probar eventos duplicados y fuera de orden en Stripe test mode.
5. Sustituir gradualmente las comprobaciones aisladas de `plan` por una función de servidor compartida.

## 6. Criterios de aceptación y rollback

No realizar corte hasta cumplir todos:

- Snapshot restaurable de origen y destino.
- 100% de los registros elegibles de repetición copiados o excluidos con razón auditada.
- Cero referencias huérfanas no explicadas.
- IDs de items y reviews conservados.
- Recuentos/checksums por propietario coincidentes.
- Aislamiento entre dos alumnos probado.
- Revisión SM-2 atómica, idempotente y con propietario.
- Los endpoints de repetición operan exclusivamente con `COURSE_DB`.
- Pruebas de progreso canónico: duplicación, reintentos, pérdida de red y cambio de dispositivo.
- Eventos Stripe duplicados/fuera de orden no revierten derechos ni duplican efectos.

Rollback:

- Mantener las tablas originales de `DB` intactas y en solo lectura durante la ventana de aceptación.
- Si falla la verificación antes de reabrir escrituras, volver al código anterior y descartar solo el staging de pruebas.
- Si ya hubo escrituras nuevas en `COURSE_DB`, no volver a leer silenciosamente la tabla antigua: primero exportar y reconciliar el delta hacia un destino acordado. Nunca borrar datos para “volver atrás”.
- La eliminación de tablas antiguas requiere una autorización posterior separada.

## 7. Riesgos de seguridad y producto adicionales

- Las rutas de login/registro no muestran límites de intentos en su implementación actual; se necesita rate limiting adecuado para autenticación, no reutilizar sin más el límite de IA.
- Las mutaciones autenticadas dependen de cookie HttpOnly/SameSite Lax; falta una política explícita de validación Origin/CSRF y pruebas de subdominios.
- El acceso Premium no debe confiar indefinidamente en `plan='pro'` si el periodo o estado Stripe han caducado.
- El webhook actual no cubre de forma completa `invoice.payment_failed`, `invoice.paid`, cancelación programada, reembolso/disputa ni reconciliación. Además, el orden de eventos debe tratarse explícitamente.
- La ruta `/api/learn/submit` debe seguir validando que el ejercicio pertenece a un curso/nivel autorizado para el alumno; el control por `unit_number` aislado no sustituye una política de curso.
- El cálculo de XP/racha en peticiones concurrentes necesita una operación atómica o deduplicación para evitar doble contabilización.
- No considerar completada una misión solo porque el endpoint de evaluación devuelve `correct`; debe existir un evento persistido y un criterio de finalización de servidor.

## 8. Acciones no realizadas

- No se ejecutó ninguna migración ni consulta a bases remotas.
- No se modificó `wrangler.jsonc`, bindings, IDs, secretos ni recursos Cloudflare.
- No se movió `sr_items` ni `sr_reviews`.
- No se creó DDL ejecutable para desplegar.
- No se alteró el blog ni el contenido de las 100 misiones.
- No se abrió PR ni se desplegó.

La siguiente autorización necesaria para ejecutar la migración será explícita y separada: primero aprobar el esquema aditivo en `COURSE_DB`, después autorizar su aplicación en un entorno de pruebas, y solo tras validar los datos acordar el corte de producción.
