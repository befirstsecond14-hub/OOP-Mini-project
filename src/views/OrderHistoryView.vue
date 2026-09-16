<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'

const router = useRouter()
const orderStore = useOrderStore()

const orders = computed(() => {
  return [...orderStore.orderHistory].reverse()
})

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} บาท`
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'รอดำเนินการ',
    preparing: 'กำลังเตรียมอาหาร',
    ready: 'พร้อมเสิร์ฟ',
    completed: 'เสร็จสิ้น',
    cancelled: 'ยกเลิก'
  }

  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  return `status-${status}`
}

const viewOrder = (order: any) => {
  orderStore.currentOrder = order
  router.push('/order')
}

const clearHistory = () => {
  if (
    confirm(
      'ต้องการล้างประวัติการสั่งซื้อทั้งหมดหรือไม่?'
    )
  ) {
    orderStore.clearHistory()
  }
}
</script>

<template>
  <div class="history-page">

    <header class="page-header">

      <div>
        <p class="subtitle">
          ORDER HISTORY
        </p>

        <h1>
          ประวัติการสั่งซื้อ
        </h1>

        <p>
          รายการคำสั่งซื้อที่คุณเคยสั่ง
        </p>
      </div>

      <button
        type="button"
        class="back-btn"
        @click="router.push('/menu')"
      >
        กลับไปเมนู
      </button>

    </header>

    <main class="history-container">

      <div
        v-if="orders.length === 0"
        class="empty-history"
      >
        <h2>
          ยังไม่มีประวัติการสั่งซื้อ
        </h2>

        <p>
          เมื่อคุณสั่งอาหาร รายการสั่งซื้อจะแสดงที่หน้านี้
        </p>

        <button
          type="button"
          @click="router.push('/menu')"
        >
          ไปเลือกอาหาร
        </button>
      </div>

      <template v-else>

        <div class="history-top">

          <span>
            ทั้งหมด {{ orders.length }} รายการ
          </span>

          <button
            type="button"
            class="clear-btn"
            @click="clearHistory"
          >
            ล้างประวัติ
          </button>

        </div>

        <div class="order-list">

          <div
            v-for="order in orders"
            :key="order.getId()"
            class="order-card"
          >

            <div class="order-header">

              <div>

                <h2>
                  คำสั่งซื้อ #{{ order.getId() }}
                </h2>

                <p>
                  ลูกค้า: {{ order.getCustomerName() }}
                </p>

                <!-- แก้ตรงนี้ -->
                <p>
                  โต๊ะ:

                  <strong
                    v-if="order.getTableNumber() === 0"
                  >
                    สั่งกลับบ้าน
                  </strong>

                  <strong v-else>
                    โต๊ะ {{ order.getTableNumber() }}
                  </strong>
                </p>

              </div>

              <span
                class="status"
                :class="getStatusClass(order.getStatus())"
              >
                {{ getStatusText(order.getStatus()) }}
              </span>

            </div>

            <div class="items">

              <div
                v-for="item in order.getItems()"
                :key="item.getMenuItem().getId()"
                class="item-row"
              >

                <div>

                  <strong>
                    {{ item.getMenuItem().getName() }}
                  </strong>

                  <span>
                    x{{ item.getQuantity() }}
                  </span>

                </div>

                <strong>
                  {{ formatPrice(item.getSubtotal()) }}
                </strong>

              </div>

            </div>

            <div class="order-footer">

              <strong>
                รวมทั้งหมด
              </strong>

              <strong class="total">
                {{ formatPrice(order.getTotal()) }}
              </strong>

              <button
                type="button"
                class="view-btn"
                @click="viewOrder(order)"
              >
                ดูรายละเอียด
              </button>

            </div>

          </div>

        </div>

      </template>

    </main>

  </div>
</template>

<style scoped>
.history-page {
  min-height: 100vh;

  background: #f8f8f8;

  padding-bottom: 60px;
}

.page-header {
  background: white;

  padding: 45px 8%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  border-bottom: 1px solid #eee;
}

.subtitle {
  color: #e85d04;

  font-size: 14px;

  font-weight: 700;

  letter-spacing: 2px;

  margin: 0 0 8px;
}

.page-header h1 {
  margin: 0;

  font-size: 34px;
}

.page-header p:last-child {
  color: #777;

  margin: 8px 0 0;
}

.back-btn,
.empty-history button {
  border: none;

  background: #e85d04;

  color: white;

  padding: 12px 22px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;
}

.back-btn:hover,
.empty-history button:hover {
  background: #d94f00;
}

.history-container {
  width: 84%;

  max-width: 1100px;

  margin: 35px auto;
}

.history-top {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

  font-weight: 600;
}

.clear-btn {
  border: 1px solid #ddd;

  background: white;

  color: #d33;

  padding: 9px 16px;

  border-radius: 7px;

  cursor: pointer;
}

.clear-btn:hover {
  background: #fff1f1;
}

.order-list {
  display: flex;

  flex-direction: column;

  gap: 20px;
}

.order-card {
  background: white;

  border-radius: 12px;

  padding: 24px;

  box-shadow:
    0 3px 12px
    rgba(0, 0, 0, 0.06);
}

.order-header {
  display: flex;

  justify-content: space-between;

  gap: 20px;

  padding-bottom: 18px;

  border-bottom: 1px solid #eee;
}

.order-header h2 {
  margin: 0 0 8px;

  font-size: 20px;
}

.order-header p {
  margin: 4px 0;

  color: #777;
}

.order-header p strong {
  color: #222;
}

.status {
  height: fit-content;

  padding: 7px 13px;

  border-radius: 20px;

  font-size: 13px;

  font-weight: 600;

  background: #eee;
}

.status-pending {
  background: #fff3cd;

  color: #856404;
}

.status-preparing {
  background: #ffe0c2;

  color: #a63d00;
}

.status-ready {
  background: #dff5e1;

  color: #28733a;
}

.status-completed {
  background: #d9edf7;

  color: #246b8a;
}

.status-cancelled {
  background: #f8d7da;

  color: #842029;
}

.items {
  padding: 18px 0;
}

.item-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 9px 0;
}

.item-row div {
  display: flex;

  gap: 12px;
}

.item-row span {
  color: #777;
}

.order-footer {
  border-top: 1px solid #eee;

  padding-top: 18px;

  display: flex;

  align-items: center;

  gap: 20px;
}

.total {
  color: #e85d04;

  font-size: 20px;

  margin-right: auto;
}

.view-btn {
  border: 1px solid #e85d04;

  background: white;

  color: #e85d04;

  padding: 9px 16px;

  border-radius: 7px;

  cursor: pointer;
}

.view-btn:hover {
  background: #fff1e8;
}

.empty-history {
  background: white;

  text-align: center;

  padding: 70px 20px;

  border-radius: 12px;
}

.empty-history h2 {
  margin-bottom: 10px;
}

.empty-history p {
  color: #777;

  margin-bottom: 25px;
}

@media (max-width: 700px) {

  .page-header {
    padding: 30px 6%;

    align-items: flex-start;

    gap: 20px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .back-btn {
    white-space: nowrap;
  }

  .history-container {
    width: 90%;
  }

  .order-header {
    flex-direction: column;
  }

  .order-footer {
    flex-wrap: wrap;
  }

  .total {
    margin-right: 0;
  }
}

@media (max-width: 450px) {

  .page-header {
    flex-direction: column;
  }

  .order-card {
    padding: 18px;
  }

  .item-row {
    gap: 10px;
  }

  .order-footer {
    flex-direction: column;

    align-items: stretch;
  }

  .total {
    text-align: left;
  }

  .view-btn {
    width: 100%;
  }
}
</style>