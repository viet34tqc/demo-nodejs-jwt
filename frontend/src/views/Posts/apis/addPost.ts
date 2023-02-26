import axiosInstance from '@/api/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPostDTO } from '../types'

export function addPost(data: AddPostDTO) {
  return axiosInstance.post('posts', data)
}

export function useAddPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts'], (previous: any) => ({
        data: [...previous.data, data.data],
      }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['posts'])
      }
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData(['posts'], context.previousDiscussions)
      }
    },
  })
}
