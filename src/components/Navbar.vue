```vue id="h3k8p2"
<template>
  <nav class="navbar">

    <router-link
      to="/"
      class="logo"
    >
      <div class="logo-icon">
        R
      </div>

      <span>
        My Restaurant
      </span>
    </router-link>

    <div class="nav-links">

      <router-link to="/">
        หน้าแรก
      </router-link>

      <router-link to="/menu">
        เมนูอาหาร
      </router-link>

      <router-link to="/admin-login">
        Admin
      </router-link>

    </div>

    <div class="navbar-space"></div>

  </nav>
</template>

<style scoped>
.navbar {
  position: relative;

  width: 100%;
  height: 70px;

  padding: 0 7%;

  display: flex;
  align-items: center;

  background: white;

  border-bottom: 1px solid #eee;

  box-sizing: border-box;
}

/* =========================
   LOGO
========================= */

.logo {
  display: flex;
  align-items: center;

  gap: 10px;

  color: #222;

  font-size: 20px;
  font-weight: bold;

  text-decoration: none;

  flex-shrink: 0;
}

.logo-icon {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #e85d04;

  color: white;

  font-weight: bold;
}

/* =========================
   MENU ตรงกลาง
========================= */

.nav-links {
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;

  gap: 35px;
}

.nav-links a {
  color: #555;

  font-size: 14px;
  font-weight: 500;

  text-decoration: none;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #e85d04;
}

.nav-links a.router-link-active {
  color: #e85d04;

  font-weight: bold;
}

/* =========================
   พื้นที่ด้านขวา
========================= */

.navbar-space {
  width: 40px;
}

/* =========================
   TABLET
========================= */

@media (max-width: 768px) {

  .navbar {
    padding: 0 5%;
  }

  .nav-links {
    gap: 22px;
  }

  .nav-links a {
    font-size: 13px;
  }

}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .navbar {
    height: 64px;

    padding: 0 4%;
  }

  .logo span {
    display: none;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .nav-links {
    gap: 14px;
  }

  .nav-links a {
    font-size: 12px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 400px) {

  .navbar {
    padding: 0 3%;
  }

  .nav-links {
    gap: 9px;
  }

  .nav-links a {
    font-size: 11px;
  }

}
</style>
