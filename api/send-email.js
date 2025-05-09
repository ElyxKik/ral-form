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

    // Construire l'email HTML avec toutes les données du formulaire
    const html = `
      <h2>Nouvelle demande d'adhésion</h2>
      
      <h3 style="background-color: #3B82F6; color: white; padding: 8px; border-radius: 4px;">1. Identité</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; width: 30%;"><strong>Nom:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.nom || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Post-nom:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.postnom || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Prénom:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.prenom || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date de naissance:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.dateNaissance || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Ville de naissance:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.villeNaissance || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Province d'origine:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.province || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Lieu de résidence:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.residence || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Téléphone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.telephone || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>État civil:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.etatcivil || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Niveau d'études:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.niveau || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Statut social:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.statut || '-'}</td>
        </tr>
      </table>
      
      <h3 style="background-color: #3B82F6; color: white; padding: 8px; border-radius: 4px; margin-top: 20px;">2. Adhésion</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; width: 40%;"><strong>Type d'adhésion:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.typeAdhesion === 'physique' ? 'Personne physique' : formData.typeAdhesion === 'morale' ? 'Personne morale' : '-'}</td>
        </tr>
        ${formData.typeAdhesion === 'morale' ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nom de la structure:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.structureNom || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Numéro d'enregistrement:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.structureNum || '-'}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Type de membre:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.typeMembre === 'effectif' ? 'Membre effectif' : formData.typeMembre === 'honneur' ? 'Membre d\'honneur et sympathisant' : '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Connaissance de RAL:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${Array.isArray(formData.connaitRAL) ? formData.connaitRAL.map(source => {
            if (source === 'reseaux') return 'Réseaux sociaux';
            if (source === 'radio') return 'Radio-Télé';
            if (source === 'bouche') return 'Bouche à l\'oreille';
            if (source === 'autres') return 'Autres';
            return source;
          }).join(', ') : '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Contribution aux objectifs:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.contribution || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Domaine de compétence:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.competence || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Contribution mensuelle:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.montant || '-'}$</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Engagement accepté:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.engagement ? 'Oui' : 'Non'}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; background-color: #EFF6FF; padding: 15px; border-radius: 5px;">
        <p style="margin: 0; font-weight: bold;">Informations de paiement:</p>
        <p style="margin: 5px 0;">Les contributions se font via les numéros suivants:</p>
        <div style="margin: 10px 0; background-color: white; padding: 10px; border-radius: 4px; display: inline-block;">0998 696 641</div>
        <div style="margin: 10px 0; background-color: white; padding: 10px; border-radius: 4px; display: inline-block;">0825 433 625</div>
      </div>
    `;

    // Envoyer l'email via l'API Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY || 're_bMYn93vG_DFch68YLPtHrqcgSs3qy3GzS'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Formulaire d\'adhésion RAL <onboarding@resend.dev>',
        to: ['ral.rdc2025@gmail.com'],
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
