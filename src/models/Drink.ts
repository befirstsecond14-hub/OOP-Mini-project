import { MenuItem } from './MenuItem'

// คลาสลูก
// Inheritance + Polymorphism

export class Drink extends MenuItem {

  constructor(
    id: number,
    name: string,
    price: number,
    imageUrl: string
  ) {
    super(
      id,
      name,
      price,
      imageUrl
    )
  }

  getType(): string {
    return 'เครื่องดื่ม'
  }
}