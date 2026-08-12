import { OrderItem } from './OrderItem'

export class Order {
  private items: OrderItem[] = []
  private status: string = 'รอรับออเดอร์'

  constructor(
    private id: number,
    private customerName: string
  ) {}

  addItem(item: OrderItem): void {
    this.items.push(item)
  }

  removeItem(index: number): void {
    this.items.splice(index, 1)
  }

  getItems(): OrderItem[] {
    return this.items
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

  getStatus(): string {
    return this.status
  }

  setStatus(status: string): void {
    this.status = status
  }
}
///จัดการออเดอร์//