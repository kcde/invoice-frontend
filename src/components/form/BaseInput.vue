<template>
  <label class="relative block" ref="inputContainer">
    <p
      class="text-sm text-purple-100 capitalize dark:text-gray-200 mb-[10px]"
      :class="{ 'sr-only': !showLabel, 'text-red-200 dark:text-red-200': errorMessage }"
    >
      {{ label }}

      <span></span>
      <span></span>
    </p>
    <slot></slot>

    <p class="mt-1 text-sm text-red-200" v-if="showError">{{ errorMessage }}</p>
  </label>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const inputContainer = ref(null)
const emit = defineEmits(['outside-clicked'])
defineProps({
  label: {
    type: String,
    required: true
  },

  showLabel: {
    type: Boolean,
    required: false,
    default: true
  },

  showError: {
    type: Boolean,
    required: false,
    default: false
  },

  errorMessage: {
    type: String,
    required: false,
    default: ''
  }
})

onClickOutside(inputContainer, () => {
  emit('outside-clicked')
})
</script>
