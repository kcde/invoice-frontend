<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'

import useThemeStore from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ dark: themeStore.theme == 'dark' }">
    <div
      class="min-h-screen text-blue-500 transition-colors duration-300 bg-gray-100 dark:bg-blue-400 dark:text-white"
    >
      <AppNavbar />

      <main class="relative max-w-[730px] mx-6 py-8 md:py-14 lg:py-16 md:mx-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
