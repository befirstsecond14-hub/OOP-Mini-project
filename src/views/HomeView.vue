<template>
  <main class="home">

    <section class="hero">
      <div class="hero-content">

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
        </p>

        <router-link to="/menu" class="menu-button">
          ดูเมนูอาหาร
        </router-link>

      </div>
    </section>

    <section class="about">

      <p class="section-title">
        OUR RESTAURANT
      </p>

      <h2>
        อาหารอร่อย บริการประทับใจ
      </h2>

      <p>
        เลือกเมนูที่คุณชื่นชอบ
        สั่งอาหารได้ง่ายและรวดเร็ว
      </p>

    </section>

  </main>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 70px);
}

.hero {
  min-height: 500px;

  display: flex;
  align-items: center;

  padding: 60px 10%;

  color: white;

  background:
    linear-gradient(
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.55)
    ),
    url("https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1400")
    center / cover;
}

.hero-content {
  max-width: 600px;
}

.subtitle {
  letter-spacing: 3px;
  font-size: 13px;
}

.hero h1 {
  margin: 15px 0;

  font-size: 52px;
  line-height: 1.2;
}

.hero h1 span {
  color: #ff8c42;
}

.description {
  max-width: 500px;

  line-height: 1.8;

  color: #eee;
}

.menu-button {
  display: inline-block;

  margin-top: 25px;

  padding: 13px 25px;

  border-radius: 8px;

  background: #e85d04;
  color: white;

  font-size: 15px;
  text-decoration: none;

  cursor: pointer;
}

.menu-button:hover {
  background: #d94f00;
}

.about {
  padding: 70px 20px;

  text-align: center;

  background: white;
}

.about h2 {
  margin: 10px 0;

  font-size: 32px;
}

.about p:last-child {
  color: #777;
}
</style>