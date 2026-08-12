import { defineStore } from 'pinia'
import { MenuItem } from '../models/MenuItem'
import { OrderItem } from '../models/OrderItem'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as OrderItem[]
  }),

  getters: {
    totalQuantity: (state): number => {
      return state.items.reduce(
        (total, item) => total + item.getQuantity(),
        0
      )
    },

    totalPrice: (state): number => {
      return state.items.reduce(
        (total, item) => total + item.getSubtotal(),
        0
      )
    }
  },

  actions: {
    addToCart(menuItem: MenuItem): void {
      const existingItem = this.items.find(
        item => item.getMenuItem().getId() === menuItem.getId()
      )

      if (existingItem) {
        existingItem.increaseQuantity()
      } else {
        this.items.push(new OrderItem(menuItem, 1))
      }
    },

    increaseQuantity(index: number): void {
      const item = this.items[index]

      if (item) {
        item.increaseQuantity()
      }
    },

    decreaseQuantity(index: number): void {
      const item = this.items[index]

      if (item) {
        item.decreaseQuantity()
      }
    },

    removeItem(index: number): void {
      this.items.splice(index, 1)
    },

    clearCart(): void {
      this.items = []
    }
  }
})