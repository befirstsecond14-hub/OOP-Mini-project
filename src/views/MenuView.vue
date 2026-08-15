<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../stores/menuStore'
import { useCartStore } from '../stores/cartStore'
import { MenuItem } from '../models/MenuItem'

const menuStore = useMenuStore()
const cartStore = useCartStore()

const foods = computed(() => menuStore.foods)
const drinks = computed(() => menuStore.drinks)

function addToCart(item: MenuItem): void {
  cartStore.addToCart(item)
}

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}
</script>

<template>
  <div class="menu-page">

    <header class="menu-header">
      <div class="header-content">
        <p class="subtitle">
          OUR MENU
        </p>

        <h1>
          เมนูอาหาร
        </h1>

        <p class="description">
          เลือกอาหารและเครื่องดื่มที่คุณชื่นชอบ
        </p>
      </div>

      <router-link
        to="/cart"
        class="cart-summary"
      >
        <div class="cart-icon">
          🛒
        </div>

        <div class="cart-info">
          <span>ตะกร้า</span>

          <strong>
            {{ cartStore.totalQuantity }} รายการ
          </strong>
        </div>
      </router-link>
    </header>

    <section class="menu-section">

      <div class="section-header">
        <h2>อาหาร</h2>

        <span class="menu-count">
          {{ foods.length }} เมนู
        </span>
      </div>

      <div class="menu-grid">

        <div
          v-for="item in foods"
          :key="item.getId()"
          class="menu-card"
        >

          <div class="food-image food-image-food">
            <span>🍽️</span>
          </div>

          <div class="menu-info">

            <h3>
              {{ item.getName() }}
            </h3>

            <div class="menu-bottom">

              <p class="price">
                {{ formatPrice(item.getPrice()) }}
              </p>

              <button
                type="button"
                @click="addToCart(item)"
              >
                เพิ่มลงตะกร้า
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>

    <section class="menu-section">

      <div class="section-header">
        <h2>เครื่องดื่ม</h2>

        <span class="menu-count">
          {{ drinks.length }} เมนู
        </span>
      </div>

      <div class="menu-grid">

        <div
          v-for="item in drinks"
          :key="item.getId()"
          class="menu-card"
        >

          <div class="food-image food-image-drink">
            <span>🥤</span>
          </div>

          <div class="menu-info">

            <h3>
              {{ item.getName() }}
            </h3>

            <div class="menu-bottom">

              <p class="price">
                {{ formatPrice(item.getPrice()) }}
              </p>

              <button
                type="button"
                @click="addToCart(item)"
              >
                เพิ่มลงตะกร้า
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>

    <section class="cart-box">

      <div class="cart-box-content">

        <p class="cart-box-label">
          YOUR CART
        </p>

        <h2>
          สรุปตะกร้า
        </h2>

        <p>
          จำนวนทั้งหมด:
          <strong>
            {{ cartStore.totalQuantity }}
          </strong>
          รายการ
        </p>

        <p>
          ราคารวม:
          <strong>
            {{ formatPrice(cartStore.totalPrice) }}
          </strong>
        </p>

      </div>

      <router-link
        to="/cart"
        class="cart-box-button"
      >
        ดูตะกร้า
      </router-link>

    </section>

  </div>
</template>

<style scoped>
.menu-page {
  min-height: calc(100vh - 70px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 24px 70px;
  box-sizing: border-box;
  background: #faf9f7;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 50px;
}

.header-content {
  flex: 1;
}

.subtitle {
  margin: 0 0 8px;
  color: #e85d04;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
}

.menu-header h1 {
  margin: 0 0 10px;
  color: #222;
  font-size: 42px;
  line-height: 1.2;
}

.description {
  margin: 0;
  color: #777;
  font-size: 15px;
}

.cart-summary {
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 150px;
  padding: 13px 17px;

  border: 1px solid #f1dfd2;
  border-radius: 12px;

  background: white;
  color: #333;
  text-decoration: none;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

  transition: 0.2s;
}

.cart-summary:hover {
  border-color: #e85d04;
  transform: translateY(-2px);
}

.cart-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;
  background: #fff1e8;

  font-size: 18px;
}

.cart-info span {
  display: block;
  margin-bottom: 2px;
  color: #888;
  font-size: 11px;
}

.cart-info strong {
  color: #e85d04;
  font-size: 14px;
}

.menu-section {
  margin-bottom: 55px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.menu-section h2 {
  margin: 0;
  color: #222;
  font-size: 28px;
}

.menu-count {
  padding: 6px 12px;
  border-radius: 20px;

  background: #fff1e8;
  color: #e85d04;

  font-size: 12px;
  font-weight: bold;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.menu-card {
  overflow: hidden;

  border: 1px solid #eeeeee;
  border-radius: 16px;

  background: white;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);

  transition: 0.25s;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.food-image {
  height: 170px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 72px;
}

.food-image-food {
  background: #fff1e8;
}

.food-image-drink {
  background: #f7f1e9;
}

.food-image span {
  transition: 0.25s;
}

.menu-card:hover .food-image span {
  transform: scale(1.08);
}

.menu-info {
  padding: 20px;
}

.menu-info h3 {
  min-height: 28px;
  margin: 0 0 18px;

  color: #222;
  font-size: 19px;
}

.menu-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.price {
  margin: 0;

  color: #e85d04;
  font-size: 18px;
  font-weight: bold;
}

.menu-info button {
  padding: 10px 14px;

  border: none;
  border-radius: 8px;

  background: #e85d04;
  color: white;

  cursor: pointer;

  font-size: 13px;
  font-weight: bold;

  transition: 0.2s;
}

.menu-info button:hover {
  background: #d94f00;
  transform: translateY(-1px);
}

.cart-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 25px;

  margin-top: 10px;
  padding: 25px 28px;

  border: 1px solid #f5d7c1;
  border-radius: 16px;

  background: #fff1e8;
}

.cart-box-label {
  margin: 0 0 5px;

  color: #e85d04;

  font-size: 11px;
  font-weight: bold;

  letter-spacing: 2px;
}

.cart-box h2 {
  margin: 0 0 8px;
  color: #222;
  font-size: 23px;
}

.cart-box p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.cart-box strong {
  color: #e85d04;
}

.cart-box-button {
  flex-shrink: 0;

  padding: 12px 22px;

  border-radius: 8px;

  background: #e85d04;
  color: white;

  text-decoration: none;

  font-size: 14px;
  font-weight: bold;

  transition: 0.2s;
}

.cart-box-button:hover {
  background: #d94f00;
  transform: translateY(-2px);
}

@media (max-width: 850px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .menu-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .cart-summary {
    width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: 600px) {
  .menu-page {
    padding: 40px 18px 60px;
  }

  .menu-header h1 {
    font-size: 35px;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }

  .menu-section h2 {
    font-size: 24px;
  }

  .menu-bottom {
    align-items: stretch;
    flex-direction: column;
  }

  .menu-info button {
    width: 100%;
  }

  .cart-box {
    align-items: stretch;
    flex-direction: column;
  }

  .cart-box-button {
    text-align: center;
  }
}
</style>