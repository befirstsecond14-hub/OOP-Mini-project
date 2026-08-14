import { Order } from './Order'

export class Payment {
  private status: 'ยังไม่ชำระ' | 'ชำระแล้ว' = 'ยังไม่ชำระ'

  constructor(
    private id: number,
    private order: Order,
    private method: 'เงินสด' | 'โอนเงิน' | 'บัตรเครดิต'
  ) {}

  getId(): number {
    return this.id
  }

  getOrder(): Order {
    return this.order
  }

  getMethod(): string {
    return this.method
  }

  getAmount(): number {
    return this.order.getTotal()
  }

  getStatus(): string {
    return this.status
  }

  pay(): void {
    this.status = 'ชำระแล้ว'
  }
}