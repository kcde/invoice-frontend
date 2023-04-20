<template>
  <BaseInput label="issue date">
    <button
      class="relative w-full py-4 pl-5 text-sm font-bold text-left text-blue-500 capitalize transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300"
      role="combobox"
      :aria-expanded="calendarVisibility"
    >
      {{ formattedSelectedDate }}
    </button>

    <CalendarBox @date-selected="updateDate" :selectedDate="selectedDate" />
  </BaseInput>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '../BaseInput.vue'
import CalendarBox from './CalendarBox.vue'

const calendarVisibility = ref(false)

const selectedDate = ref(new Date())

function updateDate(date: Date) {
  selectedDate.value = date
}

const formattedSelectedDate = computed(() => {
  return selectedDate.value.toLocaleString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})
</script>

<style scoped></style>
