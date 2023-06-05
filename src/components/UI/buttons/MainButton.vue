<template>
  <BaseButton class="px-4 py-4 tracking-tighter md:px-6" :class="buttonClass">
    {{ text }}
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  text: String,
  type: {
    type: String,
    validator: (val: string) => {
      return ['light', 'dark', 'colored', 'default'].includes(val)
    },
    default: 'default'
  }
})

const buttonClass = computed(() => {
  type buttonStyleList = {
    light: String
    dark: String
    colored: String
    default: String
  }

  const buttonClasses: buttonStyleList = {
    light:
      'bg-[#f9fafe] text-purple-100 hover:bg-gray-200 border border-gray-200 hover:text-purple-100 dark:bg-blue-200 dark:border-blue-200 dark:text-gray-200  dark:hover:bg-white dark:hover:text-blue-200   ',
    dark: 'bg-blue-100 text-gray-300 dark:text-gray-200    hover:bg-blue-500 dark:hover:bg-blue-300',
    colored: 'bg-red-200 text-white hover:bg-red-100 ',
    default: 'bg-purple-300 hover:bg-purple-200 text-white'
  }

  return buttonClasses[props.type as keyof buttonStyleList]
})
</script>
