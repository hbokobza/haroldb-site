const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email manquant' });

  try {
    await resend.emails.send({
      from: 'contact@bilanpsy.fr',
      to: 'harold.bokobza@gmail.com',
      subject: 'Nouvelle inscription — haroldb.fr',
      html: `<p>Nouvelle inscription newsletter :</p><p><strong>${email}</strong></p>`
    });
    res.status(200).json({ ok: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur envoi email' });
  }
};
