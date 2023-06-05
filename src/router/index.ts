import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import InvoicesView from '../views/InvoicesView.vue'
import AuthView from '@/views/AuthView.vue'

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
      component: AuthView
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesView,
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
