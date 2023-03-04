import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function deletePost(id: string) {
  return axiosInstance.delete(`/posts/${id}`)
}

export function useDeletePost(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['posts', postId], exact: true })
      queryClient.removeQueries({ queryKey: ['comments', postId], exact: true })
      queryClient.invalidateQueries(['posts'])
    },
  })
}
