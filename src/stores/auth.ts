import { defineStore } from 'pinia'
import { computed, reactive, ref, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const userDetails = reactive({
    email: '',
    token: ''
  })

  const isAuthenticated = computed(() => {
    return userDetails.token != ''
  })

  const authMode: Ref<'login' | 'signup'> = ref('signup')

  function switchAuthMode(mode: 'signup' | 'login') {
    authMode.value = mode
  }

  return { userDetails, isAuthenticated, authMode, switchAuthMode }
})
