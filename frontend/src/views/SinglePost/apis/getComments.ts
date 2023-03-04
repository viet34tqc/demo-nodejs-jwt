import axiosInstance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { CommentDTO } from '../types'

export function getComments(postId: string): Promise<CommentDTO[]> {
  return axiosInstance.get('comments', {
    params: {
      postId,
    },
  })
}

export function useGetComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  })
}
