<template>
  <div class="p-6 bg-white rounded-lg invoice-item dark:bg-blue-300">
    <div>
      <p class="mb-6 text-sm font-bold"><span class="text-purple-100">#</span>RT3080</p>
    </div>
    <div><p class="text-sm text-right text-gray-300 dark:text-white">Jensen Huang</p></div>
    <div class=""><p class="text-sm text-gray-300 dark:text-gray-200">Due 19 Aug 2021</p></div>
    <div class="col-start-2 row-start-2 row-end-4 my-1 ml-auto">
      <InvoiceStatus status="draft" />
    </div>
    <div><p class="font-bold tracking-normal text-md leading-xl">£ 1,800.90</p></div>
  </div>
</template>

<script setup lang="ts">
import InvoiceStatus from './InvoiceStatus.vue'
</script>

<style scoped>
.invoice-item {
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-template-rows: auto auto auto;
}
</style>
