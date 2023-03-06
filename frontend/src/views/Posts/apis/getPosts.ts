import axiosInstance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { PostDTO, PostsParams } from '../types'

export function getPosts(
  params: PostsParams,
): Promise<{ postsData: PostDTO[]; totalCount: number }> {
  return axiosInstance.get('posts', { params })
}

export function usePosts(params: PostsParams) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  })
}
