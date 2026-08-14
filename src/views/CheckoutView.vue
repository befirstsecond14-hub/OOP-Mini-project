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

const totalPrice = computed(() => {
  return cartStore.items.reduce(
    (total, item) => total + item.getSubtotal(),
    0
  )
})

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

  cartStore.items.forEach((cartItem) => {
    const orderItem = new OrderItem(
      cartItem.getMenuItem(),
      cartItem.getQuantity()
    )

    newOrder.addItem(orderItem)
  })

  // เก็บ Order ไว้ใน Order Store
  orderStore.setOrder(newOrder)

  // ไปหน้าชำระเงิน
  router.push('/payment')
}

function goBack(): void {
  router.back()
}
</script>

<template>
  <main class="checkout-page">
    <section class="checkout-card">

      <h1>ยืนยันการสั่งซื้อ</h1>

      <!-- ชื่อลูกค้า -->
      <div class="form-group">
        <label>ชื่อผู้สั่งซื้อ</label>

        <input
          v-model="customerName"
          type="text"
          placeholder="กรอกชื่อผู้สั่งซื้อ"
        />
      </div>

      <!-- เลือกโต๊ะ -->
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
            โต๊ะ {{ table }}
          </button>
        </div>
      </div>

      <!-- เลือกทานที่ร้าน / กลับบ้าน -->
      <div class="form-group">
        <label>รูปแบบการรับประทาน</label>

        <div class="dining-options">

          <button
            type="button"
            :class="{ active: diningOption === 'ทานที่ร้าน' }"
            @click="diningOption = 'ทานที่ร้าน'"
          >
            ทานที่ร้าน
          </button>

          <button
            type="button"
            :class="{ active: diningOption === 'กลับบ้าน' }"
            @click="diningOption = 'กลับบ้าน'"
          >
            กลับบ้าน
          </button>

        </div>
      </div>

      <!-- รายการอาหาร -->
      <section class="order-items">

        <h2>รายการอาหาร</h2>

        <div
          v-for="(item, index) in cartStore.items"
          :key="index"
          class="order-item"
        >

          <div>
            <strong>
              {{ item.getMenuItem().getName() }}
            </strong>

            <p>
              จำนวน {{ item.getQuantity() }} ชิ้น
            </p>
          </div>

          <span>
            {{ item.getSubtotal().toLocaleString() }} บาท
          </span>

        </div>

      </section>

      <!-- ยอดรวม -->
      <div class="total">

        <span>
          ยอดรวม
        </span>

        <strong>
          {{ totalPrice.toLocaleString() }} บาท
        </strong>

      </div>

      <!-- ปุ่ม -->
      <div class="buttons">

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
.checkout-page {
  min-height: calc(100vh - 70px);
  padding: 50px 20px;
  background: #f8f8f8;
  box-sizing: border-box;
}

.checkout-card {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 35px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

h1 {
  margin: 0 0 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 15px;
}

.table-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.table-options button {
  padding: 12px 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.table-options button:hover {
  border-color: #e85d04;
}

.table-options button.active {
  border-color: #e85d04;
  background: #e85d04;
  color: white;
}

.dining-options {
  display: flex;
  gap: 10px;
}

.dining-options button {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 15px;
  cursor: pointer;
}

.dining-options button:hover {
  border-color: #e85d04;
}

.dining-options button.active {
  border-color: #e85d04;
  background: #e85d04;
  color: white;
}

.order-items {
  margin-top: 30px;
}

.order-items h2 {
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.order-item p {
  margin: 5px 0 0;
  color: #777;
}

.order-item span {
  color: #e85d04;
  font-weight: bold;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  font-size: 20px;
}

.total strong {
  color: #e85d04;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.buttons button {
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

.back-button {
  border: 1px solid #ddd;
  background: white;
}

.confirm-button {
  border: none;
  background: #e85d04;
  color: white;
}

@media (max-width: 600px) {
  .checkout-card {
    padding: 25px 20px;
  }

  .table-options {
    grid-template-columns: repeat(2, 1fr);
  }

  .dining-options {
    flex-direction: column;
  }

  .buttons {
    flex-direction: column;
  }
}
</style>