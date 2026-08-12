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
      new Food(1, 'ข้าวกะเพราไก่', 59),
      new Food(2, 'ข้าวผัดหมู', 65),
      new Food(3, 'ผัดไทยกุ้ง', 79),
      new Drink(4, 'ชาไทย', 45),
      new Drink(5, 'กาแฟเย็น', 50)
    ] as MenuItem[])
  }),

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