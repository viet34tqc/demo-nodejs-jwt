import axiosInstance from '@/api/axiosInstance'
import { PostDTO } from '@/views/Posts/types'
import { useQuery } from '@tanstack/react-query'

export function getPost(id: string): Promise<PostDTO> {
  return axiosInstance.get(`posts/${id}`)
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
  })
}
