<template>
  <nav class="w-full bg-blue-100">
    <div
      class="flex items-center justify-between w-full pr-6 border-r border-r-gray-400 space-between"
    >
      <div class="max-w-[72px]">
        <img src="@/assets/images/logo.png" class="w-full" alt="invoicer logo" />
      </div>

      <div>sun|moon</div>
    </div>

    <div class="relative flex self-center h-full">
      <div class="self-center px-6"><AppAvatar /></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppAvatar from './UI/AppAvatar.vue'
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>
