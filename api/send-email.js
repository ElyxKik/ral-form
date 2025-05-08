require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Activer CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gérer les requêtes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier que la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // Récupérer les données du formulaire
    const {
      nom, postnom, prenom, dateNaissance, villeNaissance, province, residence, email, telephone,
      etatcivil, niveau, statut, typeAdhesion, structureNom, structureNum, typeMembre, connaitRAL,
      contribution, competence, montant, engagement
    } = req.body;

    // Créer le transporteur SMTP
    let transporter = nodemailer.createTransport({
      host: 'mail.ral-rdc.online',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'formulaire@ral-rdc.online',
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Configurer l'email
    const mailOptions = {
      from: 'formulaire@ral-rdc.online',
      to: 'kikuniely@gmail.com',
      subject: `Nouvelle demande d'adhésion : ${nom} ${prenom}`,
      text: `
Identité
--------
Nom : ${nom}
Post-nom : ${postnom}
Prénom : ${prenom}
Date de naissance : ${dateNaissance}
Ville de naissance : ${villeNaissance}
Province d'origine : ${province}
Lieu de résidence : ${residence}
Adresse mail : ${email}
Téléphone : ${telephone}
État civil : ${etatcivil}
Niveau d'études : ${niveau}
Statut social : ${statut}

Adhésion
--------
Type d'adhésion : ${typeAdhesion}
${typeAdhesion === 'morale' ? `Nom de la structure : ${structureNom}\nNuméro d'enregistrement : ${structureNum}` : ''}
Type de membre : ${typeMembre}
Comment avez-vous connu RAL : ${(connaitRAL || []).join(', ')}
Contribution prévue : ${contribution}
Domaine de compétence : ${competence}
Contribution mensuelle : ${montant} $
Engagement : ${engagement ? 'Oui' : 'Non'}
      `,
      html: `
        <h2>Nouvelle demande d'adhésion</h2>
        <h3>Identité</h3>
        <ul>
          <li><strong>Nom :</strong> ${nom}</li>
          <li><strong>Post-nom :</strong> ${postnom}</li>
          <li><strong>Prénom :</strong> ${prenom}</li>
          <li><strong>Date de naissance :</strong> ${dateNaissance}</li>
          <li><strong>Ville de naissance :</strong> ${villeNaissance}</li>
          <li><strong>Province d'origine :</strong> ${province}</li>
          <li><strong>Lieu de résidence :</strong> ${residence}</li>
          <li><strong>Adresse mail :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${telephone}</li>
          <li><strong>État civil :</strong> ${etatcivil}</li>
          <li><strong>Niveau d'études :</strong> ${niveau}</li>
          <li><strong>Statut social :</strong> ${statut}</li>
        </ul>
        <h3>Adhésion</h3>
        <ul>
          <li><strong>Type d'adhésion :</strong> ${typeAdhesion}</li>
          ${typeAdhesion === 'morale' ? `<li><strong>Nom de la structure :</strong> ${structureNom}</li><li><strong>Numéro d'enregistrement :</strong> ${structureNum}</li>` : ''}
          <li><strong>Type de membre :</strong> ${typeMembre}</li>
          <li><strong>Comment avez-vous connu RAL :</strong> ${(connaitRAL || []).join(', ')}</li>
          <li><strong>Contribution prévue :</strong> ${contribution}</li>
          <li><strong>Domaine de compétence :</strong> ${competence}</li>
          <li><strong>Contribution mensuelle :</strong> ${montant} $</li>
          <li><strong>Engagement :</strong> ${engagement ? 'Oui' : 'Non'}</li>
        </ul>
      `
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
  }
};
