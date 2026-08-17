import { Order } from './Order'

// 1. แยก Type ออกมาเพื่อให้เรียกใช้ซ้ำได้ง่าย
export type PaymentStatus = 'ยังไม่ชำระ' | 'ชำระแล้ว'
export type PaymentMethod = 'เงินสด' | 'โอนเงิน' | 'บัตรเครดิต'

export class Payment {
  private status: PaymentStatus = 'ยังไม่ชำระ'

  constructor(
    private id: number,
    private order: Order,
    private method: PaymentMethod
  ) {}

  getId(): number {
    return this.id
  }

  getOrder(): Order {
    return this.order
  }

  // 2. ปรับ Return Type ให้ตรงกับ Type ที่เราสร้างไว้
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
    this.status = 'ชำระแล้ว'
    
    // 3. (ทางเลือก) อัปเดตสถานะของ Order เมื่อชำระเงินสำเร็จ
    // this.order.markAsPaid() 
  }
}