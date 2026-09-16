import { defineStore } from 'pinia'
import { User } from '../models/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null
  }),

  getters: {
    isLoggedIn: (state): boolean => {
      return state.currentUser !== null
    }
  },

  actions: {
    register(
      name: string,
      email: string,
      password: string
    ): boolean {
      const exists = this.users.some(
        user => user.getEmail() === email
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

      return true
    },

    login(
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

      return true
    },

    logout(): void {
      this.currentUser = null
    },

    updateName(name: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setName(name)
    },

    updatePassword(password: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setPassword(password)
    }
  }
})