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
export interface iLoginPayResponse extends ISignUpResponse {}

export interface IUserDetails {
  email: string
  token: string
}
