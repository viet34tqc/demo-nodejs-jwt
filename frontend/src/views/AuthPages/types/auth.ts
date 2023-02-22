export type AuthUser = {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
}

export type UserResponse = {
  status: boolean
  data: AuthUser
}

export type RegisterCredentialsDTO = {
  email: string
  password: string
  name: string
  role: 'ADMIN' | 'USER'
}

export type LoginCredentialsDTO = {
  email: string
  password: string
}
