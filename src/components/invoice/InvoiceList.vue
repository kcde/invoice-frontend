<template>
  <div class="space-y-4">
    <InvoiceItem v-for="invoice in invoiceStore.invoices" :key="invoice.id" :invoice="invoice" />
    <!-- <InvoiceItem :invoice="{ status: 'pending' }" />
    <InvoiceItem :invoice="{ status: 'draft' }" /> -->
  </div>
</template>

<script setup lang="ts">
import InvoiceItem from './InvoiceItem.vue'
import { useInvoiceStore } from '@/stores/invoice'

import { getAllInvoice } from '@/services/invoice.service'
import { onMounted } from 'vue'

const invoiceStore = useInvoiceStore()
</script>
