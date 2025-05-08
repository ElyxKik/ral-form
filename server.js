const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Créer un transporteur SMTP réutilisable
// Vous pouvez utiliser Gmail (moins recommandé pour la production) ou Mailtrap (pour les tests)
let transporter = nodemailer.createTransport({
  // Configuration pour Gmail
  service: 'gmail',
  auth: {
    user: 'ral.rdc2025@gmail.com', // Remplacez par votre adresse Gmail
    pass: 'HitechCongo2024' // Utilisez un mot de passe d'application, pas votre mot de passe Gmail
    // Pour créer un mot de passe d'application: https://myaccount.google.com/apppasswords
  }
  
  // Alternative: Configuration pour Mailtrap (pour les tests)
  /*
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "votre_user_mailtrap",
    pass: "votre_password_mailtrap"
  }
  */
});

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  try {
    // Options d'email adaptées au formulaire d'adhésion
    const {
      nom, postnom, prenom, dateNaissance, villeNaissance, province, residence, email, telephone,
      etatcivil, niveau, statut, typeAdhesion, structureNom, structureNum, typeMembre, connaitRAL,
      contribution, competence, montant, engagement
    } = req.body;

    const mailOptions = {
      from: 'ral.rdc2025@gmail.com', // Adresse de l'expéditeur
      to: 'kikuniely@gmail.com', // Adresse du destinataire
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
    
    res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
