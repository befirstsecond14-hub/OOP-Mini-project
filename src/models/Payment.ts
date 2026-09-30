import { Order } from './Order'

export type PaymentStatus = 'ยังไม่ชำระ' | 'ชำระแล้ว'
export type PaymentMethod = 'เงินสด' | 'โอนเงิน' | 'บัตรเครดิต'

export class Payment {
  private status: PaymentStatus = 'ยังไม่ชำระ'

  constructor(
    private id: number,
    private order: Order,
    private method: PaymentMethod
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('รหัสการชำระเงินไม่ถูกต้อง')
    }
  }

  getId(): number {
    return this.id
  }

  getOrder(): Order {
    return this.order
  }

  getMethod(): PaymentMethod {
    return this.method
  }

  getAmount(): number {
    return this.order.getTotal()
  }

  getStatus(): PaymentStatus {
    return this.status
  }

  pay(): void {
    if (this.status === 'ชำระแล้ว') {
      return
    }

    this.status = 'ชำระแล้ว'
    this.order.markAsPaid()
  }
}
