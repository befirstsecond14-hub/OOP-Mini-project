import { MenuItem } from './MenuItem'

export class Food extends MenuItem {

  constructor(
    id: number,
    name: string,
    price: number
  ) {
    super(id, name, price)
  }

  getType(): string {
    return 'อาหาร'
  }
}
//คลาสลูกInheritance//