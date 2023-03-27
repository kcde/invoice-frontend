<template>
  <div class="">
    <!-- Invoice Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg md:text-xl">Invoices</h1>

        <div class="text-sm font-medium text-gray-300 dark:text-gray-200">
          <p class="hidden md:block">There are 7 total invoices</p>

          <p class="md:hidden">7 invoices</p>
        </div>
      </div>
      <div class="flex items-center justify-between gap-[18px] md:gap-10">
        <div>
          <FilterCheckbox />
        </div>

        <BaseButton
          class="transition-colors bg-purple-300 hover:bg-purple-200"
          @click="openInvoiceForm"
        >
          <div
            class="flex items-center gap-2 py-[6px] pl-[6px] md:py-2 md:pl-2 pr-4 text-white md:gap-4"
          >
            <AddIcon />
            <p>New <span class="hidden md:inline">Invoice</span></p>
          </div>
        </BaseButton>
      </div>
    </div>
    <!-- =================== -->

    <!-- Invoice Page Body -->
    <div>
      <div v-if="invoices.length">
        <InvoiceList />
      </div>

      <div class="mt-28" v-else>
        <EmptyInvoiceCTA />
      </div>
    </div>
    <!-- ============ -->
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/UI/buttons/BaseButton.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import FilterCheckbox from '@/components/UI/FilterCheckbox.vue'
import EmptyInvoiceCTA from '@/components/EmptyInvoiceCTA.vue'
import InvoiceList from '@/components/invoice/InvoiceList.vue'
import { ref } from 'vue'

function openInvoiceForm(): void {
  console.log('open form')
}

const invoices = ref([0])
</script>
