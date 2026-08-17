```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../stores/menuStore'
import { useCartStore } from '../stores/cartStore'
import { MenuItem } from '../models/MenuItem'

const menuStore = useMenuStore()
const cartStore = useCartStore()

// แบ่งเมนูเป็น 2 หมวด
const menuCategories = computed(() => [
  { title: 'อาหาร', items: menuStore.foods as MenuItem[] },
  { title: 'เครื่องดื่ม', items: menuStore.drinks as MenuItem[] }
])

// เพิ่มสินค้าเข้าตะกร้า
function addToCart(item: MenuItem): void {
  cartStore.addToCart(item)
}

// แสดงราคา
function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}
</script>

<template>
  <div class="menu-page">

    <!-- ================= HEADER ================= -->
    <header class="menu-header">
      <div class="header-content">
        <p class="subtitle">OUR MENU</p>
        <h1>เมนูอาหาร</h1>
        <p class="description">
          เลือกอาหารและเครื่องดื่มที่คุณชื่นชอบ
        </p>
      </div>

      <router-link to="/cart" class="cart-summary">
        <div class="cart-icon">🛒</div>

        <div class="cart-info">
          <span>ตะกร้า</span>
          <strong>{{ cartStore.totalQuantity }} รายการ</strong>
        </div>
      </router-link>
    </header>


    <!-- ================= MENU ================= -->
    <section
      v-for="category in menuCategories"
      :key="category.title"
      class="menu-section"
    >
      <div class="section-header">
        <h2>{{ category.title }}</h2>
        <span class="menu-count">
          {{ category.items.length }} เมนู
        </span>
      </div>

      <div class="menu-grid">
        <div
          v-for="item in category.items"
          :key="item.getId()"
          class="menu-card"
        >
          <!-- รูปอาหาร -->
          <div class="food-image">
            <img
              :src="item.getImageUrl()"
              :alt="item.getName()"
              loading="lazy"
            />
          </div>

          <!-- ข้อมูลอาหาร -->
          <div class="menu-info">
            <h3>{{ item.getName() }}</h3>

            <div class="menu-bottom">
              <p class="price">
                {{ formatPrice(item.getPrice()) }}
              </p>

              <button
                type="button"
                class="add-button"
                @click="addToCart(item)"
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ================= CART SUMMARY ================= -->
    <section class="cart-box">
      <div class="cart-box-content">
        <p class="cart-box-label">YOUR CART</p>
        <h2>สรุปตะกร้า</h2>

        <div class="cart-details">
          <p>
            จำนวนทั้งหมด
            <strong>{{ cartStore.totalQuantity }}</strong>
            รายการ
          </p>

          <p>
            ราคารวม
            <strong>
              {{ formatPrice(cartStore.totalPrice) }}
            </strong>
          </p>
        </div>
      </div>

      <router-link to="/cart" class="cart-box-button">
        ดูตะกร้า
      </router-link>
    </section>

  </div>
</template>


<style scoped>

/* ==================== PAGE ==================== */

.menu-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 50px 24px 70px;
  background: #f8f8f8;
}


/* ==================== HEADER ==================== */

.menu-header {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.header-content {
  flex: 1;
  min-width: 0;
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
  font-weight: 700;
  line-height: 1.2;
}

.description {
  margin: 0;
  color: #777;
  font-size: 15px;
  line-height: 1.6;
}


/* ==================== CART TOP ==================== */

.cart-summary {
  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 155px;
  padding: 13px 17px;

  border: 1px solid #f1dfd2;
  border-radius: 12px;

  background: #fff;
  color: #333;
  text-decoration: none;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

  transition: all 0.2s ease;
}

.cart-summary:hover {
  border-color: #e85d04;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.cart-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 9px;
  background: #fff1e8;

  font-size: 18px;
}

.cart-info span,
.cart-info strong {
  display: block;
}

.cart-info span {
  margin-bottom: 3px;
  color: #888;
  font-size: 11px;
}

.cart-info strong {
  color: #e85d04;
  font-size: 14px;
}


/* ==================== MENU SECTION ==================== */

.menu-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 55px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  margin-bottom: 20px;
}

.menu-section h2 {
  margin: 0;
  color: #222;
  font-size: 28px;
  font-weight: 700;
}

.menu-count {
  flex-shrink: 0;

  padding: 6px 12px;
  border-radius: 20px;

  background: #fff1e8;
  color: #e85d04;

  font-size: 12px;
  font-weight: bold;
}


/* ==================== MENU GRID ==================== */

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}


/* ==================== MENU CARD ==================== */

.menu-card {
  width: 100%;
  overflow: hidden;

  border: 1px solid #eee;
  border-radius: 16px;

  background: #fff;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);

  transition: all 0.25s ease;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}


/* ==================== IMAGE ==================== */

.food-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #fff1e8;
}

.food-image img {
  width: 100%;
  height: 100%;
  display: block;

  object-fit: cover;

  transition: transform 0.25s ease;
}

.menu-card:hover .food-image img {
  transform: scale(1.05);
}


/* ==================== MENU INFO ==================== */

.menu-info {
  padding: 20px;
}

.menu-info h3 {
  min-height: 28px;
  margin: 0 0 18px;

  color: #222;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.5;
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

  white-space: nowrap;
}


/* ==================== ADD BUTTON ==================== */

.add-button {
  flex-shrink: 0;

  padding: 10px 14px;

  border: none;
  border-radius: 8px;

  background: #e85d04;
  color: #fff;

  cursor: pointer;
  font-family: inherit;

  font-size: 13px;
  font-weight: bold;

  transition: all 0.2s ease;
}

.add-button:hover {
  background: #d94f00;
  transform: translateY(-1px);
}

.add-button:active {
  transform: translateY(0);
}


/* ==================== CART BOTTOM ==================== */

.cart-box {
  width: 100%;
  max-width: 1200px;

  margin: 10px auto 0;
  padding: 25px 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  border: 1px solid #f5d7c1;
  border-radius: 16px;

  background: #fff1e8;
}

.cart-box-content {
  min-width: 0;
}

.cart-box-label {
  margin: 0 0 5px;

  color: #e85d04;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
}

.cart-box h2 {
  margin: 0 0 10px;

  color: #222;
  font-size: 23px;
}

.cart-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cart-box p {
  margin: 0;

  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.cart-box strong {
  color: #e85d04;
  font-weight: bold;
}

.cart-box-button {
  flex-shrink: 0;

  padding: 12px 22px;

  border-radius: 8px;

  background: #e85d04;
  color: #fff;

  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  white-space: nowrap;

  transition: all 0.2s ease;
}

.cart-box-button:hover {
  background: #d94f00;
  transform: translateY(-2px);
}


/* ==================== TABLET ==================== */

@media (max-width: 1000px) {
  .menu-page {
    padding: 40px 20px 60px;
  }

  .menu-header {
    margin-bottom: 40px;
  }

  .menu-header h1 {
    font-size: 38px;
  }

  .menu-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


/* ==================== MOBILE ==================== */

@media (max-width: 700px) {
  .menu-page {
    padding: 35px 16px 50px;
  }

  .menu-header {
    align-items: stretch;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 40px;
  }

  .menu-header h1 {
    font-size: 34px;
  }

  .description {
    font-size: 14px;
  }

  .cart-summary {
    width: 100%;
  }

  .menu-section {
    margin-bottom: 42px;
  }

  .menu-section h2 {
    font-size: 25px;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .food-image {
    height: 180px;
  }

  .cart-box {
    align-items: stretch;
    flex-direction: column;
    padding: 22px;
  }

  .cart-details {
    flex-direction: column;
    gap: 5px;
  }

  .cart-box-button {
    width: 100%;
    text-align: center;
  }
}


/* ==================== SMALL MOBILE ==================== */

@media (max-width: 450px) {
  .menu-page {
    padding: 28px 12px 45px;
  }

  .subtitle {
    font-size: 11px;
    letter-spacing: 2px;
  }

  .menu-header h1 {
    font-size: 29px;
  }

  .description {
    font-size: 13px;
  }

  .menu-section h2 {
    font-size: 23px;
  }

  .menu-count {
    padding: 5px 9px;
    font-size: 11px;
  }

  .food-image {
    height: 165px;
  }

  .menu-info {
    padding: 16px;
  }

  .menu-info h3 {
    margin-bottom: 15px;
    font-size: 17px;
  }

  .menu-bottom {
    gap: 10px;
  }

  .price {
    font-size: 16px;
  }

  .add-button {
    padding: 9px 11px;
    font-size: 12px;
  }

  .cart-box {
    padding: 18px;
  }

  .cart-box h2 {
    font-size: 21px;
  }
}
</style>
