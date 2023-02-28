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
      queryClient.setQueryData(authKey, (previous: any) => ({ ...previous, ...data.data }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries([authKey])
      }
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData([authKey], context.previousDiscussions)
      }
    },
  })
}
