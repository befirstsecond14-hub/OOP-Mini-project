import { MenuItem } from './MenuItem'

export class OrderItem {
  private quantity: number

  constructor(
    private menuItem: MenuItem,
    quantity: number
  ) {
    this.quantity = quantity
  }

  getMenuItem(): MenuItem {
    return this.menuItem
  }

  getQuantity(): number {
    return this.quantity
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