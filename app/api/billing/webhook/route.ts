import {NextRequest,NextResponse} from "next/server";
import Stripe from "stripe";
import {getEnv} from "@/lib/cf-context";
export async function POST(req:NextRequest){
 const env=getEnv();if(!env.STRIPE_SECRET_KEY||!env.STRIPE_WEBHOOK_SECRET)return NextResponse.json({error:"Webhook no configurado."},{status:503});
 const signature=req.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"Falta la firma de Stripe."},{status:400});
 try{
  const stripe=new Stripe(env.STRIPE_SECRET_KEY), raw=await req.text();
  const event=await stripe.webhooks.constructEventAsync(raw,signature,env.STRIPE_WEBHOOK_SECRET);
  if(event.type==="checkout.session.completed"){
   const s=event.data.object as Stripe.Checkout.Session, id=Number(s.client_reference_id||s.metadata?.student_id);
   if(id)await env.COURSE_DB.prepare("UPDATE students SET stripe_customer_id=?,plan='pro',subscription_status='active' WHERE id=?").bind(typeof s.customer==="string"?s.customer:s.customer?.id||null,id).run();
  }else if(event.type==="customer.subscription.updated"||event.type==="customer.subscription.deleted"){
   const s=event.data.object as Stripe.Subscription, id=Number(s.metadata?.student_id), active=event.type!=="customer.subscription.deleted"&&["active","trialing"].includes(s.status);
   const customer=typeof s.customer==="string"?s.customer:s.customer.id, period=new Date(s.current_period_end*1000).toISOString();
   if(id)await env.COURSE_DB.prepare("UPDATE students SET plan=?,subscription_status=?,current_period_end=? WHERE id=?").bind(active?"pro":"free",s.status,period,id).run();
   else await env.COURSE_DB.prepare("UPDATE students SET plan=?,subscription_status=?,current_period_end=? WHERE stripe_customer_id=?").bind(active?"pro":"free",s.status,period,customer).run();
  }
  return NextResponse.json({received:true});
 }catch(e){console.error("Stripe webhook",e);return NextResponse.json({error:"Firma o evento de Stripe no válido."},{status:400});}
}