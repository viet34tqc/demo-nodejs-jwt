import { Button } from '@/core/components/ui/Button'
import Modal from '@/core/components/ui/Modal'
import { Spinner } from '@/core/components/ui/Spinner'
import { toastError } from '@/core/utils'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePost } from '../apis/deletePost'

const DeletePost = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const deletePostMutation = useDeletePost(id as string)
  const navigate = useNavigate()
  const handleDeletePost = () => {
    deletePostMutation.mutate(id as string, {
      onSuccess: () => {
        navigate('/posts', { state: { message: 'Delete post successfully' } })
      },
      onError: (error) => {
        toastError(error)
      },
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Delete post'
      triggerButton={
        <Button
          onClick={() =>
            deletePostMutation.mutate(id as string, {
              onSuccess: () => {
                toast('Delete post successfully')
              },
            })
          }
          className='bg-transparent !text-red-400 ml-auto'
        >
          {deletePostMutation.isLoading ? <Spinner size='sm' /> : <TrashIcon className='w-5 h-5' />}
        </Button>
      }
    >
      <>
        <p className='mb-4'>Are you sure you want to delete this post?</p>
        <div className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type='submit' className='gap-2' onClick={handleDeletePost}>
            Delete
            {deletePostMutation.isLoading && <Spinner size='sm' className='text-current' />}
          </Button>
        </div>
      </>
    </Modal>
  )
}

export default DeletePost
