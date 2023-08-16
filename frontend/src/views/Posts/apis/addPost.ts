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
    onSuccess: () => {
      // Invalidate the first page
      queryClient.invalidateQueries(['posts', { page: 1 }])
    }
  })
}
