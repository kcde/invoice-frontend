<template>
  <BaseButton class="w-full py-4 text-purple-100 bg-gray-600 hover:bg-gray-200">
    {{ text }}
  </BaseButton>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'

defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>
