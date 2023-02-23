import { Spinner } from '@/core/components/ui/Spinner'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { usePosts } from './apis/getPosts'

const Posts = () => {
  const { data: posts, isLoading } = usePosts()
  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className='grid place-items-center'>
          <Spinner size='lg' />
        </div>
      </ProtectedLayout>
    )
  }

  if (!posts) return <ProtectedLayout>There is no posts</ProtectedLayout>

  return <ProtectedLayout>Posts</ProtectedLayout>
}

export default Posts
