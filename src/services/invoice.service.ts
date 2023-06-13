import type { IInvoicePayload, IInvoiceResponse } from '@/types'

const API = 'http://localhost:1234/api/invoices'

export async function createInvoice(payload: IInvoicePayload): Promise<IInvoiceResponse> {
  let response: Response

  try {
    response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer Token'
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
