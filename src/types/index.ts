export interface ISignUpPayload {
  email: string
  password: string
}

export interface ISignUpResponse {
  email?: string
  token?: string
  error?: string
}

export interface iLoginPayload extends ISignUpPayload {}
export interface iLoginResponse extends ISignUpResponse {}

export interface IUserDetails {
  email: string
  token: string
}

export interface IInvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
}
export interface IInvoicePayload {
  id?: string
  user?: string
  sender: {
    streetAddress: string
    city: string
    postCode: string
    country: string
  }

  client: {
    name: string
    email: string
    streetAddress: string
    city: string
    postCode: string
    country: string
  }

  description: string
  issueDate: Date
  paymentTerm: string
  status: InvoiceStatus

  items: IInvoiceItem[]
}

export interface IInvoice extends IInvoicePayload {
  id: string
}

export interface IInvoiceResponse extends IInvoice {
  id: string
  user: string
}

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Draft = 'draft'
}
