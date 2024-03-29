<template>
  <BaseInput label="issue date" @outside-clicked="handleOutsideClick">
    <button
      type="button"
      class="relative w-full py-4 pl-5 text-sm font-bold text-left text-blue-500 capitalize transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300"
      role="combobox"
      aria-live="polite"
      :aria-label="longFormattedSelectedDate"
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
import { computed, ref, watch } from 'vue'
import BaseInput from '../BaseInput.vue'
import CalendarBox from './CalendarBox.vue'
import { formatDate } from '@/utils'

const props = defineProps({
  selectedDate: {
    default: new Date()
  }
})
const emit = defineEmits(['dateUpdate'])

const selectedDate = ref(props.selectedDate)
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
const longFormattedSelectedDate = computed(() => {
  return formatDate(selectedDate.value)
})

watch(selectedDate, (newVal) => {
  emit('dateUpdate', newVal)
})
</script>

<style scoped></style>
