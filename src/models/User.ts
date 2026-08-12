export class User {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private role: 'customer' | 'admin' = 'customer'
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

  getRole(): string {
    return this.role
  }

  isAdmin(): boolean {
    return this.role === 'admin'
  }
}