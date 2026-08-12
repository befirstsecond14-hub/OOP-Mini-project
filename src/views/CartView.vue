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
      <p class="section-title">
        YOUR CART
      </p>

      <h1>
        ตะกร้าของคุณ
      </h1>

      <p>
        ตรวจสอบรายการอาหารก่อนสั่งซื้อ
      </p>
    </header>


    <main class="cart-container">

      <!-- ตะกร้าว่าง -->
      <section
        v-if="items.length === 0"
        class="empty-cart"
      >
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


      <!-- มีสินค้า -->
      <section v-else>

        <!-- หัวข้อรายการ -->
        <div class="cart-top">

          <h2>
            รายการอาหาร
          </h2>

          <button
            class="clear-button"
            @click="clearCart"
          >
            ล้างตะกร้า
          </button>

        </div>


        <!-- รายการสินค้า -->
        <div class="cart-list">

          <div
            v-for="(item, index) in items"
            :key="index"
            class="cart-item"
          >

            <!-- ข้อมูลอาหาร -->
            <div class="item-info">

              <h3>
                {{ item.getMenuItem().getName() }}
              </h3>

              <p>
                {{ formatPrice(item.getMenuItem().getPrice()) }}
                / ชิ้น
              </p>

            </div>


            <!-- จำนวน -->
            <div class="quantity-control">

              <button
                @click="decreaseQuantity(index)"
                :disabled="item.getQuantity() <= 1"
              >
                −
              </button>

              <span>
                {{ item.getQuantity() }}
              </span>

              <button
                @click="increaseQuantity(index)"
              >
                +
              </button>

            </div>


            <!-- ราคารวมของรายการ -->
            <div class="item-total">
              {{ formatPrice(item.getSubtotal()) }}
            </div>


            <!-- ลบ -->
            <button
              class="remove-button"
              @click="removeItem(index)"
            >
              ลบ
            </button>

          </div>

        </div>


        <!-- สรุปตะกร้า -->
        <div class="cart-summary">

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


          <!-- ไป Checkout -->
          <router-link
            to="/checkout"
            class="checkout-button"
          >
            ดำเนินการสั่งซื้อ
          </router-link>

        </div>

      </section>

    </main>

  </div>
</template>


<style scoped>

.cart-page {
  min-height: 100vh;

  background: #f8f8f8;

  padding-bottom: 60px;
}

.cart-header {
  text-align: center;

  background: white;

  padding: 60px 20px 40px;
}

.cart-header h1 {
  font-size: 36px;

  margin: 0 0 10px;
}

.cart-header p:last-child {
  color: #777;
}

.cart-container {
  max-width: 1000px;

  margin: 40px auto;

  padding: 0 20px;
}

.cart-top {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
}

.cart-top h2 {
  margin: 0;
}

.clear-button {
  border: none;

  background: #eee;

  padding: 10px 18px;

  border-radius: 8px;

  cursor: pointer;
}

.clear-button:hover {
  background: #ddd;
}

.cart-list {
  display: flex;

  flex-direction: column;

  gap: 12px;
}

.cart-item {
  display: grid;

  grid-template-columns:
    1fr
    auto
    auto
    auto;

  align-items: center;

  gap: 25px;

  background: white;

  padding: 20px;

  border-radius: 12px;

  box-shadow:
    0 2px 10px
    rgba(0, 0, 0, 0.05);
}

.item-info h3 {
  margin: 0 0 8px;
}

.item-info p {
  margin: 0;

  color: #777;
}

.quantity-control {
  display: flex;

  align-items: center;

  gap: 12px;
}

.quantity-control button {
  width: 32px;
  height: 32px;

  border: none;

  border-radius: 6px;

  background: #f36c21;

  color: white;

  font-size: 20px;

  cursor: pointer;
}

.quantity-control button:disabled {
  background: #ccc;

  cursor: not-allowed;
}

.quantity-control span {
  min-width: 25px;

  text-align: center;

  font-weight: bold;
}

.item-total {
  min-width: 100px;

  text-align: right;

  font-weight: bold;
}
.remove-button {
  border: none;

  background: #ffe5e5;

  color: #d33;

  padding: 8px 12px;

  border-radius: 6px;

  cursor: pointer;
}

.remove-button:hover {
  background: #ffd5d5;
}
.cart-summary {
  margin-top: 25px;

  background: white;

  padding: 25px;

  border-radius: 12px;
}

.summary-row {
  display: flex;

  justify-content: space-between;

  padding: 10px 0;
}

.total-row {
  border-top: 1px solid #ddd;

  margin-top: 10px;

  padding-top: 20px;

  font-size: 22px;
}

.total-row strong {
  color: #f36c21;
}
.checkout-button {
  display: block;

  width: 100%;

  margin-top: 20px;

  padding: 15px;

  border: none;

  border-radius: 8px;

  background: #f36c21;

  color: white;

  font-size: 17px;

  font-weight: bold;

  text-align: center;

  text-decoration: none;

  cursor: pointer;
}

.checkout-button:hover {
  background: #df5c15;
}

.empty-cart {
  background: white;

  text-align: center;

  padding: 70px 20px;

  border-radius: 12px;
}

.empty-cart h2 {
  margin-bottom: 10px;
}

.empty-cart p {
  color: #777;

  margin-bottom: 25px;
}


@media (max-width: 700px) {

  .cart-item {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .item-total {
    text-align: left;
  }

  .cart-top {
    align-items: flex-start;
  }

  .cart-header h1 {
    font-size: 28px;
  }

}
</style>