import { Spinner } from '@/core/components/ui/Spinner'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { useParams } from 'react-router-dom'
import { usePost } from './apis/getPost'
import CommentForm from './components/CommentForm'
import CommentList from './components/CommentList'

const SinglePost = () => {
  const { id } = useParams()
  const { data: post, isLoading } = usePost(id as string)

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className='grid place-items-center'>
          <Spinner size='lg' />
        </div>
      </ProtectedLayout>
    )
  }

  if (!post) return null

  return (
    <ProtectedLayout>
      <div className='prose prose-slate max-w-none md:prose-lg mb-8 pb-8 border-b border-gray-300'>
        <h1>{post.data.title}</h1>
        {post.data.content && <div dangerouslySetInnerHTML={{ __html: post.data.content }} />}
      </div>
      <CommentForm />
      <CommentList />
    </ProtectedLayout>
  )
}

export default SinglePost
