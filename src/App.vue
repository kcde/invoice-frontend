<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'

import useThemeStore from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ dark: themeStore.theme == 'dark' }">
    <div
      class="min-h-screen text-blue-500 transition-all duration-300 bg-gray-100 dark:bg-blue-400 dark:text-white"
    >
      <AppNavbar />
      <div class="side-tray"></div>

      <main class="max-w-[730px] mx-6 pt-8 md:pt-14 lg:pt-16 md:mx-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
