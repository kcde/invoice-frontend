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
    .min(1, 'An item must be added')
})
