import { object, string, array, number } from 'yup'

export const formSchema = object({
  sender: object({
    streetAddress: string().trim().required('All fields must be added'),
    city: string().trim().required('All fields must be added'),
    postCode: string().trim().required('All fields must be added'),
    country: string().trim().required('All fields must be added')
  }),
  client: object({
    name: string()
      .trim()
      .required('All fields must be added')
      .matches(/[a-zA-Z]+\s+[a-zA-Z]+/g, 'First name and last name required'),
    email: string().trim().required('All fields must be added').email('Invalid Email'),
    streetAddress: string().trim().required('All fields must be added'),
    city: string().trim().required('All fields must be added'),
    postCode: string().trim().required('All fields must be added'),
    country: string().trim().required('All fields must be added')
  }),
  description: string().trim().required('All fields must be added'),
  items: array()
    .of(
      object().shape({
        name: string().trim().required('All fields must be added'),
        quantity: number().required('Must be a number'),
        price: number().required('All fields must be added')
      })
    )
    .required('An item must be added')
    .min(1, 'An item must be added')
})

export const formDraftSchema = formSchema.shape({
  sender: object({
    streetAddress: string(),
    city: string(),
    postCode: string(),
    country: string()
  }),
  client: object({
    name: string()
      .trim()
      .required('All fields must be added')
      .matches(/[a-zA-Z]+\s+[a-zA-Z]+/g, 'First name and last name required'),
    email: string().trim().email('Invalid Email'),
    streetAddress: string(),
    city: string(),
    postCode: string(),
    country: string()
  }),
  description: string().trim(),
  items: array().of(
    object().shape({
      name: string().trim(),
      quantity: number(),
      price: number()
    })
  )
})

export const authFormSchema = object({
  email: string().required('Required!').trim().email('Invalid email! {name@doamin}'),
  password: string().required('Required!').trim().min(8, 'Minimum of 8 characters')
})
