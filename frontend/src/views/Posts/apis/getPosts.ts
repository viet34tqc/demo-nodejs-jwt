import axiosInstance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export function getPosts() {
  return axiosInstance.get('posts')
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}
