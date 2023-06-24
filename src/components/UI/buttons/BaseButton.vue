<template>
  <button
    type="button"
    class="text-sm font-bold capitalize transition-colors duration-300 rounded-full focus:outline-1 disabled:opacity-30 disabled:cursor-not-allowed"
    :disabled="props.disable"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disable: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
