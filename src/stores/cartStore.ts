import { defineStore } from 'pinia'
import { OrderItem } from '../models/OrderItem'
import type { MenuItem } from '../models/MenuItem'
import { useMenuStore } from './menuStore'

const CART_STORAGE_KEY = 'restaurant_cart'

interface SavedCartItem {
  menuItemId: number
  quantity: number
  note: string
}

function saveCart(items: OrderItem[]): void {
  if (typeof window === 'undefined') {
    return
  }

  const data: SavedCartItem[] = items.map(item => ({
    menuItemId: item.getMenuItem().getId(),
    quantity: item.getQuantity(),
    note: item.getNote()
  }))

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data))
}

function loadCart(): OrderItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const saved = JSON.parse(raw) as SavedCartItem[]
    if (!Array.isArray(saved)) {
      return []
    }

    const menuStore = useMenuStore()

    return saved
      .map(savedItem => {
        const menuItem = menuStore.allItems.find(
          item => item.getId() === savedItem.menuItemId
        )

        if (!menuItem) {
          return null
        }

        return new OrderItem(
          menuItem,
          savedItem.quantity,
          savedItem.note
        )
      })
      .filter((item): item is OrderItem => item !== null)
  } catch {
    return []
  }
}

export interface CartStoreState {
  items: OrderItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartStoreState => ({
    items: loadCart()
  }),

  getters: {
    totalQuantity(state): number {
      return state.items.reduce(
        (total, item) => total + item.getQuantity(),
        0
      )
    },

    totalPrice(state): number {
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

      saveCart(this.items)
    },

    increaseQuantity(index: number): void {
      const item = this.items[index]
      if (item) {
        item.increaseQuantity()
        saveCart(this.items)
      }
    },

    decreaseQuantity(index: number): void {
      const item = this.items[index]
      if (item) {
        item.decreaseQuantity()
        saveCart(this.items)
      }
    },

    removeItem(index: number): void {
      if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1)
        saveCart(this.items)
      }
    },

    updateNote(index: number, note: string): void {
      const item = this.items[index]
      if (item) {
        item.setNote(note)
        saveCart(this.items)
      }
    },

    clearCart(): void {
      this.items = []
      saveCart(this.items)
    },

    syncFromStorage(): void {
      this.items = loadCart()
    }
  }
})
