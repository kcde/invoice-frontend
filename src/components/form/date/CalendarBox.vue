<template>
  <!-- OPTIONS -->

  <div
    role="dialog"
    aria-modal="true"
    aria-label="Choose Date"
    ref="options"
    @click.prevent
    class="bg-white dark:bg-blue-200 absolute left-0 top-[calc(100%+8px)] w-full rounded-lg text-sm shadow-lg shadow-purple-100/40 dark:shadow-blue-500/40 z-10 max-w-[250px] max-h-96 px-5 pb-8 pt-6 overflow-y-scroll"
  >
    <div id="calender-header" class="flex items-center justify-between mb-8">
      <button class="px-2 py-1 cursor-pointer" @click="updateMonth('prev')">
        <CaretChippedIcon />
      </button>

      <p class="text-sm font-bold">
        {{ date.toLocaleString('default', { year: 'numeric', month: 'short' }) }}
        {{ shadowDaysStartNumbers.length }}
        <!-- {{ new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1 }} -->
      </p>

      <button class="px-2 py-1 rotate-180 cursor-pointer" @click="updateMonth('next')">
        <CaretChippedIcon />
      </button>
    </div>
    <div id="days " class="grid grid-cols-7 grid-rows-6 gap-4" tabindex="0">
      <!-- {{ numberOfDaysInCurrentMonth }} -->

      <div v-for="n of shadowDaysStartNumbers" :key="n">
        <p class="self-center text-sm font-bold opacity-5">{{ n }}</p>
      </div>

      <div
        class="cursor-pointer hover:text-purple-300"
        v-for="n of numberOfDaysInCurrentMonth"
        :key="n"
      >
        <p class="self-center text-sm font-bold">{{ n }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CaretChippedIcon from '@/components/icons/CaretChippedIcon.vue'
import { onMounted, ref, watch, computed } from 'vue'

const date = ref(new Date())
const month = ref(date.value.getMonth())
const day = ref(date.value.getDay())

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

const numberOfDaysInCurrentMonth = computed(() => {
  //  months are 0 index
  // when we put 0 as date for a new Date value it gives us the date of the last day of the previous month which we can get with .getDate() method

  return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate()
})
const numberOfDaysInPreviousMonth = computed(() => {
  return new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate()
})

const shadowDaysStartNumbers = computed(() => {
  // This handles the case where a certain month does not start from sunday,
  // this will get the number of days from the previous month, subtract it from the index of the start of the current month
  // and use the value to create filler dates in the calendar for

  const currentMonthStartDate = new Date(
    date.value.getFullYear(),
    date.value.getMonth(),
    1
  ).getDay()

  const numbersArray: number[] = []

  let calc = numberOfDaysInPreviousMonth.value - (currentMonthStartDate - 1)
  for (let i = calc; i <= numberOfDaysInPreviousMonth.value; i++) {
    numbersArray.push(i)
  }

  return numbersArray
})

onMounted(() => {
  setTimeout(() => {}, 2000)
})

watch(month, (newVal) => {
  date.value = new Date(date.value.setMonth(newVal))
})
</script>

<style scoped></style>
