<template>
  <div class="">
    <AppBackdrop :show="openForm" @clicked="openForm = false" />
    <Teleport to="main">
      <Transition>
        <InvoiceForm v-if="openForm" @close-form="openForm = false"> </InvoiceForm>
      </Transition>
    </Teleport>
    <!-- Invoice Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg md:text-xl">Invoices</h1>

        <div class="text-sm font-medium text-gray-300 dark:text-gray-200">
          <p class="hidden md:block">{{ invoiceCountText }}</p>

          <p class="md:hidden">{{ invoiceStore.invoicesToDisplay.length }} invoice</p>
        </div>
      </div>
      <div class="flex items-center justify-between gap-[18px] md:gap-10">
        <div>
          <FilterCheckbox @filter="updateFilter" />
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
            <p class="font-bold">New <span class="hidden md:inline">Invoice</span></p>
          </div>
        </BaseButton>
      </div>
    </div>
    <!-- =================== -->

    <!-- Invoice Page Body -->
    <div class="mt-8 md:mt-14 lg:mt-16">
      <div v-if="invoiceStore.invoicesToDisplay.length">
        <InvoiceList :filter="filter" />
      </div>

      <div class="mt-28" v-else>
        <p class="text-lg font-extrabold text-center" v-if="fetchingInvoice">LOADING INVOICES...</p>

        <EmptyInvoiceCTA v-else />
      </div>
    </div>
    <!-- ============ -->
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/UI/buttons/BaseButton.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import FilterCheckbox from '@/components/UI/FilterCheckbox.vue'
import EmptyInvoiceCTA from '@/components/invoice/EmptyInvoiceCTA.vue'
import InvoiceList from '@/components/invoice/InvoiceList.vue'
import { computed, onMounted, ref, type Ref } from 'vue'
import AppBackdrop from '@/components/UI/AppBackdrop.vue'
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'
import { useInvoiceStore } from '@/stores/invoice'
import { getAllInvoice } from '@/services/invoice.service'
import type { IInvoiceFilter } from '@/types/index'

const invoiceStore = useInvoiceStore()
function openInvoiceForm(): void {}

const openForm = ref(false)
const fetchingInvoice = ref(false)

const filter: Ref<IInvoiceFilter> = ref()

const invoiceCountText = computed(() => {
  if (invoiceStore.invoicesToDisplay.length > 1)
    return `There are ${invoiceStore.invoicesToDisplay.length} ${
      invoiceStore.invoiceFilter || 'total'
    }   invoices`
  else if (invoiceStore.invoicesToDisplay.length == 1)
    return `There is ${invoiceStore.invoicesToDisplay.length} ${
      invoiceStore.invoiceFilter || ''
    }  invoice`
  return `No ${invoiceStore.invoiceFilter || ''} invoices `
})

function updateFilter(e: IInvoiceFilter) {
  console.log(e)

  invoiceStore.updateInvoiceFilter(e)
}

onMounted(async () => {
  fetchingInvoice.value = true
  try {
    const invoices = await getAllInvoice()
    invoiceStore.setInvoice(invoices)
    fetchingInvoice.value = false
  } catch (err) {
    console.log(err)
    fetchingInvoice.value = false

    alert('something went wrong')
  }
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.35s ease;
}

.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  transform: translateX(-100%);
}
</style>
