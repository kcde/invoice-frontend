import type { IInvoicePayload, IInvoiceResponse } from '@/types'

import { useAuthStore } from '@/stores/auth'

const API = 'http://localhost:1234/api/invoices'

export async function createInvoice(payload: IInvoicePayload): Promise<IInvoiceResponse> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
