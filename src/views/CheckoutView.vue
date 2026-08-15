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

      <!-- Header -->
      <header class="checkout-header">
        <p class="section-title">
          CHECKOUT
        </p>

        <h1>
          ยืนยันการสั่งซื้อ
        </h1>

        <p class="checkout-description">
          กรุณาตรวจสอบข้อมูลและรายการอาหารก่อนยืนยัน
        </p>
      </header>


      <!-- ข้อมูลผู้สั่ง -->
      <section class="form-section">

        <div class="section-heading">
          <h2>
            ข้อมูลการสั่งซื้อ
          </h2>
        </div>


        <!-- ชื่อลูกค้า -->
        <div class="form-group">

          <label for="customer-name">
            ชื่อผู้สั่งซื้อ
          </label>

          <input
            id="customer-name"
            v-model="customerName"
            type="text"
            placeholder="กรอกชื่อผู้สั่งซื้อ"
          />

        </div>


        <!-- เลือกโต๊ะ -->
        <div class="form-group">

          <label>
            เลขโต๊ะ
          </label>

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


        <!-- รูปแบบการรับประทาน -->
        <div class="form-group">

          <label>
            รูปแบบการรับประทาน
          </label>

          <div class="dining-options">

            <button
              type="button"
              :class="{ active: diningOption === 'ทานที่ร้าน' }"
              @click="diningOption = 'ทานที่ร้าน'"
            >
              <span class="option-title">
                ทานที่ร้าน
              </span>

              <span class="option-description">
                รับประทานที่ร้าน
              </span>
            </button>


            <button
              type="button"
              :class="{ active: diningOption === 'กลับบ้าน' }"
              @click="diningOption = 'กลับบ้าน'"
            >
              <span class="option-title">
                กลับบ้าน
              </span>

              <span class="option-description">
                รับอาหารกลับบ้าน
              </span>
            </button>

          </div>

        </div>

      </section>


      <!-- รายการอาหาร -->
      <section class="order-items">

        <div class="section-heading">

          <h2>
            รายการอาหาร
          </h2>

          <span>
            {{ cartStore.totalQuantity }} รายการ
          </span>

        </div>


        <div class="order-list">

          <div
            v-for="(item, index) in cartStore.items"
            :key="index"
            class="order-item"
          >

            <div class="order-item-info">

              <strong>
                {{ item.getMenuItem().getName() }}
              </strong>

              <p>
                {{ item.getQuantity() }} ชิ้น
              </p>

            </div>


            <strong class="order-item-price">
              {{ item.getSubtotal().toLocaleString() }} บาท
            </strong>

          </div>

        </div>

      </section>


      <!-- สรุปราคา -->
      <section class="total-section">

        <div class="total-row">

          <span>
            จำนวนทั้งหมด
          </span>

          <strong>
            {{ cartStore.totalQuantity }} รายการ
          </strong>

        </div>


        <div class="total-row final-total">

          <span>
            ยอดรวมทั้งหมด
          </span>

          <strong>
            {{ totalPrice.toLocaleString() }} บาท
          </strong>

        </div>

      </section>


      <!-- ปุ่ม -->
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

/* =========================
   PAGE
========================= */

.checkout-page {
  width: 100%;
  min-height: calc(100vh - 70px);

  padding: clamp(30px, 5vw, 60px) 20px;

  background: #faf9f7;

  display: flex;
  justify-content: center;

  box-sizing: border-box;
}


/* =========================
   MAIN CARD
========================= */

.checkout-card {
  width: 100%;
  max-width: 760px;

  padding: clamp(22px, 4vw, 40px);

  background: #ffffff;

  border: 1px solid #eeeeee;
  border-radius: 18px;

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.06);

  box-sizing: border-box;
}


/* =========================
   HEADER
========================= */

.checkout-header {
  text-align: center;

  margin-bottom: 35px;
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

  color: #222222;

  font-size: clamp(28px, 4vw, 38px);
  line-height: 1.2;
}

.checkout-description {
  margin: 0;

  color: #777777;

  font-size: 14px;
  line-height: 1.6;
}


/* =========================
   SECTION
========================= */

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

  color: #222222;

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


/* =========================
   FORM
========================= */

.form-group {
  margin-bottom: 24px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;

  margin-bottom: 9px;

  color: #333333;

  font-size: 14px;
  font-weight: 700;
}

.form-group input {
  width: 100%;

  padding: 13px 14px;

  border: 1px solid #dddddd;
  border-radius: 9px;

  background: #ffffff;
  color: #222222;

  font-family: inherit;
  font-size: 15px;

  outline: none;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #aaaaaa;
}

.form-group input:focus {
  border-color: #e85d04;

  box-shadow:
    0 0 0 3px rgba(232, 93, 4, 0.1);
}


/* =========================
   TABLE
========================= */

.table-options {
  display: grid;

  grid-template-columns: repeat(5, minmax(0, 1fr));

  gap: 10px;
}

.table-options button {
  min-width: 0;

  padding: 11px 6px;

  border: 1px solid #dddddd;
  border-radius: 9px;

  background: #ffffff;
  color: #444444;

  font-family: inherit;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.table-options button:hover {
  border-color: #e85d04;

  color: #e85d04;
}

.table-options button.active {
  border-color: #e85d04;

  background: #e85d04;

  color: #ffffff;
}

.table-options button:active {
  transform: scale(0.97);
}


/* =========================
   DINING OPTION
========================= */

.dining-options {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;
}

.dining-options button {
  min-width: 0;

  padding: 15px;

  border: 1px solid #dddddd;
  border-radius: 10px;

  background: #ffffff;
  color: #333333;

  text-align: left;

  font-family: inherit;

  cursor: pointer;

  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.dining-options button:hover {
  border-color: #e85d04;
}

.dining-options button.active {
  border-color: #e85d04;

  background: #fff1e8;
}

.option-title {
  display: block;

  margin-bottom: 4px;

  color: #333333;

  font-size: 15px;
  font-weight: 700;
}

.dining-options button.active .option-title {
  color: #e85d04;
}

.option-description {
  display: block;

  color: #888888;

  font-size: 12px;
  line-height: 1.4;
}


/* =========================
   ORDER ITEMS
========================= */

.order-items {
  padding-top: 5px;

  margin-bottom: 30px;
}

.order-list {
  border-top: 1px solid #eeeeee;
}

.order-item {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 16px 0;

  border-bottom: 1px solid #eeeeee;
}

.order-item-info {
  min-width: 0;
}

.order-item-info strong {
  display: block;

  color: #333333;

  font-size: 15px;

  overflow-wrap: anywhere;
}

.order-item-info p {
  margin: 5px 0 0;

  color: #888888;

  font-size: 13px;
}

.order-item-price {
  flex-shrink: 0;

  color: #e85d04;

  font-size: 14px;

  text-align: right;
}


/* =========================
   TOTAL
========================= */

.total-section {
  padding-top: 5px;

  margin-bottom: 30px;

  border-top: 2px solid #eeeeee;
}

.total-row {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 12px 0;

  color: #555555;

  font-size: 14px;
}

.total-row strong {
  color: #333333;
}

.final-total {
  padding-top: 16px;

  font-size: clamp(18px, 3vw, 22px);
  font-weight: 700;
}

.final-total strong {
  color: #e85d04;
}


/* =========================
   BUTTONS
========================= */

.checkout-actions {
  display: grid;

  grid-template-columns: minmax(120px, 0.7fr) minmax(0, 1.5fr);

  gap: 12px;
}

.checkout-actions button {
  min-height: 48px;

  border-radius: 9px;

  font-family: inherit;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.checkout-actions button:active {
  transform: scale(0.98);
}

.back-button {
  border: 1px solid #dddddd;

  background: #ffffff;

  color: #555555;
}

.back-button:hover {
  border-color: #cccccc;

  background: #f7f7f7;
}

.confirm-button {
  border: 1px solid #e85d04;

  background: #e85d04;

  color: #ffffff;
}

.confirm-button:hover {
  background: #d94f00;

  border-color: #d94f00;
}


/* =========================
   TABLET
========================= */

@media (max-width: 700px) {

  .checkout-page {
    padding: 30px 16px 50px;
  }

  .checkout-card {
    border-radius: 14px;
  }

  .table-options {
    grid-template-columns: repeat(5, minmax(0, 1fr));

    gap: 7px;
  }

  .table-options button {
    padding: 10px 4px;

    font-size: 13px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 520px) {

  .checkout-page {
    padding: 20px 12px 40px;
  }

  .checkout-card {
    padding: 22px 18px;

    border-radius: 13px;
  }

  .checkout-header {
    margin-bottom: 28px;
  }

  .checkout-header h1 {
    font-size: 27px;
  }

  .checkout-description {
    font-size: 13px;
  }

  .section-heading h2 {
    font-size: 19px;
  }

  .table-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 8px;
  }

  .table-options button {
    padding: 11px 6px;

    font-size: 13px;
  }

  .dining-options {
    grid-template-columns: 1fr;

    gap: 8px;
  }

  .dining-options button {
    padding: 13px;
  }

  .order-item {
    align-items: flex-start;

    gap: 12px;
  }

  .order-item-price {
    font-size: 13px;
  }

  .checkout-actions {
    grid-template-columns: 1fr;

    gap: 9px;
  }

  .back-button {
    order: 2;
  }

  .confirm-button {
    order: 1;
  }

}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 360px) {

  .checkout-page {
    padding-left: 8px;
    padding-right: 8px;
  }

  .checkout-card {
    padding: 20px 14px;
  }

  .checkout-header h1 {
    font-size: 24px;
  }

  .section-heading h2 {
    font-size: 18px;
  }

  .total-row {
    font-size: 13px;
  }

}
</style>
