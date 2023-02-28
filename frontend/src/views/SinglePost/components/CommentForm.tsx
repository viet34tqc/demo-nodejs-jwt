import { Button } from '@/core/components/ui/Button'
import Editor from '@/core/components/ui/Editor'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Spinner } from '@/core/components/ui/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useReducer } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateComment } from '../apis/addComment'

const schema = z.object({
  content: z.string({
    required_error: 'This field is required',
  }),
})

type AddCommentForm = {
  content: string
}

const CommentForm = () => {
  const { id: postId } = useParams()
  const [isFormOpen, toggleForm] = useReducer((state) => !state, false)
  const addCommentMutation = useCreateComment(postId as string)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: AddCommentForm) => {
    if (!postId) return
    const nextData = { ...data, postId }
    addCommentMutation.mutate(nextData, {
      onSuccess: () => {
        toggleForm()
        toast('Create comment successfully')
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          toast(error?.response?.data.message)
        }
      },
    })
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold'>Comments</h3>
        <Button onClick={toggleForm}>Create comment</Button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col mt-4'>
          <FormControl className='!flex flex-col'>
            <Controller
              control={control}
              name='content'
              render={({ field }) => <Editor {...field} />}
            />
            <FieldError message={errors.content?.message} />
          </FormControl>

          <Button type='submit' className='gap-2'>
            Add comment
            {addCommentMutation.isLoading && <Spinner size='sm' className='text-current' />}
          </Button>
        </form>
      )}
    </>
  )
}

export default CommentForm
