<template>
  <div class="">
    <Teleport to="body">
      <AppBackdrop :show="openForm" @clicked="openForm = false" />
    </Teleport>
    <Teleport to="main">
      <Transition>
        <InvoiceForm v-if="openForm">
          <template v-slot:form-head>hffjj</template>
        </InvoiceForm>
      </Transition>
    </Teleport>
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
            @click="openForm = !openForm"
          >
            <AddIcon />
            <p>New <span class="hidden md:inline">Invoice</span></p>
          </div>
        </BaseButton>
      </div>
    </div>
    <!-- =================== -->

    <!-- Invoice Page Body -->
    <div class="mt-8 md:mt-14 lg:mt-16">
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
import AppBackdrop from '@/components/UI/AppBackdrop.vue'
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'
function openInvoiceForm(): void {
  console.log('open form')
}

const invoices = ref([])
const openForm = ref(true)
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
