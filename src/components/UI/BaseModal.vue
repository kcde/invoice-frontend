<template>
  <AppBackdrop :show="true" :zIndex="20">
    <div
      class="absolute p-8 bg-white rounded-lg top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 md:p-12 max-w-[480px]"
    >
      <slot></slot>
    </div>
  </AppBackdrop>
</template>

<script setup lang="ts">
import AppBackdrop from './AppBackdrop.vue'
</script>

<style scoped></style>
