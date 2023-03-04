import { Button } from '@/core/components/ui/Button'
import { Spinner } from '@/core/components/ui/Spinner'
import { toastError } from '@/core/utils'
import { TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useDeleteComment } from '../apis/deleteComment'

const DeleteComment = ({ id }: { id: string }) => {
  const { id: postId } = useParams()

  const deleteCommentMutation = useDeleteComment(postId as string)
  return (
    <Button
      onClick={() =>
        deleteCommentMutation.mutate(id, {
          onSuccess: () => {
            toast('Delete comment successfully')
          },
          onError: (error) => {
            toastError(error)
          },
        })
      }
      className='bg-transparent text-red-400 ml-auto'
    >
      {deleteCommentMutation.isLoading ? <Spinner size='sm' /> : <TrashIcon className='w-5 h-5' />}
    </Button>
  )
}

export default DeleteComment
