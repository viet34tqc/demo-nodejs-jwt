import axiosInstance from '@/api/axiosInstance'
import { RegisterCredentialsDTO, UserResponse } from '@/views/AuthPages/types'

export const registerUser = (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axiosInstance.post('/auth/register', data)
}
