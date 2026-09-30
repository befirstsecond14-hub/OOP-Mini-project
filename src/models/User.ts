export type UserRole = 'customer' | 'admin'

export class User {

  constructor(
    private readonly id: number,
    private name: string,
    private email: string,
    private password: string,
    private readonly role: UserRole = 'customer'
  ) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('รหัสผู้ใช้ไม่ถูกต้อง')
    }

    this.name = User.validateName(name)
    this.email = User.validateEmail(email)
    this.password = User.validatePassword(password)
  }

  private static validateName(name: string): string {
    const value = name.trim()
    if (!value) {
      throw new Error('ชื่อผู้ใช้ต้องไม่ว่าง')
    }
    return value
  }

  private static validateEmail(email: string): string {
    const value = email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      throw new Error('รูปแบบอีเมลไม่ถูกต้อง')
    }
    return value
  }

  private static validatePassword(password: string): string {
    if (!password) {
      throw new Error('รหัสผ่านต้องไม่ว่าง')
    }
    return password
  }

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  // ใช้สำหรับ localStorage ในโปรเจกต์ Prototype เท่านั้น
  // ระบบจริงควรเก็บ Password แบบ Hash และไม่ส่งกลับไปที่ UI
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
    this.name = User.validateName(name)
  }

  setPassword(password: string): void {
    if (password.length < 6) {
      throw new Error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
    }
    this.password = User.validatePassword(password)
  }

  get isAdmin(): boolean {
    return this.role === 'admin'
  }
}
