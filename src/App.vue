<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'

import useThemeStore from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div id="theme-wrapper" :class="{ dark: themeStore.theme == 'dark' }">
    <div
      class="min-h-screen text-blue-500 transition-colors duration-300 bg-gray-100 dark:bg-blue-400 dark:text-white"
    >
      <AppNavbar />

      <main class="relative max-w-[730px] mx-6 py-8 md:py-14 lg:py-16 md:mx-auto">
        <RouterView v-slot="{ Component }">
          <Transition name="route" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* route transitions */

.route-enter-from {
  opacity: 0;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.route-enter-active,
.route-leave-active {
  transition: all 250ms ease-in-out;
}
</style>
