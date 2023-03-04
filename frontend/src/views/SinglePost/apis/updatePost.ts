import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function updatePost(data: { id: string; content?: string; title: string }) {
  return axiosInstance.put('posts', data)
}

export function useUpdatePost(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', id], (previous: any) => ({ ...previous, ...data }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['posts']) // Update posts query because posts page displays author name.
        queryClient.invalidateQueries(['posts', id]) // Update posts query because posts page displays author name.
      }
    },
  })
}
