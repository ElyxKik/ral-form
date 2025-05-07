<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl animate-fade-in">
    <div class="bg-primary-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Formulaire de Contact</h2>
      <p class="text-primary-100 mt-1">Remplissez le formulaire ci-dessous pour nous contacter</p>
    </div>
    
    <form @submit.prevent="submitForm" class="p-6 space-y-6">
      <transition-group 
        name="form-field" 
        tag="div" 
        class="space-y-6"
        appear
      >
        <!-- Nom -->
        <div key="name" class="animate-slide-up" style="animation-delay: 100ms;">
          <label for="name" class="form-label">Nom complet</label>
          <input 
            id="name" 
            v-model="form.name" 
            type="text" 
            class="form-input" 
            :class="{'border-red-500': errors.name}"
            placeholder="Votre nom complet"
          />
          <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
        </div>
        
        <!-- Email -->
        <div key="email" class="animate-slide-up" style="animation-delay: 200ms;">
          <label for="email" class="form-label">Adresse email</label>
          <input 
            id="email" 
            v-model="form.email" 
            type="email" 
            class="form-input" 
            :class="{'border-red-500': errors.email}"
            placeholder="votre@email.com"
          />
          <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
        </div>
        
        <!-- Téléphone -->
        <div key="phone" class="animate-slide-up" style="animation-delay: 300ms;">
          <label for="phone" class="form-label">Numéro de téléphone</label>
          <input 
            id="phone" 
            v-model="form.phone" 
            type="tel" 
            class="form-input" 
            :class="{'border-red-500': errors.phone}"
            placeholder="Votre numéro de téléphone"
          />
          <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
        </div>
        
        <!-- Sujet -->
        <div key="subject" class="animate-slide-up" style="animation-delay: 400ms;">
          <label for="subject" class="form-label">Sujet</label>
          <select 
            id="subject" 
            v-model="form.subject" 
            class="form-input" 
            :class="{'border-red-500': errors.subject}"
          >
            <option value="" disabled selected>Sélectionnez un sujet</option>
            <option value="information">Demande d'information</option>
            <option value="support">Support technique</option>
            <option value="feedback">Commentaires</option>
            <option value="other">Autre</option>
          </select>
          <p v-if="errors.subject" class="error-text">{{ errors.subject }}</p>
        </div>
        
        <!-- Message -->
        <div key="message" class="animate-slide-up" style="animation-delay: 500ms;">
          <label for="message" class="form-label">Message</label>
          <textarea 
            id="message" 
            v-model="form.message" 
            rows="4" 
            class="form-input" 
            :class="{'border-red-500': errors.message}"
            placeholder="Votre message ici..."
          ></textarea>
          <p v-if="errors.message" class="error-text">{{ errors.message }}</p>
        </div>
        
        <!-- Checkbox -->
        <div key="consent" class="flex items-start animate-slide-up" style="animation-delay: 600ms;">
          <div class="flex items-center h-5">
            <input 
              id="consent" 
              v-model="form.consent" 
              type="checkbox" 
              class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="consent" class="font-medium text-gray-700">J'accepte de recevoir des communications</label>
            <p v-if="errors.consent" class="error-text">{{ errors.consent }}</p>
          </div>
        </div>
        
        <!-- Submit Button -->
        <div key="submit" class="pt-2 animate-slide-up" style="animation-delay: 700ms;">
          <button 
            type="submit" 
            class="btn-primary w-full flex justify-center items-center"
            :disabled="isSubmitting"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
          </button>
        </div>
      </transition-group>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['form-submitted'])

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: ''
})

const isSubmitting = ref(false)

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Le nom est requis'
    isValid = false
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Veuillez entrer une adresse email valide'
    isValid = false
  }
  
  // Validate phone (optional but must be valid if provided)
  if (form.phone.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(form.phone)) {
    errors.phone = 'Veuillez entrer un numéro de téléphone valide'
    isValid = false
  }
  
  // Validate subject
  if (!form.subject) {
    errors.subject = 'Veuillez sélectionner un sujet'
    isValid = false
  }
  
  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères'
    isValid = false
  }
  
  // Validate consent
  if (!form.consent) {
    errors.consent = 'Vous devez accepter les conditions'
    isValid = false
  }
  
  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    toast.error('Veuillez corriger les erreurs dans le formulaire')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Préparer les données du formulaire pour l'envoi
    const emailData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message
    }
    
    // En mode développement, nous pouvons simuler l'envoi
    // En production, décommentez le bloc ci-dessous pour envoyer réellement l'email
    
    /*
    // Envoi réel de l'email via notre API SMTP
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    })
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'envoi de l\'email')
    }
    */
    
    // Simulation d'un délai d'envoi (pour la démonstration)
    console.log('Simulation d\'envoi avec les données:', emailData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Votre message a été envoyé avec succès!')
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (key === 'consent') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
    
    // Emit event to show confirmation page
    emit('form-submitted')
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error)
    toast.error('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
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
