<template>
  <div class="relative">
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
          <SecondaryButton text="edit" disable />

          <MainButton
            text="Delete"
            @click="removeInvoice(invoice.id)"
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
            <p class="mb-1 font-bold uppercase text-md">
              <span class="text-gray-300">#</span>{{ invoice.id }}
            </p>
            <p>{{ invoice.description }}</p>
          </div>

          <div class="text-purple-100 dark:text-gray-200 [&>p]:leading-md">
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
            <p class="font-bold text-md leading-lg -tracking-tight">
              {{ formatDate(new Date(invoice.issueDate)) }}
            </p>
          </div>
          <div class="row-span-2">
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Bill to
            </h4>
            <p class="mb-2 font-bold capitalize text-md leading-lg -tracking-tight">
              {{ invoice.client.name }}
            </p>

            <div class="text-purple-100 [&>p]:leading-md dark:text-gray-200">
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
            <p class="font-bold leading-lg -tracking-tight text-md">{{ paymentDueDate }}</p>
          </div>

          <div class="col-span-2 md:col-start-3 md:row-start-1">
            <h4
              class="mb-3 text-xs font-medium tracking-tighter text-purple-100 dark:text-gray-200"
            >
              Send to
            </h4>
            <p class="font-bold truncate leading-lg text-md -tracking-tight">
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
        <SecondaryButton text="edit" disable />
        <MainButton text="Delete" type="colored" />
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
import { ref, type Ref, computed } from 'vue'
import { deleteInvoice, markAsPaid } from '@/services'
import router from '@/router'
import { useInvoiceStore } from '@/stores/invoice'

const props = defineProps({
  invoiceAsString: {
    type: String,
    required: true
  }
})

const invoice: Ref<IInvoice> = ref(JSON.parse(props.invoiceAsString))

const deletingInvoice = ref(false)

const invoiceStore = useInvoiceStore()

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
  const paymentTermDays = parseInt(invoice.value.paymentTerm)
  const issueDate = new Date(invoice.value.issueDate)
  const paymentDueDate = addDaysToDate(issueDate, paymentTermDays)

  return formatDate(paymentDueDate)
})

const isInvoicePaid = computed(() => {
  return invoice.value.status == IInvoiceStatus.Paid
})
</script>

<style scoped></style>
