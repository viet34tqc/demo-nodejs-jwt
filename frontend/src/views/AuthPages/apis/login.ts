import axiosInstance from '@/api/axiosInstance'
import { LoginCredentialsDTO, UserResponse } from '@/views/AuthPages/types/auth'

export const loginUser = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axiosInstance.post('/auth/login', data)
}
