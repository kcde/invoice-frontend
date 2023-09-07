import type { ISignUpPayload, ISignUpResponse, IUserDetails } from '@/types'
import { defineStore } from 'pinia'
import { computed, reactive, ref, type Ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userDetails = ref({
      email: '',
      token: ''
    })

    function setUserDetails(payload: IUserDetails) {
      userDetails.value = payload
    }

    const isAuthenticated = computed(() => {
      return userDetails.value.token != ''
    })

    const authMode: Ref<'login' | 'signup'> = ref('login')

    function switchAuthMode(mode: 'signup' | 'login') {
      authMode.value = mode
    }

    function resetAuthStore() {
      userDetails.value = {
        email: '',
        token: ''
      }
    }

    return {
      userDetails,
      isAuthenticated,
      authMode,
      switchAuthMode,
      setUserDetails,
      resetAuthStore
    }
  },
  {
    persist: {
      key: 'invoice-app-user-store'
    }
  }
)
