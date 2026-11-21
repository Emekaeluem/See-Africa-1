const {crypto,db,paystack,respond}=require('../_lib/booking');
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{error:'Method not allowed'});}
  const key=process.env.PAYSTACK_SECRET_KEY;
  if(!key)return respond(res,503,{error:'Not configured'});
  // Verify the signature over the exact raw HTTP request body, not parsed JSON.
  const chunks=[];
  for await (const chunk of req) chunks.push(chunk);
  const raw=Buffer.concat(chunks);
  const expected=crypto.createHmac('sha512',key).update(raw).digest('hex');
  const got=req.headers['x-paystack-signature'];
  if(typeof got!=='string'||got.length!==expected.length||
    !crypto.timingSafeEqual(Buffer.from(expected,'hex'),Buffer.from(got,'hex')))
    return respond(res,401,{error:'Invalid signature'});
  try{
    const event=JSON.parse(raw.toString('utf8'));
    if(event.event!=='charge.success')return respond(res,200,{received:true});
    const reference=event.data?.reference;
    if(typeof reference!=='string')return respond(res,200,{received:true});
    const {reconcile}=require('../_lib/payment-status');
    const result=await reconcile(reference);
    if(result.status==='mismatch') console.error('Paystack verification mismatch:',reference);
    return respond(res,200,{received:true});
    await db('payments?id=eq.'+encodeURIComponent(payment.id),{method:'PATCH',body:{
      payment_status:'success',paid_at:tx.paid_at||new Date().toISOString(),payment_channel:tx.channel||null
    }});
    await db('bookings?id=eq.'+encodeURIComponent(payment.booking_id)+'&booking_status=eq.awaiting_payment',{
      method:'PATCH',body:{booking_status:'confirmed',updated_at:new Date().toISOString()}
    });
    return respond(res,200,{received:true});
  }catch(e){console.error('Webhook processing error:',e.message);return respond(res,500,{error:'Please retry notification'});}
};

// Preserve raw request body when supported by the route runtime.
module.exports.config = { api: { bodyParser: false } };
