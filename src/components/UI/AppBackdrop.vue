<template>
  <Teleport to="#theme-wrapper">
    <Transition name="backdrop">
      <div
        v-if="show"
        class="fixed top-0 left-0 w-full h-full px-6 bg-black/50 d"
        @click="$emit('clicked')"
        :style="{ zIndex: props.zIndex || 1 }"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

defineEmits(['clicked'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  zIndex: {
    type: Number,
    required: false
  }
})

watchEffect(() => {
  const body: HTMLElement = document.querySelector('body') as HTMLBodyElement

  if (props.show) {
    body.style.overflow = 'hidden'
  } else {
    body.style.overflow = ''
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
