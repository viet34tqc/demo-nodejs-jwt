import { Button } from '@/core/components/ui/Button'
import Modal from '@/core/components/ui/Modal'
import { Spinner } from '@/core/components/ui/Spinner'
import { toastError } from '@/core/utils'
import React, { Dispatch } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePost } from '../../apis/deletePost'

type Props = { isOpen: boolean; setIsOpen: Dispatch<React.SetStateAction<boolean>> }

const DeletePostModal = ({ isOpen, setIsOpen }: Props) => {
  const { id } = useParams()
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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Delete post'>
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

export default DeletePostModal
