import AuthorizationUI from '@/core/components/ui/AuthorizationUI/AuthorizationUI'
import { authorizedPolicies } from '@/core/components/ui/AuthorizationUI/policies'
import { Spinner } from '@/core/components/ui/Spinner'
import { useAuth } from '@/core/context/AuthContext'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import { useParams } from 'react-router-dom'
import { AuthUser } from '../AuthPages/types'
import { usePost } from './apis/getPost'
import CommentForm from './components/CommentForm'
import CommentList from './components/CommentList'
import DeletePost from './components/DeletePost'
import UpdatePost from './components/UpdatePost'

const SinglePost = () => {
  const { id } = useParams()
  const { user } = useAuth()
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
      <div className='max-w-none mb-8 pb-8 border-b border-gray-300'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-5xl font-extrabold'>{post.title}</h1>

          <div className='text-gray-300 flex'>
            <AuthorizationUI
              policyCheck={authorizedPolicies['post:delete'](user as AuthUser, post.authorId)}
            >
              <DeletePost />
              <UpdatePost post={post} />
            </AuthorizationUI>
          </div>
        </div>
        {post.content && (
          <div
            className='prose prose-slate md:prose-lg'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
      <CommentForm />
      <CommentList />
    </ProtectedLayout>
  )
}

export default SinglePost
