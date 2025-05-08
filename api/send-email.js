// API handler for sending emails via Resend
export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const formData = req.body;

    // Construire l'email HTML avec les données du formulaire
    const html = `
      <h2>Nouvelle demande d'adhésion</h2>
      <h3>Identité</h3>
      <ul>
        <li>Nom: ${formData.nom}</li>
        <li>Post-nom: ${formData.postnom}</li>
        <li>Prénom: ${formData.prenom}</li>
        <li>Email: ${formData.email}</li>
        <li>Téléphone: ${formData.telephone}</li>
      </ul>
      <h3>Adhésion</h3>
      <ul>
        <li>Type: ${formData.typeAdhesion}</li>
        <li>Membre: ${formData.typeMembre}</li>
        <li>Contribution: ${formData.montant}$</li>
      </ul>
    `;

    // Envoyer l'email via l'API Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_SsnctnZi_9rab8h7p1J3QYvF2W2uTfMr9',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'kikuniely@gmail.com',
        subject: `Nouvelle adhésion: ${formData.nom} ${formData.prenom}`,
        html
      })
    });

    // Vérifier la réponse de l'API
    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ message: error.message || 'Erreur lors de l\'envoi de l\'email' });
    }

    return res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur d\'envoi:', error);
    return res.status(500).json({ message: error.message || 'Erreur lors de l\'envoi de l\'email' });
  }
}
