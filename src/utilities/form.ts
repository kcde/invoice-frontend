import { object, string, array, number } from 'yup'

export const formSchema = object({
  sender: object({
    streetAddress: string().trim().required("can't be empty"),
    city: string().trim().required("can't be empty"),
    postCode: string().trim().required("can't be empty"),
    country: string().trim().required("can't be empty")
  }),
  client: object({
    name: string()
      .trim()
      .required()
      .matches(/[a-zA-Z]+\s+[a-zA-Z]+/g, 'name should be more than a word'),
    email: string().trim().required().email(),
    streetAddress: string().trim().required("can't be empty"),
    city: string().trim().required("can't be empty"),
    postCode: string().trim().required("can't be empty"),
    country: string().trim().required("can't be empty")
  }),
  description: string().trim().required(),
  items: array().of(
    object().shape({
      name: string().trim().required("can't be empty"),
      quantity: number().required("can't be empty"),
      price: number().required("can't be empty")
    })
  )
})
