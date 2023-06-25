<template>
  <div class="relative" ref="checkboxContainer">
    <button
      class="flex items-center gap-4"
      @click.stop="toggleCheckList"
      role="combobox"
      :aria-expanded="isCheckListOpen"
    >
      <p class="text-sm font-bold">Filter <span class="hidden md:inline"> by status</span></p>

      <div class="transition-transform" :class="{ 'rotate-180': !isCheckListOpen }">
        <CaretIcon />
      </div>
    </button>

    <div
      class="absolute bg-white dark:bg-blue-200 rounded-lg top-[calc(100%+1.5rem)] min-w-[192px] left-2/4 -translate-x-2/4 shadow-xl shadow-[#48549F40] duration-300 dark:shadow-blue-500 py-6 pl-6 space-y-4"
      role="listbox"
      v-if="isCheckListOpen"
    >
      <InputCheckRadio
        v-for="filter in filters"
        :key="filter.name"
        :label="filter.name"
        v-model="selectedFilters"
        type="radio"
        name="invoice-filter"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CaretIcon from '../icons/CaretIcon.vue'

import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import InputCheckRadio from '../form/InputCheckRadio.vue'

const isCheckListOpen = ref(false)
const checkboxContainer = ref(null)
const selectedFilters = ref([])

const emit = defineEmits(['filter'])
const toggleCheckList = () => {
  isCheckListOpen.value = !isCheckListOpen.value
}
const filters = [{ name: 'draft' }, { name: 'pending' }, { name: 'paid' }]

onClickOutside(checkboxContainer, () => {
  isCheckListOpen.value = false
})

watch(selectedFilters, (newVal) => {
  emit('filter', newVal)
})
</script>
