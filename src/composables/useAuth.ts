import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useInvoiceStore } from '@/stores/invoice'

export function useAuth() {
  const { resetAuthStore } = useAuthStore()
  const { resetInvoiceStore } = useInvoiceStore()

  function logout() {
    resetAuthStore()
    resetInvoiceStore()

    router.push({ name: 'auth' })
  }

  return { logout }
}
