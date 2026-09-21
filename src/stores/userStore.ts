// @ts-expect-error Pinia is provided by the project runtime when dependencies are installed.
import { defineStore } from 'pinia'
import { User } from '../models/User'

type UserStoreState = {
  users: User[]
  currentUser: User | null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null
  }),

  getters: {
    isLoggedIn: (state: { users: User[]; currentUser: User | null }): boolean => {
      return state.currentUser !== null
    }
  },

  actions: {
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

      return true
    },

    logout(this: UserStoreState): void {
      this.currentUser = null
    },

    updateName(this: UserStoreState, name: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setName(name)
    },

    updatePassword(this: UserStoreState, password: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setPassword(password)
    }
  }
})