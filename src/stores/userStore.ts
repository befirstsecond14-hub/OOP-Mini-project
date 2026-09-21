// @ts-expect-error Pinia is provided by the project runtime when dependencies are installed.
import { defineStore } from 'pinia'
import { User } from '../models/User'

<<<<<<< HEAD
// ฟังก์ชันสำหรับแปลง Raw Object จาก localStorage กลับมาเป็น Class User Instance
const restoreUserInstance = (userData: any): User | null => {
  if (!userData) return null
  const user = new User(
    userData.id,
    userData.name,
    userData.email,
    userData.password
  )
  return user
=======
type UserStoreState = {
  users: User[]
  currentUser: User | null
>>>>>>> 7b617d8d7421b6b53b85f5d6587457ab691b8f82
}

export const useUserStore = defineStore('user', {
  state: () => {
    // ดึงข้อมูล users ทั้งหมดจาก localStorage
    const savedUsers = localStorage.getItem('users')
    const parsedUsers = savedUsers ? JSON.parse(savedUsers) : []
    const usersList = parsedUsers.map((u: any) => restoreUserInstance(u)).filter(Boolean) as User[]

    // ดึงข้อมูล currentUser จาก localStorage
    const savedCurrentUser = localStorage.getItem('currentUser')
    const currentUserInstance = savedCurrentUser
      ? restoreUserInstance(JSON.parse(savedCurrentUser))
      : null

    return {
      users: usersList as User[],
      currentUser: currentUserInstance as User | null
    }
  },

  getters: {
    isLoggedIn: (state: { users: User[]; currentUser: User | null }): boolean => {
      return state.currentUser !== null
    }
  },

  actions: {
    // บันทึกรายการผู้ใช้ทั้งหมดลง localStorage
    saveUsersToStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    // บันทึกผู้ใช้ที่กำลังล็อกอินอยู่ลง localStorage
    saveCurrentUserToStorage() {
      if (this.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } else {
        localStorage.removeItem('currentUser')
      }
    },

    register(
      this: UserStoreState,
      name: string,
      email: string,
      password: string
    ): boolean {
      const exists = this.users.some(
        (user: User) => user.getEmail() === email
      )

      if (exists) {
        return false
      }

      const id = Date.now()

      const newUser = new User(
        id,
        name,
        email,
        password
      )

      this.users.push(newUser)
      this.saveUsersToStorage() // เซฟรายชื่อผู้ใช้ลงเครื่อง

      return true
    },

    login(
      this: UserStoreState,
      email: string,
      password: string
    ): boolean {
      const user = this.users.find(
        user =>
          user.getEmail() === email &&
          user.checkPassword(password)
      )

      if (!user) {
        return false
      }

      this.currentUser = user
      this.saveCurrentUserToStorage() // เซฟสถานะการเข้าสู่ระบบลงเครื่อง

      return true
    },

    logout(this: UserStoreState): void {
      this.currentUser = null
      this.saveCurrentUserToStorage() // ลบสถานะออกจากเครื่อง
    },

    updateName(this: UserStoreState, name: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setName(name)
      this.saveUsersToStorage()
      this.saveCurrentUserToStorage()
    },

    updatePassword(this: UserStoreState, password: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setPassword(password)
      this.saveUsersToStorage()
      this.saveCurrentUserToStorage()
    }
  }
})