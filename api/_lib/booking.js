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
const requiredQuote=(x)=>x.package_type!=='seat'||x.origin_region!=='nigeria'||x.transfer==='road';
module.exports={crypto,db,paystack,respond,clean,allowed,transferPrices,requiredQuote};
