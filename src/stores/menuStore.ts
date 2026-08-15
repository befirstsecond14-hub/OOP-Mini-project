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
        'ข้าวกะเพราไก่',
        59,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        2,
        'ข้าวกะเพราหมูสับ',
        65,
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        3,
        'ข้าวกะเพราหมูกรอบ',
        75,
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        4,
        'ข้าวกะเพราเนื้อ',
        79,
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        5,
        'ข้าวผัดหมู',
        65,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        6,
        'ข้าวผัดไก่',
        65,
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        7,
        'ข้าวผัดกุ้ง',
        79,
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        8,
        'ผัดไทยกุ้ง',
        79,
        'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        9,
        'ข้าวมันไก่',
        60,
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
      ),

      new Food(
        10,
        'ข้าวหมูกระเทียม',
        65,
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
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
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80'
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