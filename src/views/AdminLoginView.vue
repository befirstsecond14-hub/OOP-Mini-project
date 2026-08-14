//บัญชีทดลองตอนนี้คือ

Username: admin
Password: 1234//
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function login(): void {
  errorMessage.value = ''

  // ข้อมูลสำหรับ Admin
  const adminUsername = 'admin'
  const adminPassword = '1234'

  if (
    username.value === adminUsername &&
    password.value === adminPassword
  ) {
    // จำสถานะว่า Admin Login แล้ว
    sessionStorage.setItem('adminLoggedIn', 'true')

    // เข้าไปหน้าจัดการออเดอร์
    router.push('/admin-order')
  } else {
    errorMessage.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
  }
}

function goToHome(): void {
  router.push('/')
}
</script>

<template>
  <main class="login-page">

    <section class="login-card">

      <div class="login-logo">
        R
      </div>

      <p class="subtitle">
        ADMIN
      </p>

      <h1>
        เข้าสู่ระบบ Admin
      </h1>

      <p class="description">
        กรุณาเข้าสู่ระบบเพื่อจัดการออเดอร์
      </p>

      <form @submit.prevent="login">

        <div class="form-group">
          <label>
            ชื่อผู้ใช้
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="กรอกชื่อผู้ใช้"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label>
            รหัสผ่าน
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            autocomplete="current-password"
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
          class="login-button"
        >
          เข้าสู่ระบบ
        </button>

      </form>

      <button
        class="back-button"
        @click="goToHome"
      >
        กลับหน้าแรก
      </button>

    </section>

  </main>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background: #f8f8f8;
}

.login-card {
  width: 100%;
  max-width: 430px;
  padding: 40px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.07);
  text-align: center;
}

.login-logo {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #e85d04;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  margin: 0 0 8px;
  color: #e85d04;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 3px;
}

h1 {
  margin: 0 0 10px;
  font-size: 30px;
}

.description {
  margin: 0 0 30px;
  color: #777;
}

form {
  text-align: left;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 7px;
  color: #444;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
}

input:focus {
  border-color: #e85d04;
}

.error-message {
  margin: 5px 0 15px;
  color: #d62828;
  font-size: 14px;
}

.login-button {
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

.login-button:hover {
  background: #d95000;
}

.back-button {
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

.back-button:hover {
  background: #f8f8f8;
}

@media (max-width: 500px) {
  .login-card {
    padding: 30px 20px;
  }
}
</style>

