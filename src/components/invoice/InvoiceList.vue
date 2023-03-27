import InvoiceItem from './InvoiceItem.vue';

<template>
  <div class="space-y-4">
    <InvoiceItem :invoice="{ status: 'paid' }" />
    <InvoiceItem :invoice="{ status: 'pending' }" />
    <InvoiceItem :invoice="{ status: 'draft' }" />
  </div>
</template>

<script setup lang="ts">
import InvoiceItem from './InvoiceItem.vue'
</script>
