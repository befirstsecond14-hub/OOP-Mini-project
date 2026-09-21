// @ts-expect-error: vue-router is provided by the project dependency at runtime.
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/order-history',
      name: 'order-history',
      component: () => import('../views/OrderHistoryView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/member-login',
      name: 'member-login',
      component: () => import('../views/MemberLoginView.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin-menu',
      name: 'admin-menu',
      component: () => import('../views/AdminMenuView.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin-order',
      name: 'admin-order',
      component: () => import('../views/AdminOrderView.vue'),
      meta: { requiresAdmin: true }
    },
    // ป้องกันกรณีเข้า URL ไม่มีในระบบ
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to: any) => {
  if (to.meta.requiresAdmin) {
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'

    if (!isAdminLoggedIn && to.name !== 'admin-login') {
      return { name: 'admin-login' }
    }
  }

  return true
})

export default router
