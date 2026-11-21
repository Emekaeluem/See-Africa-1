const {crypto,db,paystack,respond,clean,notifyPayment}=require('../_lib/booking');
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{error:'Method not allowed'});}
  try {
    const ref=clean(req.body?.booking_reference,80);
    const email=clean(req.body?.email,190).toLowerCase();
    if(!ref||!email)return respond(res,400,{error:'Booking reference and email required.'});
    const found=await db('bookings?booking_reference=eq.'+encodeURIComponent(ref)+
      '&select=id,booking_reference,booking_status,total_amount_kobo,currency,customer_id');
    const booking=found[0];
    if(!booking)return respond(res,404,{error:'Booking not found.'});
    if(booking.booking_status!=='awaiting_payment')
      return respond(res,409,{error:'This package needs a confirmed final quotation, or has already been paid.'});
    const users=await db('customers?id=eq.'+encodeURIComponent(booking.customer_id)+'&select=email');
    if(users[0]?.email!==email)return respond(res,403,{error:'Booking email does not match.'});
    if(!Number.isSafeInteger(Number(booking.total_amount_kobo))||
      Number(booking.total_amount_kobo)<=0||booking.currency!=='NGN')
      return respond(res,409,{error:'Invalid booking amount.'});
    const reference='SACAL-'+crypto.randomUUID().replaceAll('-','').toUpperCase();
    const payment=await db('payments',{method:'POST',prefer:'return=representation',body:{
      booking_id:booking.id,paystack_reference:reference,amount_kobo:booking.total_amount_kobo,
      currency:'NGN',payment_status:'pending'
    }});
    // Use deployment's own callback, so Preview returns to Preview.
    const deploymentHost=process.env.VERCEL_URL||'see-africa-1.vercel.app';
    const callback='https://'+deploymentHost+'/calabar.html?payment=return';
    const checkout=await paystack('/transaction/initialize',{method:'POST',body:{
      email,amount:booking.total_amount_kobo,currency:'NGN',reference,
      callback_url:callback,metadata:{booking_reference:booking.booking_reference}
    }});
    // A pending email means checkout started, not that payment succeeded.
    await notifyPayment(payment[0],'pending').catch(e=>console.error('Pending notice:',e.message));
    return respond(res,200,{authorization_url:checkout.authorization_url,reference});
  } catch(e) {
    console.error('Payment initialization failed:',e.message);
    return respond(res,500,{error:'Unable to begin payment. Please try again.'});
  }
};
