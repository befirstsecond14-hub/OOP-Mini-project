<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'

const router = useRouter()
const orderStore = useOrderStore()

const currentOrder = computed(() => orderStore.currentOrder)

const orderId = computed(() => {
  return currentOrder.value?.getId() ?? 0
})

const customerName = computed(() => {
  return currentOrder.value?.getCustomerName() ?? '-'
})

const tableNumber = computed(() => {
  return currentOrder.value?.getTableNumber() ?? 0
})

const status = computed(() => {
  return currentOrder.value?.getStatus() ?? 'ไม่พบสถานะ'
})

const orderItems = computed(() => {
  return currentOrder.value?.getItems() ?? []
})

const totalQuantity = computed(() => {
  return currentOrder.value?.getTotalQuantity() ?? 0
})

const totalPrice = computed(() => {
  return currentOrder.value?.getTotal() ?? 0
})

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}

function goToMenu(): void {
  router.push('/menu')
}

function goToHome(): void {
  router.push('/')
}

function getStatusStep(): number {
  const currentStatus = status.value

  if (currentStatus === 'รอรับออเดอร์') {
    return 1
  }

  if (currentStatus === 'กำลังเตรียมอาหาร') {
    return 2
  }

  if (currentStatus === 'พร้อมเสิร์ฟ') {
    return 3
  }

  if (currentStatus === 'เสร็จสิ้น') {
    return 4
  }

  return 1
}
</script>

<template>
  <main class="order-page">

    <header class="order-header">
      <p class="subtitle">YOUR ORDER</p>

      <h1>รายการออเดอร์</h1>

      <p>
        ตรวจสอบสถานะการสั่งซื้อของคุณ
      </p>
    </header>

    <section
      v-if="currentOrder"
      class="order-card"
    >

      <!-- ข้อมูลออเดอร์ -->
      <div class="order-top">

        <div>
          <span>เลขที่ออเดอร์</span>

          <h2>
            #{{ orderId }}
          </h2>
        </div>

        <div class="status">
          {{ status }}
        </div>

      </div>

      <!-- ข้อมูลลูกค้า -->
      <div class="customer-info">

        <div>
          <span>ชื่อผู้สั่งซื้อ</span>

          <strong>
            {{ customerName }}
          </strong>
        </div>

        <div>
          <span>เลขโต๊ะ</span>

          <strong>
            โต๊ะ {{ tableNumber }}
          </strong>
        </div>

        <div>
          <span>สถานะการชำระเงิน</span>

          <strong class="paid">
            ชำระเงินแล้ว
          </strong>
        </div>

      </div>

      <!-- รายการอาหาร -->
      <section class="items-section">

        <h2>รายการอาหาร</h2>

        <div
          v-for="(item, index) in orderItems"
          :key="index"
          class="order-item"
        >

          <div>
            <h3>
              {{ item.getMenuItem().getName() }}
            </h3>

            <p>
              จำนวน {{ item.getQuantity() }} ชิ้น
            </p>
          </div>

          <strong>
            {{ formatPrice(item.getSubtotal()) }}
          </strong>

        </div>

        <div
          v-if="orderItems.length === 0"
          class="empty-order"
        >
          ไม่มีรายการอาหาร
        </div>

      </section>

      <!-- ยอดรวม -->
      <div class="total">

        <span>
          จำนวนทั้งหมด
        </span>

        <strong>
          {{ totalQuantity }} ชิ้น
        </strong>

      </div>

      <div class="total total-price">

        <span>
          ยอดรวมทั้งหมด
        </span>

        <strong>
          {{ formatPrice(totalPrice) }}
        </strong>

      </div>

      <!-- สถานะออเดอร์ -->
      <div class="order-status">

        <div
          class="status-step"
          :class="{ active: getStatusStep() >= 1 }"
        >
          <div class="circle">
            <span v-if="getStatusStep() > 1">✓</span>
            <span v-else>1</span>
          </div>

          <span>
            รับออเดอร์
          </span>
        </div>

        <div
          class="line"
          :class="{ active: getStatusStep() >= 2 }"
        ></div>

        <div
          class="status-step"
          :class="{ active: getStatusStep() >= 2 }"
        >
          <div class="circle">
            <span v-if="getStatusStep() > 2">✓</span>
            <span v-else>2</span>
          </div>

          <span>
            กำลังเตรียมอาหาร
          </span>
        </div>

        <div
          class="line"
          :class="{ active: getStatusStep() >= 3 }"
        ></div>

        <div
          class="status-step"
          :class="{ active: getStatusStep() >= 3 }"
        >
          <div class="circle">
            <span v-if="getStatusStep() > 3">✓</span>
            <span v-else>3</span>
          </div>

          <span>
            พร้อมเสิร์ฟ
          </span>
        </div>

      </div>

      <!-- ปุ่ม -->
      <div class="buttons">

        <button
          class="menu-button"
          @click="goToMenu"
        >
          สั่งอาหารเพิ่ม
        </button>

        <button
          class="home-button"
          @click="goToHome"
        >
          กลับหน้าแรก
        </button>

      </div>

    </section>

    <!-- กรณีไม่มี Order -->
    <section
      v-else
      class="empty-card"
    >

      <h2>
        ไม่พบข้อมูลออเดอร์
      </h2>

      <p>
        กรุณาสั่งอาหารก่อน
      </p>

      <button
        class="menu-button"
        @click="goToMenu"
      >
        ไปเลือกอาหาร
      </button>

    </section>

  </main>
</template>

<style scoped>
.order-page {
  min-height: calc(100vh - 70px);
  background: #f8f8f8;
  padding: 50px 20px 70px;
  box-sizing: border-box;
}

.order-header {
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

.order-header h1 {
  margin: 0 0 10px;
  font-size: 38px;
}

.order-header p:last-child {
  color: #777;
  margin: 0;
}

.order-card {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.order-top span {
  color: #777;
}

.order-top h2 {
  margin: 5px 0 0;
}

.status {
  padding: 10px 15px;
  border-radius: 20px;
  background: #fff3e8;
  color: #e85d04;
  font-weight: bold;
}

.customer-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}

.customer-info span {
  display: block;
  margin-bottom: 6px;
  color: #777;
}

.paid {
  color: #2e9d50;
}

.items-section {
  padding: 25px 0;
}

.items-section h2 {
  margin: 0 0 15px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.order-item h3 {
  margin: 0 0 5px;
}

.order-item p {
  margin: 0;
  color: #777;
}

.order-item strong {
  color: #e85d04;
  font-size: 16px;
}

.empty-order {
  padding: 20px 0;
  color: #777;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  font-size: 17px;
  border-bottom: 1px solid #eee;
}

.total strong {
  color: #e85d04;
}

.total-price {
  font-size: 22px;
}

.order-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
}

.status-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.circle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ddd;
  color: white;
  font-weight: bold;
}

.status-step.active .circle {
  background: #e85d04;
}

.status-step span {
  font-size: 13px;
  color: #777;
}

.line {
  width: 80px;
  height: 2px;
  margin: 0 10px;
  background: #ddd;
}

.line.active {
  background: #e85d04;
}

.buttons {
  display: flex;
  gap: 10px;
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

.empty-card {
  max-width: 500px;
  margin: auto;
  padding: 50px 30px;
  background: white;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
}

.empty-card h2 {
  margin: 0 0 10px;
}

.empty-card p {
  color: #777;
  margin-bottom: 25px;
}

.empty-card .menu-button {
  width: 100%;
}

@media (max-width: 700px) {

  .order-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .customer-info {
    grid-template-columns: 1fr;
  }

  .order-status {
    flex-direction: column;
    gap: 10px;
  }

  .line {
    width: 2px;
    height: 30px;
    margin: 0;
  }

  .buttons {
    flex-direction: column;
  }

  .order-header h1 {
    font-size: 30px;
  }
}
</style>