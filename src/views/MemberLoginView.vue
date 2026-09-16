<template>
  <main class="login-page">
    <section class="login-card">

      <h1>เข้าสู่ระบบ</h1>

      <p class="description">
        เข้าสู่ระบบสมาชิกของร้านอาหาร
      </p>

      <form @submit.prevent="login">

        <div class="form-group">
          <label>อีเมล</label>

          <input
            v-model="email"
            type="email"
            placeholder="กรอกอีเมล"
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label>รหัสผ่าน</label>

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
        type="button"
        class="register-button"
        @click="goToRegister"
      >
        สมัครสมาชิก
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

const email = ref('')
const password = ref('')
const errorMessage = ref('')

function login(): void {
  errorMessage.value = ''

  if (!email.value.trim()) {
    errorMessage.value = 'กรุณากรอกอีเมล'
    return
  }

  if (!password.value) {
    errorMessage.value = 'กรุณากรอกรหัสผ่าน'
    return
  }

  const success = userStore.login(
    email.value.trim(),
    password.value
  )

  if (!success) {
    errorMessage.value =
      'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    return
  }

  router.push('/member')
}

function goToRegister(): void {
  router.push('/register')
}
</script>

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
}

.login-card h1 {
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

.register-button {
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

.register-button:hover {
  background: #f8f8f8;
}

@media (max-width: 500px) {
  .login-card {
    padding: 30px 20px;
  }
}
</style>