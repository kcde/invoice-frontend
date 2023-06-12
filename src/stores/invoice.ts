import type { IInvoicePayload } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useInvoiceStore = defineStore(
  'invoice',
  () => {
    const invoices: Ref<IInvoicePayload[]> = ref([])

    function addInvoice(invoice: IInvoicePayload) {
      invoices.value.push(invoice)
    }

    const invoiceCount = computed(() => {
      return invoices.value.length
    })

    return { invoices, addInvoice, invoiceCount }
  },
  {
    persist: {
      key: 'invoice-app-invoice-store'
    }
  }
)
