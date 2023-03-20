<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-blue-400">
    <header><AppNavbar /></header>
    <RouterView />
  </div>
</template>

<style scoped></style>
