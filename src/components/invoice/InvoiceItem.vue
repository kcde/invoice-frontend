<template>
  <RouterLink :to="`/invoice/${invoice.id}`" class="block">
    <div
      class="grid grid-cols-2 px-6 py-6 transition-colors bg-white border border-transparent rounded-lg shadow-md cursor-pointer md:py-4 md:grid-cols-5 invoice-item dark:bg-blue-300 hover:border-purple-300 md:items-center md:text-left"
    >
      <div>
        <p class="mb-6 text-sm font-bold uppercase md:mb-0">
          <span class="text-purple-100">#</span>{{ invoice.id }}
        </p>
      </div>
      <div class="md:col-start-3 md:row-start-1">
        <p class="text-sm text-right text-gray-300 capitalize dark:text-white md:text-left">
          {{ invoice.client.name }}
        </p>
      </div>
      <div class="md:col-start-2 md:row-start-1">
        <p class="text-sm text-purple-100 dark:text-gray-200">
          <span class="text-gray-300 dark:text-gray-200">Due</span> {{ dueDate }}
        </p>
      </div>
      <div
        class="flex items-center col-start-2 row-start-2 row-end-4 gap-5 my-1 ml-auto md:my-0 md:row-start-1 md:col-start-5 md:row-end-auto"
      >
        <InvoiceStatus :status="invoice.status" />

        <div class="hidden rotate-90 md:block"><CaretIcon /></div>
      </div>
      <div>
        <p class="font-bold -tracking-normal text-md leading-xl">
          {{ formatPrice(invoiceTotal) }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import CaretIcon from '../icons/CaretIcon.vue'
import InvoiceStatus from './InvoiceStatus.vue'
import type { IInvoice } from '@/types'
import { addDaysToDate, calculateItemsTotal, formatDate, formatPrice } from '@/utils'

const props = defineProps({
  invoice: {
    type: Object as PropType<IInvoice>,
    required: true
  }
})

const dueDate = computed(() => {
  return formatDate(addDaysToDate(props.invoice.issueDate, Number(props.invoice.paymentTerm)))
})

const invoiceTotal = computed(() => {
  return calculateItemsTotal(props.invoice.items)
})
</script>

<style scoped></style>
