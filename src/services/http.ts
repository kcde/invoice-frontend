import process from 'process'
const ENV = process.env.NODE_ENV

let endpoint = 'http://localhost:1234/api/'

if (ENV == 'production') {
  endpoint = 'http://16.171.224.211:1234/api'
}

const http = {
  invoices: `${endpoint}/invoices`,
  users: `${endpoint}/users`
}

export default http
