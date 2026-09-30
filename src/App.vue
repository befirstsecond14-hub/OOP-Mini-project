<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import { useOrderStore } from './stores/orderStore'
import { useCartStore } from './stores/cartStore'

const Navbar = defineAsyncComponent(() => import('./components/Navbar.vue'))

const orderStore = useOrderStore()
const cartStore = useCartStore()

function syncSharedData(event: StorageEvent): void {
  if (
    event.key === 'restaurant_orders' ||
    event.key === 'restaurant_current_order_id'
  ) {
    orderStore.syncFromStorage()
  }

  if (event.key === 'restaurant_cart') {
    cartStore.syncFromStorage()
  }
}

onMounted(() => {
  window.addEventListener('storage', syncSharedData)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncSharedData)
})
</script>

<template>
  <Navbar />

  <!-- แสดงผลหน้าจอต่างๆ ตาม URL ที่ผู้ใช้เข้าถึง -->
  <router-view />
</template>

<style>
/* สามารถใส่ CSS Global (ที่ใช้กับทุกหน้า) เช่น การตั้งค่า Font หรือ Reset Margin ไว้ตรงนี้ได้ครับ */
body {
  margin: 0;
  padding: 0;
  font-family: 'Sarabun', 'Prompt', sans-serif; 
}
</style>
