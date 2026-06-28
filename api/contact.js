import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email manquant' });

  await resend.emails.send({
    from: 'contact@bilanpsy.fr',
    to: 'harold@bokobza.fr', // ← ton email perso ici
    subject: 'Nouvelle inscription newsletter — haroldb.fr',
    html: `<p>Nouvelle inscription :</p><p><strong>${email}</strong></p>`
  });

  res.status(200).json({ ok: true });
}
