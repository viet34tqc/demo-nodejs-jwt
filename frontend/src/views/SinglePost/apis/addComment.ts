import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddCommentDTO } from '../types'

export function addComment(data: AddCommentDTO) {
  return axiosInstance.post('/comments', data)
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', postId], (previous: any) => [...previous, data])
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['comments', postId])
      }
    },
  })
}
