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

  // สร้างออบเจ็กต์ Payment (หลักการ OOP)
  const payment = new Payment(
    Date.now(),
    currentOrder as any,
    paymentMethod.value
  )

  // ดำเนินการชำระเงิน
  payment.pay()

  // เก็บยอดเงินที่ชำระ
  paymentAmount.value = payment.getAmount()

  // เปลี่ยนหน้าจอเป็น "ชำระเงินสำเร็จ"
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

    <!-- ==============================================
         1. หน้าฟอร์มชำระเงิน
    =============================================== -->
    <section v-if="!paymentSuccess" class="payment-container">
      
      <header class="payment-header">
        <p class="subtitle">PAYMENT</p>
        <h1>ชำระเงิน</h1>
        <p>กรุณาเลือกวิธีการชำระเงิน</p>
      </header>

      <section class="payment-card">
        
        <!-- ยอดที่ต้องชำระ -->
        <div class="price-box">
          <span>ยอดที่ต้องชำระ</span>
          <strong>{{ formatPrice(totalPrice) }}</strong>
        </div>

        <!-- เลือกวิธีชำระเงิน -->
        <div class="form-group">
          <label for="payment-method">วิธีการชำระเงิน</label>
          <select id="payment-method" v-model="paymentMethod">
            <option value="เงินสด">เงินสด</option>
            <option value="โอนเงิน">โอนเงิน</option>
            <option value="บัตรเครดิต">บัตรเครดิต</option>
          </select>
        </div>

        <!-- ข้อมูลโอนเงิน -->
        <div v-if="paymentMethod === 'โอนเงิน'" class="payment-info">
          <h3>ข้อมูลการโอนเงิน</h3>
          <p>ธนาคาร My Restaurant</p>
          <p>เลขบัญชี: 123-4-56789-0</p>
        </div>

        <!-- ข้อมูลบัตรเครดิต -->
        <div v-if="paymentMethod === 'บัตรเครดิต'" class="payment-info">
          <h3>ชำระด้วยบัตรเครดิต</h3>
          <input type="text" placeholder="หมายเลขบัตร">
          <input type="text" placeholder="ชื่อบนบัตร">
        </div>

        <!-- ปุ่มยืนยัน -->
        <button class="payment-button" @click="confirmPayment">
          ยืนยันการชำระเงิน
        </button>

        <button class="back-button" @click="goToCheckout">
          กลับไปหน้าสั่งซื้อ
        </button>

      </section>
    </section>

    <!-- ==============================================
         2. หน้าชำระเงินสำเร็จ (Success)
    =============================================== -->
    <section v-else class="success-container">
      <div class="success-card">
        
        <div class="success-icon">✓</div>
        <p class="subtitle">PAYMENT SUCCESS</p>
        <h1>ชำระเงินสำเร็จ</h1>
        <p class="success-message">ระบบได้รับการชำระเงินของคุณแล้ว</p>

        <!-- รายละเอียดใบเสร็จ -->
        <div class="payment-detail">
          <div class="detail-row">
            <span>วิธีชำระเงิน</span>
            <strong>{{ paymentMethod }}</strong>
          </div>
          
          <div class="detail-row">
            <span>ยอดชำระ</span>
            <strong>{{ formatPrice(paymentAmount) }}</strong>
          </div>
          
          <div class="detail-row">
            <span>สถานะ</span>
            <strong class="status">ชำระเงินแล้ว</strong>
          </div>
        </div>

        <!-- ปุ่มไปหน้าอื่นๆ -->
        <div class="buttons">
          <button class="order-button" @click="goToOrder">
            ดูรายการออเดอร์
          </button>
          
          <button class="menu-button" @click="goToMenu">
            กลับไปเลือกเมนู
          </button>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* ==============================================
   LAYOUT & HEADER
============================================== */
.payment-page {
  min-height: calc(100vh - 70px);
  padding: 50px 20px 70px;
  box-sizing: border-box;
  background: #faf9f7;
}

.payment-container, .success-container {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
}

.success-container { margin: 20px auto; }

.payment-header {
  margin-bottom: 30px;
  text-align: center;
}

.subtitle {
  margin: 0 0 8px;
  color: #e85d04;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
}

.payment-header h1 { margin: 0 0 10px; color: #222; font-size: 40px; line-height: 1.2; }
.payment-header p:last-child { margin: 0; color: #777; font-size: 15px; }


/* ==============================================
   CARDS (PAYMENT & SUCCESS)
============================================== */
.payment-card, .success-card {
  padding: 30px;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
}

.success-card { padding: 50px 35px; text-align: center; }

/* ==============================================
   PRICE & FORM (PAYMENT VIEW)
============================================== */
.price-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  border: 1px solid #f5d7c1;
  border-radius: 12px;
  background: #fff1e8;
}

.price-box span { color: #555; font-size: 15px; }
.price-box strong { color: #e85d04; font-size: 24px; font-weight: bold; }

.form-group { margin-bottom: 22px; }
.form-group label { display: block; margin-bottom: 8px; color: #222; font-size: 15px; font-weight: bold; }
.form-group select {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-family: inherit;
  font-size: 15px;
  outline: none;
  cursor: pointer;
}
.form-group select:focus { border-color: #e85d04; }

.payment-info {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #f1dfd2;
  border-radius: 12px;
  background: #faf9f7;
}

.payment-info h3 { margin: 0 0 15px; color: #222; font-size: 17px; }
.payment-info p { margin: 8px 0; color: #666; font-size: 14px; }

.payment-info input {
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
}
.payment-info input:focus { border-color: #e85d04; }

/* ==============================================
   BUTTONS
============================================== */
.payment-button, .back-button, .order-button, .menu-button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.payment-button { background: #e85d04; color: white; }
.payment-button:hover { background: #d94f00; transform: translateY(-1px); }

.back-button { margin-top: 10px; border: 1px solid #ddd; background: white; color: #555; }
.back-button:hover { border-color: #e85d04; color: #e85d04; background: #fffaf7; }

/* ==============================================
   SUCCESS ELEMENTS
============================================== */
.success-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #e8f8ed;
  color: #2e9d50;
  font-size: 40px;
  font-weight: bold;
}

.success-card h1 { margin: 10px 0; color: #222; font-size: 32px; }
.success-message { margin: 0; color: #777; font-size: 15px; }

.payment-detail {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: #faf9f7;
  text-align: left;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 13px 0;
  border-bottom: 1px solid #e5e5e5;
}
.detail-row:last-child { border-bottom: none; }
.detail-row span { color: #777; font-size: 14px; }
.detail-row strong { color: #333; font-size: 14px; }
.detail-row .status { color: #2e9d50; }

.buttons { display: flex; gap: 10px; margin-top: 25px; }
.order-button { background: #e85d04; color: white; flex: 1; }
.order-button:hover { background: #d94f00; transform: translateY(-1px); }
.menu-button { border: 1px solid #ddd; background: white; color: #555; flex: 1; }
.menu-button:hover { border-color: #e85d04; color: #e85d04; background: #fffaf7; }


/* ==============================================
   RESPONSIVE DESIGN
============================================== */
@media (max-width: 600px) {
  .payment-page { padding: 40px 18px 60px; }
  .payment-card { padding: 25px 20px; }
  .payment-header h1 { font-size: 32px; }
  .price-box { align-items: flex-start; flex-direction: column; }
  
  .success-card { padding: 40px 20px; }
  .success-card h1 { font-size: 28px; }
  .buttons { flex-direction: column; }
}
</style>