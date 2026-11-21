const {crypto,db,respond,clean,allowed,transferPrices,requiredQuote}=require('./_lib/booking');
module.exports=async (req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{error:'Method not allowed'});}
  try{
    const x=req.body||{};
    const full_name=clean(x.full_name,120),email=clean(x.email,190).toLowerCase(),phone=clean(x.phone,40);
    const package_type=clean(x.package_type,20),origin_region=clean(x.origin_region,30);
    const guests=Number(x.number_of_guests),transfer=clean(x.transfer,20)||'none';
    const carnival_date=clean(x.carnival_date,10),arrival_date=clean(x.arrival_date,10),departure_date=clean(x.departure_date,10);
    if(!full_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!phone||
      !Object.hasOwn(allowed,package_type)||!['nigeria','africa','international'].includes(origin_region)||
      !Number.isInteger(guests)||guests<1||guests>50||!Object.hasOwn(transferPrices,transfer)||
      !/^2026-12-\d{2}$/.test(carnival_date)||carnival_date<'2026-12-01'||carnival_date>'2026-12-31')
      return respond(res,400,{error:'Please check your booking details.'});
    if(arrival_date && departure_date && departure_date<=arrival_date) return respond(res,400,{error:'Departure must be after arrival.'});
    if(arrival_date && carnival_date<arrival_date || departure_date && carnival_date>=departure_date)
      return respond(res,400,{error:'Please check your travel dates.'});
    const hotel_class=clean(x.hotel_class,20),room=clean(x.room_preference,20),nights=Number(x.hotel_nights)||2;
    if(!['3star','4star','premium'].includes(hotel_class)||!['sharing','couple','single'].includes(room)||
       ![2,3,4].includes(nights))return respond(res,400,{error:'Please check hotel preferences.'});
    const extra=transfer==='shared'?50000*guests:transfer==='private'?120000*Math.ceil(guests/3):transfer==='tour'?180000:0;
    const total_kobo=(allowed[package_type]*guests+extra)*100;
    const quote=requiredQuote({package_type,origin_region,transfer})||
      hotel_class!=='3star'||room!=='sharing'||nights!==2;
    const customer=await db('customers',{method:'POST',prefer:'return=representation',body:{
      full_name,email,phone
    }});
    const ref='SA-CAL-'+crypto.randomUUID().replaceAll('-','').slice(0,16).toUpperCase();
    const notes=JSON.stringify({
      carnival_date,arrival_date,departure_date,
      departure_airport:clean(x.departure_airport,120),hotel_class,room,nights,
      transfer,dietary:clean(x.dietary,200),indicative_only:true
    });
    await db('bookings',{method:'POST',body:{
      booking_reference:ref,customer_id:customer[0].id,package_type,number_of_guests:guests,
      origin_region,total_amount_kobo:total_kobo,currency:'NGN',
      booking_status:quote?'awaiting_quote':'pending',special_requests:notes
    }});
    return respond(res,201,{booking_reference:ref,status:quote?'awaiting_quote':'pending',
      indicative_amount_ngn:total_kobo/100,message:'Your enquiry has been received. This is not a paid or confirmed reservation.'});
  }catch(e){console.error('Booking submission failed:',e.message);return respond(res,500,{error:'Unable to save enquiry. Please try again.'});}
};
