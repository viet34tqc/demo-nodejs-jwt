import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentDTO } from '../types'

export function deleteComment(id: string) {
  return axiosInstance.delete(`/comments/${id}`)
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', postId], (previous: any) => ({
        data: previous.data.filter((comment: CommentDTO) => comment.id !== data.data.id),
      }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['comments', postId])
      }
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData(['posts'], context.previousDiscussions)
      }
    },
  })
}
