export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const formData = req.body;

    // Build email HTML
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

    // Send email via Resend API
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

    const result = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: result
    });

  } catch (error) {
    console.error('Error sending email:', error);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email'
    });
  }
}
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return new Response(JSON.stringify({ success: false, message: error.message || 'Erreur lors de l\'envoi de l\'email' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }
}
      message: 'Erreur lors de l\'envoi de l\'email', 
      details: errorDetails 
    });
  }
};
