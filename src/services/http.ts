import process from 'process'
const ENV = process.env.NODE_ENV

let endpoint = 'http://localhost:1234/api/'

if (ENV == 'production') {
  endpoint = 'https://inc-bck.onrender.com'
}

const http = {
  invoices: `${endpoint}/invoices`,
  users: `${endpoint}/users`
}

export default http
