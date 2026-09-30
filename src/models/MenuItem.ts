// คลาสแม่สินค้า
// Abstraction + Encapsulation

export abstract class MenuItem {
  private id: number
  private name: string
  private price: number
  private imageUrl: string

  constructor(
    id: number,
    name: string,
    price: number,
    imageUrl: string
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('รหัสเมนูต้องเป็นจำนวนเต็มมากกว่า 0')
    }

    this.id = id
    this.name = MenuItem.validateName(name)
    this.price = MenuItem.validatePrice(price)
    this.imageUrl = MenuItem.validateImageUrl(imageUrl)
  }

  private static validateName(name: string): string {
    const value = name.trim()
    if (!value) {
      throw new Error('ชื่อเมนูต้องไม่ว่าง')
    }
    return value
  }

  private static validatePrice(price: number): number {
    if (!Number.isFinite(price) || price <= 0) {
      throw new Error('ราคาต้องเป็นตัวเลขที่มากกว่า 0')
    }
    return price
  }

  private static validateImageUrl(imageUrl: string): string {
    const value = imageUrl.trim()
    if (!value) {
      throw new Error('URL รูปภาพต้องไม่ว่าง')
    }
    return value
  }

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getPrice(): number {
    return this.price
  }

  getImageUrl(): string {
    return this.imageUrl
  }

  setName(name: string): void {
    this.name = MenuItem.validateName(name)
  }

  setPrice(price: number): void {
    this.price = MenuItem.validatePrice(price)
  }

  setImageUrl(imageUrl: string): void {
    this.imageUrl = MenuItem.validateImageUrl(imageUrl)
  }

  abstract getType(): string
}
