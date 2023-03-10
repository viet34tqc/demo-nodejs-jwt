import axiosInstance from '@/api/axiosInstance'
import { authKey } from '@/core/context/AuthContext'
import { AuthUser, RegisterCredentialsDTO } from '@/views/AuthPages/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const registerUser = (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  return axiosInstance.post('/auth/register', data)
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      queryClient.setQueryData(authKey, user)
    },
  })
}
