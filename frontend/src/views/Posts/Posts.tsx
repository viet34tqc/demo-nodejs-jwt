import { Spinner } from '@/core/components/ui/Spinner'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { usePosts } from './apis/getPosts'
import PostItem from './components/PostItem'
import { PostDTO } from './types'

const Posts = () => {
  const { data: posts, isLoading } = usePosts()
  const location = useLocation()

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

  if (!posts || posts?.length === 0)
    return <ProtectedLayout>There is no posts</ProtectedLayout>

  return (
    <ProtectedLayout>
      <div className='space-y-6 '>
        {posts.map((props: PostDTO) => (
          <PostItem {...props} key={props.id} />
        ))}
      </div>
    </ProtectedLayout>
  )
}

export default Posts
