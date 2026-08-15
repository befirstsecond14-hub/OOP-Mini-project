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
    this.id = id
    this.name = name
    this.price = price
    this.imageUrl = imageUrl
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
    this.name = name
  }

  setPrice(price: number): void {
    this.price = price
  }

  setImageUrl(imageUrl: string): void {
    this.imageUrl = imageUrl
  }

  abstract getType(): string
}