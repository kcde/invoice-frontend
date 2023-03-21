<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'

import useThemeStore from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ dark: themeStore.theme == 'dark' }">
    <div class="min-h-screen transition-all dark:bg-blue-400">
      <header><AppNavbar /></header>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
