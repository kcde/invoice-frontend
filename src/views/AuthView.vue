<template>
  <div class="grid pt-16 place-items-center">
    <div
      class="px-6 py-6 bg-white dark:bg-blue-300 md:px-16 md:py-12 rounded-3xl w-full max-w-[540px]"
    >
      <div class="p-4"><AppLogo class="w-full" /></div>

      <div>
        <h1 class="mb-8 text-lg text-center md:text-xl">{{ authStateText.header }}</h1>

        <form @submit.prevent class="mb-6">
          <p v-if="formError" class="pb-3 font-semibold text-red-200 capitalize">{{ formError }}</p>

          <div class="mb-8 space-y-6">
            <InputText
              name="email"
              label="Email address"
              placeholder="invoice@invoice.com"
              :show-error="true"
            />

            <InputPassword
              name="password"
              label="Password"
              placeholder=" Min 8 characters"
              :show-error="true"
            />
          </div>

          <MainButton :text="authStateText.button" class="w-full" @click="handleSubmit" />
        </form>
        <p class="text-center text-purple-100">
          {{ authStateText.footer }}
          <span class="text-purple-300 cursor-pointer" @click="switchAuthMode">{{
            authStateText.link
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@/components/icons/AppLogo.vue'
import { computed, watch } from 'vue'

import { useAuthStore } from '@/stores/auth'
import InputText from '@/components/form/InputText.vue'
import MainButton from '@/components/UI/buttons/MainButton.vue'
import InputPassword from '@/components/form/InputPassword.vue'

import { authFormSchema } from '@/utilities/form'
import { useForm } from 'vee-validate'
import { signUp, login } from '@/services'
import type { ISignUpPayload } from '@/types'
import router from '@/router'
import { ref } from 'vue'

const { errors, values, validate } = useForm({
  validationSchema: authFormSchema
})

const authStore = useAuthStore()

const authStateContent = {
  signup: {
    header: 'Create an account',
    footer: 'Already have an account?',
    link: 'Log in',
    button: 'Create account'
  },
  login: {
    header: 'Log in',
    footer: `Don't have an account?`,
    link: 'Sign up',
    button: 'Log in'
  }
}

const formError = ref('')

function switchAuthMode() {
  formError.value = ''

  if (authStore.authMode == 'login') {
    authStore.switchAuthMode('signup')
    return
  }
  if (authStore.authMode == 'signup') {
    authStore.switchAuthMode('login')
  }
}

function handleSubmit() {
  validate().then((validation) => {
    console.log()

    if (validation.valid) {
      authenticateUser()
    }
  })
}

async function authenticateUser() {
  try {
    let data

    if (authStore.authMode == 'signup') {
      data = await signUp(values as ISignUpPayload)
    } else {
      data = await login(values as ISignUpPayload)
    }

    if (data.error) {
      console.error(data.error)
      formError.value = data.error
    } else {
      if (data.email && data.token) {
        const userData = {
          email: data.email,
          token: data.token
        }

        authStore.setUserDetails(userData)
      } else {
        window.alert('Unexpected Error. Please refresh')
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const authStateText = computed(() => {
  if (authStore.authMode == 'login') return authStateContent.login
  return authStateContent.signup
})

watch(
  () => authStore.isAuthenticated,
  (newVal: boolean) => {
    if (newVal) {
      router.push({ name: 'home' })
    }
  }
)
</script>

<style scoped></style>
