# Formulaire Interactif Vue.js

Un formulaire de contact interactif créé avec Vue.js 3 et Tailwind CSS, avec des animations et transitions modernes.

## Fonctionnalités

- Interface utilisateur moderne avec Tailwind CSS
- Animations et transitions fluides
- Validation de formulaire côté client
- Envoi d'emails via EmailJS
- Notifications toast pour le feedback utilisateur

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Configuration d'EmailJS :
   - Créez un compte sur [EmailJS](https://www.emailjs.com/)
   - Créez un service email et un template
   - Remplacez les valeurs suivantes dans `src/components/ContactForm.vue` :
     ```javascript
     const serviceId = 'YOUR_SERVICE_ID'
     const templateId = 'YOUR_TEMPLATE_ID'
     const publicKey = 'YOUR_PUBLIC_KEY'
     ```

## Développement

Pour lancer le serveur de développement :

```bash
npm run dev
```

## Production

Pour construire l'application pour la production :

```bash
npm run build
```

Pour prévisualiser la version de production :

```bash
npm run preview
```

## Personnalisation

- Les couleurs et animations peuvent être personnalisées dans `tailwind.config.js`
- Les styles des composants peuvent être modifiés dans `src/style.css`
- La logique du formulaire peut être ajustée dans `src/components/ContactForm.vue`
