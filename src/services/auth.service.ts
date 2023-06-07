import type { ISignUpPayload, ISignUpResponse } from '@/types'

const API = 'http://localhost:1234/api/users'

export async function signUp(payload: ISignUpPayload): Promise<ISignUpResponse> {
  let response: Response

  try {
    response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    throw Error(err as string)
  }

  return response.json()
}
