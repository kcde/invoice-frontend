import BaseButton from './BaseButton.vue';

<template>
  <BaseButton class="px-6 py-4 text-white capitalize bg-purple-300 hover:bg-purple-200">
    {{ text }}
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps({
  text: String
})
</script>
