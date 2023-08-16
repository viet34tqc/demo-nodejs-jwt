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
    onSuccess: () => {
      queryClient.invalidateQueries(authKey)
      // Update posts query because posts page displays author name.
      // Otherwise, you need to wait for staleTime to pass to get the newest author name
      queryClient.invalidateQueries(['posts'])
    }
  })
}
