import { Spinner } from '@/core/components/ui/Spinner'
import { formatDate } from '@/core/utils'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { useGetComments } from '../apis/getComments'
import { CommentDTO } from '../types'

const CommentItem = ({ authorName, createdAt, content }: Omit<CommentDTO, 'id'>) => {
  return (
    <div className='flex gap-2 [&:not(:first-child)]:mt-4'>
      <UserCircleIcon className='w-10 h-10' />
      <div>
        <div className='flex text-gray-400'>
          {authorName} - {formatDate(createdAt, { dateStyle: 'short', timeStyle: 'short' })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
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

  if (!comments || comments?.data.length === 0)
    return <div className='mt-8'>There is no comment</div>
  return (
    <div className='mt-8'>
      {comments.data.map(({ id, ...props }: CommentDTO) => (
        <CommentItem {...props} key={id} />
      ))}
    </div>
  )
}

export default CommentList
