import axiosInstance from '@/api/axiosInstance'
import { authKey } from '@/core/context/AuthContext'
import { AuthUser } from '@/views/AuthPages/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function updateProfile(data: Pick<AuthUser, 'name' | 'role'>) {
  return axiosInstance.put('auth/updateProfile', data)
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(authKey, (previous: any) => ({ ...previous, ...data }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries([authKey])
        queryClient.invalidateQueries(['posts']) // Update posts query because posts page displays author name.
      }
    },
  })
}
