import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      // ใช้ Lazy Loading ดึงไฟล์เมื่อมีการเข้าหน้านี้
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
    // หน้า Login ของ Admin
    {
      path: '/admin-login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue')
    },
    // หน้าจัดการออเดอร์
    {
      path: '/admin-order',
      name: 'admin-order',
      component: () => import('../views/AdminOrderView.vue'),
      // ต้อง Login ก่อน
      meta: {
        requiresAdmin: true
      }
    }
  ]
})

// ตรวจสอบก่อนเข้าแต่ละหน้า (Navigation Guard)
router.beforeEach((to) => {
  if (to.meta.requiresAdmin) {
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'

    if (!isAdminLoggedIn) {
      return { name: 'admin-login' }
    }
  }
  return true
})

export default router