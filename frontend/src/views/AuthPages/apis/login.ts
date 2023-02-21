import axiosInstance from '@/api/axiosInstance'
import { LoginCredentialsDTO, UserResponse } from '@/types/auth'

export const loginUser = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axiosInstance.post('/auth/login', data)
}
