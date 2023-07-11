<template>
  <div
    class="flex items-center justify-center gap-2 px-4 py-3 rounded-md max-w-[104px]"
    :class="statusClass"
  >
    <div
      class="w-2 h-2 rounded-full"
      :class="{
        'bg-orange': status == 'pending',
        'bg-green': status == 'paid',
        'bg-blue-100 dark:bg-gray-200': status == 'draft'
      }"
    ></div>
    <p class="text-sm font-bold capitalize text-[inherit]">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  status: {
    required: true,
    type: String,
    validator(value: string) {
      return ['draft', 'pending', 'paid'].includes(value)
    }
  }
})

type StatusStyleList = {
  pending: string
  draft: string
  paid: string
}

const statusClass = computed(() => {
  const statusStyles: StatusStyleList = {
    pending: 'bg-orange/10 text-orange',
    draft: 'bg-blue-100/10 dark:bg-gray-200/10 text-blue-100 dark:text-gray-200',
    paid: 'bg-green/10 text-green'
  }

  return statusStyles[props.status as keyof StatusStyleList]
})
</script>

<style scoped></style>
