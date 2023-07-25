import type { IInvoice, IInvoicePayload, IInvoiceResponse } from '@/types'

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
export async function getInvoice(invoiceId: string): Promise<IInvoiceResponse | { error: string }> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(API + `/${invoiceId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      }
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
export async function getAllInvoice(): Promise<IInvoiceResponse[]> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(API, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      }
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}

export async function markAsPaid(invoiceId: string): Promise<boolean> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(API + `/${invoiceId}/paid`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      }
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.status == 200
}

export async function deleteInvoice(invoiceId: string): Promise<boolean> {
  let respone: Response
  const authStore = useAuthStore()

  try {
    respone = await fetch(API + `/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      }
    })
  } catch (err) {
    throw Error(err as string)
  }

  return respone.status == 204
}

export async function updateInvoice(
  invoiceId: string,
  payload: IInvoicePayload
): Promise<IInvoiceResponse> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(API + `/${invoiceId}/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authStore.userDetails.token}`
      }
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
