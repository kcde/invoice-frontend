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
      },

      //This method does not allow me pass invoice prop to the component
      //Trying to avoid calling api twice
      async beforeEnter(to, _from, next) {
        console.log(to.params.id)

        let invoice

        try {
          invoice = await getInvoice(to.params.id as string)
        } catch (err) {
          alert('There was a problem getting this invoice')
        }

        if ((invoice as { error: string }).error) {
          alert('invoice does not exist')
          next({ name: 'invoices' })
        } else {
          // pass value as a string, then parse it in the invoiceView component/page
          to.params.invoiceAsString = JSON.stringify(invoice)
          next()
        }
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
