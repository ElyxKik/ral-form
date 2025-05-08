export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  // Gérer les requêtes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      }
    });
  }

  // Vérifier que la méthode est POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const formData = await req.json();
    
    // Construire le contenu de l'email
    const html = `
      <h2>Nouvelle demande d'adhésion</h2>
      <h3>Identité</h3>
      <ul>
        <li><strong>Nom :</strong> ${formData.nom}</li>
        <li><strong>Post-nom :</strong> ${formData.postnom}</li>
        <li><strong>Prénom :</strong> ${formData.prenom}</li>
        <li><strong>Date de naissance :</strong> ${formData.dateNaissance}</li>
        <li><strong>Ville de naissance :</strong> ${formData.villeNaissance}</li>
        <li><strong>Province d'origine :</strong> ${formData.province}</li>
        <li><strong>Lieu de résidence :</strong> ${formData.residence}</li>
        <li><strong>Email :</strong> ${formData.email}</li>
        <li><strong>Téléphone :</strong> ${formData.telephone}</li>
        <li><strong>État civil :</strong> ${formData.etatcivil}</li>
        <li><strong>Niveau d'études :</strong> ${formData.niveau}</li>
        <li><strong>Statut social :</strong> ${formData.statut}</li>
      </ul>
      <h3>Adhésion</h3>
      <ul>
        <li><strong>Type d'adhésion :</strong> ${formData.typeAdhesion}</li>
        ${formData.typeAdhesion === 'morale' ? `<li><strong>Nom de la structure :</strong> ${formData.structureNom}</li><li><strong>Numéro d'enregistrement :</strong> ${formData.structureNum}</li>` : ''}
        <li><strong>Type de membre :</strong> ${formData.typeMembre}</li>
        <li><strong>Comment avez-vous connu RAL :</strong> ${(formData.connaitRAL || []).join(', ')}</li>
        <li><strong>Contribution prévue :</strong> ${formData.contribution}</li>
        <li><strong>Domaine de compétence :</strong> ${formData.competence}</li>
        <li><strong>Contribution mensuelle :</strong> ${formData.montant} $</li>
        <li><strong>Engagement :</strong> ${formData.engagement ? 'Oui' : 'Non'}</li>
      </ul>
    `;

    // Envoyer l'email via l'API Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_SsnctnZi_9rab8h7p1J3QYvF2W2uTfMr9`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'kikuniely@gmail.com',
        subject: `Nouvelle demande d'adhésion : ${formData.nom} ${formData.prenom}`,
        html
      })
    });

    const resendResponse = await response.json();

    return new Response(JSON.stringify({ success: true, message: 'Email envoyé avec succès', data: resendResponse }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
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
