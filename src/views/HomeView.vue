
<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../stores/menuStore'

const menuStore = useMenuStore()
const recommendedMenus = computed(() => {
  return menuStore.foods.slice(0, 4)
})

function formatPrice(price: number): string {
  return `${price.toLocaleString()} บาท`
}
</script>

<template>
  <main class="home">

    <!-- =========================
         HERO
    ========================== -->

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

          <router-link
            to="/menu"
            class="menu-button"
          >
            ดูเมนูอาหาร
            <span>→</span>
          </router-link>

          <router-link
            to="/order"
            class="order-button"
          >
            ดูออเดอร์
          </router-link>

        </div>

        <div class="features">

          <div class="feature">
            <div class="feature-icon">
              ✓
            </div>

            <div>
              <strong>สั่งง่าย</strong>
              <span>เลือกเมนูได้ทันที</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              ⚡
            </div>

            <div>
              <strong>รวดเร็ว</strong>
              <span>ไม่ต้องรอนาน</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">
              ♥
            </div>

            <div>
              <strong>ใส่ใจทุกจาน</strong>
              <span>คุณภาพที่เราตั้งใจ</span>
            </div>
          </div>

        </div>

      </div>
    </section>


    <!-- =========================
         เมนูแนะนำ
    ========================== -->

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


        <!-- กรณีมีเมนู -->

        <div
          v-if="recommendedMenus.length > 0"
          class="recommended-grid"
        >

          <article
            v-for="item in recommendedMenus"
            :key="item.getId()"
            class="recommended-card"
          >

            <div class="menu-image">
              <span>
                MENU
              </span>
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


        <!-- กรณียังไม่มีเมนู -->

        <div
          v-else
          class="no-menu"
        >
          <p>
            ยังไม่มีเมนูแนะนำ
          </p>

          <router-link
            to="/menu"
            class="view-all-button"
          >
            ดูเมนูอาหาร
          </router-link>
        </div>


        <!-- ดูเมนูทั้งหมด -->

        <div
          v-if="recommendedMenus.length > 0"
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


    <!-- =========================
         ABOUT
    ========================== -->

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

            <div class="card-icon">
              01
            </div>

            <h3>
              เมนูหลากหลาย
            </h3>

            <p>
              มีทั้งอาหารและเครื่องดื่ม
              ให้เลือกตามความชอบ
            </p>

          </div>


          <div class="about-card">

            <div class="card-icon">
              02
            </div>

            <h3>
              สั่งง่าย
            </h3>

            <p>
              เลือกอาหาร เพิ่มลงตะกร้า
              และสั่งซื้อได้อย่างรวดเร็ว
            </p>

          </div>


          <div class="about-card">

            <div class="card-icon">
              03
            </div>

            <h3>
              ติดตามออเดอร์
            </h3>

            <p>
              ตรวจสอบรายการอาหาร
              และสถานะออเดอร์ได้
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- =========================
         CTA
    ========================== -->

    <section class="cta">

      <div>

        <p>
          READY TO ORDER?
        </p>

        <h2>
          หิวแล้วใช่ไหม?
        </h2>

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

/* =========================
   HOME
========================= */

.home {
  min-height: calc(100vh - 70px);
  background: #faf9f7;
}


/* =========================
   HERO
========================= */

.hero {
  position: relative;

  min-height: 650px;

  display: flex;
  align-items: center;

  padding: 80px 10%;

  box-sizing: border-box;

  color: white;

  background:
    url("https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1600")
    center / cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.78) 0%,
      rgba(0, 0, 0, 0.58) 45%,
      rgba(0, 0, 0, 0.25) 100%
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

  letter-spacing: -1px;
}

.hero h1 span {
  color: #ff8c42;
}

.description {
  max-width: 550px;

  margin: 0;

  color: #eeeeee;

  font-size: 17px;

  line-height: 1.9;
}


/* =========================
   HERO BUTTONS
========================= */

.hero-actions {
  display: flex;

  align-items: center;

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

  transition:
    transform 0.2s,
    background 0.2s,
    box-shadow 0.2s;
}

.menu-button {
  background: #e85d04;

  color: white;

  box-shadow:
    0 8px 20px rgba(232, 93, 4, 0.3);
}

.menu-button:hover {
  background: #d95100;

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(232, 93, 4, 0.4);
}

.menu-button span {
  font-size: 20px;
}

.order-button {
  border: 1px solid rgba(255, 255, 255, 0.4);

  background: rgba(255, 255, 255, 0.08);

  color: white;

  backdrop-filter: blur(5px);
}

.order-button:hover {
  background: rgba(255, 255, 255, 0.18);

  transform: translateY(-2px);
}


/* =========================
   FEATURES
========================= */

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

  font-size: 14px;
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

  color: #cccccc;

  font-size: 11px;
}


/* =========================
   RECOMMENDED MENU
========================= */

.recommended {
  padding: 90px 20px;

  background: white;
}

.recommended-container {
  max-width: 1100px;

  margin: auto;
}


/* หัวข้อ */

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


/* การ์ดเมนู */

.recommended-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;
}

.recommended-card {
  overflow: hidden;

  border: 1px solid #eeeeee;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.05);

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.recommended-card:hover {
  transform: translateY(-6px);

  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.1);
}


/* พื้นที่รูป */

.menu-image {
  height: 150px;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #e85d04,
      #ff9a52
    );

  color: white;

  font-size: 13px;

  font-weight: bold;

  letter-spacing: 3px;
}

.menu-content {
  padding: 20px;
}

.menu-category {
  margin-bottom: 8px;

  color: #e85d04;

  font-size: 11px;

  font-weight: bold;

  letter-spacing: 1px;
}

.menu-content h3 {
  min-height: 48px;

  margin: 0;

  color: #222;

  font-size: 18px;

  line-height: 1.4;
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

  font-size: 16px;
}

.view-menu-button {
  padding: 8px 12px;

  border-radius: 7px;

  background: #fff1e8;

  color: #e85d04;

  font-size: 12px;

  font-weight: bold;

  text-decoration: none;

  transition:
    background 0.2s,
    color 0.2s;
}

.view-menu-button:hover {
  background: #e85d04;

  color: white;
}


/* ดูทั้งหมด */

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

  border-radius: 8px;

  background: white;

  color: #e85d04;

  font-size: 14px;

  font-weight: bold;

  text-decoration: none;

  transition:
    background 0.2s,
    color 0.2s;
}

.view-all-button:hover {
  background: #e85d04;

  color: white;
}

.view-all-button span {
  font-size: 18px;
}


/* ไม่มีเมนู */

.no-menu {
  padding: 40px;

  border: 1px dashed #ddd;

  border-radius: 12px;

  text-align: center;

  color: #777;
}


/* =========================
   ABOUT
========================= */

.about {
  padding: 90px 20px;

  background: #faf9f7;
}

.about-container {
  max-width: 1100px;

  margin: auto;
}

.about-cards {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;
}

.about-card {
  padding: 30px;

  border: 1px solid #eeeeee;

  border-radius: 16px;

  background: white;

  text-align: center;

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.04);

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.about-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.08);
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

  font-size: 19px;
}

.about-card p {
  margin: 0;

  color: #777;

  font-size: 14px;

  line-height: 1.7;
}


/* =========================
   CTA
========================= */

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

  box-shadow:
    0 12px 30px rgba(232, 93, 4, 0.2);
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

.cta span {
  color: #ffe9dc;

  font-size: 14px;
}

.cta-button {
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  gap: 10px;

  padding: 13px 20px;

  border-radius: 9px;

  background: white;

  color: #e85d04;

  font-weight: bold;

  text-decoration: none;

  transition:
    transform 0.2s,
    background 0.2s;
}

.cta-button:hover {
  background: #fff7f2;

  transform: translateY(-2px);
}

.cta-button span {
  color: #e85d04;

  font-size: 18px;
}


/* =========================
   TABLET
========================= */

@media (max-width: 900px) {

  .hero {
    min-height: 600px;

    padding: 70px 7%;
  }

  .recommended-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .about-cards {
    grid-template-columns: 1fr;
  }

  .about-card {
    padding: 25px;
  }

  .cta {
    margin-left: 20px;

    margin-right: 20px;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 650px) {

  .hero {
    min-height: 620px;

    padding: 60px 25px;
  }

  .hero h1 {
    font-size: 42px;
  }

  .description {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;

    align-items: stretch;
  }

  .menu-button,
  .order-button {
    width: 100%;

    box-sizing: border-box;
  }

  .features {
    flex-direction: column;

    gap: 15px;

    margin-top: 35px;
  }

  .recommended {
    padding: 65px 20px;
  }

  .recommended-grid {
    grid-template-columns: 1fr;
  }

  .section-heading h2 {
    font-size: 29px;
  }

  .cta {
    flex-direction: column;

    align-items: flex-start;

    padding: 30px 25px;
  }

  .cta-button {
    width: 100%;

    justify-content: center;

    box-sizing: border-box;
  }
}

</style>

