// Pinia is provided by the project's runtime dependencies.
// @ts-expect-error Pinia may be unavailable to the standalone TypeScript checker.
import { defineStore } from 'pinia'
import { MenuItem } from '../models/MenuItem'
import { OrderItem } from '../models/OrderItem'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as OrderItem[]
  }),

  getters: {
    totalQuantity(state: { items: OrderItem[] }): number {
      return state.items.reduce(
        (total, item) => total + item.getQuantity(),
        0
      )
    },

    totalPrice(state: { items: OrderItem[] }): number {
      return state.items.reduce(
        (total, item) => total + item.getSubtotal(),
        0
      )
    }
  },

  actions: {
    addToCart(this: { items: OrderItem[] }, menuItem: MenuItem): void {
      const existingItem = this.items.find(
        item => item.getMenuItem().getId() === menuItem.getId()
      )

      if (existingItem) {
        existingItem.increaseQuantity()
      } else {
        this.items.push(new OrderItem(menuItem, 1))
      }
    },

    increaseQuantity(this: { items: OrderItem[] }, index: number): void {
      const item = this.items[index]

      if (item) {
        item.increaseQuantity()
      }
    },

    decreaseQuantity(this: { items: OrderItem[] }, index: number): void {
      const item = this.items[index]

      if (item) {
        item.decreaseQuantity()
      }
    },

    removeItem(this: { items: OrderItem[] }, index: number): void {
      this.items.splice(index, 1)
    },

    clearCart(this: { items: OrderItem[] }): void {
      this.items = []
    }
  }
})