import type { IInvoice, IInvoicePayload, IInvoiceResponse } from '@/types'

import { useAuthStore } from '@/stores/auth'
import http from './http'

const endpoint = http.invoices

export async function createInvoice(payload: IInvoicePayload): Promise<IInvoiceResponse> {
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(endpoint, {
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
    response = await fetch(endpoint + `/${invoiceId}`, {
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
    response = await fetch(endpoint, {
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
    response = await fetch(endpoint + `/${invoiceId}/paid`, {
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
    respone = await fetch(endpoint + `/${invoiceId}`, {
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
  console.log(payload)
  let response: Response
  const authStore = useAuthStore()
  try {
    response = await fetch(endpoint + `/${invoiceId}/`, {
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
