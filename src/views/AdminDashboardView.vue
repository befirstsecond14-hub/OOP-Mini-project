<template>
  <div class="admin-dashboard">

    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <p>ระบบจัดการร้านอาหาร</p>
    </div>

    <div class="dashboard-grid">

      <button
        type="button"
        class="dashboard-card"
        @click="goToMenu"
      >
        <div class="card-icon">
          M
        </div>

        <div class="card-content">
          <h2>จัดการเมนู</h2>
          <p>
            เพิ่ม แก้ไข ลบ และค้นหาอาหาร
            และเครื่องดื่ม
          </p>
        </div>
      </button>

      <button
        type="button"
        class="dashboard-card"
        @click="goToOrder"
      >
        <div class="card-icon">
          O
        </div>

        <div class="card-content">
          <h2>จัดการออเดอร์</h2>
          <p>
            ดูรายการสั่งซื้อและ
            เปลี่ยนสถานะคำสั่งซื้อ
          </p>
        </div>
      </button>

    </div>

    <button
      type="button"
      class="logout-button"
      @click="logout"
    >
      ออกจากระบบ Admin
    </button>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToMenu(): void {
  router.push('/admin-menu')
}

function goToOrder(): void {
  router.push('/admin-order')
}

function logout(): void {
  sessionStorage.removeItem('adminLoggedIn')
  router.push('/admin-login')
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 24px;
}

.dashboard-header {
  margin-bottom: 35px;
}

.dashboard-header h1 {
  margin: 0 0 8px;
  font-size: 32px;
  color: #222;
}

.dashboard-header p {
  margin: 0;
  color: #777;
  font-size: 16px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.dashboard-card {
  display: flex;
  align-items: center;
  gap: 20px;

  width: 100%;
  padding: 28px;

  text-align: left;

  background: white;
  border: 1px solid #eee;
  border-radius: 14px;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 14px;

  background: #fff3eb;
  color: #e85d04;

  font-size: 24px;
  font-weight: 700;
}

.card-content h2 {
  margin: 0 0 8px;
  color: #222;
  font-size: 21px;
}

.card-content p {
  margin: 0;
  color: #777;
  line-height: 1.5;
}

.logout-button {
  margin-top: 30px;

  padding: 10px 18px;

  border: none;
  border-radius: 8px;

  background: #222;
  color: white;

  cursor: pointer;
  font-size: 14px;
}

.logout-button:hover {
  background: #444;
}

@media (max-width: 700px) {
  .admin-dashboard {
    padding: 35px 20px;
  }

  .dashboard-header h1 {
    font-size: 26px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-card {
    padding: 22px;
  }
}
</style>