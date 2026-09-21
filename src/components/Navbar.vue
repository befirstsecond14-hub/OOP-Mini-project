<template>
  <nav class="navbar">

    <router-link to="/" class="logo">
      <div class="logo-icon">R</div>

      <span class="logo-text">
        My Restaurant
      </span>
    </router-link>

    <div
      class="nav-links"
      :class="{ 'mobile-open': isMenuOpen }"
    >

      <router-link
        to="/"
        @click="closeMenu"
      >
        หน้าแรก
      </router-link>

      <router-link
        to="/menu"
        @click="closeMenu"
      >
        เมนูอาหาร
      </router-link>

      <router-link
        to="/order-history"
        @click="closeMenu"
      >
        ประวัติการสั่งซื้อ
      </router-link>

      <!-- สลับหน้าอัตโนมัติ: ถ้าล็อกอินแล้วไป /member ถ้ายังไม่ล็อกอินไป /member-login -->
      <router-link
        :to="userStore.isLoggedIn ? '/member' : '/member-login'"
        @click="closeMenu"
      >
        สมาชิก
      </router-link>

      <router-link
        to="/admin-login"
        class="mobile-admin"
        @click="closeMenu"
      >
        Admin
      </router-link>

    </div>

    <div class="nav-admin">
      <router-link
        to="/admin-login"
        class="btn-admin-login"
      >
        Admin
      </router-link>
    </div>

    <button
      type="button"
      class="menu-toggle"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
const isMenuOpen = ref(false)

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 70px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff7b00, #e85d04);
  color: white;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 0 4px 10px rgba(232, 93, 4, 0.2);
}

.logo-text {
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  position: relative;
  color: #4a4a4a;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #e85d04;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #e85d04;
  font-weight: 600;
}

.nav-admin {
  display: flex;
  align-items: center;
}

.btn-admin-login {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.btn-admin-login:hover {
  color: #e85d04;
}

.mobile-admin {
  display: none;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  border-radius: 2px;
  transition: 0.3s;
}

@media (max-width: 1024px) {
  .navbar {
    padding: 0 3%;
  }

  .nav-links {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 64px;
    padding: 0 20px;
  }

  .logo-text {
    font-size: 18px;
  }

  .nav-admin {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: white;
    border-bottom: 1px solid #eee;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  .nav-links.mobile-open {
    display: flex;
  }

  .nav-links a {
    padding: 14px 24px;
    border-bottom: 1px solid #f5f5f5;
  }

  .nav-links a::after {
    display: none;
  }

  .mobile-admin {
    display: block;
  }

  .menu-toggle.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}

@media (max-width: 400px) {
  .logo-text {
    display: none;
  }
}
</style>