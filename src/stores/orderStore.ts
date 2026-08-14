import { defineStore } from 'pinia'
import { Order } from '../models/Order'
import type { OrderStatus } from '../models/Order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null as Order | null
  }),

  getters: {
    getOrder: (state) => state.currentOrder
  },

  actions: {
    setOrder(order: Order): void {
      this.currentOrder = order
    },

    updateStatus(status: OrderStatus): void {
      if (this.currentOrder) {
        this.currentOrder.setStatus(status)
      }
    },

    clearOrder(): void {
      this.currentOrder = null
    }
  }
})