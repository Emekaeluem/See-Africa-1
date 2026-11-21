const {respond,clean}=require('../_lib/booking');
const {reconcile}=require('../_lib/payment-status');
module.exports=async(req,res)=>{
  if(req.method!=='GET'){res.setHeader('Allow','GET');return respond(res,405,{error:'Method not allowed'});}
  const reference=clean(req.query?.reference,80);
  if(!reference)return respond(res,400,{status:'invalid'});
  try {
    const result=await reconcile(reference);
    return respond(res,200,result);
  } catch(err) {
    console.error('Payment verification error:',err.message);
    return respond(res,503,{status:'unavailable',message:'Payment status could not be checked. Please try again.'});
  }
};
