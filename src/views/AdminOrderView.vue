<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'
import type { OrderStatus } from '../models/Order'

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

function changeStatus(newStatus: OrderStatus): void {
  orderStore.updateStatus(newStatus)
}

function goToDashboard(): void {
  router.push('/admin-dashboard')
}

function goToOrder(): void {
  router.push('/order')
}

function goToHome(): void {
  router.push('/')
}

function getStatusClass(
  orderStatus: OrderStatus
): string {
  return status.value === orderStatus
    ? 'current'
    : ''
}
</script>

<template>
  <main class="admin-page">

    <div class="top-button">
      <button
        type="button"
        class="back-button"
        @click="goToDashboard"
      >
        ← กลับ Dashboard
      </button>
    </div>

    <header class="admin-header">
      <p class="subtitle">
        ADMIN ORDER
      </p>

      <h1>
        จัดการออเดอร์
      </h1>

      <p>
        จัดการและเปลี่ยนสถานะออเดอร์
      </p>
    </header>

    <section
      v-if="currentOrder"
      class="admin-card"
    >

      <div class="order-top">

        <div>
          <span>
            เลขที่ออเดอร์
          </span>

          <h2>
            #{{ orderId }}
          </h2>
        </div>

        <div class="status">
          {{ status }}
        </div>

      </div>

      <div class="customer-info">

        <div>
          <span>
            ชื่อผู้สั่งซื้อ
          </span>

          <strong>
            {{ customerName }}
          </strong>
        </div>

        <div>
          <span>
            เลขโต๊ะ
          </span>

          <strong v-if="tableNumber === 0">
            สั่งกลับบ้าน
          </strong>

          <strong v-else>
            โต๊ะ {{ tableNumber }}
          </strong>
        </div>

      </div>

      <section class="items-section">

        <h2>
          รายการอาหาร
        </h2>

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

      <section class="status-section">

        <h2>
          เปลี่ยนสถานะออเดอร์
        </h2>

        <div class="status-buttons">

          <button
            type="button"
            class="status-button"
            :class="
              getStatusClass('รอรับออเดอร์')
            "
            @click="
              changeStatus('รอรับออเดอร์')
            "
          >
            <span class="number">
              1
            </span>

            <span>
              รอรับออเดอร์
            </span>
          </button>

          <button
            type="button"
            class="status-button"
            :class="
              getStatusClass('กำลังเตรียมอาหาร')
            "
            @click="
              changeStatus('กำลังเตรียมอาหาร')
            "
          >
            <span class="number">
              2
            </span>

            <span>
              กำลังเตรียมอาหาร
            </span>
          </button>

          <button
            type="button"
            class="status-button"
            :class="
              getStatusClass('พร้อมเสิร์ฟ')
            "
            @click="
              changeStatus('พร้อมเสิร์ฟ')
            "
          >
            <span class="number">
              3
            </span>

            <span>
              พร้อมเสิร์ฟ
            </span>
          </button>

          <button
            type="button"
            class="status-button"
            :class="
              getStatusClass('เสร็จสิ้น')
            "
            @click="
              changeStatus('เสร็จสิ้น')
            "
          >
            <span class="number">
              4
            </span>

            <span>
              เสร็จสิ้น
            </span>
          </button>

        </div>

      </section>

      <div class="current-status">

        <span>
          สถานะปัจจุบัน
        </span>

        <strong>
          {{ status }}
        </strong>

      </div>

      <div class="buttons">

        <button
          type="button"
          class="order-button"
          @click="goToOrder"
        >
          ดูหน้าลูกค้า
        </button>

        <button
          type="button"
          class="home-button"
          @click="goToHome"
        >
          กลับหน้าแรก
        </button>

      </div>

    </section>

    <section
      v-else
      class="empty-card"
    >

      <h2>
        ยังไม่มีออเดอร์
      </h2>

      <p>
        ยังไม่มีข้อมูลคำสั่งซื้อสำหรับจัดการ
      </p>

      <button
        type="button"
        class="order-button"
        @click="goToHome"
      >
        กลับหน้าแรก
      </button>

    </section>

  </main>
</template>

<style scoped>
.admin-page {
  min-height: calc(100vh - 70px);
  background: #f8f8f8;
  padding: 30px 20px 70px;
  box-sizing: border-box;
}

.top-button {
  max-width: 800px;
  margin: 0 auto 20px;
}

.back-button {
  padding: 9px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #444;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.back-button:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

.admin-header {
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

.admin-header h1 {
  margin: 0 0 10px;
  font-size: 38px;
}

.admin-header p:last-child {
  color: #777;
  margin: 0;
}

.admin-card {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.06);
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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}

.customer-info span {
  display: block;
  margin-bottom: 6px;
  color: #777;
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
  border-bottom: 1px solid #eee;
  font-size: 17px;
}

.total strong {
  color: #e85d04;
}

.total-price {
  font-size: 22px;
}

.status-section {
  padding: 30px 0;
}

.status-section h2 {
  margin: 0 0 20px;
}

.status-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.status-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: white;
  color: #444;
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  transition: 0.2s;
}

.status-button:hover {
  border-color: #e85d04;
  background: #fff8f3;
}

.status-button.current {
  border-color: #e85d04;
  background: #fff3e8;
  color: #e85d04;
  font-weight: bold;
}

.number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ddd;
  color: white;
  font-weight: bold;
}

.status-button.current .number {
  background: #e85d04;
}

.current-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  margin-bottom: 25px;
  border-radius: 10px;
  background: #fff3e8;
}

.current-status span {
  color: #777;
}

.current-status strong {
  color: #e85d04;
}

.buttons {
  display: flex;
  gap: 10px;
}

.order-button,
.home-button {
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
  transition: 0.2s;
}

.order-button:hover {
  background: #d94f00;
  transform: translateY(-1px);
}

.home-button {
  border: 1px solid #ddd;
  background: white;
  color: #555;
  transition: 0.2s;
}

.home-button:hover {
  background: #f8f8f8;
}

.empty-card {
  max-width: 500px;
  margin: auto;
  padding: 50px 30px;
  background: white;
  border-radius: 16px;
  text-align: center;
  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.06);
}

.empty-card h2 {
  margin: 0 0 10px;
}

.empty-card p {
  color: #777;
  margin-bottom: 25px;
}

.empty-card .order-button {
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

  .status-buttons {
    grid-template-columns: 1fr;
  }

  .buttons {
    flex-direction: column;
  }

  .admin-header h1 {
    font-size: 30px;
  }

  .top-button {
    margin-bottom: 15px;
  }
}
</style>