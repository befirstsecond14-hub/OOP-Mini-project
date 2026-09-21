import { Order } from '../models/Order'
import type { OrderStatus } from '../models/Order'

interface OrderStore {
  currentOrder: Order | null
  orders: Order[]
  readonly getOrder: Order | null
  readonly orderHistory: Order[]
  setOrder(order: Order): void
  addToHistory(): void
  updateStatus(status: OrderStatus): void
  clearOrder(): void
  clearHistory(): void
}

const store: OrderStore = {
  currentOrder: null,
  orders: [],

  get getOrder(): Order | null {
    return this.currentOrder
  },

  get orderHistory(): Order[] {
    return this.orders
  },

  setOrder(order: Order): void {
    this.currentOrder = order
  },

  addToHistory(): void {
    if (!this.currentOrder) return

    const exists = this.orders.some(order => order.getId() === this.currentOrder?.getId())
    if (!exists) this.orders.push(this.currentOrder)
  },

  updateStatus(status: OrderStatus): void {
    this.currentOrder?.setStatus(status)
  },

  clearOrder(): void {
    this.currentOrder = null
  },

  clearHistory(): void {
    this.orders = []
  }
}

export function useOrderStore(): OrderStore {
  return store
}