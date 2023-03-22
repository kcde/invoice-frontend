<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'

import useThemeStore from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ dark: themeStore.theme == 'dark' }">
    <div class="min-h-screen text-blue-500 transition-all dark:bg-blue-400 dark:text-white">
      <header><AppNavbar /></header>

      <main class="max-w-[730px] mx-6 lg:mx-auto border-gray-100/10 border">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
