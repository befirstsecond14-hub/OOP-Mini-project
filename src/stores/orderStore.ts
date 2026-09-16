import { defineStore } from 'pinia'
import { Order } from '../models/Order'
import type { OrderStatus } from '../models/Order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null as Order | null,
    orders: [] as Order[]
  }),

  getters: {
    getOrder: (state) => state.currentOrder,

    orderHistory: (state) => state.orders
  },

  actions: {
    setOrder(order: Order): void {
      this.currentOrder = order
    },

    addToHistory(): void {
      if (!this.currentOrder) {
        return
      }

      const exists = this.orders.some(
        order => order.getId() === this.currentOrder?.getId()
      )

      if (!exists) {
        this.orders.push(this.currentOrder)
      }
    },

    updateStatus(status: OrderStatus): void {
      if (this.currentOrder) {
        this.currentOrder.setStatus(status)
      }
    },

    clearOrder(): void {
      this.currentOrder = null
    },

    clearHistory(): void {
      this.orders = []
    }
  }
})