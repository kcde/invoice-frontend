<template>
  <nav class="w-full bg-blue-100 lg:rounded-r-[20px] sticky z-20">
    <div
      class="flex items-center justify-between w-full pr-6 border-r border-gray-400 lg:flex-col lg:pr-0 lg:pb-6 lg:border-r-0 lg:border-b space-between"
    >
      <div class="w-[72px] md:w-[80px] lg:w-[103px]">
        <img src="@/assets/images/logo.png" class="w-full" alt="invoicer logo" />
      </div>

      <button>
        <Transition mode="out-in">
          <div @click="themeStore.updateTheme('light')" v-if="themeStore.theme == 'dark'">
            <SunIcon />
          </div>

          <div @click="themeStore.updateTheme('dark')" v-else><MoonIcon /></div>
        </Transition>
      </button>
    </div>

    <div class="relative flex self-center h-full">
      <div v-if="showAvatar && authStore" class="self-center px-6 mx-auto lg:px-0 lg:py-6">
        <AppAvatar :email="authStore.userDetails.email" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppAvatar from '../UI/AppAvatar.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import useThemeStore from '@/stores/theme'

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

const showAvatar = computed(() => {
  return authStore.isAuthenticated
})
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto;
}

@media screen and (min-width: 1024px) {
  nav {
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    position: absolute;
    width: 103px;
    top: 0;
    bottom: 0;
    height: 100%;
  }
}
</style>
