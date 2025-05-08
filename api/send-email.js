export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const formData = await req.json();

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

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      data: result
    }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to send email'
    }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
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
