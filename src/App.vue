<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  
  <!-- แสดงผลหน้าจอต่างๆ ตาม URL ที่ผู้ใช้เข้าถึง -->
  <router-view />
</template>

<style>
/* สามารถใส่ CSS Global (ที่ใช้กับทุกหน้า) เช่น การตั้งค่า Font หรือ Reset Margin ไว้ตรงนี้ได้ครับ */
body {
  margin: 0;
  padding: 0;
  font-family: 'Sarabun', 'Prompt', sans-serif; 
}
</style>