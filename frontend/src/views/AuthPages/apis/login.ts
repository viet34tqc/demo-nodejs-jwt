import axiosInstance from '@/api/axiosInstance'
import { AuthUser, LoginCredentialsDTO } from '@/views/AuthPages/types'

export const loginUser = (data: LoginCredentialsDTO): Promise<AuthUser> => {
  return axiosInstance.post('/auth/login', data)
}
