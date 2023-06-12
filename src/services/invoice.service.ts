import type { IInvoicePayload, IInvoiceResponse } from '@/types'

const API = 'http://localhost:1234/api/invoices'

export async function createInvoice(payload: IInvoicePayload): Promise<IInvoiceResponse> {
  let response: Response

  try {
    response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.a2VzaWRlQGtlc2lkZS5jb20.k5jJEg3LPocjNYRvRdcN8jhu4-9zJFExId_bN43skas'
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
