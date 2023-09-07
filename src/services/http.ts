import process from 'process'
const ENV = process.env.NODE_ENV

let endpoint = 'https://localhost:1234/api/'

if (ENV == 'production') {
  endpoint = 'https://16.16.215.95:1234/api'
}

const http = {
  invoices: `${endpoint}/invoices`,
  users: `${endpoint}/users`
}

export default http
