<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../stores/menuStore'
import { useCartStore } from '../stores/cartStore'

const menuStore = useMenuStore()
const cartStore = useCartStore()

const foods = computed(() => menuStore.foods)
const drinks = computed(() => menuStore.drinks)

function addToCart(item: any) {
  cartStore.addToCart(item)
}

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}
</script>

<template>
  <div class="menu-page">

    <header class="menu-header">
      <div>
        <p class="subtitle">OUR MENU</p>
        <h1>เมนูอาหาร</h1>
        <p>เลือกอาหารและเครื่องดื่มที่คุณชื่นชอบ</p>
      </div>

      <div class="cart-summary">
        <span>ตะกร้า</span>
        <strong>{{ cartStore.totalQuantity }}</strong>
        <span>รายการ</span>
      </div>
    </header>

    <!-- อาหาร -->
    <section class="menu-section">
      <h2>อาหาร</h2>

      <div class="menu-grid">
        <div
          v-for="item in foods"
          :key="item.getId()"
          class="menu-card"
        >
          <div class="food-image">
            🍽️
          </div>

          <div class="menu-info">
            <h3>{{ item.getName() }}</h3>

            <p class="price">
              {{ formatPrice(item.getPrice()) }}
            </p>

            <button @click="addToCart(item)">
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- เครื่องดื่ม -->
    <section class="menu-section">
      <h2>เครื่องดื่ม</h2>

      <div class="menu-grid">
        <div
          v-for="item in drinks"
          :key="item.getId()"
          class="menu-card"
        >
          <div class="food-image">
            🥤
          </div>

          <div class="menu-info">
            <h3>{{ item.getName() }}</h3>

            <p class="price">
              {{ formatPrice(item.getPrice()) }}
            </p>

            <button @click="addToCart(item)">
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- สรุปตะกร้า -->
    <section class="cart-box">
      <h2>สรุปตะกร้า</h2>

      <p>
        จำนวนทั้งหมด:
        <strong>{{ cartStore.totalQuantity }}</strong>
        รายการ
      </p>

      <p>
        ราคารวม:
        <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
      </p>
    </section>

  </div>
</template>

<style scoped>
/* CSS เฉพาะ MenuView.vue */
.menu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.menu-header h1 {
  font-size: 40px;
  margin: 8px 0;
}

.menu-header p {
  color: #666;
}

.cart-summary {
  padding: 15px 20px;
  border-radius: 12px;
  background: #fff3e8;
}

.cart-summary strong {
  margin: 0 6px;
  color: #f97316;
}

.menu-section {
  margin-bottom: 50px;
}

.menu-section h2 {
  margin-bottom: 20px;
  font-size: 28px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.menu-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.food-image {
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  background: #f7f7f7;
}

.menu-info {
  padding: 20px;
}

.menu-info h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.price {
  color: #f97316;
  font-weight: bold;
  font-size: 18px;
}

.menu-info button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f97316;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.menu-info button:hover {
  opacity: 0.85;
}

.cart-box {
  margin-top: 30px;
  padding: 25px;
  border-radius: 16px;
  background: #f8f8f8;
}

.cart-box strong {
  color: #f97316;
}

@media (max-width: 768px) {
  .menu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>