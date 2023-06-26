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
import InvoiceItem from './InvoiceItem.vue'
import { useInvoiceStore } from '@/stores/invoice'

const invoiceStore = useInvoiceStore()
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
