import { Button } from '@/core/components/ui/Button'
import loadable from '@loadable/component'
import { useReducer } from 'react'
const CreateCommentModal = loadable(() => import('./CreateCommentModal'))

const CommentForm = () => {
  const [isFormOpen, toggleForm] = useReducer((state) => !state, false)

  return (
    <>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold'>Comments</h3>
        <Button onClick={toggleForm}>Create comment</Button>
      </div>

      {isFormOpen && <CreateCommentModal isFormOpen={isFormOpen} toggleForm={toggleForm} />}
    </>
  )
}

export default CommentForm
