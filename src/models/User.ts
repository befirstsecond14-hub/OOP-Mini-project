export type UserRole = 'customer' | 'admin'

export class User {
  constructor(
    private readonly id: number,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole = 'customer' // ค่าเริ่มต้นยังคงเป็น customer
  ) {}

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getRole(): UserRole {
    return this.role
  }

  checkPassword(password: string): boolean {
    return this.password === password
  }

  setName(name: string): void {
    this.name = name
  }

  setEmail(email: string): void {
    this.email = email
  }

  setPassword(password: string): void {
    this.password = password
  }

  setRole(role: UserRole): void {
    this.role = role
  }

  get isAdmin(): boolean {
    return this.role === 'admin'
  }
}