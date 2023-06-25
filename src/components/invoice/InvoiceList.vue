<template>
  <div class="space-y-4">
    <TransitionGroup name="invoice" appear>
      <InvoiceItem
        v-for="invoice in invoiceStore.invoicesToDisplay"
        :key="invoice.id"
        :invoice="invoice"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import InvoiceItem from './InvoiceItem.vue'
import { useInvoiceStore } from '@/stores/invoice'
import type { IInvoiceFilter } from '@/types'

const invoiceStore = useInvoiceStore()

const props = defineProps({
  filter: {
    type: String as PropType<IInvoiceFilter>,
    required: false,
    default: ''
  }
})

const invoices = computed(() => {
  return invoiceStore.invoices.filter((inv) => {
    if (!props.filter) {
      return inv
    }

    return inv.status == props.filter
  })
})
</script>

<style scoped>
.invoice-move,
.invoice-enter-active,
.invoice-leave-active {
  transition: all 0.5s ease-in;
}

.invoice-enter-from {
  opacity: 0;
}
</style>
