<template>
  <!-- Loader Animation -->
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div class="logo-loader">
      <img src="/logo.jpeg" alt="RAL Logo" class="h-32 object-contain mb-4" />
      <div class="loader-bar">
        <div class="loader-progress"></div>
      </div>
      <p class="mt-4 text-primary-600 font-medium">Bienvenue</p>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-2xl">
      <!-- Header with Logo -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col items-center animate-fade-in">
        <img src="/logo.jpeg" alt="RAL Logo" class="h-24 object-contain mb-4" />
        <h1 class="text-2xl font-bold text-primary-700 text-center">Réseau d'Action pour le Leadership</h1>
      </div>
      
      <!-- Form or Confirmation Page -->
      <transition name="page-transition" mode="out-in">
        <ContactForm v-if="!formSubmitted" @form-submitted="showConfirmation" />
        <ConfirmationPage v-else @back-to-form="resetForm" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ContactForm from './components/ContactForm.vue'
import ConfirmationPage from './components/ConfirmationPage.vue'

const formSubmitted = ref(false)
const isLoading = ref(true)

onMounted(() => {
  // Simuler un temps de chargement pour montrer l'animation
  setTimeout(() => {
    isLoading.value = false
  }, 2500) // 2.5 secondes d'animation de chargement
})

const showConfirmation = () => {
  formSubmitted.value = true
}

const resetForm = () => {
  formSubmitted.value = false
}
</script>

<style>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Logo Loader Styles */
.logo-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-loader img {
  animation: pulse-logo 2s infinite alternate;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}

@keyframes pulse-logo {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}

.loader-bar {
  width: 200px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 16px;
}

.loader-progress {
  height: 100%;
  background-color: #0ea5e9;
  border-radius: 3px;
  animation: progress 2s ease-in-out forwards;
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}
</style>
