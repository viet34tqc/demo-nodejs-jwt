import axiosInstance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { PostDTO } from '../types'

export function getPosts(): Promise<PostDTO[]> {
  return axiosInstance.get('posts')
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}
