import { object, string } from 'yup'

export const formSchema = object({
  sender: object({
    streetAddress: string().required("can't be empty"),
    city: string().required("can't be empty"),
    postCode: string().required("can't be empty"),
    country: string().required("can't be empty")
  }),
  client: object({
    name: string()
      .trim()
      .required()
      .matches(/[a-zA-Z]+\s+[a-zA-Z]+/g),
    email: string().trim().required().email(),
    streetAddress: string().required("can't be empty"),
    city: string().required("can't be empty"),
    postCode: string().required("can't be empty"),
    country: string().required("can't be empty")
  })
})
