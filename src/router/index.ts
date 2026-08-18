import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // ใช้ Lazy Loading ดึงไฟล์เมื่อมีการเข้าหน้านี้เพื่อเพิ่มประสิทธิภาพ
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
    // หน้าจัดการออเดอร์ (ต้อง Login)
    {
      path: '/admin-order',
      name: 'admin-order',
      component: () => import('../views/AdminOrderView.vue'),
      meta: {
        requiresAdmin: true
      }
    }
  ]
})

// ตรวจสอบก่อนเข้าแต่ละหน้า (Navigation Guard)
router.beforeEach((to) => {
  // เช็กว่าหน้าที่กำลังจะไป จำเป็นต้องเป็น Admin หรือไม่
  if (to.meta.requiresAdmin) {
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'

    // ถ้ายังไม่ได้ Login ให้เตะกลับไปหน้า Login
    if (!isAdminLoggedIn) {
      return { name: 'admin-login' }
    }
  }
  // ถ้ามีสิทธิ์ หรือไม่ต้องใช้สิทธิ์ ก็ปล่อยให้ผ่านไปได้เลย
  return true
})

export default router