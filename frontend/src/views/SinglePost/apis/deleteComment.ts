import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentDTO } from '../types'

export function deleteComment(id: string): Promise<CommentDTO> {
  return axiosInstance.delete(`/comments/${id}`)
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', postId], (previous: any) =>
        previous.filter((comment: CommentDTO) => comment.id !== data.id),
      )
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['comments', postId])
      }
    },
  })
}
