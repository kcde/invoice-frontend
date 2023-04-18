<template>
  <BaseInput label="issue date">
    <button
      class="relative w-full py-4 pl-5 text-sm font-bold text-left text-blue-500 capitalize transition-colors duration-200 bg-transparent border border-gray-200 rounded outline-none appearance-none cursor-pointer dark:text-white dark:border-blue-200 leading-sm focus:border-purple-200 dark:focus:border-purple-200 focus:outline-none placeholder:text-blue-500/30 dark:bg-blue-300"
      role="combobox"
      :aria-expanded="calendarVisibility"
    >
      21 Aug 2021
    </button>

    <CalendarBox />
  </BaseInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../BaseInput.vue'
import CalendarBox from './CalendarBox.vue'

const calendarVisibility = ref(false)
</script>

<style scoped></style>
