<template>
  <div class="relative">
    <BaseModal :showModal="openModal">
      <h4 class="text-lg md:text-[24px] font-bold leading-[32px] mb-2 dark:text-white">
        Confirm Delete
      </h4>
      <p class="mb-6 font-medium text-gray-300 dark:texxt-gray-200">
        Are you sure you want to delete invoice #<span class="uppercase">{{ invoice.id }}</span
        >? This action cannot be undone.
      </p>

      <div class="flex justify-end gap-2">
        <SecondaryButton text="cancel" @click="openModal = false" />
        <MainButton text="Delete" type="colored" @click="removeInvoice(invoice.id)" />
      </div>
    </BaseModal>

    <AppBackdrop :show="openForm" @clicked="openForm = false" />
    <Teleport to="main">
      <Transition>
        <InvoiceForm
          v-if="openForm"
          @close-form="openForm = false"
          :initialValues="invoice"
          edit
          @invoice-updated="editInvoice"
        >
        </InvoiceForm>
      </Transition>
    </Teleport>
    <div class="mb-8">
      <RouterLink to="/" class="cursor-pointer">
        <div class="flex items-center gap-6 text-sm">
          <div class="-rotate-90">
            <CaretIcon />
          </div>
          Go back
        </div>
      </RouterLink>
    </div>

    <div class="grid gap-4 mb-20 md:mb-0 md:gap-6">
      <!-- Header -->
      <header
        class="items-center justify-between px-6 py-5 bg-white rounded-lg md:px-8 dark:bg-blue-300 md:flex"
      >
        <div class="flex items-center justify-between md:gap-4">
          <span class="text-sm">Status</span>
          <InvoiceStatus :status="invoice.status" />
        </div>

        <!-- buttons -->
        <div class="hidden gap-2 md:flex">
          <SecondaryButton text="edit" @click="openForm = true" />

          <MainButton
            text="Delete"
            @click="confirmInvoiceDelete"
            :disable="deletingInvoice"
            type="colored"
          />

          <MainButton text="Mark as paid" @click="payInvoice(invoice.id)" v-if="!isInvoicePaid" />
        </div>
      </header>

      <div class="px-6 py-5 bg-white rounded-lg md:p-8 lg:p-[42px] dark:bg-blue-300">
        <!-- info section 1 -->
        <div class="flex flex-col mb-8 sm:flex-row gap-7 sm:justify-between">
          <div class="text-sm">
            <p class="mb-2 font-bold uppercase text-md">
              <span class="text-gray-300">#</span>{{ invoice.id }}
            </p>
            <p class="text-sm font-medium text-purple-100 capitalize">{{ invoice.description }}</p>
          </div>

          <div class="text-purple-100 dark:text-gray-200 [&>p]:leading-lg">
            <p>{{ invoice.sender.streetAddress }}</p>
            <p>{{ invoice.sender.city }}</p>
            <p>{{ invoice.sender.postCode }}</p>
            <p>{{ invoice.sender.country }}</p>
          </div>
        </div>

        <!-- Info section 2 -->
        <div class="grid grid-cols-2 gap-8 mb-12 md:grid-cols-3">
          <div>
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Invoice Date
            </h4>
            <p class="text-sm font-bold sm:text-md leading-lg -tracking-tight">
              {{ formatDate(new Date(invoice.issueDate)) }}
            </p>
          </div>
          <div class="row-span-2">
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Bill to
            </h4>
            <p class="mb-2 font-bold capitalize text-[15px] sm:text-md leading-lg -tracking-tight">
              {{ invoice.client.name }}
            </p>

            <div class="text-purple-100 [&>p]:leading-lg dark:text-gray-200">
              <p class="">{{ invoice.client.streetAddress }}</p>
              <p class="">{{ invoice.client.city }}</p>
              <p class="">{{ invoice.client.postCode }}</p>
              <p class="">{{ invoice.client.country }}</p>
            </div>
            <div></div>
          </div>
          <div class="col-start-1">
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Payment Due
            </h4>
            <p class="text-[15px] font-bold leading-lg -tracking-tight sm:text-md">
              {{ paymentDueDate }}
            </p>
          </div>

          <div class="col-span-2 md:col-start-3 md:row-start-1">
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Send to
            </h4>
            <p class="font-bold truncate leading-lg text-[15px] sm:text-md -tracking-tight">
              {{ invoice.client.email }}
            </p>
          </div>
        </div>

        <!-- Invoice price info -->
        <div class="overflow-hidden rounded-lg">
          <!-- Price Breakdown -->
          <div class="px-6 bg-gray-600 md:px-8 dark:bg-blue-200">
            <table class="w-full price-table">
              <thead class="text-left">
                <tr class="">
                  <th class="hidden md:table-cell">Item name</th>
                  <th class="hidden md:table-cell">QTY.</th>
                  <th class="hidden md:table-cell">Price</th>
                  <th class="hidden md:table-cell">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr class="font-bold" v-for="item of invoice.items" :key="item.id">
                  <td class="capitalize">
                    {{ item.name }}
                    <p class="mt-2 font-bold text-purple-100 dark:text-gray-300 md:hidden">
                      {{ item.quantity }} x {{ formatPrice(item.price) }}
                    </p>
                  </td>
                  <td class="hidden text-center text-purple-100 dark:text-gray-200 md:table-cell">
                    {{ item.quantity }}
                  </td>
                  <td class="hidden text-right text-purple-100 md:table-cell dark:text-gray-200">
                    {{ formatPrice(item.price) }}
                  </td>
                  <!-- TOTAL -->
                  <td class="font-bold text-right">
                    {{ formatPrice(item.price * item.quantity) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Price Total -->
          <div
            class="flex items-center justify-between p-6 text-white bg-blue-100 dark:bg-blue-500 md:px-8"
          >
            <p>Grand Total</p>

            <p class="text-lg md:text-[24px] leading-lg font-bold">
              {{ formatPrice(calculateItemsTotal(invoice.items)) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <footer
      class="fixed bottom-0 left-0 block w-full px-6 py-5 bg-white md:hidden dark:bg-blue-300"
    >
      <!-- buttons -->
      <div class="flex items-center justify-end gap-2">
        <SecondaryButton text="edit" @click="openForm = true" />
        <MainButton text="Delete" type="colored" @click="confirmInvoiceDelete" />
        <MainButton v-if="!isInvoicePaid" text="Mark as paid" @click="payInvoice(invoice.id)" />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import MainButton from '@/components/UI/buttons/MainButton.vue'
import SecondaryButton from '@/components/UI/buttons/SecondaryButton.vue'
import CaretIcon from '@/components/icons/CaretIcon.vue'
import InvoiceStatus from '@/components/invoice/InvoiceStatus.vue'
import type { IInvoice } from '@/types'
import { IInvoiceStatus } from '@/types'
import { formatPrice } from '@/utils'
import { addDaysToDate } from '@/utils'
import { formatDate, calculateItemsTotal } from '@/utils'
import { ref, type Ref, computed, onMounted, onBeforeMount } from 'vue'
import { deleteInvoice, markAsPaid } from '@/services'
import router from '@/router'
import { useInvoiceStore } from '@/stores/invoice'
import BaseModal from '@/components/UI/BaseModal.vue'
import AppBackdrop from '@/components/UI/AppBackdrop.vue'
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'

const deletingInvoice = ref(false)
const openForm = ref(false)

const invoiceStore = useInvoiceStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  invoiceAsString: {
    type: String
  }
})

// either use inovice gotten from the store, if coming from the invoices page
// or try to get a component form the server if entering invoice id manually
// an alert will be shown if inovice is not found in beforeEnter
const invoice: Ref<IInvoice> = ref(
  invoiceStore.getInvoice(props.id) || JSON.parse(props.invoiceAsString as unknown as string)
)

const openModal = ref(false)

async function payInvoice(id: string) {
  try {
    const invoiceisPaid = await markAsPaid(id)

    if (invoiceisPaid) {
      invoice.value.status = IInvoiceStatus.Paid
    }
  } catch (err) {
    alert('unable to mark invoice as paid')
  }
}

function confirmInvoiceDelete() {
  openModal.value = true
}

function editInvoice(e: IInvoice) {
  //update invoice from emitted Invoice fron invoice form
  invoice.value = e
}

async function removeInvoice(invoiceId: string) {
  deletingInvoice.value = true
  try {
    const invoiceDeleted = await deleteInvoice(invoiceId)

    if (invoiceDeleted) {
      invoiceStore.deleteInvoice(invoice.value.id)
      router.push('/')
    }

    deletingInvoice.value = false
  } catch (err) {
    alert('unable to delete invoice')
  }
}

const paymentDueDate = computed(() => {
  const paymentTermDays = parseInt((invoice.value as IInvoice).paymentTerm)
  const issueDate = new Date(invoice.value.issueDate)
  const paymentDueDate = addDaysToDate(issueDate, paymentTermDays)

  return formatDate(paymentDueDate)
})

const isInvoicePaid = computed(() => {
  return invoice.value.status == IInvoiceStatus.Paid
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
