import { MenuItem } from './MenuItem'

export class OrderItem {
  private quantity: number
  private note: string

  constructor(
    private menuItem: MenuItem,
    quantity: number,
    note: string = ''
  ) {
    this.quantity = quantity
    this.note = note
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
    this.note = note
  }

  increaseQuantity(): void {
    this.quantity++
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  getSubtotal(): number {
    return this.menuItem.getPrice() * this.quantity
  }
}
