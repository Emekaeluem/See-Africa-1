// Temporary diagnostics for Calabar Preview only.
// Never reveal values, partial keys, database contents, or secrets.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow','GET');
    return res.status(405).json({ error:'Method not allowed' });
  }
  const url = process.env.SUPABASE_URL || '';
  const key = process.env.SUPABASE_SECRET_KEY || '';
  const paystack = process.env.PAYSTACK_SECRET_KEY || '';
  const configuredUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url);
  const configuredKey = key.startsWith('sb_secret_') || key.startsWith('eyJ');
  return res.status(200).json({
    checks: {
      supabase_url_present: Boolean(url),
      supabase_url_valid_shape: configuredUrl,
      supabase_secret_present: Boolean(key),
      supabase_secret_valid_shape: configuredKey,
      paystack_test_key_present: paystack.startsWith('sk_test_')
    },
    note: 'Presence and format checks only; no database or payment requests performed.'
  });
};