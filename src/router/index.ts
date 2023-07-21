import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InvoicesView from '../views/InvoicesView.vue'
import AuthView from '@/views/AuthView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import { getInvoice } from '@/services/invoice.service'

InvoiceView.displayName = 'InvoiceView'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/invoices'
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      beforeEnter(_to, _from, next) {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          next({ name: 'invoices' })
          return
        }

        next()
      }
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/invoice/:id',
      name: 'invoice',
      component: InvoiceView,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log(authStore.isAuthenticated)

    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router
