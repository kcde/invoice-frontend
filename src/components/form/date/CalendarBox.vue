<template>
  <!-- OPTIONS -->

  <div
    role="dialog"
    aria-modal="true"
    aria-label="Choose Date"
    ref="options"
    @click.prevent
    class="bg-white dark:bg-blue-200 absolute left-0 top-[calc(100%+8px)] w-full rounded-lg text-sm font-bold shadow-lg shadow-purple-100/40 dark:shadow-blue-500/40 z-10 max-w-[250px] max-h-96 px-5 pb-8 pt-6 overflow-y-scroll"
  >
    <div id="calender-header" class="flex items-center justify-between mb-8">
      <div class="px-2 py-1 cursor-pointer" @click="updateMonth('prev')">
        <CaretChippedIcon />
      </div>

      <p class="text-sm font-bold">
        {{ date.toLocaleString('default', { year: 'numeric', month: 'short' }) }}
      </p>

      <div class="px-2 py-1 rotate-180 cursor-pointer" @click="updateMonth('next')">
        <CaretChippedIcon />
      </div>
    </div>
    <div id="days"></div>
  </div>
</template>

<script setup lang="ts">
import CaretChippedIcon from '@/components/icons/CaretChippedIcon.vue'
import { onMounted, ref, watch } from 'vue'

const date = ref(new Date())
const month = ref(date.value.getMonth())
const day = ref(date.value.getDate())

function updateMonth(direction: 'next' | 'prev') {
  if (direction == 'next') {
    if (month.value == 11) {
      month.value = 0
      date.value = new Date(date.value.setFullYear(date.value.getFullYear() + 1))
      return
    }
    month.value++
  }

  if (direction == 'prev') {
    if (month.value == 0) {
      month.value = 11
      date.value = new Date(date.value.setFullYear(date.value.getFullYear() - 1))
      return
    }
    month.value--
  }
}

onMounted(() => {
  setTimeout(() => {}, 2000)
})

watch(month, (newVal) => {
  date.value = new Date(date.value.setMonth(newVal))
})
</script>

<style scoped></style>
