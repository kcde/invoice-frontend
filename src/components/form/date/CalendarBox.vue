<template>
  <!-- OPTIONS -->

  <div
    v-if="showCalendar"
    role="dialog"
    aria-modal="true"
    aria-label="Choose Date"
    ref="options"
    tabindex="0"
    @click.prevent
    class="bg-white dark:bg-blue-200 absolute left-0 top-[calc(100%+8px)] w-full rounded-lg text-sm shadow-lg shadow-purple-100/40 dark:shadow-blue-500/40 z-10 max-w-[250px] max-h-96 px-5 pb-8 pt-6 overflow-y-scroll"
  >
    <div id="calender-header" class="flex items-center justify-between mb-8">
      <button class="px-2 py-1 cursor-pointer" @click="updateMonth('prev')">
        <CaretChippedIcon />
      </button>

      <p class="text-sm font-bold">
        {{ date.toLocaleString('default', { year: 'numeric', month: 'short' }) }}
      </p>

      <button class="px-2 py-1 rotate-180 cursor-pointer" @click="updateMonth('next')">
        <CaretChippedIcon />
      </button>
    </div>
    <div
      id="days "
      class="grid grid-cols-7 grid-rows-4 [grid-auto-rows:1fr] gap-4 text-center"
      tabindex="0"
      ref="days"
    >
      <!-- These are filler dates for starting -->
      <div v-for="n of shadowDaysStartNumbers" :key="n">
        <p class="self-center text-sm font-bold opacity-5">{{ n }}</p>
      </div>

      <div
        class="cursor-pointer decoration-purple-300 hover:text-purple-300 focus:outline-purple-300"
        :class="{
          'text-purple-300 ': isSelectedDate(n)
        }"
        :aria-selected="isSelectedDate(n)"
        v-for="n of numberOfDaysInCurrentMonth"
        :key="n"
        @click="selectDate(n)"
        @keydown="(e) => handleKeyPressOnDate(e, n)"
        @keydown.tab.prevent="emit('closeCalendar')"
        :data-date="generateDateStringWithDate(n)"
        tabindex="-1"
      >
        <p class="text-sm font-bold">{{ n }}</p>
      </div>

      <!-- These are filler dates for ending -->
      <div class="self-center" v-for="n of shadowDaysEndNumbers" :key="n">
        <p class="text-sm font-bold opacity-5">{{ n }}</p>
      </div>
    </div>
  </div>

  <template> </template>
</template>

<script setup lang="ts">
import CaretChippedIcon from '@/components/icons/CaretChippedIcon.vue'
import { compareDate } from '@/utils'
import { ref, computed, nextTick, watchEffect } from 'vue'

const emit = defineEmits(['dateSelected', 'closeCalendar'])
const props = defineProps({
  selectedDate: Date,
  showCalendar: Boolean
})

const days = ref(null)
const options = ref(null)
const date = ref(props.selectedDate as Date)
const dateToFocus = ref(date.value)

function generateDateStringWithDate(n: number) {
  if (n < 1 || n > 31) {
    throw new Error('Number must be within a calendar date range')
  }

  let year = date.value.getFullYear()
  let month = date.value.getMonth() + 1

  return `${year}-${month}-${n}`
}

function handleKeyPressOnDate(e: KeyboardEvent, n: number) {
  // console.log(e.code)
  // e.preventDefault()

  const keyPressed = e.code

  switch (keyPressed) {
    case 'Space' || 'Enter':
      selectDate(n)

      break
    case 'Tab':
      emit('closeCalendar')
      break
    case 'ArrowLeft':
      focusPrevDay()
      break
    case 'ArrowRight':
      focusNextDay()
      break
    default:
      break
  }
}

function focusCurrDay() {
  const selectableDates = document.querySelectorAll('[data-date]')

  selectableDates.forEach((el) => {
    const dateElement = el as unknown as HTMLElement

    if (
      generateDateStringWithDate(dateToFocus.value.getDate()) ==
      (dateElement as unknown as HTMLElement).dataset.date
    ) {
      dateElement.tabIndex = 0
      dateElement.focus()
    }
  })
}

function focusPrevDay() {
  // take currently focused day
  //if currentSelectedDate's day == 1
  // move to prevMonth
  //focus on the last day PrevMonth
  //{use the function generateDateStringWithDate}

  if (dateToFocus.value.getDate() == 1) {
    updateMonth('prev')

    //wait for dom to update
    nextTick(() => {
      dateToFocus.value = new Date(dateToFocus.value.getFullYear(), dateToFocus.value.getMonth(), 0)
    })
  } else {
    dateToFocus.value = new Date(
      dateToFocus.value.getFullYear(),
      dateToFocus.value.getMonth(),
      dateToFocus.value.getDate() - 1
    )
  }

  // const selectableDates = document.querySelectorAll('[data-date]')
  let selectableDates = document.querySelectorAll('[data-date]')

  selectableDates.forEach((el) => {
    const dateElement = el as unknown as HTMLElement

    if (
      generateDateStringWithDate(dateToFocus.value.getDate()) ==
      (dateElement as unknown as HTMLElement).dataset.date
    ) {
      dateElement.focus()
    }
  })
}
function focusNextDay() {
  // take currently focused day
  //if currentSelectedDate's day == 1
  // move to prevMonth
  //focus on the last day PrevMonth
  //{use the function generateDateStringWithDate}
  const currentMonthLastDate = new Date(
    dateToFocus.value.getFullYear(),
    dateToFocus.value.getMonth() + 1,
    0
  ).getDate()

  if (dateToFocus.value.getDate() == currentMonthLastDate) {
    updateMonth('next')

    //wait for dom to update
    nextTick(() => {
      dateToFocus.value = new Date(
        dateToFocus.value.getFullYear(),
        dateToFocus.value.getMonth() + 1,
        1
      )
    })
  } else {
    dateToFocus.value = new Date(
      dateToFocus.value.getFullYear(),
      dateToFocus.value.getMonth(),
      dateToFocus.value.getDate() + 1
    )
  }
  // const selectableDates = document.querySelectorAll('[data-date]')
  let selectableDates = document.querySelectorAll('[data-date]')

  selectableDates.forEach((el) => {
    const dateElement = el as unknown as HTMLElement

    if (
      generateDateStringWithDate(dateToFocus.value.getDate()) ==
      (dateElement as unknown as HTMLElement).dataset.date
    ) {
      dateElement.focus()
    }
  })
}

function updateMonth(direction: 'next' | 'prev') {
  if (direction == 'next') {
    if (date.value.getMonth() == 11) {
      date.value = new Date(date.value.getFullYear() + 1, 0)
      return
    }
    date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1)
  }

  if (direction == 'prev') {
    if (date.value.getMonth() == 0) {
      date.value = new Date(date.value.getFullYear() - 1, 11)
      return
    }
    date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1)
  }
}

function isSelectedDate(dateNumber: number) {
  const tempDate = new Date(date.value.getFullYear(), date.value.getMonth(), dateNumber)

  return compareDate(props.selectedDate as Date, tempDate)
}

function selectDate(selectedDate: number) {
  date.value = new Date(date.value.setDate(selectedDate))

  emit('dateSelected', date.value)
}

const numberOfDaysInCurrentMonth = computed(() => {
  //  months are 0 index
  // when we put 0 as date for a new Date value it gives us the date of the last day of the previous month which we can get with .getDate() method

  return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate()
})

const numberOfDaysInPreviousMonth = computed(() => {
  return new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate()
})

const shadowDaysStartNumbers = computed((): number[] => {
  // This handles the case where a certain month does not start from sunday,
  // this will get the number of days from the previous month, subtract it from the index of the start of the current month
  // and use the value to create filler dates in the calendar for

  const currentMonthStartDate = new Date(
    date.value.getFullYear(),
    date.value.getMonth(),
    1
  ).getDay()

  const numbersArray: number[] = []

  let dateToCarryOverFromLastMonth = numberOfDaysInPreviousMonth.value - (currentMonthStartDate - 1)
  for (let i = dateToCarryOverFromLastMonth; i <= numberOfDaysInPreviousMonth.value; i++) {
    numbersArray.push(i)
  }

  return numbersArray
})

const shadowDaysEndNumbers = computed((): number[] => {
  // This handles the case where a certain month does not end on a saturday,
  // this will get the the index of the day the current displaying month ends
  // adds 1 to it to accomodate for the zero indexing,
  // then subtracts that number from 7 which represents total number of days in a week
  // the resulting number will then be used to loop and create filler number to represent the continuation of date for the next month

  //get index of last day + 1
  const currentMonthEndDay =
    new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDay() + 1

  const numbersArray: number[] = []

  let dateToBorrowFromNextMonth = 7 - currentMonthEndDay
  for (let i = 1; i <= dateToBorrowFromNextMonth; i++) {
    numbersArray.push(i)
  }

  return numbersArray
})

watchEffect(() => {
  if (options.value && props.showCalendar) {
    focusCurrDay()
  }
})
</script>

<style scoped></style>
