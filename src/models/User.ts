export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly role: 'customer' | 'admin' = 'customer'
  ) {}

  // ใช้ Native Getter สำหรับเช็คสถานะ admin
  get isAdmin(): boolean {
    return this.role === 'admin';
  }
}