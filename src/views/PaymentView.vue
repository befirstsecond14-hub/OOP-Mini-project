<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { Payment } from '../models/Payment'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const paymentMethod = ref<'เงินสด' | 'โอนเงิน' | 'บัตรเครดิต'>('เงินสด')
const paymentSuccess = ref(false)
const paymentAmount = ref(0)

const totalPrice = computed(() => cartStore.totalPrice)

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}

function confirmPayment(): void {
  if (cartStore.items.length === 0) {
    alert('ไม่มีรายการอาหาร')
    router.push('/menu')
    return
  }

  const currentOrder = orderStore.currentOrder

  if (!currentOrder) {
    alert('ไม่พบข้อมูลคำสั่งซื้อ')
    router.push('/checkout')
    return
  }

  // สร้าง Payment
  const payment = new Payment(
    Date.now(),
    currentOrder as any,
    paymentMethod.value
  )

  // ชำระเงิน
  payment.pay()

  // เก็บยอดเงิน
  paymentAmount.value = payment.getAmount()

  // เปลี่ยนเป็นหน้าชำระเงินสำเร็จ
  paymentSuccess.value = true
}

function goToCheckout(): void {
  router.push('/checkout')
}

function goToOrder(): void {
  router.push('/order')
}

function goToMenu(): void {
  router.push('/menu')
}
</script>

<template>
  <main class="payment-page">

    <!-- หน้าชำระเงิน -->
    <section
      v-if="!paymentSuccess"
      class="payment-container"
    >
      <header class="payment-header">
        <p class="subtitle">PAYMENT</p>

        <h1>ชำระเงิน</h1>

        <p>กรุณาเลือกวิธีการชำระเงิน</p>
      </header>

      <section class="payment-card">

        <!-- ยอดเงิน -->
        <div class="price-box">
          <span>ยอดที่ต้องชำระ</span>

          <strong>
            {{ formatPrice(totalPrice) }}
          </strong>
        </div>

        <!-- วิธีชำระเงิน -->
        <div class="form-group">
          <label for="payment-method">
            วิธีการชำระเงิน
          </label>

          <select
            id="payment-method"
            v-model="paymentMethod"
          >
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

        <!-- ข้อมูลโอนเงิน -->
        <div
          v-if="paymentMethod === 'โอนเงิน'"
          class="payment-info"
        >
          <h3>ข้อมูลการโอนเงิน</h3>

          <p>ธนาคาร My Restaurant</p>

          <p>เลขบัญชี: 123-4-56789-0</p>
        </div>

        <!-- ข้อมูลบัตรเครดิต -->
        <div
          v-if="paymentMethod === 'บัตรเครดิต'"
          class="payment-info"
        >
          <h3>ชำระด้วยบัตรเครดิต</h3>

          <input
            type="text"
            placeholder="หมายเลขบัตร"
          >

          <input
            type="text"
            placeholder="ชื่อบนบัตร"
          >
        </div>

        <!-- ปุ่มยืนยัน -->
        <button
          class="payment-button"
          @click="confirmPayment"
        >
          ยืนยันการชำระเงิน
        </button>

        <!-- กลับไปหน้าสั่งซื้อ -->
        <button
          class="back-button"
          @click="goToCheckout"
        >
          กลับไปหน้าสั่งซื้อ
        </button>

      </section>
    </section>

    <!-- หน้าชำระเงินสำเร็จ -->
    <section
      v-else
      class="success-container"
    >
      <div class="success-card">

        <div class="success-icon">
          ✓
        </div>

        <p class="subtitle">
          PAYMENT SUCCESS
        </p>

        <h1>
          ชำระเงินสำเร็จ
        </h1>

        <p class="success-message">
          ระบบได้รับการชำระเงินของคุณแล้ว
        </p>

        <!-- รายละเอียดการชำระเงิน -->
        <div class="payment-detail">

          <div class="detail-row">
            <span>
              วิธีชำระเงิน
            </span>

            <strong>
              {{ paymentMethod }}
            </strong>
          </div>

          <div class="detail-row">
            <span>
              ยอดชำระ
            </span>

            <strong>
              {{ formatPrice(paymentAmount) }}
            </strong>
          </div>

          <div class="detail-row">
            <span>
              สถานะ
            </span>

            <strong class="status">
              ชำระเงินแล้ว
            </strong>
          </div>

        </div>

        <!-- ปุ่มหลังชำระเงิน -->
        <div class="buttons">

          <button
            class="order-button"
            @click="goToOrder"
          >
            ดูรายการออเดอร์
          </button>

          <button
            class="menu-button"
            @click="goToMenu"
          >
            กลับไปเลือกเมนู
          </button>

        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>

.payment-page {
  min-height: calc(100vh - 70px);
  background: #f8f8f8;
  padding: 50px 20px 70px;
  box-sizing: border-box;
}

.payment-container {
  max-width: 600px;
  margin: 0 auto;
}

.payment-header {
  text-align: center;
  margin-bottom: 35px;
}

.subtitle {
  color: #e85d04;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 3px;
  margin: 0 0 10px;
}

.payment-header h1 {
  margin: 0 0 10px;
  font-size: 38px;
}

.payment-header p:last-child {
  color: #777;
  margin: 0;
}

.payment-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
}

.price-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 12px;
  background: #fff3e8;
}

.price-box span {
  color: #555;
}

.price-box strong {
  color: #e85d04;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 15px;
}

.payment-info {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f8f8f8;
}

.payment-info h3 {
  margin: 0 0 15px;
}

.payment-info p {
  color: #555;
  margin: 8px 0;
}

.payment-info input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
}

.payment-button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #e85d04;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.payment-button:hover {
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
  font-size: 15px;
  cursor: pointer;
}

.back-button:hover {
  background: #f5f5f5;
}

.success-container {
  max-width: 650px;
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

.success-message {
  color: #777;
  margin: 0;
}

.payment-detail {
  margin-top: 30px;
  padding: 20px;
  border-radius: 12px;
  background: #f8f8f8;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: #777;
}

.status {
  color: #2e9d50;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

.order-button,
.menu-button {
  flex: 1;
  padding: 13px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.order-button {
  border: none;
  background: #e85d04;
  color: white;
}

.menu-button {
  border: 1px solid #ddd;
  background: white;
  color: #555;
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
  }

  .payment-header h1 {
    font-size: 30px;
  }

  .price-box {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>