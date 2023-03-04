import AuthorizationUI from '@/core/components/ui/AuthorizationUI/AuthorizationUI'
import { authorizedPolicies } from '@/core/components/ui/AuthorizationUI/policies'
import { Spinner } from '@/core/components/ui/Spinner'
import { useAuth } from '@/core/context/AuthContext'
import { formatDate } from '@/core/utils'
import { AuthUser } from '@/views/AuthPages/types'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { useGetComments } from '../apis/getComments'
import { CommentDTO } from '../types'
import DeleteComment from './DeleteComment'

const CommentItem = ({ id, authorName, createdAt, content, authorId }: CommentDTO) => {
  const { user } = useAuth()
  return (
    <div className='flex gap-2 [&:not(:first-child)]:mt-4 items-center'>
      <UserCircleIcon className='w-10 h-10' />
      <div>
        <div className='flex text-gray-400'>
          {authorName} - {formatDate(createdAt, { dateStyle: 'short', timeStyle: 'short' })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <AuthorizationUI
        policyCheck={authorizedPolicies['comment:delete'](user as AuthUser, authorId)}
      >
        <DeleteComment id={id} />
      </AuthorizationUI>
    </div>
  )
}

const CommentList = () => {
  const { id: postId } = useParams()
  const { data: comments, isLoading } = useGetComments(postId as string)

  if (isLoading) {
    return (
      <div className='grid place-items-center'>
        <Spinner size='sm' />
      </div>
    )
  }

  if (!comments || comments.length === 0)
    return <div className='mt-8'>There is no comment</div>
  return (
    <div className='mt-8'>
      {comments.map((props: CommentDTO) => (
        <CommentItem {...props} key={props.id} />
      ))}
    </div>
  )
}

export default CommentList
