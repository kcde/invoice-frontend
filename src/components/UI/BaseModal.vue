<template>
  <AppBackdrop :show="showModal" :zIndex="20">
    <div
      class="relative mx-auto p-8 bg-white dark:bg-blue-200 rounded-lg top-2/4 -translate-y-2/4 md:p-12 max-w-[480px]"
    >
      <slot></slot>
    </div>
  </AppBackdrop>
</template>

<script setup lang="ts">
import AppBackdrop from './AppBackdrop.vue'

defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped></style>
