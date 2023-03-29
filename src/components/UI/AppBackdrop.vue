<template>
  <div
    class="fixed top-0 left-0 z-[1] w-full h-full bg-blue-500/50"
    @click="$emit('clicked')"
  ></div>
</template>

<script setup lang="ts">
defineEmits(['clicked'])
</script>
