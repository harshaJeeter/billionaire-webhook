export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const event = req.body;

  const tx = event.transaction;
  const memo = tx.memo;
  const recipient = tx.nativeTransfers?.[0]?.toUserAccount;
  const amount = tx.nativeTransfers?.[0]?.amount / 1e9;

  const YOUR_WALLET = 'YOUR_SOLANA_WALLET_HERE';

  if (recipient !== YOUR_WALLET || !memo || amount < 0.1) {
    return res.status(400).json({ error: 'Invalid payment' });
  }

  return res.status(200).json({ success: true });
}
