import axiosInstance from '@/api/axiosInstance'
import { RegisterCredentialsDTO, UserResponse } from '@/types/auth'

export const registerUser = (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axiosInstance.post('/auth/register', data)
}
