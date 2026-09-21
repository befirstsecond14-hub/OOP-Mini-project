import { defineStore } from 'pinia'
import { User } from '../models/User'

interface SavedUser {
  id: number
  name: string
  email: string
  password: string
  role: 'customer' | 'admin'
}

function userToData(user: {
  getId(): number
  getName(): string
  getEmail(): string
  getPassword(): string
  getRole(): 'customer' | 'admin'
}): SavedUser {
  return {
    id: user.getId(),
    name: user.getName(),
    email: user.getEmail(),
    password: user.getPassword(),
    role: user.getRole()
  }
}

function saveUsers(
  users: {
    getId(): number
    getName(): string
    getEmail(): string
    getPassword(): string
    getRole(): 'customer' | 'admin'
  }[]
): void {
  localStorage.setItem(
    'users',
    JSON.stringify(
      users.map(userToData)
    )
  )
}

function saveCurrentUser(
  user: {
    getId(): number
    getName(): string
    getEmail(): string
    getPassword(): string
    getRole(): 'customer' | 'admin'
  } | null
): void {
  if (!user) {
    localStorage.removeItem('currentUser')
    return
  }

  localStorage.setItem(
    'currentUser',
    JSON.stringify(
      userToData(user)
    )
  )
}

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUsers =
      localStorage.getItem('users')

    const savedCurrentUser =
      localStorage.getItem('currentUser')

    const usersData: SavedUser[] =
      savedUsers
        ? JSON.parse(savedUsers)
        : []

    const currentUserData:
      SavedUser | null =
      savedCurrentUser
        ? JSON.parse(savedCurrentUser)
        : null

    return {
      users: usersData.map(
        user =>
          new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role
          )
      ),

      currentUser:
        currentUserData
          ? new User(
              currentUserData.id,
              currentUserData.name,
              currentUserData.email,
              currentUserData.password,
              currentUserData.role
            )
          : null
    }
  },

  getters: {
    isLoggedIn: state => {
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
        user =>
          user.getEmail() === email
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

      saveUsers(this.users)

      this.currentUser = newUser

      saveCurrentUser(newUser)

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

      saveCurrentUser(user)

      return true
    },

    logout(): void {
      this.currentUser = null

      localStorage.removeItem(
        'currentUser'
      )
    },

    updateName(name: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setName(name)

      saveUsers(this.users)
      saveCurrentUser(this.currentUser)
    },

    updatePassword(password: string): void {
      if (!this.currentUser) {
        return
      }

      this.currentUser.setPassword(
        password
      )

      saveUsers(this.users)
      saveCurrentUser(this.currentUser)
    }
  }
})