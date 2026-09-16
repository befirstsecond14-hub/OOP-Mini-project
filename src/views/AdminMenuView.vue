<template>
  <div class="admin-menu-page">

    <button
      type="button"
      class="back-button"
      @click="goToDashboard"
    >
      ← กลับ Dashboard
    </button>

    <div class="admin-header">
      <div>
        <h1>จัดการเมนูอาหาร</h1>

        <p>
          เพิ่ม แก้ไข และลบรายการอาหารและเครื่องดื่ม
        </p>
      </div>

      <button
        type="button"
        class="add-button"
        @click="openAddForm"
      >
        + เพิ่มเมนู
      </button>
    </div>

    <div class="search-box">
      <input
        v-model="searchText"
        type="text"
        placeholder="ค้นหาเมนู..."
      />
    </div>

    <div class="menu-list">

      <div
        v-for="item in filteredItems"
        :key="item.getId()"
        class="menu-card"
      >

        <img
          :src="item.getImageUrl()"
          :alt="item.getName()"
        />

        <div class="menu-info">

          <h3>
            {{ item.getName() }}
          </h3>

          <p>
            {{ item.getType() }}
          </p>

          <strong>
            {{ item.getPrice() }} บาท
          </strong>

        </div>

        <div class="menu-actions">

          <button
            type="button"
            class="edit-button"
            @click="openEditForm(item.getId())"
          >
            แก้ไข
          </button>

          <button
            type="button"
            class="delete-button"
            @click="deleteMenu(item.getId())"
          >
            ลบ
          </button>

        </div>

      </div>

    </div>

    <div
      v-if="showForm"
      class="modal"
    >

      <div class="form-box">

        <h2>
          {{ isEditing ? 'แก้ไขเมนู' : 'เพิ่มเมนู' }}
        </h2>

        <label>
          ชื่อเมนู
        </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="ชื่อเมนู"
        />

        <label>
          ราคา
        </label>

        <input
          v-model.number="form.price"
          type="number"
          min="0"
          placeholder="ราคา"
        />

        <label>
          รูปภาพ URL
        </label>

        <input
          v-model="form.imageUrl"
          type="text"
          placeholder="URL รูปภาพ"
        />

        <label>
          ประเภท
        </label>

        <select
          v-model="form.type"
          :disabled="isEditing"
        >

          <option value="อาหาร">
            อาหาร
          </option>

          <option value="เครื่องดื่ม">
            เครื่องดื่ม
          </option>

        </select>

        <div class="form-actions">

          <button
            type="button"
            class="cancel-button"
            @click="closeForm"
          >
            ยกเลิก
          </button>

          <button
            type="button"
            class="save-button"
            @click="saveMenu"
          >
            บันทึก
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  ref
} from 'vue'

import { useRouter } from 'vue-router'

import { useMenuStore } from '../stores/menuStore'
import { Food } from '../models/Food'
import { Drink } from '../models/Drink'

const router = useRouter()
const menuStore = useMenuStore()

const searchText = ref('')
const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  name: '',
  price: 0,
  imageUrl: '',
  type: 'อาหาร' as 'อาหาร' | 'เครื่องดื่ม'
})

const filteredItems = computed(() => {
  const keyword = searchText.value
    .trim()
    .toLowerCase()

  if (!keyword) {
    return menuStore.allItems
  }

  return menuStore.allItems.filter(
    item =>
      item
        .getName()
        .toLowerCase()
        .includes(keyword)
  )
})

function goToDashboard(): void {
  router.push('/admin-dashboard')
}

function openAddForm(): void {
  isEditing.value = false
  editingId.value = null

  form.name = ''
  form.price = 0
  form.imageUrl = ''
  form.type = 'อาหาร'

  showForm.value = true
}

function openEditForm(id: number): void {
  const item = menuStore.allItems.find(
    item => item.getId() === id
  )

  if (!item) {
    return
  }

  isEditing.value = true
  editingId.value = id

  form.name = item.getName()
  form.price = item.getPrice()
  form.imageUrl = item.getImageUrl()

  if (item.getType() === 'อาหาร') {
    form.type = 'อาหาร'
  } else {
    form.type = 'เครื่องดื่ม'
  }

  showForm.value = true
}

function saveMenu(): void {
  if (!form.name.trim()) {
    alert('กรุณากรอกชื่อเมนู')
    return
  }

  if (form.price <= 0) {
    alert('กรุณากรอกราคา')
    return
  }

  if (!form.imageUrl.trim()) {
    alert('กรุณากรอก URL รูปภาพ')
    return
  }

  if (
    isEditing.value &&
    editingId.value !== null
  ) {
    menuStore.updateItem(
      editingId.value,
      form.name.trim(),
      form.price
    )

    const item = menuStore.allItems.find(
      item => item.getId() === editingId.value
    )

    if (item) {
      item.setImageUrl(
        form.imageUrl.trim()
      )
    }

    closeForm()
    return
  }

  const id = getNextId()

  if (form.type === 'อาหาร') {
    const newFood = new Food(
      id,
      form.name.trim(),
      form.price,
      form.imageUrl.trim()
    )

    menuStore.addItem(newFood)
  } else {
    const newDrink = new Drink(
      id,
      form.name.trim(),
      form.price,
      form.imageUrl.trim()
    )

    menuStore.addItem(newDrink)
  }

  closeForm()
}

function deleteMenu(id: number): void {
  const item = menuStore.allItems.find(
    item => item.getId() === id
  )

  if (!item) {
    return
  }

  const confirmed = confirm(
    `ต้องการลบ "${item.getName()}" หรือไม่?`
  )

  if (!confirmed) {
    return
  }

  menuStore.removeItem(id)
}

function getNextId(): number {
  if (menuStore.allItems.length === 0) {
    return 1
  }

  const ids = menuStore.allItems.map(
    item => item.getId()
  )

  return Math.max(...ids) + 1
}

function closeForm(): void {
  showForm.value = false
}
</script>

<style scoped>
.admin-menu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.back-button {
  margin-bottom: 20px;
  padding: 9px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #444;
  cursor: pointer;
  font-size: 14px;
}

.back-button:hover {
  background: #f5f5f5;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.admin-header h1 {
  margin: 0 0 8px;
}

.admin-header p {
  margin: 0;
  color: #666;
}

.add-button,
.save-button {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 15px;
}

.add-button {
  background: #222;
  color: white;
}

.search-box {
  margin-bottom: 24px;
}

.search-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.menu-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.menu-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: white;
}

.menu-card img {
  width: 120px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.menu-info {
  flex: 1;
}

.menu-info h3 {
  margin: 0 0 8px;
}

.menu-info p {
  margin: 0 0 8px;
  color: #777;
}

.menu-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-button,
.delete-button,
.cancel-button {
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.edit-button {
  background: #eee;
}

.delete-button {
  background: #d9534f;
  color: white;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.form-box {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 24px;
  border-radius: 12px;
}

.form-box h2 {
  margin-top: 0;
}

.form-box label {
  display: block;
  margin: 14px 0 6px;
}

.form-box input,
.form-box select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-button {
  background: #eee;
}

.save-button {
  background: #222;
  color: white;
}

@media (max-width: 700px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .menu-list {
    grid-template-columns: 1fr;
  }

  .menu-card {
    flex-direction: column;
  }

  .menu-card img {
    width: 100%;
    height: 180px;
  }

  .menu-actions {
    flex-direction: row;
  }
}
</style>