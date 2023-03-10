import axiosInstance from '@/api/axiosInstance'
import { authKey } from '@/core/context/AuthContext'
import { AuthUser, LoginCredentialsDTO } from '@/views/AuthPages/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const loginUser = (data: LoginCredentialsDTO): Promise<AuthUser> => {
  return axiosInstance.post('/auth/login', data)
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(authKey, user)
    },
  })
}
