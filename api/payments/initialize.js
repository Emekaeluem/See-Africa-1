const {crypto,db,paystack,respond,clean}=require('../_lib/booking');
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{error:'Method not allowed'});}
  try{
    const ref=clean(req.body?.booking_reference,80),email=clean(req.body?.email,190).toLowerCase();
    if(!ref||!email)return respond(res,400,{error:'Booking reference and email required.'});
    const found=await db('bookings?booking_reference=eq.'+encodeURIComponent(ref)+'&select=id,booking_reference,booking_status,total_amount_kobo,currency,customer_id');
    const booking=found[0];
    if(!booking || booking.booking_status!=='awaiting_payment')
      return respond(res,409,{error:'This booking is not currently approved for payment.'});
    const people=await db('customers?id=eq.'+encodeURIComponent(booking.customer_id)+'&select=email');
    if(people[0]?.email!==email)return respond(res,403,{error:'Booking details do not match.'});
    if(!Number.isSafeInteger(booking.total_amount_kobo)||booking.total_amount_kobo<=0)
      return respond(res,409,{error:'Booking amount has not been approved.'});
    const paymentRef='SACAL-'+crypto.randomUUID().replaceAll('-','').toUpperCase();
    await db('payments',{method:'POST',body:{booking_id:booking.id,paystack_reference:paymentRef,amount_kobo:booking.total_amount_kobo,currency:booking.currency,payment_status:'pending'}});
    const response=await paystack('/transaction/initialize',{method:'POST',body:{
      email,amount:booking.total_amount_kobo,currency:'NGN',reference:paymentRef,
      metadata:{booking_reference:booking.booking_reference},
      callback_url:'https://see-africa-1.vercel.app/calabar.html?payment=return'
    }});
    return respond(res,200,{authorization_url:response.authorization_url,reference:paymentRef});
  }catch(e){console.error('Payment initialization failed:',e.message);return respond(res,500,{error:'Unable to start payment. Please contact support.'});}
};
