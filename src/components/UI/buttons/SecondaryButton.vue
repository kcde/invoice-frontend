<template>
  <BaseButton
    class="text-purple-100 bg-gray-600 dark:bg-blue-200 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-blue-100"
    :disable="disable"
  >
    {{ text }}
  </BaseButton>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'

defineProps({
  text: {
    type: String,
    required: true
  },
  disable: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
