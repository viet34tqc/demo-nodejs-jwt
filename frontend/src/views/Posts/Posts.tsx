import { Spinner } from '@/core/components/ui/Spinner'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { usePosts } from './apis/getPosts'
import PostItem from './components/PostItem'
import { Post } from './types'

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

  if (!posts || posts?.data.length === 0)
    return <ProtectedLayout>There is no posts</ProtectedLayout>

  return (
    <ProtectedLayout>
      {posts.data.map(({ id, title, content }: Post) => (
        <PostItem title={title} content={content} key={id} />
      ))}
    </ProtectedLayout>
  )
}

export default Posts
