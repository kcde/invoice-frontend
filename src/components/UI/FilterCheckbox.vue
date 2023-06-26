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
      class="absolute bg-white dark:bg-blue-200 rounded-lg top-[calc(100%+1.5rem)] min-w-[192px] left-2/4 -translate-x-2/4 shadow-xl shadow-[#48549F40] duration-300 dark:shadow-blue-500 py-6 pl-6 z-10"
      role="listbox"
      v-if="isCheckListOpen"
    >
      <div
        v-if="invoiceStore.invoiceFilter != ''"
        class="absolute top-2 right-4"
        @click="resetFilters"
      >
        <ClearFilterIcon />
      </div>

      <div class="space-y-4">
        <InputCheckRadio
          v-for="filter in filters"
          :key="filter.name"
          :label="filter.name"
          v-model="selectedFilter"
          type="checkbox"
          name="invoice-filter"
          :checked="filter.name == invoiceStore.invoiceFilter"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CaretIcon from '../icons/CaretIcon.vue'

import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import InputCheckRadio from '../form/InputCheckRadio.vue'
import ClearFilterIcon from '../icons/ClearFilterIcon.vue'
import { useInvoiceStore } from '@/stores/invoice'

const isCheckListOpen = ref(false)
const checkboxContainer = ref(null)
const selectedFilter = ref('')

const emit = defineEmits(['filter'])

const invoiceStore = useInvoiceStore()
const toggleCheckList = () => {
  isCheckListOpen.value = !isCheckListOpen.value
}
const filters = [{ name: 'draft' }, { name: 'pending' }, { name: 'paid' }]

function resetFilters() {
  invoiceStore.resetInvoiceFilter()
}

onClickOutside(checkboxContainer, () => {
  isCheckListOpen.value = false
})

watch(selectedFilter, (newVal) => {
  emit('filter', newVal)
})
</script>
