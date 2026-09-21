export type UserRole = 'customer' | 'admin'

export class User {

  constructor(
    private readonly id: number,
    private name: string,
    private email: string,
    private password: string,
    private readonly role: UserRole = 'customer'
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

  getPassword(): string {
    return this.password
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

  setPassword(password: string): void {
    this.password = password
  }

  get isAdmin(): boolean {
    return this.role === 'admin'
  }
}