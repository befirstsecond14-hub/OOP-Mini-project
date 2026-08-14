import { OrderItem } from './OrderItem'

export type OrderStatus =
  | 'รอรับออเดอร์'
  | 'กำลังเตรียมอาหาร'
  | 'พร้อมเสิร์ฟ'
  | 'เสร็จสิ้น'

export class Order {
  private items: OrderItem[] = []

  private status: OrderStatus = 'รอรับออเดอร์'

  constructor(
    private id: number,
    private customerName: string,
    private tableNumber: number
  ) {}

  addItem(item: OrderItem): void {
    this.items.push(item)
  }

  removeItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1)
    }
  }

  getItems(): OrderItem[] {
    return this.items
  }

  getTotalQuantity(): number {
    return this.items.reduce(
      (total, item) => total + item.getQuantity(),
      0
    )
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.getSubtotal(),
      0
    )
  }

  getId(): number {
    return this.id
  }

  getCustomerName(): string {
    return this.customerName
  }

  getTableNumber(): number {
    return this.tableNumber
  }

  getStatus(): OrderStatus {
    return this.status
  }

  setStatus(status: OrderStatus): void {
    this.status = status
  }
}