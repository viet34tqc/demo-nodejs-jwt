import axiosInstance from '@/api/axiosInstance'
import { LoginCredentialsDTO, UserResponse } from '@/views/AuthPages/types'

export const loginUser = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axiosInstance.post('/auth/login', data)
}
