import { OrderItem } from './OrderItem'

export type OrderStatus =
  | 'รอรับออเดอร์'
  | 'กำลังเตรียมอาหาร'
  | 'รอเสิร์ฟ'
  | 'กำลังจัดส่ง'
  | 'เสิร์ฟเรียบร้อย'
  | 'จัดส่งเรียบร้อย'

const MAX_NOTE_LENGTH = 200

export class Order {
  private items: OrderItem[] = []
  private status: OrderStatus = 'รอรับออเดอร์'
  private paid = false

  constructor(
    private id: number,
    private customerName: string,
    private tableNumber: number,
    private note: string = ''
  ) {
    if (!Number.isInteger(id) || id < 0) {
      throw new Error('รหัสออเดอร์ไม่ถูกต้อง')
    }

    const name = customerName.trim()
    if (!name) {
      throw new Error('ชื่อลูกค้าต้องไม่ว่าง')
    }

    if (!Number.isInteger(tableNumber) || tableNumber < 0) {
      throw new Error('หมายเลขโต๊ะไม่ถูกต้อง')
    }

    this.customerName = name
    this.note = this.normalizeNote(note)
  }

  private normalizeNote(note: string): string {
    return note.trim().slice(0, MAX_NOTE_LENGTH)
  }

  getNote(): string {
    return this.note
  }

  setNote(note: string): void {
    this.note = this.normalizeNote(note)
  }

  addItem(item: OrderItem): void {
    if (!(item instanceof OrderItem)) {
      throw new Error('รายการสินค้าไม่ถูกต้อง')
    }
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

  setCustomerName(customerName: string): void {
    const name = customerName.trim()
    if (!name) {
      throw new Error('ชื่อลูกค้าต้องไม่ว่าง')
    }
    this.customerName = name
  }

  getTableNumber(): number {
    return this.tableNumber
  }

  setTableNumber(tableNumber: number): void {
    if (!Number.isInteger(tableNumber) || tableNumber < 0) {
      throw new Error('หมายเลขโต๊ะไม่ถูกต้อง')
    }
    this.tableNumber = tableNumber
  }

  getStatus(): OrderStatus {
    return this.status
  }

  setStatus(status: OrderStatus): void {
    this.status = status
  }

  markAsPaid(): void {
    this.paid = true
  }

  isPaid(): boolean {
    return this.paid
  }
}
