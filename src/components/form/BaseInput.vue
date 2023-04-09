<template>
  <label class="relative block">
    <p
      class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]"
      :class="{ 'sr-only': !showLabel }"
    >
      {{ label }}
    </p>
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true
  },

  showLabel: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>
