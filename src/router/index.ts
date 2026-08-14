import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderView from '../views/OrderView.vue'
import PaymentView from '../views/PaymentView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminOrderView from '../views/AdminOrderView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },

    {
      path: '/payment',
      name: 'payment',
      component: PaymentView
    },

    {
      path: '/order',
      name: 'order',
      component: OrderView
    },

    // หน้า Login ของ Admin
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLoginView
    },

    // หน้าจัดการออเดอร์
    {
      path: '/admin-order',
      name: 'admin-order',
      component: AdminOrderView,

      // ต้อง Login ก่อน
      meta: {
        requiresAdmin: true
      }
    }
  ]
})

// ตรวจสอบก่อนเข้าแต่ละหน้า
router.beforeEach((to) => {

  if (to.meta.requiresAdmin) {

    const isAdminLoggedIn =
      sessionStorage.getItem('adminLoggedIn') === 'true'

    if (!isAdminLoggedIn) {
      return {
        name: 'admin-login'
      }
    }
  }

  return true
})

export default router

