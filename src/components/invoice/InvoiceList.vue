<template>
  <div class="space-y-4">
    <TransitionGroup name="invoice">
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
  transition: all 250ms ease-in;
}

.invoice-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
