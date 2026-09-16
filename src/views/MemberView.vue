<template>
  <main class="member-page">
    <section class="member-card">

      <div class="member-header">
        <div class="member-icon">
          {{ userStore.currentUser?.getName().charAt(0).toUpperCase() }}
        </div>

        <div>
          <h1>ข้อมูลสมาชิก</h1>
          <p>จัดการข้อมูลบัญชีของคุณ</p>
        </div>
      </div>

      <div
        v-if="userStore.currentUser"
        class="member-info"
      >

        <div class="info-group">
          <label>ชื่อ</label>

          <input
            v-model="name"
            type="text"
          />
        </div>

        <div class="info-group">
          <label>อีเมล</label>

          <input
            :value="userStore.currentUser.getEmail()"
            type="email"
            disabled
          />
        </div>

        <button
          type="button"
          class="save-button"
          @click="saveName"
        >
          บันทึกชื่อ
        </button>

        <div class="divider"></div>

        <h2>เปลี่ยนรหัสผ่าน</h2>

        <div class="info-group">
          <label>รหัสผ่านใหม่</label>

          <input
            v-model="newPassword"
            type="password"
            placeholder="กรอกรหัสผ่านใหม่"
          />
        </div>

        <button
          type="button"
          class="password-button"
          @click="changePassword"
        >
          เปลี่ยนรหัสผ่าน
        </button>

        <p
          v-if="message"
          class="message"
        >
          {{ message }}
        </p>

        <button
          type="button"
          class="logout-button"
          @click="logout"
        >
          ออกจากระบบ
        </button>

      </div>

    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const name = ref(
  userStore.currentUser?.getName() ?? ''
)

const newPassword = ref('')
const message = ref('')

function saveName(): void {
  if (!name.value.trim()) {
    message.value = 'กรุณากรอกชื่อ'
    return
  }

  userStore.updateName(
    name.value.trim()
  )

  message.value =
    'บันทึกชื่อเรียบร้อยแล้ว'
}

function changePassword(): void {
  message.value = ''

  if (!newPassword.value) {
    message.value =
      'กรุณากรอกรหัสผ่านใหม่'
    return
  }

  if (newPassword.value.length < 4) {
    message.value =
      'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'
    return
  }

  userStore.updatePassword(
    newPassword.value
  )

  newPassword.value = ''

  message.value =
    'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'
}

function logout(): void {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.member-page {
  min-height: calc(100vh - 70px);
  padding: 50px 20px;
  box-sizing: border-box;
  background: #f8f8f8;
}

.member-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 35px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 5px 25px rgba(0, 0, 0, 0.07);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
}

.member-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #e85d04;
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.member-header h1 {
  margin: 0 0 5px;
  font-size: 28px;
}

.member-header p {
  margin: 0;
  color: #777;
}

.info-group {
  margin-bottom: 18px;
}

.info-group label {
  display: block;
  margin-bottom: 7px;
  color: #444;
  font-weight: bold;
}

.info-group input {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
}

.info-group input:focus {
  border-color: #e85d04;
}

.info-group input:disabled {
  background: #f3f3f3;
  color: #777;
}

.save-button,
.password-button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.save-button {
  background: #222;
}

.save-button:hover {
  background: #444;
}

.divider {
  height: 1px;
  margin: 30px 0;
  background: #eee;
}

.member-card h2 {
  margin: 0 0 20px;
  font-size: 21px;
}

.password-button {
  background: #e85d04;
}

.password-button:hover {
  background: #d95000;
}

.message {
  margin: 15px 0;
  color: #e85d04;
  font-size: 14px;
}

.logout-button {
  width: 100%;
  margin-top: 25px;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #d62828;
  font-size: 15px;
  cursor: pointer;
}

.logout-button:hover {
  background: #f8f8f8;
}

@media (max-width: 500px) {
  .member-card {
    padding: 25px 20px;
  }

  .member-header h1 {
    font-size: 24px;
  }
}
</style>