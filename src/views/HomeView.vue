<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../stores/menuStore'

const menuStore = useMenuStore()

const recommendedMenus = computed(() =>
  menuStore.foods.slice(0, 4)
)

const formatPrice = (price: number) =>
  `${price.toLocaleString()} บาท`
</script>

<template>
  <main class="home">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="badge">
          ร้านอาหารของเรา
        </div>

        <p class="subtitle">
          WELCOME TO OUR RESTAURANT
        </p>

        <h1>
          อร่อยง่าย ๆ
          <br>
          <span>สั่งได้ทุกเวลา</span>
        </h1>

        <p class="description">
          ร้านอาหารของเราพร้อมเสิร์ฟเมนูหลากหลาย
          ทั้งอาหารจานเดียว ของทานเล่น และเครื่องดื่ม
          อร่อย สดใหม่ และสั่งง่ายในไม่กี่ขั้นตอน
        </p>

        <div class="hero-actions">
          <router-link to="/menu" class="menu-button">
            ดูเมนูอาหาร
            <span>→</span>
          </router-link>

          <router-link to="/cart" class="order-button">
            ดูตะกร้า
          </router-link>
        </div>

        <div class="features">
          <div class="feature">
            <div class="feature-icon">✓</div>
            <div>
              <strong>สั่งง่าย</strong>
              <span>เลือกเมนูได้ทันที</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">⚡</div>
            <div>
              <strong>รวดเร็ว</strong>
              <span>ไม่ต้องรอนาน</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">♥</div>
            <div>
              <strong>ใส่ใจทุกจาน</strong>
              <span>คุณภาพที่เราตั้งใจ</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Menu -->
    <section class="recommended">
      <div class="recommended-container">

        <div class="section-heading">
          <p class="section-title">
            RECOMMENDED MENU
          </p>

          <h2>
            เมนูแนะนำ
            <span>ของร้าน</span>
          </h2>

          <p>
            เมนูยอดนิยมที่เราอยากแนะนำ
            เลือกเมนูที่ชอบแล้วเริ่มสั่งอาหารได้เลย
          </p>
        </div>

        <div
          v-if="recommendedMenus.length"
          class="recommended-grid"
        >
          <article
            v-for="item in recommendedMenus"
            :key="item.getId()"
            class="recommended-card"
          >
            <div class="menu-image">
              <img
                :src="item.getImageUrl()"
                :alt="item.getName()"
                loading="lazy"
              >
            </div>

            <div class="menu-content">
              <div class="menu-category">
                {{ item.getType() }}
              </div>

              <h3>
                {{ item.getName() }}
              </h3>

              <div class="menu-bottom">
                <strong>
                  {{ formatPrice(item.getPrice()) }}
                </strong>

                <router-link
                  to="/menu"
                  class="view-menu-button"
                >
                  ดูเมนู
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="no-menu">
          <p>ยังไม่มีเมนูแนะนำ</p>

          <router-link
            to="/menu"
            class="view-all-button"
          >
            ดูเมนูอาหาร
          </router-link>
        </div>

        <div
          v-if="recommendedMenus.length"
          class="view-all"
        >
          <router-link
            to="/menu"
            class="view-all-button"
          >
            ดูเมนูทั้งหมด
            <span>→</span>
          </router-link>
        </div>

      </div>
    </section>

    <!-- About -->
    <section class="about">
      <div class="about-container">

        <div class="section-heading">
          <p class="section-title">
            OUR RESTAURANT
          </p>

          <h2>
            อาหารอร่อย
            <span>บริการประทับใจ</span>
          </h2>

          <p>
            เราตั้งใจสร้างประสบการณ์การสั่งอาหาร
            ที่ง่าย รวดเร็ว และสะดวกสำหรับทุกคน
          </p>
        </div>

        <div class="about-cards">

          <div class="about-card">
            <div class="card-icon">01</div>

            <h3>เมนูหลากหลาย</h3>

            <p>
              มีทั้งอาหารและเครื่องดื่ม
              ให้เลือกตามความชอบ
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">02</div>

            <h3>สั่งง่าย</h3>

            <p>
              เลือกอาหาร เพิ่มลงตะกร้า
              และสั่งซื้อได้อย่างรวดเร็ว
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">03</div>

            <h3>ติดตามออเดอร์</h3>

            <p>
              ตรวจสอบรายการอาหาร
              และสถานะออเดอร์ได้
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div>
        <p>READY TO ORDER?</p>

        <h2>หิวแล้วใช่ไหม?</h2>

        <span>
          เลือกเมนูที่คุณชอบ แล้วสั่งอาหารได้เลย
        </span>
      </div>

      <router-link
        to="/menu"
        class="cta-button"
      >
        เริ่มสั่งอาหาร
        <span>→</span>
      </router-link>
    </section>

  </main>
</template>

<style scoped>
/* ===== Home ===== */

.home {
  min-height: calc(100vh - 70px);
  background: #faf9f7;
}

/* ===== Hero ===== */

.hero {
  position: relative;
  min-height: 650px;
  display: flex;
  align-items: center;
  padding: 80px 10%;
  box-sizing: border-box;
  color: white;
  background: url(
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1600"
  ) center / cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.78),
    rgba(0, 0, 0, 0.58) 45%,
    rgba(0, 0, 0, 0.25)
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
}

.badge {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 13px;
  backdrop-filter: blur(5px);
}

.subtitle {
  margin: 0;
  color: #ff9a52;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 4px;
}

.hero h1 {
  margin: 15px 0;
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1.15;
}

.hero h1 span {
  color: #ff8c42;
}

.description {
  max-width: 550px;
  margin: 0;
  color: #eee;
  font-size: 17px;
  line-height: 1.9;
}

/* ===== Hero Buttons ===== */

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.menu-button,
.order-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
}

.menu-button {
  background: #e85d04;
  color: white;
  box-shadow: 0 8px 20px rgba(232, 93, 4, 0.3);
}

.menu-button:hover {
  background: #d95100;
  transform: translateY(-2px);
}

.order-button {
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.order-button:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

/* ===== Features ===== */

.features {
  display: flex;
  gap: 28px;
  margin-top: 45px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(232, 93, 4, 0.9);
}

.feature strong,
.feature span {
  display: block;
}

.feature strong {
  font-size: 13px;
}

.feature span {
  margin-top: 2px;
  color: #ccc;
  font-size: 11px;
}

/* ===== Common Section ===== */

.recommended,
.about {
  padding: 90px 20px;
}

.recommended {
  background: white;
}

.about {
  background: #faf9f7;
}

.recommended-container,
.about-container {
  max-width: 1100px;
  margin: auto;
}

.section-heading {
  max-width: 650px;
  margin: 0 auto 45px;
  text-align: center;
}

.section-title {
  margin: 0 0 10px;
  color: #e85d04;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 4px;
}

.section-heading h2 {
  margin: 0 0 15px;
  color: #222;
  font-size: 36px;
}

.section-heading h2 span {
  color: #e85d04;
}

.section-heading > p:last-child {
  margin: 0;
  color: #777;
  line-height: 1.8;
}

/* ===== Recommended Menu ===== */

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.recommended-card {
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}

.recommended-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.menu-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #fff1e8;
}

.menu-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: 0.3s;
}

.recommended-card:hover img {
  transform: scale(1.05);
}

.menu-content {
  padding: 20px;
}

.menu-category {
  margin-bottom: 8px;
  color: #e85d04;
  font-size: 11px;
  font-weight: bold;
}

.menu-content h3 {
  min-height: 48px;
  margin: 0;
  color: #222;
  font-size: 18px;
}

.menu-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
}

.menu-bottom strong {
  color: #e85d04;
}

.view-menu-button,
.view-all-button {
  border-radius: 8px;
  color: #e85d04;
  font-weight: bold;
  text-decoration: none;
}

.view-menu-button {
  padding: 8px 12px;
  background: #fff1e8;
  font-size: 12px;
}

.view-all {
  display: flex;
  justify-content: center;
  margin-top: 35px;
}

.view-all-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border: 1px solid #e85d04;
  background: white;
  font-size: 14px;
}

.view-menu-button:hover,
.view-all-button:hover {
  background: #e85d04;
  color: white;
}

.no-menu {
  padding: 40px;
  border: 1px dashed #ddd;
  border-radius: 12px;
  text-align: center;
  color: #777;
}

.no-menu p {
  margin-bottom: 20px;
}

/* ===== About ===== */

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.about-card {
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 16px;
  background: white;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  transition: 0.2s;
}

.about-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  border-radius: 16px;
  background: #fff1e8;
  color: #e85d04;
  font-size: 18px;
  font-weight: bold;
}

.about-card h3 {
  margin: 0 0 10px;
  color: #222;
}

.about-card p {
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.7;
}

/* ===== CTA ===== */

.cta {
  max-width: 1100px;
  margin: 0 auto 70px;
  padding: 35px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-radius: 18px;
  background: #e85d04;
  color: white;
}

.cta p {
  margin: 0 0 5px;
  color: #ffe1ce;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 3px;
}

.cta h2 {
  margin: 0 0 5px;
  font-size: 28px;
}

.cta > div > span {
  color: #ffe9dc;
  font-size: 14px;
}

.cta-button {
  padding: 13px 20px;
  border-radius: 9px;
  background: white;
  color: #e85d04;
  font-weight: bold;
  text-decoration: none;
}

.cta-button:hover {
  background: #fff7f2;
}

/* ===== Responsive ===== */

@media (max-width: 900px) {
  .hero {
    min-height: 600px;
    padding: 70px 7%;
  }

  .recommended-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-cards {
    grid-template-columns: 1fr;
  }

  .cta {
    margin: 0 20px 70px;
  }
}

@media (max-width: 650px) {
  .hero {
    min-height: 620px;
    padding: 60px 25px;
  }

  .hero h1 {
    font-size: 42px;
  }

  .hero-actions,
  .features,
  .cta {
    flex-direction: column;
  }

  .hero-actions,
  .menu-button,
  .order-button,
  .cta-button {
    width: 100%;
    box-sizing: border-box;
  }

  .features {
    gap: 15px;
    margin-top: 35px;
  }

  .recommended,
  .about {
    padding: 65px 20px;
  }

  .recommended-grid {
    grid-template-columns: 1fr;
  }

  .menu-image {
    height: 200px;
  }

  .section-heading h2 {
    font-size: 29px;
  }

  .cta {
    align-items: flex-start;
    padding: 30px 25px;
  }

  .cta-button {
    text-align: center;
  }
}
</style>