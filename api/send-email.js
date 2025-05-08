// API handler for sending emails
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Allow GET for testing
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'API fonctionnelle',
      debug: true
    });
  }

  // Only allow POST for actual emails
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Méthode non autorisée'
    });
  }

  try {
    // Get form data
    const formData = req.body;

    // Create email HTML
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

    // Send email with Resend
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

    // Check response
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de l\'envoi de l\'email');
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès'
    });

  } catch (error) {
    // Log and return error
    console.error('Erreur:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de l\'envoi de l\'email'
    });
  }
}
