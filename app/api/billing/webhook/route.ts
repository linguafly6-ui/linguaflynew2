import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getEnv } from "@/lib/cf-context";

export async function POST(req: NextRequest) {
  const env = getEnv();
  if (!env.COURSE_DB) return NextResponse.json({ error: "Base de datos de cursos no disponible." }, { status: 503 });
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Falta la firma de Stripe." }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = await stripe.webhooks.constructEventAsync(raw, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Firma de Stripe no válida." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const studentId = Number(session.client_reference_id || session.metadata?.student_id);
      if (studentId && session.customer) {
        await env.COURSE_DB.prepare("UPDATE students SET stripe_customer_id=?,billing_interval=? WHERE id=?")
          .bind(typeof session.customer === "string" ? session.customer : session.customer.id,
            session.metadata?.billing_interval || "monthly", studentId).run();
      }
    } else if (event.type === "customer.subscription.created" ||
               event.type === "customer.subscription.updated" ||
               event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const studentId = Number(subscription.metadata?.student_id);
      const active = event.type !== "customer.subscription.deleted" &&
        ["active", "trialing"].includes(subscription.status);
      const customer = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      const periodEnd = (subscription as any).current_period_end;
      const period = typeof periodEnd === "number" ? new Date(periodEnd * 1000).toISOString() : null;
      const interval = (subscription as any).items?.data?.[0]?.price?.recurring?.interval === "year" ? "annual" : "monthly";
      if (studentId) {
        await env.COURSE_DB.prepare(
          "UPDATE students SET plan=?,subscription_status=?,current_period_end=?,billing_interval=? WHERE id=? AND (stripe_customer_id IS NULL OR stripe_customer_id=?)"
        ).bind(active ? "pro" : "free", subscription.status, period, interval, studentId, customer).run();
      } else {
        await env.COURSE_DB.prepare(
          "UPDATE students SET plan=?,subscription_status=?,current_period_end=?,billing_interval=? WHERE stripe_customer_id=?"
        ).bind(active ? "pro" : "free", subscription.status, period, interval, customer).run();
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    // Stripe retries 5xx responses; do not acknowledge an event that failed to persist.
    console.error("Stripe webhook processing failed:", { eventId: event.id, type: event.type, error });
    return NextResponse.json({ error: "No se pudo procesar el evento de Stripe." }, { status: 500 });
  }
}
