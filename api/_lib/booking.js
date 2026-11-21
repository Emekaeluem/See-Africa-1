const crypto = require('node:crypto');
const SUPABASE_URL = () => process.env.SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_KEY = () => process.env.SUPABASE_SECRET_KEY;
const PAYSTACK_KEY = () => process.env.PAYSTACK_SECRET_KEY;
const respond = (res, code, data) => { res.setHeader('Cache-Control', 'no-store'); return res.status(code).json(data); };
async function db(path, {method='GET', body, prefer}={}) {
  if (!SUPABASE_URL() || !SUPABASE_KEY()) throw new Error('Database environment is not configured');
  const r=await fetch(SUPABASE_URL()+'/rest/v1/'+path,{method,headers:{
    'apikey': SUPABASE_KEY(), 'Content-Type':'application/json',
    ...(prefer ? {'Prefer':prefer}: {})
  },body:body === undefined ? undefined : JSON.stringify(body)});
  const text=await r.text(); let data;try {data=JSON.parse(text)} catch {data=text}
  if(!r.ok) {console.error('Database request failed:',r.status,typeof data==='object'?data.code:'');throw new Error('Database operation failed');}
  return data;
}
async function paystack(path,options={}) {
  if(!PAYSTACK_KEY()?.startsWith('sk_test_')) throw new Error('Paystack test secret key is required');
  const r=await fetch('https://api.paystack.co'+path,{
    method:options.method||'GET',
    headers:{Authorization:'Bearer '+PAYSTACK_KEY(),'Content-Type':'application/json'},
    body: options.body ? JSON.stringify(options.body):undefined
  });
  const data=await r.json().catch(()=>({}));
  if(!r.ok || data.status!==true) throw new Error('Payment provider request failed');
  return data.data;
}
const clean=(v,max=160)=>typeof v==='string'?v.trim().slice(0,max):'';
const allowed={seat:150000,stay:500000,explore:620000,fly:920000};
const transferPrices={none:0,shared:50000,private:120000,tour:180000,road:0};
// Fixed-price packages can reach test checkout directly; variable supplier quotes cannot.
const requiredQuote=(x)=>x.package_type==='fly'||x.origin_region!=='nigeria'||x.transfer==='road';

// Transactional emails require RESEND_API_KEY and a verified EMAIL_FROM_ADDRESS.
// Claim one notification per payment/status, so repeated webhooks don't create duplicates.
async function notifyPayment(payment,status) {
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.EMAIL_FROM_ADDRESS;
  if(!apiKey || !from) return {configured:false,sent:false};
  if(!['pending','success','failed'].includes(status)) return {configured:true,sent:false};
  const bookingList=await db('bookings?id=eq.'+encodeURIComponent(payment.booking_id)+'&select=booking_reference,customer_id,package_type,number_of_guests,total_amount_kobo');
  const booking=bookingList[0];
  if(!booking) throw new Error('Email booking not found');
  const users=await db('customers?id=eq.'+encodeURIComponent(booking.customer_id)+'&select=email,full_name');
  const customer=users[0];
  if(!customer) throw new Error('Email customer not found');
  const claim=await db('payment_notifications?on_conflict=payment_id,status',{
    method:'POST',prefer:'resolution=ignore-duplicates,return=representation',
    body:{payment_id:payment.id,status}
  });
  if(!Array.isArray(claim)||claim.length===0) return {configured:true,sent:false,duplicate:true};
  const id=claim[0].id;
  const amounts=new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(booking.total_amount_kobo/100);
  const message={
    pending:'We received your checkout request. Your payment is pending until Paystack confirms it. Please do not pay twice while it is processing.',
    success:'Paystack has verified your payment. Your booking payment is confirmed. Keep your reference for check-in and contact our team for any travel arrangements.',
    failed:'Your payment was unsuccessful or was cancelled. Your booking is not paid. You may return to the website to try again.'
  }[status];
  const subject={pending:'Payment pending',success:'Payment successful',failed:'Payment unsuccessful'}[status];
  try {
    const response=await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},
      body:JSON.stringify({from,to:[customer.email],subject:'See Africa Calabar — '+subject,
        text:'Hello '+customer.full_name+',\n\n'+message+'\n\nBooking reference: '+booking.booking_reference+
          '\nPackage: '+booking.package_type+'\nGuests: '+booking.number_of_guests+
          '\nAmount: '+amounts+'\n\nSee Africa / Okhma'})
    });
    if(!response.ok) {console.error('Email delivery rejected:',response.status);throw new Error('Email not accepted');}
    return {configured:true,sent:true};
  } catch(err) {
    await db('payment_notifications?id=eq.'+encodeURIComponent(id),{method:'DELETE'}).catch(()=>{});
    console.error('Notification send failed:',err.message);
    return {configured:true,sent:false};
  }
}
module.exports={crypto,db,paystack,respond,clean,allowed,transferPrices,requiredQuote,notifyPayment};
