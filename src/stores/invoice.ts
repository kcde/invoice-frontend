import type { IInvoicePayload } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useInvoiceStore = defineStore(
  'invoice',
  () => {
    const invoices: Ref<IInvoicePayload[]> = ref([])

    const invoiceCount = computed(() => {
      return invoices.value.length
    })

    function addInvoice(invoice: IInvoicePayload) {
      invoices.value.push(invoice)
    }

    function resetInvoiceStore() {
      invoices.value = []
    }

    return { invoices, addInvoice, invoiceCount, resetInvoiceStore }
  },
  {
    persist: {
      key: 'invoice-app-invoice-store'
    }
  }
)
