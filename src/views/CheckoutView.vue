```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { Order } from '../models/Order'
import { OrderItem } from '../models/OrderItem'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const customerName = ref('')
const tableNumber = ref(1)
const diningOption = ref<'ทานที่ร้าน' | 'กลับบ้าน'>('ทานที่ร้าน')

const totalPrice = computed(() =>
  cartStore.items.reduce((total, item) => total + item.getSubtotal(), 0)
)

function submitOrder(): void {
  if (!customerName.value.trim()) {
    alert('กรุณากรอกชื่อลูกค้า')
    return
  }

  if (cartStore.items.length === 0) {
    alert('ไม่มีรายการอาหาร')
    return
  }

  const newOrder = new Order(
    Date.now(),
    customerName.value.trim(),
    tableNumber.value
  )

  cartStore.items.forEach(item => {
    newOrder.addItem(
      new OrderItem(item.getMenuItem(), item.getQuantity())
    )
  })

  orderStore.setOrder(newOrder)
  router.push('/payment')
}

function goBack(): void {
  router.back()
}
</script>

<template>
  <main class="checkout-page">
    <section class="checkout-card">

      <!-- HEADER -->
      <header class="checkout-header">
        <p class="section-title">CHECKOUT</p>
        <h1>ยืนยันการสั่งซื้อ</h1>
        <p class="checkout-description">
          กรุณาตรวจสอบข้อมูลและรายการอาหารก่อนยืนยัน
        </p>
      </header>

      <!-- CUSTOMER INFO -->
      <section class="form-section">
        <div class="section-heading">
          <h2>ข้อมูลการสั่งซื้อ</h2>
        </div>

        <div class="form-group">
          <label for="customer-name">ชื่อผู้สั่งซื้อ</label>
          <input
            id="customer-name"
            v-model="customerName"
            type="text"
            placeholder="กรอกชื่อผู้สั่งซื้อ"
          />
        </div>

        <div class="form-group">
          <label>เลขโต๊ะ</label>

          <div class="table-options">
            <button
              v-for="table in 10"
              :key="table"
              type="button"
              :class="{ active: tableNumber === table }"
              @click="tableNumber = table"
            >
              {{ table }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>รูปแบบการรับประทาน</label>

          <div class="dining-options">
            <button
              type="button"
              :class="{ active: diningOption === 'ทานที่ร้าน' }"
              @click="diningOption = 'ทานที่ร้าน'"
            >
              <strong>ทานที่ร้าน</strong>
              <span>รับประทานที่ร้าน</span>
            </button>

            <button
              type="button"
              :class="{ active: diningOption === 'กลับบ้าน' }"
              @click="diningOption = 'กลับบ้าน'"
            >
              <strong>กลับบ้าน</strong>
              <span>รับอาหารกลับบ้าน</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ORDER ITEMS -->
      <section class="order-items">
        <div class="section-heading">
          <h2>รายการอาหาร</h2>
          <span>{{ cartStore.totalQuantity }} รายการ</span>
        </div>

        <div class="order-list">
          <div
            v-for="(item, index) in cartStore.items"
            :key="index"
            class="order-item"
          >
            <div class="order-item-info">
              <strong>{{ item.getMenuItem().getName() }}</strong>
              <p>{{ item.getQuantity() }} ชิ้น</p>
            </div>

            <strong class="order-item-price">
              {{ item.getSubtotal().toLocaleString() }} บาท
            </strong>
          </div>
        </div>
      </section>

      <!-- TOTAL -->
      <section class="total-section">
        <div class="total-row">
          <span>จำนวนทั้งหมด</span>
          <strong>{{ cartStore.totalQuantity }} รายการ</strong>
        </div>

        <div class="total-row final-total">
          <span>ยอดรวมทั้งหมด</span>
          <strong>{{ totalPrice.toLocaleString() }} บาท</strong>
        </div>
      </section>

      <!-- ACTIONS -->
      <div class="checkout-actions">
        <button
          type="button"
          class="back-button"
          @click="goBack"
        >
          กลับ
        </button>

        <button
          type="button"
          class="confirm-button"
          @click="submitOrder"
        >
          ยืนยันการสั่งซื้อ
        </button>
      </div>

    </section>
  </main>
</template>

<style scoped>
/* PAGE */
.checkout-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background: #faf9f7;
}

.checkout-card {
  width: 100%;
  max-width: 760px;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, .06);
}

/* HEADER */
.checkout-header {
  margin-bottom: 35px;
  text-align: center;
}

.section-title {
  margin: 0 0 8px;
  color: #e85d04;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
}

.checkout-header h1 {
  margin: 0 0 10px;
  color: #222;
  font-size: 38px;
}

.checkout-description {
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.6;
}

/* SECTION */
.form-section {
  margin-bottom: 35px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0;
  color: #222;
  font-size: 21px;
}

.section-heading > span {
  padding: 5px 10px;
  border-radius: 20px;
  background: #fff1e8;
  color: #e85d04;
  font-size: 12px;
  font-weight: 700;
}

/* FORM */
.form-group {
  margin-bottom: 24px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 9px;
  color: #333;
  font-size: 14px;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 9px;
  outline: none;
  font-family: inherit;
  font-size: 15px;
}

.form-group input:focus {
  border-color: #e85d04;
  box-shadow: 0 0 0 3px rgba(232, 93, 4, .1);
}

/* TABLE */
.table-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.table-options button {
  padding: 11px 6px;
  border: 1px solid #ddd;
  border-radius: 9px;
  background: #fff;
  color: #444;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
}

.table-options button:hover {
  border-color: #e85d04;
  color: #e85d04;
}

.table-options button.active {
  border-color: #e85d04;
  background: #e85d04;
  color: #fff;
}

/* DINING */
.dining-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.dining-options button {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  color: #333;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.dining-options button:hover {
  border-color: #e85d04;
}

.dining-options button.active {
  border-color: #e85d04;
  background: #fff1e8;
}

.dining-options strong,
.dining-options span {
  display: block;
}

.dining-options strong {
  margin-bottom: 4px;
  font-size: 15px;
}

.dining-options button.active strong {
  color: #e85d04;
}

.dining-options span {
  color: #888;
  font-size: 12px;
}

/* ORDER ITEMS */
.order-items {
  margin-bottom: 30px;
}

.order-list {
  border-top: 1px solid #eee;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.order-item-info strong {
  display: block;
  color: #333;
  font-size: 15px;
}

.order-item-info p {
  margin: 5px 0 0;
  color: #888;
  font-size: 13px;
}

.order-item-price {
  flex-shrink: 0;
  color: #e85d04;
  font-size: 14px;
}

/* TOTAL */
.total-section {
  padding-top: 5px;
  margin-bottom: 30px;
  border-top: 2px solid #eee;
}

.total-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 0;
  color: #555;
  font-size: 14px;
}

.total-row strong {
  color: #333;
}

.final-total {
  padding-top: 16px;
  font-size: 22px;
  font-weight: 700;
}

.final-total strong {
  color: #e85d04;
}

/* BUTTONS */
.checkout-actions {
  display: grid;
  grid-template-columns: .7fr 1.5fr;
  gap: 12px;
}

.checkout-actions button {
  min-height: 48px;
  border-radius: 9px;
  cursor: pointer;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
}

.back-button {
  border: 1px solid #ddd;
  background: #fff;
  color: #555;
}

.back-button:hover {
  background: #f7f7f7;
}

.confirm-button {
  border: 1px solid #e85d04;
  background: #e85d04;
  color: #fff;
}

.confirm-button:hover {
  border-color: #d94f00;
  background: #d94f00;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .checkout-page {
    padding: 30px 16px 50px;
  }

  .checkout-card {
    padding: 30px 22px;
  }

  .checkout-header h1 {
    font-size: 30px;
  }

  .table-options {
    gap: 7px;
  }
}

@media (max-width: 520px) {
  .checkout-page {
    padding: 20px 12px 40px;
  }

  .checkout-card {
    padding: 22px 18px;
  }

  .checkout-header h1 {
    font-size: 27px;
  }

  .table-options {
    grid-template-columns: repeat(2, 1fr);
  }

  .dining-options {
    grid-template-columns: 1fr;
  }

  .order-item {
    align-items: flex-start;
  }

  .checkout-actions {
    grid-template-columns: 1fr;
  }

  .confirm-button {
    order: 1;
  }

  .back-button {
    order: 2;
  }
}

@media (max-width: 360px) {
  .checkout-card {
    padding: 20px 14px;
  }

  .checkout-header h1 {
    font-size: 24px;
  }

  .section-heading h2 {
    font-size: 18px;
  }

  .final-total {
    font-size: 18px;
  }
}
</style>
