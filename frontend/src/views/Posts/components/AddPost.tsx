import { Button } from '@/core/components/ui/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import loadable from '@loadable/component'
import { useState } from 'react'
const AddPostModal = loadable(() => import('./AddPostModal'))

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant='secondary' className='gap-1' onClick={() => setIsOpen(true)}>
        <PlusCircleIcon className='h-5 w-5' />
        Add post
      </Button>
      {isOpen && <AddPostModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default AddPost
