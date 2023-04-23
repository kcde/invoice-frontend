<template>
  <BaseInput label="issue date" @outside-clicked="handleOutsideClick">
    <button
      class="relative w-full py-4 pl-5 text-sm font-bold text-left text-blue-500 capitalize transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300"
      role="combobox"
      :aria-expanded="showCalendar"
      @click="toggleCalendar()"
      ref="toggleButton"
    >
      {{ formattedSelectedDate }}
    </button>

    <CalendarBox
      @date-selected="updateDate"
      @close-calendar="handleCalendarClose"
      :selectedDate="selectedDate"
      :showCalendar="showCalendar"
    />
  </BaseInput>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '../BaseInput.vue'
import CalendarBox from './CalendarBox.vue'

const selectedDate = ref(new Date())
const showCalendar = ref(false)
const toggleButton = ref(false)

function toggleCalendar(state: boolean | undefined = undefined): void {
  if (state != undefined) {
    showCalendar.value = state
    return
  }

  showCalendar.value = !showCalendar.value
}
function updateDate(date: Date) {
  selectedDate.value = date
  handleCalendarClose()
}

function handleCalendarClose() {
  toggleCalendar(false)
  ;(toggleButton.value as unknown as HTMLButtonElement).focus()
}

function handleOutsideClick() {
  toggleCalendar(false)
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
