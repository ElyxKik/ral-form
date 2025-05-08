<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl animate-fade-in">
    <div class="bg-primary-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Formulaire d'Adhésion</h2>
      <p class="text-primary-100 mt-1">Merci de remplir toutes les informations demandées</p>
    </div>
    <form v-if="!confirmation" @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <transition-group name="form-field" tag="div" class="space-y-6" appear>
        <template v-if="step === 1">
          <h3 class="text-lg font-semibold text-primary-700 mb-4 animate-fade-in">1. Identité</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="animate-slide-up">
              <label class="form-label">Nom</label>
              <input v-model="form.nom" type="text" class="form-input" :class="{'border-red-500': errors.nom}" placeholder="Nom" />
              <p v-if="errors.nom" class="error-text">{{ errors.nom }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Post-nom</label>
              <input v-model="form.postnom" type="text" class="form-input" :class="{'border-red-500': errors.postnom}" placeholder="Post-nom" />
              <p v-if="errors.postnom" class="error-text">{{ errors.postnom }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Prénom</label>
              <input v-model="form.prenom" type="text" class="form-input" :class="{'border-red-500': errors.prenom}" placeholder="Prénom" />
              <p v-if="errors.prenom" class="error-text">{{ errors.prenom }}</p>
            </div>
            <div class="animate-slide-up">
  <label class="form-label">Date de naissance</label>
  <input v-model="form.dateNaissance" type="date" class="form-input" :class="{'border-red-500': errors.dateNaissance}" />
  <p v-if="errors.dateNaissance" class="error-text">{{ errors.dateNaissance }}</p>
</div>
<div class="animate-slide-up">
  <label class="form-label">Ville de naissance</label>
  <input v-model="form.villeNaissance" type="text" class="form-input" :class="{'border-red-500': errors.villeNaissance}" placeholder="Ville de naissance" />
  <p v-if="errors.villeNaissance" class="error-text">{{ errors.villeNaissance }}</p>
</div>
            <div class="animate-slide-up">
              <label class="form-label">Province d'origine</label>
              <input v-model="form.province" type="text" class="form-input" :class="{'border-red-500': errors.province}" placeholder="Province" />
              <p v-if="errors.province" class="error-text">{{ errors.province }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Lieu de résidence (adresse physique)</label>
              <input v-model="form.residence" type="text" class="form-input" :class="{'border-red-500': errors.residence}" placeholder="Adresse complète" />
              <p v-if="errors.residence" class="error-text">{{ errors.residence }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Adresse mail</label>
              <input v-model="form.email" type="email" class="form-input" :class="{'border-red-500': errors.email}" placeholder="Votre email" />
              <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Téléphone</label>
              <input v-model="form.telephone" type="tel" class="form-input" :class="{'border-red-500': errors.telephone}" placeholder="Votre téléphone" />
              <p v-if="errors.telephone" class="error-text">{{ errors.telephone }}</p>
            </div>
            <div class="animate-slide-up">
  <label class="form-label">État civil</label>
  <select v-model="form.etatcivil" class="form-input" :class="{'border-red-500': errors.etatcivil}">
    <option value="" disabled selected>Choisissez</option>
    <option value="Célibataire">Célibataire</option>
    <option value="Marié(e)">Marié(e)</option>
    <option value="Divorcé(e)">Divorcé(e)</option>
    <option value="Veuf/Veuve">Veuf/Veuve</option>
  </select>
  <p v-if="errors.etatcivil" class="error-text">{{ errors.etatcivil }}</p>
</div>
            <div class="animate-slide-up">
              <label class="form-label">Niveau d'études</label>
              <input v-model="form.niveau" type="text" class="form-input" :class="{'border-red-500': errors.niveau}" placeholder="Votre niveau" />
              <p v-if="errors.niveau" class="error-text">{{ errors.niveau }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Statut social</label>
              <input v-model="form.statut" type="text" class="form-input" :class="{'border-red-500': errors.statut}" placeholder="Votre statut" />
              <p v-if="errors.statut" class="error-text">{{ errors.statut }}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <h3 class="text-lg font-semibold text-primary-700 mb-4 animate-fade-in">2. Adhésion</h3>
          <div class="space-y-4">
            <div class="animate-slide-up">
              <label class="form-label">Adhérez-vous comme :</label>
              <div class="flex gap-4">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="form.typeAdhesion" value="physique" class="form-radio" />
                  <span class="ml-2">Personne physique</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="form.typeAdhesion" value="morale" class="form-radio" />
                  <span class="ml-2">Personne morale</span>
                </label>
              </div>
              <p v-if="errors.typeAdhesion" class="error-text">{{ errors.typeAdhesion }}</p>
            </div>
            <div v-if="form.typeAdhesion==='morale'" class="animate-slide-up">
              <label class="form-label">Nom de la structure</label>
              <input v-model="form.structureNom" type="text" class="form-input" :class="{'border-red-500': errors.structureNom}" placeholder="Nom de la structure" />
              <p v-if="errors.structureNom" class="error-text">{{ errors.structureNom }}</p>
              <label class="form-label mt-2">Numéro d'enregistrement légal</label>
              <input v-model="form.structureNum" type="text" class="form-input" :class="{'border-red-500': errors.structureNum}" placeholder="Numéro d'enregistrement" />
              <p v-if="errors.structureNum" class="error-text">{{ errors.structureNum }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Adhésion comme :</label>
              <select v-model="form.typeMembre" class="form-input" :class="{'border-red-500': errors.typeMembre}">
                <option value="" disabled selected>Choisissez</option>
                <option value="effectif">Membre effectif</option>
                <option value="honneur">Membre d'honneur et sympathisant</option>
              </select>
              <p v-if="errors.typeMembre" class="error-text">{{ errors.typeMembre }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Comment avez-vous connu RAL ?</label>
              <div class="flex flex-wrap gap-4">
                <label class="inline-flex items-center"><input type="checkbox" value="reseaux" v-model="form.connaitRAL" class="form-checkbox" /> <span class="ml-2">Réseaux sociaux</span></label>
                <label class="inline-flex items-center"><input type="checkbox" value="radio" v-model="form.connaitRAL" class="form-checkbox" /> <span class="ml-2">Radio-Télé</span></label>
                <label class="inline-flex items-center"><input type="checkbox" value="bouche" v-model="form.connaitRAL" class="form-checkbox" /> <span class="ml-2">Bouche à l'oreille</span></label>
                <label class="inline-flex items-center"><input type="checkbox" value="autres" v-model="form.connaitRAL" class="form-checkbox" /> <span class="ml-2">Autres</span></label>
              </div>
              <p v-if="errors.connaitRAL" class="error-text">{{ errors.connaitRAL }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Comment comptez-vous contribuer à la réalisation des objectifs de RAL ?</label>
              <textarea v-model="form.contribution" rows="2" class="form-input" :class="{'border-red-500': errors.contribution}" placeholder="Votre contribution"></textarea>
              <p v-if="errors.contribution" class="error-text">{{ errors.contribution }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Domaine de compétence professionnelle (si opportunité d'embauche)</label>
              <input v-model="form.competence" type="text" class="form-input" :class="{'border-red-500': errors.competence}" placeholder="Votre domaine" />
              <p v-if="errors.competence" class="error-text">{{ errors.competence }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Contribution mensuelle</label>
              <div class="flex gap-4">
                <label class="inline-flex items-center"><input type="radio" v-model="form.montant" value="10" class="form-radio" /> <span class="ml-2">10 $</span></label>
                <label class="inline-flex items-center"><input type="radio" v-model="form.montant" value="20" class="form-radio" /> <span class="ml-2">20 $</span></label>
                <label class="inline-flex items-center"><input type="radio" v-model="form.montant" value="50" class="form-radio" /> <span class="ml-2">50 $</span></label>
                <label class="inline-flex items-center"><input type="radio" v-model="form.montant" value="100" class="form-radio" /> <span class="ml-2">100 $</span></label>
              </div>
              <p v-if="errors.montant" class="error-text">{{ errors.montant }}</p>
            </div>
            <div class="animate-slide-up">
              <label class="form-label">Engagement</label>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="form.engagement" class="form-checkbox" />
                <span class="ml-2">Je m'engage à respecter les textes qui régissent RAL conformément aux lois de la République.</span>
              </label>
              <p v-if="errors.engagement" class="error-text">{{ errors.engagement }}</p>
            </div>
            <div class="animate-slide-up bg-blue-50 p-3 rounded-md text-sm text-primary-700 flex-col items-center gap-2">
              <div>
              <span class="font-semibold">
                Votre contribution se fait via ces numéros : 
              </span>
              </div>
              <div>
                <span class="font-mono">0998 696 641 | 0825 433 625</span>
              </div>
            </div>
          </div>
        </template>
        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-4 animate-slide-up">
          <button v-if="step===2" type="button" @click="step=1" class="btn-primary bg-gray-300 text-gray-700 hover:bg-gray-400">Précédent</button>
          <button v-if="step===1" type="button" @click="nextStep" class="btn-primary">Suivant</button>
          <button v-if="step===2" type="submit" class="btn-primary" :disabled="isSubmitting">
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
          </button>
        </div>
      </transition-group>
    </form>
<div v-else class="p-8 flex flex-col items-center justify-center">
  <svg class="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
  <h3 class="text-2xl font-bold mb-2 text-primary-700">Merci pour votre inscription !</h3>
  <p class="mb-2">Votre formulaire a bien été envoyé.</p>
  <div class="bg-blue-50 text-blue-900 rounded p-4 mt-4 text-center w-full max-w-xs sm:max-w-md mx-auto">
    <span class="font-semibold block mb-2">Info :</span>
    <p class="mb-2">Votre contribution se fait via ces numéros :</p>
    <div class="flex flex-col sm:flex-row justify-center gap-3">
      <div class="p-2 bg-white bg-opacity-50 rounded-md inline-block">
        <span class="font-mono text-lg font-medium">0998 696 641</span>
      </div>
      <div class="p-2 bg-white bg-opacity-50 rounded-md inline-block">
        <span class="font-mono text-lg font-medium">0825 433 625</span>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['form-submitted'])

// Toujours commencer à l'étape 1
const step = ref(1)

const toast = useToast()

function nextStep() {
  if (validateStep1()) {
    step.value = 2;
  } else {
    toast.error('Veuillez corriger les erreurs dans la première partie du formulaire.');
  }
}


const form = reactive({
  nom: '',
  postnom: '',
  prenom: '',
  dateNaissance: '',
  villeNaissance: '',
  province: '',
  residence: '',
  email: '',
  telephone: '',
  etatcivil: '',
  niveau: '',
  statut: '',
  typeAdhesion: '',
  structureNom: '',
  structureNum: '',
  typeMembre: '',
  connaitRAL: [],
  contribution: '',
  competence: '',
  montant: '',
  engagement: false
})

const errors = reactive({
  nom: '',
  postnom: '',
  prenom: '',
  dateNaissance: '',
  villeNaissance: '',
  province: '',
  residence: '',
  email: '',
  telephone: '',
  etatcivil: '',
  niveau: '',
  statut: '',
  typeAdhesion: '',
  structureNom: '',
  structureNum: '',
  typeMembre: '',
  connaitRAL: '',
  contribution: '',
  competence: '',
  montant: '',
  engagement: ''
})

const isSubmitting = ref(false)

const validateStep1 = () => {
  let isValid = true
  // Reset errors for step 1
  errors.nom = ''
  errors.postnom = ''
  errors.prenom = ''
  errors.dateNaissance = ''
  errors.villeNaissance = ''
  errors.province = ''
  errors.residence = ''
  errors.email = ''
  errors.telephone = ''
  errors.etatcivil = ''
  errors.niveau = ''
  errors.statut = ''

  if (!form.nom.trim()) {
    errors.nom = 'Champ requis'
    isValid = false
  }
  if (!form.postnom.trim()) {
    errors.postnom = 'Champ requis'
    isValid = false
  }
  if (!form.prenom.trim()) {
    errors.prenom = 'Champ requis'
    isValid = false
  }
  if (!form.dateNaissance) {
    errors.dateNaissance = 'Champ requis'
    isValid = false
  }
  if (!form.villeNaissance.trim()) {
    errors.villeNaissance = 'Champ requis'
    isValid = false
  }
  if (!form.province.trim()) {
    errors.province = 'Champ requis'
    isValid = false
  }
  if (!form.residence.trim()) {
    errors.residence = 'Champ requis'
    isValid = false
  }
  if (!form.email.trim()) {
    errors.email = 'Champ requis'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email invalide'
    isValid = false
  }
  if (form.telephone && !/^\+?[0-9\s.-]{7,}$/.test(form.telephone)) {
    errors.telephone = 'Numéro invalide'
    isValid = false
  }
  if (!form.etatcivil.trim()) {
    errors.etatcivil = 'Champ requis'
    isValid = false
  }
  if (!form.niveau.trim()) {
    errors.niveau = 'Champ requis'
    isValid = false
  }
  if (!form.statut.trim()) {
    errors.statut = 'Champ requis'
    errors.consent = 'Vous devez accepter les conditions'
    isValid = false
  }
  
  return isValid
}

async function handleSubmit() {
  if (!validateStep2()) {
    toast.error('Veuillez corriger les erreurs dans la deuxième partie du formulaire');
    return;
  }
  isSubmitting.value = true;
  try {
    // Préparer les données du formulaire pour l'envoi
    const emailData = { ...form };
    // Envoi réel de l'email via notre API SMTP
    // Utiliser l'URL complète de l'API Vercel
    const apiUrl = 'https://ral-form.vercel.app/api/send-email';
    console.log('Envoi du formulaire à:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'envoi de l\'email');
    }
    toast.success('Votre message a été envoyé avec succès!');
    confirmation.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);
    
    // Tenter d'extraire les détails de l'erreur si disponibles
    let errorMessage = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
    
    // Vérifier si nous avons des détails d'erreur du serveur
    if (error.response && error.response.details) {
      const details = error.response.details;
      if (details.code === 'ECONNREFUSED') {
        errorMessage = 'Impossible de se connecter au serveur mail. Vérifiez les paramètres de connexion.';
      } else if (details.responseCode === 535) {
        errorMessage = 'Authentification SMTP échouée. Vérifiez les identifiants.';
      } else if (details.message) {
        errorMessage = `Erreur: ${details.message}`;
      }
    }
    
    toast.error(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
}

const confirmation = ref(false);

function validateStep2() {
  let isValid = true;
  errors.typeAdhesion = '';
  errors.structureNom = '';
  errors.structureNum = '';
  errors.typeMembre = '';
  errors.connaitRAL = '';
  errors.contribution = '';
  errors.competence = '';
  errors.montant = '';
  errors.engagement = '';

  if (!form.typeAdhesion) {
    errors.typeAdhesion = 'Champ requis';
    isValid = false;
  }
  if (form.typeAdhesion === 'morale') {
    if (!form.structureNom.trim()) {
      errors.structureNom = 'Champ requis';
      isValid = false;
    }
    if (!form.structureNum.trim()) {
      errors.structureNum = 'Champ requis';
      isValid = false;
    }
  }
  if (!form.typeMembre) {
    errors.typeMembre = 'Champ requis';
    isValid = false;
  }
  if (!form.connaitRAL.length) {
    errors.connaitRAL = 'Champ requis';
    isValid = false;
  }
  if (!form.contribution.trim()) {
    errors.contribution = 'Champ requis';
    isValid = false;
  }
  if (!form.competence.trim()) {
    errors.competence = 'Champ requis';
    isValid = false;
  }
  if (!form.montant) {
    errors.montant = 'Champ requis';
    isValid = false;
  }
  if (!form.engagement) {
    errors.engagement = 'Vous devez accepter l\'engagement';
    isValid = false;
  }
  return isValid;
}

</script>

<style scoped>
.form-field-enter-active,
.form-field-leave-active {
  transition: all 0.5s ease;
}

.form-field-enter-from,
.form-field-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.form-field-move {
  transition: transform 0.5s ease;
}
</style>
