import { Button } from '@/core/components/ui/Button'
import { TrashIcon } from '@heroicons/react/24/outline'
import loadable from '@loadable/component'
import { useState } from 'react'
const DeletePostModal = loadable(() => import('./DeletePostModal'))

const DeletePost = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        title='Delete post'
        onClick={() => setIsOpen(true)}
        className='bg-transparent !text-red-400 ml-auto'
      >
        <TrashIcon className='w-5 h-5' />
      </Button>
      {isOpen && <DeletePostModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default DeletePost
