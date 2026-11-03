# Configuración de Stripe en LinguaFly

Los endpoints de Stripe ya están implementados en el Worker. Para habilitar cobros reales, configura los valores de Stripe en Cloudflare Workers (no guardes claves privadas en `wrangler.jsonc` ni en Git).

## Variables y secretos necesarios

Configura estos bindings para el Worker `linguaflyapp1`:

- `STRIPE_SECRET_KEY` — secreto de Stripe (modo test o live).
- `STRIPE_WEBHOOK_SECRET` — secreto de firma del webhook.
- `STRIPE_PRICE_MONTHLY` — Price ID recurrente mensual de **19,99 EUR/mes**.
- `STRIPE_PRICE_ANNUAL` — Price ID recurrente anual de **199,99 EUR/año**.
- `NEXT_PUBLIC_SITE_URL` — `https://linguafly.app`.

Los cuatro valores de Stripe se leen desde el entorno del Worker. Los secretos deben configurarse como secretos y los Price ID pueden configurarse como variables de texto o secretos. No se han inventado Price ID ni claves.

## CLI

Desde un entorno con Wrangler autenticado y con permisos para el Worker:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put STRIPE_PRICE_MONTHLY
npx wrangler secret put STRIPE_PRICE_ANNUAL
```

Los Price ID también pueden configurarse como variables de texto desde Cloudflare Dashboard → Workers & Pages → linguaflyapp1 → Settings → Variables and Secrets.

## Webhook

Registra en Stripe el endpoint:

```
https://linguafly.app/api/billing/webhook
```

Suscríbete como mínimo a estos eventos:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

El webhook valida la firma de Stripe y actualiza `students.plan`, `subscription_status`, `stripe_customer_id`, `current_period_end` y `billing_interval`.

## Prueba antes de activar live

1. Crea productos y precios recurrentes en modo test.
2. Configura las claves y Price ID de test en el Worker.
3. Completa un Checkout de prueba mensual y anual.
4. Comprueba que el webhook cambia el plan del alumno a Pro.
5. Cancela la suscripción desde el portal y verifica que el webhook devuelve el plan a Free cuando Stripe marca la suscripción como cancelada.
6. Repite la prueba con claves live solo cuando todo lo anterior funcione.

El panel de administración calcula el ingreso mensual estimado como número de suscripciones activas mensuales × 19,99 € más suscripciones anuales × 199,99 €/12. No representa el informe contable de Stripe.
