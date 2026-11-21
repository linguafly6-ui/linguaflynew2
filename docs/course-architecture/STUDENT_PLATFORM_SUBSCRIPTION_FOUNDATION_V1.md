# Linguafly — base de usuarios, progreso y suscripciones v1

Estado: diseño técnico auditado; no es una migración ni una activación de pagos.
Rama de trabajo: `work/linguafly-academy-audit`.
Alcance: identidad de alumno, sesiones, progreso, permisos de contenido y ciclo de vida de suscripciones.
Protección: no modificar blog, D1 `DB`, D1 `COURSE_DB`, migraciones, bindings, secretos, Stripe ni despliegues dentro de esta fase documental.

## 1. Decisión de arquitectura

Linguafly ya contiene piezas reales de cuentas, sesiones, progreso, repetición espaciada y Stripe. No conviene crear un segundo sistema paralelo. La estrategia es consolidar lo existente alrededor de cuatro conceptos:

1. **Identidad:** una cuenta de alumno con un identificador estable.
2. **Aprendizaje:** intentos y resultados asociados siempre al alumno autenticado.
3. **Acceso:** permisos derivados del estado efectivo de la suscripción, no de comprobaciones aisladas de `plan` en cada endpoint.
4. **Facturación:** Stripe es la fuente de verdad de los cobros; Linguafly mantiene una proyección local sincronizada mediante webhooks verificados.

La capa pedagógica no debe depender del proveedor de pagos. El catálogo de cursos y las misiones no cambian cuando cambia el plan comercial.

## 2. Inventario comprobado en la rama

### Identidad y sesiones existentes

- `migrations/d1/students_subscriptions.sql` crea `students`, `student_progress` y `student_sessions`.
- `lib/student-auth.ts` genera contraseñas PBKDF2-SHA256, guarda hash de tokens de sesión y utiliza la cookie HttpOnly `lf_student_session`.
- `app/api/auth/register`, `login`, `logout`, `me` y `change-password` ya implementan operaciones de cuenta.
- El alta crea una contraseña temporal y la envía por email.
- `admin_student_metadata` guarda metadatos administrativos; no debe convertirse en el perfil general del alumno.

### Progreso existente

Hay varios almacenes históricos y activos en `COURSE_DB`:

- `student_progress`: progreso antiguo por unidad.
- `unified_progress`: resumen por alumno, tipo de curso y unidad.
- `learning_exercise_progress`: estado por ejercicio.
- `learning_speaking_progress` y tablas específicas por nivel.
- `learning_streaks`: racha y XP.
- `sr_items` y `sr_reviews`: repetición espaciada.
- `exercise_progress` y otras tablas heredadas que todavía son consultadas por rutas existentes.

Las rutas `/api/learn/next`, `/api/learn/submit`, `/api/learn/stats` y `/api/progress/all` ya ofrecen parte del flujo de aprendizaje. El renderer canónico de misión A1 001, en cambio, mantiene actualmente el progreso en estado local del navegador y no lo persiste.

### Suscripción existente

- `students` ya contiene `plan`, `stripe_customer_id`, `subscription_status`, `current_period_end` y `billing_interval`.
- Existen `/api/billing/checkout`, `/portal` y `/webhook`.
- Checkout crea una sesión de Stripe en modo suscripción.
- El webhook actualiza el plan del alumno a partir de eventos de Stripe.
- La página `/mi-cuenta` muestra plan y estado.

**Conclusión:** no se parte de cero. El trabajo real es una consolidación cuidadosa, cerrar huecos de seguridad y conectar el renderer canónico al progreso persistente.

## 3. Hallazgos y riesgos que deben resolverse antes de abrir la suscripción

### Prioridad crítica

1. **Fallback entre bases de datos:** algunas rutas de aprendizaje usan `COURSE_DB || DB`. `DB` está reservado al blog. El aprendizaje debe fallar de forma cerrada si `COURSE_DB` no está disponible; nunca debe escribir ni consultar datos de alumnos en la base del blog como alternativa.
2. **Permisos dispersos:** distintas rutas comprueban `student.plan === "pro"` o `pro_test` de forma independiente. Debe existir una función de servidor única para resolver permisos y aplicarla a todas las rutas que entregan contenido o aceptan respuestas.
3. **Webhook no idempotente:** el handler actual procesa eventos Stripe sin guardar un registro único por `event.id`. Reintentos pueden repetir efectos. Debe añadirse una bandeja de eventos procesados y una operación transaccional/idempotente.
4. **Ciclo de vida incompleto:** antes de cobrar, cubrir eventos de factura fallida, periodo de gracia, cancelación al final del periodo, reactivación, reembolso/disputa cuando proceda y sincronización de estado. No se debe degradar una cuenta solo por recibir eventos fuera de orden.
5. **Estado de suscripción:** `plan` no debe ser la única fuente para autorizar. La decisión debe considerar estado verificado, periodo de acceso, cancelación programada y derechos de prueba/administración.

### Prioridad alta

- Añadir límites de intentos y protección contra abuso a registro/login y operaciones de escritura.
- Invalidar sesiones al cambiar contraseña y ofrecer revocación de todas las sesiones.
- Mantener tokens de sesión aleatorios, almacenados como hash y cookies HttpOnly, Secure en producción y SameSite apropiado.
- Revisar CSRF/origen para mutaciones autenticadas con cookie.
- Evitar devolver identificadores o datos internos innecesarios desde `/api/auth/me`.
- En el endpoint de checkout, el ID del alumno debe proceder de la sesión verificada; no se debe confiar en un ID enviado por el cliente.
- Asociar cada item de repetición espaciada al propietario y comprobarlo en cada lectura/escritura. La función actual `processReview` busca por `item_id` sin exigir el usuario propietario.
- Unificar los identificadores de progreso de misión canónica con los IDs estables del contenido, sin reciclar números de unidad ambiguos.
- No almacenar audio de speaking en el servidor sin consentimiento, retención y política de privacidad definidos.

## 4. Modelo lógico objetivo

Este modelo describe responsabilidades. No autoriza crear tablas todavía.

| Concepto | Identificador | Responsabilidad |
|---|---|---|
| Alumno | `student_id` actual | Identidad estable, email y preferencias |
| Sesión | token aleatorio + hash | Autenticación y expiración |
| Suscripción | ID Stripe | Estado comercial y periodos |
| Derecho de acceso | alumno + feature/course | Resolver qué puede abrir |
| Misión | `missionId` canónico | Contenido estable e independiente del alumno |
| Intento | ID único | Una respuesta o interacción realizada |
| Progreso de misión | alumno + `missionId` | Estado, puntuación, intentos y fechas |
| Dominio de habilidad | alumno + habilidad + nivel | Estimación de vocabulario, gramática, listening, reading, writing y speaking |
| Repaso | alumno + item de contenido | Próxima fecha y estado de recuperación |

### Principios de datos

- Mantener el entero `students.id` como identidad principal mientras existan las tablas heredadas.
- No usar email como clave foránea.
- No guardar información de tarjetas; Stripe gestiona los medios de pago.
- Registrar intentos de manera auditable y derivar resúmenes de progreso.
- Separar progreso académico de XP, rachas y gamificación.
- No sobrescribir un mejor resultado con uno peor; conservar el historial de intentos.
- Los datos de progreso deben ser privados por defecto y filtrados siempre por el alumno autenticado.

## 5. Contrato de progreso para misiones canónicas

La unidad mínima del renderer será el `missionId` estable del JSON canónico, por ejemplo `a1-001` o `pre-a1-001`. El progreso no debe depender del número ordinal de una unidad en otro curso.

Estados de misión:

- `not_started`: no existe actividad registrada.
- `in_progress`: al menos un intento guardado.
- `completed`: el alumno satisface el criterio de finalización.
- `mastered`: además de completar, demuestra retención en repasos posteriores.

Cada intento debería registrar como mínimo:

- `student_id` derivado de la sesión;
- `mission_id`, `section_key` e `item_id`;
- tipo de interacción;
- respuesta normalizada o resultado seguro (evitar guardar texto sensible innecesario);
- corrección, puntuación y feedback;
- duración si se mide con fiabilidad;
- fecha del servidor y versión del contenido.

No guardar cada pulsación. Guardar eventos de respuesta/comprobación y un resumen por misión/sección. El cliente nunca decide su propio `student_id`, XP definitivo ni estado Premium.

### Criterio de finalización recomendado

- La misión se completa cuando se han realizado las actividades obligatorias y se alcanza el umbral pedagógico definido por el contenido.
- Un error no bloquea indefinidamente: permite volver a intentarlo y activa refuerzo.
- `mastered` no se concede solo por terminar una vez; requiere una comprobación diferida.
- Speaking grabado localmente no equivale a una evaluación oral. Hasta tener evaluación fiable, registrar participación, no una nota fonética inventada.

## 6. Contrato de acceso y planes

### Planes iniciales

- `free`: muestra del recorrido, primeras misiones y funcionalidades de prueba limitadas.
- `premium`: acceso a todos los niveles publicados y a las herramientas de práctica premium.
- `admin`/cuentas de prueba: permisos separados, explícitos, temporales y auditables; no mezclar con la suscripción comercial.

No lanzar planes mensuales/anuales como derechos diferentes. Son intervalos de facturación del mismo producto Premium.

### Entitlements sugeridos

- `course.pre-a1`, `course.a1` … `course.c2`
- `practice.unlimited`
- `review.adaptive`
- `progress.detailed`
- `speaking.recording` (solo si existe función real)
- `ai.feedback` (siempre con límites de uso y coste)

Una función central de servidor debe recibir el alumno autenticado y un entitlement requerido, y devolver permitir/denegar con razón. Los endpoints de contenido, progreso, práctica y audio deben usar la misma política. Ocultar un botón en frontend no es control de acceso.

### Reglas comerciales

- Cancelar no borra cuenta ni progreso.
- El acceso Premium permanece hasta el fin del periodo pagado si la cancelación es al final del ciclo.
- Un pago fallido entra en estado de gracia configurable; no se debe prometer acceso indefinido.
- Reembolso, disputa y contracargo siguen reglas explícitas.
- La reactivación restablece el acceso tras confirmación del proveedor.
- El estado se reconcilia periódicamente con Stripe; los webhooks no son la única vía de reparación.

## 7. Contrato de API objetivo

Las rutas actuales se conservan mientras se migran consumidores. Las siguientes son responsabilidades objetivo, no rutas nuevas ya implementadas.

| Operación | Método/ruta propuesta | Regla |
|---|---|---|
| Sesión actual | `GET /api/auth/me` | Respuesta mínima, sin secretos |
| Catálogo accesible | `GET /api/academy/catalog` | Filtrado por entitlements |
| Progreso de misión | `GET /api/progress/missions/:missionId` | Solo propietario |
| Guardar intento | `POST /api/progress/attempts` | Alumno desde sesión, validación servidor |
| Resumen del alumno | `GET /api/progress/summary` | Solo alumno autenticado |
| Estado de suscripción | `GET /api/billing/status` | Proyección local, sin datos de tarjeta |
| Checkout | `POST /api/billing/checkout` | Plan/price allowlist; ID desde sesión |
| Portal | `POST /api/billing/portal` | Customer ligado al alumno |
| Webhook | `POST /api/billing/webhook` | Firma verificada + idempotencia |

## 8. Fuente de verdad y sincronización de Stripe

Stripe es la fuente de verdad para cobro, factura, periodo y estado de suscripción. D1 conserva una proyección mínima para autorizar acceso rápidamente.

Flujo previsto:

1. Alumno autenticado solicita checkout.
2. Servidor determina el precio permitido a partir de una lista de planes configurada.
3. Stripe crea Checkout Session con metadata del alumno y referencia estable.
4. Stripe envía webhook firmado.
5. El servidor registra el ID de evento una sola vez y procesa el evento.
6. Actualiza la proyección de suscripción y los entitlements derivados.
7. El cliente consulta el estado local actualizado; nunca se concede Premium por un parámetro de URL `success=1`.

El portal de cliente solo se crea para un customer perteneciente al alumno autenticado. No devolver ni exponer `stripe_customer_id` al navegador.

## 9. Secuencia de implementación segura

### Fase 0 — Auditoría (esta entrega)
- Inventariar las funciones existentes y las fuentes de datos.
- Documentar contratos, riesgos y límites.
- No ejecutar SQL ni tocar recursos.

### Fase 1 — Cierre de seguridad y consolidación (requiere coordinación de backend)
- Corregir fallback `COURSE_DB || DB` en rutas educativas.
- Centralizar `requireStudent` y `requireEntitlement`.
- Revisar sesiones, CSRF, límites y propiedad de registros.
- Añadir idempotencia y reconciliación de webhooks.
- Completar ciclo de vida de facturación.

### Fase 2 — Progreso canónico (requiere aprobación de esquema/migración)
- Diseñar migración aditiva en `COURSE_DB` exclusivamente.
- No modificar ni reutilizar `DB` del blog.
- Crear adaptadores para las tablas heredadas.
- Conectar `CanonicalMission` al API persistente.
- Validar reintentos, concurrencia, deduplicación y recuperación de sesión.

### Fase 3 — Entitlements y experiencia de alumno
- Mostrar plan y estado con datos de servidor.
- Mantener acceso gratuito y Premium coherente en todos los endpoints.
- Integrar resumen de progreso, siguiente actividad y repaso recomendado.
- Probar cancelación, expiración, pago fallido y reactivación en Stripe test mode.

### Fase 4 — Lanzamiento controlado
- Revisión de privacidad, términos, impuestos y facturación aplicables en España/UE.
- QA de accesibilidad, móvil, seguridad y recuperación de errores.
- Prueba con cuentas y datos sintéticos en entorno aislado.
- PR revisada y despliegue por el responsable del proyecto; nunca desde esta rama.

## 10. Pruebas de aceptación antes de cobrar

- Un usuario A no puede leer ni modificar progreso del usuario B.
- Un usuario Free no obtiene contenido Premium manipulando el frontend o la petición.
- Un usuario Premium conserva acceso hasta el final de su periodo pagado.
- Cancelar no elimina el progreso.
- Webhooks repetidos o fuera de orden no duplican ni revierten incorrectamente estados.
- Un fallo de Stripe no concede acceso Premium.
- Una caída de `COURSE_DB` no redirige consultas a la base del blog.
- La misión canónica persiste progreso al cambiar de dispositivo.
- Las sesiones caducadas o revocadas no permiten mutaciones.
- El progreso histórico se conserva y se puede reconciliar con el nuevo modelo.

## 11. Fuera de alcance de esta entrega

- No se han modificado rutas de autenticación o facturación.
- No se han creado ni ejecutado migraciones.
- No se han cambiado `wrangler.jsonc`, bindings, secretos, dominios ni recursos Cloudflare.
- No se han creado productos/precios Stripe ni iniciado cobros.
- No se ha conectado todavía el renderer canónico a persistencia.
- No se ha tocado el blog ni su D1 `DB`.

Este documento es el contrato previo para que el responsable técnico pueda aprobar y secuenciar los cambios compartidos. No debe interpretarse como una implementación lista para cobrar.
