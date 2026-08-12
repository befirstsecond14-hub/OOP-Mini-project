<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { Order } from '../models/Order'
import { OrderItem } from '../models/OrderItem'

const router = useRouter()
const cartStore = useCartStore()

const customerName = ref('')
const phone = ref('')
const tableNumber = ref('')
const paymentMethod = ref('เงินสด')

const order = ref<Order | null>(null)
const orderSuccess = ref(false)

const items = computed(() => cartStore.items)

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}

function confirmOrder(): void {
  if (!customerName.value.trim()) {
    alert('กรุณากรอกชื่อผู้สั่งซื้อ')
    return
  }

  if (!phone.value.trim()) {
    alert('กรุณากรอกเบอร์โทรศัพท์')
    return
  }

  if (!tableNumber.value.trim()) {
    alert('กรุณากรอกเลขโต๊ะ')
    return
  }

  if (cartStore.items.length === 0) {
    alert('ไม่มีสินค้าในตะกร้า')
    router.push('/menu')
    return
  }

  const newOrder = new Order(
    Date.now(),
    customerName.value
  )

  cartStore.items.forEach((cartItem) => {
    const orderItem = new OrderItem(
      cartItem.getMenuItem(),
      cartItem.getQuantity()
    )

    newOrder.addItem(orderItem)
  })

  newOrder.setStatus('กำลังเตรียมอาหาร')

  order.value = newOrder
  orderSuccess.value = true

  cartStore.clearCart()
}

function goToMenu(): void {
  router.push('/menu')
}

function goToHome(): void {
  router.push('/')
}
</script>

<template>
  <main class="checkout-page">

    <section v-if="!orderSuccess" class="checkout-container">

      <header class="checkout-header">
        <p class="subtitle">CHECKOUT</p>

        <h1>ยืนยันการสั่งซื้อ</h1>

        <p>กรุณากรอกข้อมูลก่อนยืนยันการสั่งซื้อ</p>
      </header>

      <div class="checkout-grid">

        <section class="form-card">

          <h2>ข้อมูลผู้สั่งซื้อ</h2>

          <div class="form-group">
            <label>ชื่อผู้สั่งซื้อ</label>

            <input
              v-model="customerName"
              type="text"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>

          <div class="form-group">
            <label>เบอร์โทรศัพท์</label>

            <input
              v-model="phone"
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์"
            />
          </div>

          <div class="form-group">
            <label>เลขโต๊ะ</label>

            <input
              v-model="tableNumber"
              type="text"
              placeholder="เช่น A01"
            />
          </div>

          <div class="form-group">
            <label>วิธีชำระเงิน</label>

            <select v-model="paymentMethod">
              <option value="เงินสด">
                เงินสด
              </option>

              <option value="โอนเงิน">
                โอนเงิน
              </option>

              <option value="บัตรเครดิต">
                บัตรเครดิต
              </option>
            </select>
          </div>

        </section>

        <section class="summary-card">

          <h2>รายการอาหาร</h2>

          <div
            v-for="(item, index) in items"
            :key="index"
            class="summary-item"
          >

            <div>
              <h3>
                {{ item.getMenuItem().getName() }}
              </h3>

              <p>
                {{ item.getQuantity() }} ชิ้น
              </p>
            </div>

            <strong>
              {{ formatPrice(item.getSubtotal()) }}
            </strong>

          </div>

          <div class="summary-total">
            <span>จำนวนทั้งหมด</span>

            <strong>
              {{ cartStore.totalQuantity }} รายการ
            </strong>
          </div>

          <div class="summary-total total-price">
            <span>ยอดรวม</span>

            <strong>
              {{ formatPrice(cartStore.totalPrice) }}
            </strong>
          </div>

          <button
            class="confirm-button"
            @click="confirmOrder"
          >
            ยืนยันการสั่งซื้อ
          </button>

          <button
            class="back-button"
            @click="router.push('/cart')"
          >
            กลับไปตะกร้า
          </button>

        </section>

      </div>

    </section>

    <section
      v-else
      class="success-container"
    >

      <div class="success-card">

        <div class="success-icon">
          ✓
        </div>

        <p class="subtitle">
          ORDER SUCCESS
        </p>

        <h1>
          สั่งซื้อสำเร็จ
        </h1>

        <p>
          ขอบคุณสำหรับการสั่งซื้อ
        </p>

        <div
          v-if="order"
          class="order-detail"
        >

          <div class="detail-row">
            <span>เลขที่ออเดอร์</span>

            <strong>
              #{{ order.getId() }}
            </strong>
          </div>

          <div class="detail-row">
            <span>ชื่อผู้สั่งซื้อ</span>

            <strong>
              {{ order.getCustomerName() }}
            </strong>
          </div>

          <div class="detail-row">
            <span>สถานะ</span>

            <strong class="status">
              {{ order.getStatus() }}
            </strong>
          </div>

          <div class="detail-row">
            <span>วิธีชำระเงิน</span>

            <strong>
              {{ paymentMethod }}
            </strong>
          </div>

          <div class="detail-row total">
            <span>ยอดรวม</span>

            <strong>
              {{ formatPrice(order.getTotal()) }}
            </strong>
          </div>

        </div>

        <div class="success-buttons">

          <button
            class="menu-button"
            @click="goToMenu"
          >
            กลับไปเลือกเมนู
          </button>

          <button
            class="home-button"
            @click="goToHome"
          >
            กลับหน้าแรก
          </button>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>
.checkout-page {
  min-height: calc(100vh - 70px);
  background: #f8f8f8;
  padding: 50px 20px 70px;
}

.checkout-header {
  max-width: 1000px;
  margin: 0 auto 40px;
  text-align: center;
}

.subtitle {
  color: #e85d04;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.checkout-header h1 {
  margin: 0 0 10px;
  font-size: 38px;
}

.checkout-header p:last-child {
  color: #777;
}

.checkout-grid {
  max-width: 1000px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.form-card,
.summary-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.form-card h2,
.summary-card h2 {
  margin-top: 0;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #e85d04;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.summary-item h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.summary-item p {
  margin: 0;
  color: #777;
}

.summary-item strong {
  color: #e85d04;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.total-price {
  font-size: 22px;
  border-bottom: none;
}

.total-price strong {
  color: #e85d04;
}

.confirm-button {
  width: 100%;
  margin-top: 15px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #e85d04;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.confirm-button:hover {
  background: #d94f00;
}

.back-button {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #555;
  cursor: pointer;
}

.back-button:hover {
  background: #f5f5f5;
}

.success-container {
  max-width: 700px;
  margin: 30px auto;
}

.success-card {
  background: white;
  padding: 50px 35px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.success-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f8ed;
  color: #2e9d50;
  font-size: 40px;
  font-weight: bold;
}

.success-card h1 {
  margin: 10px 0;
}

.success-card > p {
  color: #777;
}

.order-detail {
  margin-top: 30px;
  padding: 20px;
  border-radius: 12px;
  background: #f8f8f8;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: #777;
}

.detail-row strong {
  color: #333;
}

.detail-row .status {
  color: #e85d04;
}

.detail-row.total {
  margin-top: 10px;
  padding-top: 20px;
  font-size: 20px;
  border-top: 2px solid #ddd;
}

.success-buttons {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

.menu-button,
.home-button {
  flex: 1;
  padding: 13px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.menu-button {
  border: none;
  background: #e85d04;
  color: white;
}

.home-button {
  border: 1px solid #ddd;
  background: white;
  color: #555;
}

@media (max-width: 768px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .checkout-header h1 {
    font-size: 30px;
  }

  .success-buttons {
    flex-direction: column;
  }
}
</style>