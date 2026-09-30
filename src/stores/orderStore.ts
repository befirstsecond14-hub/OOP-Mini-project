import { defineStore } from 'pinia'
import { Order } from '../models/Order'
import type { OrderStatus } from '../models/Order'
import { OrderItem } from '../models/OrderItem'
import { useMenuStore } from './menuStore'

const ORDERS_STORAGE_KEY = 'restaurant_orders'
const CURRENT_ORDER_STORAGE_KEY = 'restaurant_current_order_id'
const COUNTER_STORAGE_KEY = 'restaurant_order_counter'

interface SavedOrderItem {
  menuItemId: number
  quantity: number
  note: string
}

interface SavedOrder {
  id: number
  customerName: string
  tableNumber: number
  note: string
  status: OrderStatus
  paid: boolean
  items: SavedOrderItem[]
}

interface SavedCounter {
  date: string
  nextNumber: number
}

function todayKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatOrderNumber(id: number): string {
  return String(id).padStart(4, '0')
}

function serializeOrder(order: Order): SavedOrder {
  return {
    id: order.getId(),
    customerName: order.getCustomerName(),
    tableNumber: order.getTableNumber(),
    note: order.getNote(),
    status: order.getStatus(),
    paid: order.isPaid(),
    items: order.getItems().map(item => ({
      menuItemId: item.getMenuItem().getId(),
      quantity: item.getQuantity(),
      note: item.getNote()
    }))
  }
}

function deserializeOrder(data: SavedOrder): Order | null {
  try {
    const menuStore = useMenuStore()

    const order = new Order(
      data.id,
      data.customerName,
      data.tableNumber,
      data.note
    )

    for (const savedItem of data.items) {
      const menuItem = menuStore.allItems.find(
        item => item.getId() === savedItem.menuItemId
      )

      if (!menuItem) {
        continue
      }

      order.addItem(
        new OrderItem(
          menuItem,
          savedItem.quantity,
          savedItem.note
        )
      )
    }

    order.setStatus(data.status)

    if (data.paid) {
      order.markAsPaid()
    }

    return order
  } catch {
    return null
  }
}

function readSavedOrders(): Order[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const data = JSON.parse(raw) as SavedOrder[]

    if (!Array.isArray(data)) {
      return []
    }

    return data
      .map(deserializeOrder)
      .filter((order): order is Order => order !== null)
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders.map(serializeOrder))
  )
}

function saveCurrentOrderId(order: Order | null): void {
  if (typeof window === 'undefined') {
    return
  }

  if (!order) {
    localStorage.removeItem(CURRENT_ORDER_STORAGE_KEY)
    return
  }

  localStorage.setItem(
    CURRENT_ORDER_STORAGE_KEY,
    String(order.getId())
  )
}

function readCurrentOrder(orders: Order[]): Order | null {
  if (typeof window === 'undefined') {
    return orders.at(-1) ?? null
  }

  const savedId = localStorage.getItem(CURRENT_ORDER_STORAGE_KEY)

  if (savedId !== null) {
    const id = Number(savedId)
    const found = orders.find(order => order.getId() === id)

    if (found) {
      return found
    }
  }

  return orders.at(-1) ?? null
}

function getNextOrderNumber(): number {
  if (typeof window === 'undefined') {
    return 0
  }

  const today = todayKey()

  try {
    const raw = localStorage.getItem(COUNTER_STORAGE_KEY)
    const saved = raw
      ? JSON.parse(raw) as SavedCounter
      : null

    const nextNumber =
      saved?.date === today
        ? saved.nextNumber
        : 0

    localStorage.setItem(
      COUNTER_STORAGE_KEY,
      JSON.stringify({
        date: today,
        nextNumber: nextNumber + 1
      } satisfies SavedCounter)
    )

    return nextNumber
  } catch {
    localStorage.setItem(
      COUNTER_STORAGE_KEY,
      JSON.stringify({
        date: today,
        nextNumber: 1
      } satisfies SavedCounter)
    )

    return 0
  }
}

export const useOrderStore = defineStore('order', {
  state: () => {
    const orders = readSavedOrders()

    return {
      currentOrder: readCurrentOrder(orders),
      orders
    }
  },

  getters: {
    getOrder: (state) => state.currentOrder,

    orderHistory: (state) => state.orders
  },

  actions: {
    createOrderId(): number {
      return getNextOrderNumber()
    },

    setOrder(order: Order): void {
      this.currentOrder = order
      saveCurrentOrderId(order)
    },

    addToHistory(): void {
      if (!this.currentOrder) {
        return
      }

      const existingIndex = this.orders.findIndex(
        order => order.getId() === this.currentOrder?.getId()
      )

      if (existingIndex === -1) {
        this.orders.push(this.currentOrder)
      } else {
        this.orders[existingIndex] = this.currentOrder
      }

      saveOrders(this.orders)
      saveCurrentOrderId(this.currentOrder)
    },

    updateStatus(status: OrderStatus): void {
      if (!this.currentOrder) {
        return
      }

      this.currentOrder.setStatus(status)

      const existingIndex = this.orders.findIndex(
        order => order.getId() === this.currentOrder?.getId()
      )

      if (existingIndex >= 0) {
        this.orders[existingIndex] = this.currentOrder
      }

      saveOrders(this.orders)
      saveCurrentOrderId(this.currentOrder)
    },

    clearOrder(): void {
      this.currentOrder = null
      saveCurrentOrderId(null)
    },

    clearHistory(): void {
      this.orders = []
      saveOrders(this.orders)
      this.clearOrder()
    },

    syncFromStorage(): void {
      const orders = readSavedOrders()

      this.orders = orders
      this.currentOrder = readCurrentOrder(orders)
    },

    getFormattedOrderNumber(id: number): string {
      return formatOrderNumber(id)
    }
  }
})
