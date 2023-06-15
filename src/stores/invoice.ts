import type { IInvoicePayload, IInvoice } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useInvoiceStore = defineStore(
  'invoice',
  () => {
    const invoices: Ref<IInvoice[]> = ref([])

    const invoiceCount = computed(() => {
      return invoices.value.length
    })

    function addInvoice(invoice: IInvoice) {
      invoices.value.push(invoice)
    }

    function setInvoice(invoicesArray: IInvoice[]) {
      invoices.value = invoicesArray
    }

    function resetInvoiceStore() {
      invoices.value = []
    }

    return { invoices, addInvoice, invoiceCount, resetInvoiceStore, setInvoice }
  },
  {
    persist: {
      key: 'invoice-app-invoice-store'
    }
  }
)
