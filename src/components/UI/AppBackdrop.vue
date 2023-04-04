<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="show"
        class="fixed top-0 left-0 z-[1] w-full h-full bg-black/50"
        @click="$emit('clicked')"
      ></div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits(['clicked'])
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
v-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
