import { defineStore } from 'pinia'
import { markRaw } from 'vue'

import { Food } from '../models/Food'
import { Drink } from '../models/Drink'

import type { MenuItem } from '../models/MenuItem'

interface MenuState {
  items: MenuItem[]
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    items: markRaw([

      // ==================================================
      // อาหาร 10 เมนู
      // ==================================================

    
      new Food(
        1,
        'ข้าวกะเพราหมูสับ',
        65,
        'https://www.tecnoplusthai.com/wp-content/uploads/2025/08/9.3.webp'
      ),

      new Food(
        2,
        'ข้าวกะเพราหมูกรอบ',
        75,
        'https://img.magnific.com/premium-photo/stir-fried-crispy-pork-belly-basil-with-rice_1339-101235.jpg'
      ),

      new Food(
        3,
        'ข้าวพะแนงหมู',
        79,
        'https://img.wongnai.com/p/400x0/2020/05/02/88eee944f68f48b2b4805d9f1f0ebb35.jpg'
      ),

      new Food(
        4,
        'ข้าวผัดหมู',
        65,
        'https://s359.kapook.com/pagebuilder/d0b8a629-aded-4ff0-b623-6511bc54fb52.jpg'
      ),

      new Food(
        5,
        'สุกกี้น้ำหมู',
        65,
        'https://api2.krua.co/wp-content/uploads/2020/06/SlideBanner_RI0194_1140x507.jpg'
      ),

      new Food(
        6,
        'ข้าวผัดกุ้ง',
        79,
        'https://img.wongnai.com/p/1920x0/2020/03/06/d34e8f779cd94f18ac43aeab11a5239f.jpg'
      ),

      new Food(
        7,
        'ผัดไทยกุ้ง',
        79,
        'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        8,
        'ข้าวมันไก่',
        60,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJGqep_3ExRtiz9zT2GyZawa1tjoUrW8yn63TbgNHjacZnfAKnTcVZoWN&s=10'
        ),
      new Food(
        9,
        'ข้าวหมูกระเทียม',
        65,
        'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rpMP0IwcTkY7Nk2F3IyFKD0yKg6lqZeUbBLmw4CO8n7O7eRDtY.jpg'
      ),

      // ==================================================
      // เครื่องดื่ม 6 เมนู
      // ==================================================

      new Drink(
        101,
        'น้ำเปล่า',
        15,
        'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
      ),

      new Drink(
        102,
        'น้ำอัดลม',
        25,
        'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=80'
      ),

      new Drink(
        103,
        'ชาไทย',
        45,
        'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=800&q=80'
      ),

      new Drink(
        104,
        'ชาเขียว',
        45,
        'https://www.playglao.co/wp-content/uploads/2021/10/%E0%B8%8A%E0%B8%B2%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%A2%E0%B9%87%E0%B8%99%E0%B8%9B%E0%B8%B1%E0%B9%88%E0%B8%99-01_web.png'
      ),

      new Drink(
        105,
        'กาแฟเย็น',
        50,
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'
      ),

      new Drink(
        106,
        'โกโก้เย็น',
        50,
        'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80'
      )

    ] as MenuItem[])
  }),

  // ==================================================
  // GETTERS
  // ==================================================

  getters: {

    allItems: (state) => {
      return state.items as unknown as MenuItem[]
    },

    foods: (state) => {
      return (state.items as unknown as MenuItem[]).filter(
        item => item.getType() === 'อาหาร'
      )
    },

    drinks: (state) => {
      return (state.items as unknown as MenuItem[]).filter(
        item => item.getType() === 'เครื่องดื่ม'
      )
    }

  },

  // ==================================================
  // ACTIONS
  // ==================================================

  actions: {

    addItem(item: MenuItem): void {
      this.items.push(item)
    },

    removeItem(id: number): void {
      this.items = this.items.filter(
        item => item.getId() !== id
      )
    }

  }
})