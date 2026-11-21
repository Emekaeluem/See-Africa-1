const {db,paystack,notifyPayment}=require('./booking');

// Verify with Paystack on the server; never trust query parameters or callback alone.
async function reconcile(reference) {
  if(!/^SACAL-[A-F0-9]{32}$/.test(reference||'')) return {status:'invalid'};
  const list=await db('payments?paystack_reference=eq.'+encodeURIComponent(reference)+
    '&select=id,booking_id,paystack_reference,amount_kobo,currency,payment_status');
  const payment=list[0];
  if(!payment) return {status:'not_found'};
  if(payment.payment_status==='success') return {status:'success'};
  const verified=await paystack('/transaction/verify/'+encodeURIComponent(reference));
  if(verified.reference!==reference||
    Number(verified.amount)!==Number(payment.amount_kobo)||
    verified.currency!==payment.currency) return {status:'mismatch'};
  const bookings=await db('bookings?id=eq.'+encodeURIComponent(payment.booking_id)+
    '&select=booking_status');
  if(bookings[0]?.booking_status==='confirmed')return {status:'success'};
  if(verified.status==='success') {
    await db('payments?id=eq.'+encodeURIComponent(payment.id),{method:'PATCH',body:{
      payment_status:'success',paid_at:verified.paid_at||new Date().toISOString(),
      payment_channel:verified.channel||null
    }});
    await db('bookings?id=eq.'+encodeURIComponent(payment.booking_id)+
      '&booking_status=eq.awaiting_payment',{method:'PATCH',body:{
        booking_status:'confirmed',updated_at:new Date().toISOString()
      }});
    await notifyPayment(payment,'success').catch(e=>console.error('Success notice:',e.message));
    return {status:'success'};
  }
  if(['failed','abandoned','reversed'].includes(verified.status)) {
    await db('payments?id=eq.'+encodeURIComponent(payment.id)+
      '&payment_status=neq.success',{method:'PATCH',body:{payment_status:'failed'}});
    await notifyPayment(payment,'failed').catch(e=>console.error('Failed notice:',e.message));
    return {status:'failed'};
  }
  return {status:'pending'};
}
module.exports={reconcile};
