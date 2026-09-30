import { MenuItem } from './MenuItem'

const MAX_NOTE_LENGTH = 200

export class OrderItem {
  private quantity: number
  private note: string

  constructor(
    private menuItem: MenuItem,
    quantity: number,
    note: string = ''
  ) {
    this.quantity = OrderItem.validateQuantity(quantity)
    this.note = OrderItem.normalizeNote(note)
  }

  private static validateQuantity(quantity: number): number {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('จำนวนสินค้าต้องเป็นจำนวนเต็มอย่างน้อย 1')
    }
    return quantity
  }

  private static normalizeNote(note: string): string {
    return note.trim().slice(0, MAX_NOTE_LENGTH)
  }

  getMenuItem(): MenuItem {
    return this.menuItem
  }

  getQuantity(): number {
    return this.quantity
  }

  getNote(): string {
    return this.note
  }

  setNote(note: string): void {
    this.note = OrderItem.normalizeNote(note)
  }

  increaseQuantity(): void {
    this.quantity += 1
  }

  decreaseQuantity(): boolean {
    if (this.quantity <= 1) {
      return false
    }

    this.quantity -= 1
    return true
  }

  getSubtotal(): number {
    return this.menuItem.getPrice() * this.quantity
  }
}
