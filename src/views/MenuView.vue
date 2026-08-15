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

    <!-- =========================
         MENU HEADER
    ========================== -->
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


      <!-- Cart Summary -->
      <router-link
        to="/cart"
        class="cart-summary"
      >

        <div class="cart-icon">
          🛒
        </div>

        <div class="cart-info">

          <span>
            ตะกร้า
          </span>

          <strong>
            {{ cartStore.totalQuantity }} รายการ
          </strong>

        </div>

      </router-link>

    </header>


    <!-- =========================
         FOOD SECTION
    ========================== -->
    <section class="menu-section">

      <div class="section-header">

        <h2>
          อาหาร
        </h2>

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

          <!-- Image -->
          <div class="food-image">

            <span>
              🍽️
            </span>

          </div>


          <!-- Information -->
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


    <!-- =========================
         DRINK SECTION
    ========================== -->
    <section class="menu-section">

      <div class="section-header">

        <h2>
          เครื่องดื่ม
        </h2>

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

          <!-- Image -->
          <div class="food-image">

            <span>
              🥤
            </span>

          </div>


          <!-- Information -->
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


    <!-- =========================
         CART SUMMARY
    ========================== -->
    <section class="cart-box">

      <div class="cart-box-content">

        <p class="cart-box-label">
          YOUR CART
        </p>

        <h2>
          สรุปตะกร้า
        </h2>

        <div class="cart-details">

          <p>
            จำนวนทั้งหมด
            <strong>
              {{ cartStore.totalQuantity }}
            </strong>
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

/* ==================================================
   PAGE
================================================== */

.menu-page {
  width: 100%;
  min-height: calc(100vh - 70px);

  padding: 50px 24px 70px;

  background: #f8f8f8;
}


/* ==================================================
   HEADER
================================================== */

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


/* Small title */

.subtitle {
  margin: 0 0 8px;

  color: #e85d04;

  font-size: 12px;
  font-weight: bold;

  letter-spacing: 3px;
}


/* Main title */

.menu-header h1 {
  margin: 0 0 10px;

  color: #222;

  font-size: 42px;
  font-weight: 700;

  line-height: 1.2;
}


/* Description */

.description {
  margin: 0;

  color: #777;

  font-size: 15px;
  line-height: 1.6;
}


/* ==================================================
   CART SUMMARY TOP
================================================== */

.cart-summary {
  flex-shrink: 0;

  display: flex;
  align-items: center;

  gap: 12px;

  min-width: 155px;

  padding: 13px 17px;

  border: 1px solid #f1dfd2;
  border-radius: 12px;

  background: #ffffff;

  color: #333;

  text-decoration: none;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.cart-summary:hover {
  border-color: #e85d04;

  transform: translateY(-2px);

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}


/* Cart icon */

.cart-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #fff1e8;

  font-size: 18px;
}


/* Cart text */

.cart-info span {
  display: block;

  margin-bottom: 3px;

  color: #888;

  font-size: 11px;
}

.cart-info strong {
  display: block;

  color: #e85d04;

  font-size: 14px;
}


/* ==================================================
   MENU SECTION
================================================== */

.menu-section {
  width: 100%;
  max-width: 1200px;

  margin: 0 auto 55px;
}


/* Section header */

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


/* Number of menus */

.menu-count {
  flex-shrink: 0;

  padding: 6px 12px;

  border-radius: 20px;

  background: #fff1e8;

  color: #e85d04;

  font-size: 12px;
  font-weight: bold;
}


/* ==================================================
   MENU GRID
================================================== */

.menu-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 24px;
}


/* ==================================================
   MENU CARD
================================================== */

.menu-card {
  width: 100%;

  overflow: hidden;

  border: 1px solid #eeeeee;
  border-radius: 16px;

  background: #ffffff;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.menu-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.10);
}


/* ==================================================
   FOOD / DRINK IMAGE
================================================== */

.food-image {
  width: 100%;
  height: 170px;

  display: flex;
  align-items: center;
  justify-content: center;

  /*
    ใช้สีเดียวกันทั้งอาหารและเครื่องดื่ม
  */
  background: #fff1e8;

  font-size: 72px;
}

.food-image span {
  display: block;

  transition: transform 0.25s ease;
}

.menu-card:hover .food-image span {
  transform: scale(1.08);
}


/* ==================================================
   MENU INFORMATION
================================================== */

.menu-info {
  padding: 20px;
}


/* Food name */

.menu-info h3 {
  min-height: 28px;

  margin: 0 0 18px;

  color: #222;

  font-size: 19px;
  font-weight: 700;

  line-height: 1.5;
}


/* Bottom row */

.menu-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;
}


/* Price */

.price {
  margin: 0;

  color: #e85d04;

  font-size: 18px;
  font-weight: bold;

  white-space: nowrap;
}


/* Add button */

.add-button {
  flex-shrink: 0;

  padding: 10px 14px;

  border: none;
  border-radius: 8px;

  background: #e85d04;

  color: #ffffff;

  cursor: pointer;

  font-family: inherit;

  font-size: 13px;
  font-weight: bold;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.add-button:hover {
  background: #d94f00;

  transform: translateY(-1px);
}

.add-button:active {
  transform: translateY(0);
}


/* ==================================================
   CART BOX
================================================== */

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


/* Cart label */

.cart-box-label {
  margin: 0 0 5px;

  color: #e85d04;

  font-size: 11px;
  font-weight: bold;

  letter-spacing: 2px;
}


/* Cart title */

.cart-box h2 {
  margin: 0 0 10px;

  color: #222;

  font-size: 23px;
}


/* Cart details */

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


/* Cart button */

.cart-box-button {
  flex-shrink: 0;

  padding: 12px 22px;

  border-radius: 8px;

  background: #e85d04;

  color: #ffffff;

  text-decoration: none;

  font-size: 14px;
  font-weight: bold;

  white-space: nowrap;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.cart-box-button:hover {
  background: #d94f00;

  transform: translateY(-2px);
}


/* ==================================================
   LARGE TABLET
================================================== */

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
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}


/* ==================================================
   TABLET / MOBILE
================================================== */

@media (max-width: 700px) {

  .menu-page {
    padding: 35px 16px 50px;
  }


  /* Header */

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


  /* Cart */

  .cart-summary {
    width: 100%;
  }


  /* Section */

  .menu-section {
    margin-bottom: 42px;
  }

  .menu-section h2 {
    font-size: 25px;
  }


  /* Grid */

  .menu-grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }


  /* Card */

  .food-image {
    height: 160px;

    font-size: 65px;
  }


  /* Cart box */

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


/* ==================================================
   SMALL MOBILE
================================================== */

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
    height: 145px;

    font-size: 58px;
  }


  .menu-info {
    padding: 16px;
  }

  .menu-info h3 {
    font-size: 17px;

    margin-bottom: 15px;
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