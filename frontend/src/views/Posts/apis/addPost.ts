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
      // Invalidate the first page
      queryClient.setQueryData(['posts', { page: 1 }], (previous: any) => ({
        ...previous,
        postsData: [...previous.postsData, data],
      }))
    },
    onSettled: (_, error) => {
      if (!error) {
        queryClient.invalidateQueries(['posts'])
      }
    },
  })
}
