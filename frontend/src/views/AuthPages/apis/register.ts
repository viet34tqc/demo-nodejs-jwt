import axiosInstance from '@/api/axiosInstance'
import { AuthUser, RegisterCredentialsDTO } from '@/views/AuthPages/types'

export const registerUser = (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  return axiosInstance.post('/auth/register', data)
}
