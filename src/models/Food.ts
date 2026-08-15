import { MenuItem } from './MenuItem'

// คลาสลูก
// Inheritance

export class Food extends MenuItem {

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
    return 'อาหาร'
  }
}