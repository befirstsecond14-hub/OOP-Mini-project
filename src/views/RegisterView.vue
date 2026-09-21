<template>
  <main class="register-page">
    <section class="register-card">

      <h1>สมัครสมาชิก</h1>

      <p class="description">
        สร้างบัญชีเพื่อใช้งานระบบสมาชิก
      </p>

      <form @submit.prevent="register">

        <div class="form-group">
          <label>ชื่อ</label>

          <input
            v-model="name"
            type="text"
            placeholder="กรอกชื่อ"
          />
        </div>

        <div class="form-group">
          <label>อีเมล</label>

          <input
            v-model="email"
            type="email"
            placeholder="กรอกอีเมล"
          />
        </div>

        <div class="form-group">
          <label>รหัสผ่าน</label>

          <input
            v-model="password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
          />
        </div>

        <div class="form-group">
          <label>ยืนยันรหัสผ่าน</label>

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="กรอกรหัสผ่านอีกครั้ง"
          />
        </div>

        <p
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="register-button"
        >
          สมัครสมาชิก
        </button>

      </form>

      <button
        type="button"
        class="login-button"
        @click="goToLogin"
      >
        เข้าสู่ระบบ
      </button>

    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function register(): void {
  errorMessage.value = ''

  if (!name.value.trim()) {
    errorMessage.value = 'กรุณากรอกชื่อ'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = 'กรุณากรอกอีเมล'
    return
  }

  if (!password.value) {
    errorMessage.value = 'กรุณากรอกรหัสผ่าน'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านไม่ตรงกัน'
    return
  }

  const success = userStore.register(
    name.value.trim(),
    email.value.trim(),
    password.value
  )

  if (!success) {
    errorMessage.value = 'อีเมลนี้มีผู้ใช้งานแล้ว'
    return
  }

  router.push('/member')
}

function goToLogin(): void {
  router.push('/member-login')
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background: #f8f8f8;
}

.register-card {
  width: 100%;
  max-width: 430px;
  padding: 40px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.07);
}

.register-card h1 {
  margin: 0 0 10px;
  text-align: center;
  font-size: 30px;
}

.description {
  margin: 0 0 30px;
  color: #777;
  text-align: center;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  color: #444;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
}

.form-group input:focus {
  border-color: #e85d04;
}

.error-message {
  margin: 5px 0 15px;
  color: #d62828;
  font-size: 14px;
}

.register-button {
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

.register-button:hover {
  background: #d95000;
}

.login-button {
  width: 100%;
  margin-top: 10px;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #555;
  font-size: 15px;
  cursor: pointer;
}

.login-button:hover {
  background: #f8f8f8;
}

@media (max-width: 500px) {
  .register-card {
    padding: 30px 20px;
  }
}
</style>