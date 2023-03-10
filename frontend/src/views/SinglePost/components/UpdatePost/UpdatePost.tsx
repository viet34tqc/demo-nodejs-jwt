import { Button } from '@/core/components/ui/Button'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import loadable from '@loadable/component'
import { useState } from 'react'
const UpdatePostModal = loadable(() => import('./UpdatePostModal'))

const UpdatePost = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        title='Update post'
        onClick={() => setIsOpen(true)}
        className='bg-transparent !text-red-400 ml-auto'
      >
        <PencilSquareIcon className='w-5 h-5' />
      </Button>
      {isOpen && <UpdatePostModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default UpdatePost
