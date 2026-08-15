
<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const totalQuantity = computed(() => cartStore.totalQuantity)
const totalPrice = computed(() => cartStore.totalPrice)

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}

function increaseQuantity(index: number): void {
  cartStore.increaseQuantity(index)
}

function decreaseQuantity(index: number): void {
  cartStore.decreaseQuantity(index)
}

function removeItem(index: number): void {
  cartStore.removeItem(index)
}

function clearCart(): void {
  cartStore.clearCart()
}
</script>

<template>
  <div class="cart-page">

    <!-- Header -->
    <header class="cart-header">
      <div class="cart-header-content">
        <p class="section-label">
          YOUR CART
        </p>

        <h1>
          ตะกร้าของคุณ
        </h1>

        <p class="cart-description">
          ตรวจสอบรายการอาหารก่อนสั่งซื้อ
        </p>
      </div>
    </header>


    <!-- Main -->
    <main class="cart-container">

      <!-- Empty -->
      <section
        v-if="items.length === 0"
        class="empty-cart"
      >
        <div class="empty-icon">
          🛒
        </div>

        <h2>
          ตะกร้ายังว่าง
        </h2>

        <p>
          กรุณาเลือกอาหารจากเมนูเพื่อเพิ่มลงในตะกร้า
        </p>

        <router-link
          to="/menu"
          class="menu-button"
        >
          กลับไปเลือกเมนู
        </router-link>
      </section>


      <!-- Has Items -->
      <section v-else>

        <!-- Top -->
        <div class="cart-top">
          <div>
            <h2>
              รายการอาหาร
            </h2>

            <p>
              {{ totalQuantity }} รายการ
            </p>
          </div>

          <button
            type="button"
            class="clear-button"
            @click="clearCart"
          >
            ล้างตะกร้า
          </button>
        </div>


        <!-- Cart Items -->
        <div class="cart-list">

          <div
            v-for="(item, index) in items"
            :key="index"
            class="cart-item"
          >

            <!-- Item -->
            <div class="item-info">
              <h3>
                {{ item.getMenuItem().getName() }}
              </h3>

              <p>
                {{ formatPrice(item.getMenuItem().getPrice()) }} / ชิ้น
              </p>
            </div>


            <!-- Quantity -->
            <div class="quantity-section">
              <span class="quantity-label">
                จำนวน
              </span>

              <div class="quantity-control">

                <button
                  type="button"
                  @click="decreaseQuantity(index)"
                  :disabled="item.getQuantity() <= 1"
                >
                  −
                </button>

                <span>
                  {{ item.getQuantity() }}
                </span>

                <button
                  type="button"
                  @click="increaseQuantity(index)"
                >
                  +
                </button>

              </div>
            </div>


            <!-- Total -->
            <div class="item-total">
              <span>
                รวม
              </span>

              <strong>
                {{ formatPrice(item.getSubtotal()) }}
              </strong>
            </div>


            <!-- Remove -->
            <button
              type="button"
              class="remove-button"
              @click="removeItem(index)"
            >
              ลบ
            </button>

          </div>

        </div>


        <!-- Summary -->
        <section class="cart-summary">

          <div class="summary-header">
            <h2>
              สรุปคำสั่งซื้อ
            </h2>
          </div>

          <div class="summary-row">
            <span>
              จำนวนทั้งหมด
            </span>

            <strong>
              {{ totalQuantity }} รายการ
            </strong>
          </div>

          <div class="summary-row total-row">
            <span>
              ยอดรวม
            </span>

            <strong>
              {{ formatPrice(totalPrice) }}
            </strong>
          </div>

          <router-link
            to="/checkout"
            class="checkout-button"
          >
            ดำเนินการสั่งซื้อ
          </router-link>

        </section>

      </section>

    </main>

  </div>
</template>


<style scoped>
.cart-page {
  min-height: calc(100vh - 70px);
  width: 100%;

  background: #faf9f7;

  padding: 0 20px 70px;

  box-sizing: border-box;
}


/* ================================
   HEADER
================================ */

.cart-header {
  width: 100%;

  padding: 55px 20px 40px;

  box-sizing: border-box;

  text-align: center;

  background: #faf9f7;
}

.cart-header-content {
  width: 100%;
  max-width: 900px;

  margin: 0 auto;
}

.section-label {
  margin: 0 0 10px;

  color: #e85d04;

  font-size: 12px;
  font-weight: bold;

  letter-spacing: 3px;
}

.cart-header h1 {
  margin: 0 0 10px;

  color: #222;

  font-size: clamp(30px, 4vw, 42px);
  line-height: 1.2;
}

.cart-description {
  margin: 0;

  color: #777;

  font-size: 15px;
}
.cart-container {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  box-sizing: border-box;
}
.empty-cart {
  width: 100%;

  padding: 70px 30px;

  box-sizing: border-box;

  border: 1px solid #eeeeee;
  border-radius: 16px;

  background: white;

  text-align: center;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  width: 70px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 20px;

  border-radius: 16px;

  background: #fff1e8;

  font-size: 32px;
}

.empty-cart h2 {
  margin: 0 0 10px;

  color: #222;

  font-size: 25px;
}

.empty-cart p {
  margin: 0 0 25px;

  color: #777;

  font-size: 14px;
}
.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 44px;

  padding: 0 22px;

  border-radius: 8px;

  background: #e85d04;
  color: white;

  font-size: 14px;
  font-weight: bold;

  text-decoration: none;

  transition: 0.2s;
}

.menu-button:hover {
  background: #d94f00;

  transform: translateY(-1px);
}

.cart-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 20px;
}

.cart-top h2 {
  margin: 0 0 5px;

  color: #222;

  font-size: 26px;
}

.cart-top p {
  margin: 0;

  color: #888;

  font-size: 13px;
}
.clear-button {
  flex-shrink: 0;

  min-height: 40px;

  padding: 0 16px;

  border: 1px solid #eeeeee;
  border-radius: 8px;

  background: white;
  color: #666;

  font-family: inherit;
  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;
}

.clear-button:hover {
  border-color: #e85d04;

  color: #e85d04;

  background: #fff8f3;
}


/* ================================
   CART LIST
================================ */

.cart-list {
  display: flex;

  flex-direction: column;

  gap: 14px;
}
.cart-item {
  display: grid;

  grid-template-columns: minmax(0, 1fr) auto auto auto;

  align-items: center;

  gap: 25px;

  width: 100%;

  padding: 20px 22px;

  box-sizing: border-box;

  border: 1px solid #eeeeee;
  border-radius: 14px;

  background: white;

  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.05);

  transition: 0.2s;
}

.cart-item:hover {
  border-color: #f1dfd2;

  box-shadow:
    0 7px 22px rgba(0, 0, 0, 0.07);
}
.item-info {
  min-width: 0;
}

.item-info h3 {
  margin: 0 0 7px;

  color: #222;

  font-size: 17px;

  overflow-wrap: anywhere;
}

.item-info p {
  margin: 0;

  color: #888;

  font-size: 13px;
}
.quantity-section {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 6px;
}

.quantity-label {
  color: #999;

  font-size: 11px;
}

.quantity-control {
  display: flex;
  align-items: center;

  gap: 10px;
}

.quantity-control button {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 8px;

  background: #e85d04;
  color: white;

  font-size: 20px;
  line-height: 1;

  cursor: pointer;

  transition: 0.2s;
}

.quantity-control button:hover:not(:disabled) {
  background: #d94f00;
}

.quantity-control button:disabled {
  background: #ddd;

  color: #999;

  cursor: not-allowed;
}

.quantity-control span {
  min-width: 25px;

  color: #222;

  text-align: center;

  font-size: 15px;
  font-weight: bold;
}
.item-total {
  min-width: 110px;

  display: flex;
  flex-direction: column;

  align-items: flex-end;

  gap: 4px;
}

.item-total span {
  color: #999;

  font-size: 11px;
}

.item-total strong {
  color: #e85d04;

  font-size: 16px;
}
.remove-button {
  min-height: 34px;

  padding: 0 12px;

  border: 1px solid #f5d7d7;
  border-radius: 8px;

  background: #fff5f5;

  color: #d33;

  font-family: inherit;
  font-size: 12px;

  cursor: pointer;

  transition: 0.2s;
}

.remove-button:hover {
  border-color: #e8a0a0;

  background: #ffeaea;
}
.cart-summary {
  width: 100%;

  margin-top: 25px;

  padding: 25px;

  box-sizing: border-box;

  border: 1px solid #f1dfd2;
  border-radius: 16px;

  background: white;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.05);
}

.summary-header {
  margin-bottom: 10px;
}

.summary-header h2 {
  margin: 0;

  color: #222;

  font-size: 22px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 12px 0;

  color: #666;

  font-size: 14px;
}

.summary-row strong {
  color: #222;
}

.total-row {
  margin-top: 5px;

  padding-top: 18px;

  border-top: 1px solid #eeeeee;

  font-size: 20px;
}

.total-row strong {
  color: #e85d04;

  font-size: 22px;
}
.checkout-button {
  width: 100%;

  min-height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  padding: 0 20px;

  box-sizing: border-box;

  border-radius: 9px;

  background: #e85d04;
  color: white;

  font-size: 15px;
  font-weight: bold;

  text-decoration: none;

  transition: 0.2s;
}

.checkout-button:hover {
  background: #d94f00;

  transform: translateY(-1px);
}
@media (max-width: 850px) {

  .cart-page {
    padding-right: 18px;
    padding-left: 18px;
  }

  .cart-header {
    padding-top: 45px;
  }

  .cart-item {
    grid-template-columns: minmax(0, 1fr) auto;

    gap: 18px;
  }

  .quantity-section {
    align-items: flex-end;
  }

  .item-total {
    align-items: flex-start;
  }

  .remove-button {
    justify-self: start;
  }
}
@media (max-width: 600px) {

  .cart-page {
    padding-right: 14px;
    padding-left: 14px;
    padding-bottom: 50px;
  }

  .cart-header {
    padding: 35px 10px 30px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 2px;
  }

  .cart-header h1 {
    font-size: 30px;
  }

  .cart-description {
    font-size: 13px;
  }

  .cart-top {
    align-items: flex-start;

    flex-direction: column;

    gap: 12px;
  }

  .cart-top h2 {
    font-size: 23px;
  }

  .clear-button {
    width: 100%;
  }

  .cart-item {
    display: flex;

    flex-direction: column;

    align-items: stretch;

    gap: 16px;

    padding: 18px;
  }

  .item-info h3 {
    font-size: 16px;
  }

  .quantity-section {
    align-items: flex-start;
  }

  .quantity-control {
    gap: 12px;
  }

  .quantity-control button {
    width: 36px;
    height: 36px;
  }

  .item-total {
    min-width: 0;

    align-items: flex-start;

    padding-top: 12px;

    border-top: 1px solid #eeeeee;
  }

  .item-total strong {
    font-size: 17px;
  }

  .remove-button {
    width: 100%;
  }

  .cart-summary {
    padding: 20px;

    border-radius: 14px;
  }

  .summary-row {
    font-size: 13px;
  }

  .total-row {
    font-size: 18px;
  }

  .total-row strong {
    font-size: 20px;
  }

  .empty-cart {
    padding: 50px 20px;
  }

  .empty-cart h2 {
    font-size: 22px;
  }

  .empty-cart p {
    line-height: 1.6;
  }

  .menu-button {
    width: 100%;
  }
}


@media (max-width: 380px) {

  .cart-page {
    padding-right: 10px;
    padding-left: 10px;
  }

  .cart-header h1 {
    font-size: 27px;
  }

  .cart-item {
    padding: 15px;
  }

  .cart-summary {
    padding: 17px;
  }

  .summary-row {
    gap: 10px;

    font-size: 12px;
  }

  .total-row strong {
    font-size: 18px;
  }
}

</style>

