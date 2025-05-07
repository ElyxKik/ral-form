<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
    <div class="bg-primary-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Message Envoyé !</h2>
      <p class="text-primary-100 mt-1">Merci pour votre message</p>
    </div>
    
    <div class="p-8 flex flex-col items-center">
      <!-- Success Animation -->
      <div class="success-animation mb-8">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      
      <!-- Confirmation Message -->
      <div class="text-center mb-8 animate-slide-up">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Votre message a été envoyé avec succès !</h3>
        <p class="text-gray-600">
          Nous vous remercions pour votre message. Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>
      
      <!-- Animated Details -->
      <div class="w-full max-w-md space-y-4 mb-8">
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 animate-slide-up" style="animation-delay: 200ms;">
          <h4 class="font-medium text-gray-700 mb-1">Prochaines étapes</h4>
          <p class="text-gray-600 text-sm">Vous recevrez un email de confirmation à l'adresse que vous avez fournie.</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 animate-slide-up" style="animation-delay: 400ms;">
          <h4 class="font-medium text-gray-700 mb-1">Délai de réponse</h4>
          <p class="text-gray-600 text-sm">Notre équipe s'engage à vous répondre dans un délai de 24 à 48 heures ouvrables.</p>
        </div>
      </div>
      
      <!-- Back Button -->
      <button 
        @click="$emit('back-to-form')" 
        class="btn-primary animate-pulse-slow"
      >
        Retour au formulaire
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Checkmark Animation */
.success-animation {
  width: 100px;
  height: 100px;
  position: relative;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b33;
  }
}
</style>
