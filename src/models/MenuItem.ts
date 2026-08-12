//คลาสแม่ สินค้า  Abstraction + Encapsulation//
export abstract class MenuItem {
  private id: number
  private name: string
  private price: number

  constructor(
    id: number,
    name: string,
    price: number
  ) {
    this.id = id
    this.name = name
    this.price = price
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

  setName(name: string): void {
    this.name = name
  }

  setPrice(price: number): void {
    this.price = price
  }

  abstract getType(): string
}