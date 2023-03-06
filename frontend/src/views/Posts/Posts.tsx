import Pagination from '@/core/components/ui/Pagination'
import { Spinner } from '@/core/components/ui/Spinner'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { useEffect, useLayoutEffect } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useSearchParams } from 'react-router-dom'
import { usePosts } from './apis/getPosts'
import PostItem from './components/PostItem'
import { PostDTO } from './types'

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = { page: searchParams.get('page') ? Number(searchParams.get('page')) : 1 }
  const { data, isLoading } = usePosts(params)
  const location = useLocation()

  // Scroll to top when page change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [params.page])

  useEffect(() => {
    if (location?.state?.message) {
      toast(location.state.message)
      window.history.replaceState({}, '')
    }
  }, [location])

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className='grid place-items-center'>
          <Spinner size='lg' />
        </div>
      </ProtectedLayout>
    )
  }

  if (!data?.postsData || data.postsData?.length === 0)
    return <ProtectedLayout>There is no posts</ProtectedLayout>

  return (
    <ProtectedLayout>
      <div className='space-y-6 '>
        {data?.postsData.map((props: PostDTO) => (
          <PostItem {...props} key={props.id} />
        ))}
        <Pagination
          currentPage={+params.page}
          pageSize={3}
          onPageChange={(page: number) => setSearchParams({ page: page.toString() })}
          totalCount={data.totalCount}
        />
      </div>
    </ProtectedLayout>
  )
}

export default Posts
