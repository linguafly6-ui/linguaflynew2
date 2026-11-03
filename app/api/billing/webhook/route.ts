import { NextRequest,NextResponse } from "next/server";
import Stripe from "stripe";
import { getEnv } from "@/lib/cf-context";

export async function POST(req:NextRequest){
  const env=getEnv();
  if(!env.COURSE_DB) return NextResponse.json({error:"Base de datos de cursos no disponible."},{status:503});
  if(!env.STRIPE_SECRET_KEY||!env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({error:"Webhook no configurado."},{status:503});
  const signature=req.headers.get("stripe-signature");
  if(!signature) return NextResponse.json({error:"Falta la firma de Stripe."},{status:400});
  try{
    const stripe=new Stripe(env.STRIPE_SECRET_KEY);
    const raw=await req.text();
    const event=await stripe.webhooks.constructEventAsync(raw,signature,env.STRIPE_WEBHOOK_SECRET);
    if(event.type==="checkout.session.completed"){
      const session=event.data.object as Stripe.Checkout.Session;
      const studentId=Number(session.client_reference_id||session.metadata?.student_id);
      if(studentId){
        await env.COURSE_DB.prepare("UPDATE students SET stripe_customer_id=?,plan='pro',subscription_status='active',billing_interval=? WHERE id=?")
          .bind(typeof session.customer==="string"?session.customer:session.customer?.id||null,session.metadata?.billing_interval||"monthly",studentId).run();
      }
    }else if(event.type==="customer.subscription.updated"||event.type==="customer.subscription.deleted"){
      const subscription=event.data.object as Stripe.Subscription;
      const studentId=Number(subscription.metadata?.student_id);
      const active=event.type!=="customer.subscription.deleted"&&["active","trialing"].includes(subscription.status);
      const customer=typeof subscription.customer==="string"?subscription.customer:subscription.customer.id;
      const periodEnd=(subscription as any).current_period_end;
      const period=typeof periodEnd==="number"?new Date(periodEnd*1000).toISOString():null;
      const interval=(subscription as any).items?.data?.[0]?.price?.recurring?.interval==="year"?"annual":"monthly";
      if(studentId){
        await env.COURSE_DB.prepare("UPDATE students SET plan=?,subscription_status=?,current_period_end=?,billing_interval=? WHERE id=?")
          .bind(active?"pro":"free",subscription.status,period,interval,studentId).run();
      }else{
        await env.COURSE_DB.prepare("UPDATE students SET plan=?,subscription_status=?,current_period_end=?,billing_interval=? WHERE stripe_customer_id=?")
          .bind(active?"pro":"free",subscription.status,period,interval,customer).run();
      }
    }
    return NextResponse.json({received:true});
  }catch(error){
    console.error("Stripe webhook verification or processing error:",error);
    return NextResponse.json({error:"Firma o evento de Stripe no válido."},{status:400});
  }
}
