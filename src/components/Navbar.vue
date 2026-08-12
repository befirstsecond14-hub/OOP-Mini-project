<template>
  <nav class="navbar">

    <!-- Logo -->
    <router-link to="/" class="logo">
      <div class="logo-icon">R</div>
      <span>My Restaurant</span>
    </router-link>


    <!-- Menu -->
    <div class="nav-links">
      <router-link to="/">
        หน้าแรก
      </router-link>

      <router-link to="/menu">
        เมนูอาหาร
      </router-link>

      <router-link to="/about">
        เกี่ยวกับเรา
      </router-link>

      <router-link to="/contact">
        ติดต่อ
      </router-link>
    </div>


    <!-- Cart -->
    <router-link to="/cart" class="cart-button">
      🛒 ตะกร้า
    </router-link>

  </nav>
</template>


<style scoped>
.navbar {
  height: 70px;

  padding: 0 7%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: white;

  border-bottom: 1px solid #eee;
}

.logo {
  display: flex;

  align-items: center;

  gap: 10px;

  color: #222;

  font-size: 20px;

  font-weight: bold;

  text-decoration: none;
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
}

.nav-links {
  display: flex;

  gap: 30px;
}

.nav-links a {
  color: #555;

  text-decoration: none;

  transition: 0.2s;
}

.nav-links a:hover {
  color: #e85d04;
}


/* หน้าที่กำลังเปิดอยู่ */
.nav-links a.router-link-active {
  color: #e85d04;

  font-weight: bold;
}
.cart-button {
  padding: 10px 18px;

  border: none;

  border-radius: 8px;

  background: #fff1e8;

  color: #e85d04;

  text-decoration: none;

  cursor: pointer;

  transition: 0.2s;
}

.cart-button:hover {
  background: #ffe2cf;
}

@media (max-width: 768px) {

  .navbar {
    padding: 0 20px;
  }

  .nav-links {
    gap: 15px;
  }

  .logo span {
    display: none;
  }

}

@media (max-width: 600px) {

  .nav-links {
    display: none;
  }

}
</style>