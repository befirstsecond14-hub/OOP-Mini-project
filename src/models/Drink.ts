import { MenuItem } from './MenuItem'

export class Drink extends MenuItem {

  constructor(
    id: number,
    name: string,
    price: number
  ) {
    super(id, name, price)
  }

  getType(): string {
    return 'เครื่องดื่ม'
  }
}
//Inheritance + Polymorphism//