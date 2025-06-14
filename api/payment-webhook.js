export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const authHeader = req.headers.authorization;

  if (authHeader !== 'Bearer bbwall2025payhook123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const tx = req.body.transaction;
  const memo = tx.memo;
  const recipient = tx.nativeTransfers?.[0]?.toUserAccount;
  const amount = tx.nativeTransfers?.[0]?.amount / 1e9;

  const YOUR_WALLET = '9xfFfanJSUHKBJBcA5C1VH5aDTftByWhFQ4Cf8HRCsRK';

  if (recipient !== YOUR_WALLET || !memo || amount < 0.1) {
    return res.status(400).json({ error: 'Invalid payment' });
  }

  // (Optionally update Supabase here...)

  return res.status(200).json({ success: true });
}
