import axiosInstance from '@/api/axiosInstance'
import { authKey } from '@/core/context/AuthContext'
import { AuthUser } from '@/views/AuthPages/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function updatePost(data: Pick<AuthUser, 'name' | 'role'>) {
  return axiosInstance.put('posts/', data)
}

export function useupdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.setQueryData(authKey, (previous: any) => ({ ...previous, ...data.data }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries([authKey])
        queryClient.invalidateQueries(['posts']) // Update posts query because posts page displays author name.
      }
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData([authKey], context.previousDiscussions)
      }
    },
  })
}
