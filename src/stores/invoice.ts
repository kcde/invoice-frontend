import type { IInvoice, IInvoiceFilter } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices: Ref<IInvoice[]> = ref([])

  const invoiceFilter: Ref<IInvoiceFilter> = ref('')

  function updateInvoiceFilter(filter: IInvoiceFilter) {
    invoiceFilter.value = filter
  }

  function addInvoice(invoice: IInvoice) {
    invoices.value.push(invoice)
  }

  function deleteInvoice(invoiceId: string) {
    invoices.value = invoices.value.filter((invoice) => invoice.id !== invoiceId)
  }
  function getInvoice(invoiceId: string): IInvoice {
    return invoices.value.filter((invoice) => invoice.id == invoiceId)[0]
  }

  function setInvoice(invoicesArray: IInvoice[]) {
    invoices.value = invoicesArray
  }

  function resetInvoiceStore() {
    invoices.value = []
  }

  const invoicesToDisplay = computed(() => {
    return invoices.value.filter((inv) => {
      if (invoiceFilter.value == '') {
        return inv
      }

      return inv.status == invoiceFilter.value
    })
  })

  return {
    invoices,
    addInvoice,
    getInvoice,
    resetInvoiceStore,
    setInvoice,
    invoicesToDisplay,
    deleteInvoice,
    invoiceFilter,
    updateInvoiceFilter
  }
})
