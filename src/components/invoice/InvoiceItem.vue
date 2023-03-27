<template>
  <div
    class="grid grid-cols-2 px-6 py-6 transition-colors bg-white border border-transparent rounded-lg shadow-md cursor-pointer md:py-4 md:grid-cols-5 invoice-item dark:bg-blue-300 hover:border-purple-300 md:items-center md:text-left"
  >
    <div>
      <p class="mb-6 text-sm font-bold md:mb-0"><span class="text-purple-100">#</span>RT3080</p>
    </div>
    <div class="md:col-start-3 md:row-start-1">
      <p class="text-sm text-right text-gray-300 dark:text-white md:text-left">Jensen Huang</p>
    </div>
    <div class="md:col-start-2 md:row-start-1">
      <p class="text-sm text-gray-300 dark:text-gray-200">Due 19 Aug 2021</p>
    </div>
    <div
      class="flex items-center col-start-2 row-start-2 row-end-4 gap-5 my-1 ml-auto md:my-0 md:row-start-1 md:col-start-5 md:row-end-auto"
    >
      <InvoiceStatus :status="invoice.status" />

      <div class="hidden rotate-90 md:block"><CaretIcon /></div>
    </div>
    <div><p class="font-bold tracking-normal text-md leading-xl">£ 1,800.90</p></div>
  </div>
</template>

<script setup lang="ts">
import CaretIcon from '../icons/CaretIcon.vue'
import InvoiceStatus from './InvoiceStatus.vue'

defineProps({
  invoice: {
    type: Object,
    required: true
  }
})
</script>

<style scoped></style>
