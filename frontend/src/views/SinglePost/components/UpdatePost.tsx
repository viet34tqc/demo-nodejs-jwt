import { Button } from '@/core/components/ui/Button'
import Editor from '@/core/components/ui/Editor'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import Modal from '@/core/components/ui/Modal'
import { Spinner } from '@/core/components/ui/Spinner'
import { toastError } from '@/core/utils'
import { PostDTO } from '@/views/Posts/types'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useUpdatePost } from '../apis/updatePost'

type UpdatePostForm = {
  title: string
  content?: string
}

const schema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

const UpdatePost = ({ post }: { post: PostDTO }) => {
  const { id } = useParams()
  if (!id) return null
  const [isOpen, setIsOpen] = useState(false)
  const updatePostMutation = useUpdatePost(id)
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  })

  // Since we are using uncontrolled input, the input value is stay the same when we re-open form
  // So, we need to reset the value to empty.
  useEffect(() => {
    if (isOpen) {
      reset({
        title: post.title,
        content: post.content,
      })
    }
  }, [isOpen, reset, post])

  const onSubmit = async (data: UpdatePostForm) => {
    updatePostMutation.mutate(
      { ...data, id },
      {
        onSuccess: () => {
          setIsOpen(false)
          toast('Update post successfully')
        },
        onError: (error: unknown) => {
          toastError(error)
        },
      },
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Update post'
      triggerButton={
        <Button
          title='Update post'
          onClick={() => setIsOpen(true)}
          className='bg-transparent !text-red-400 ml-auto'
        >
          {updatePostMutation.isLoading ? (
            <Spinner size='sm' />
          ) : (
            <PencilSquareIcon className='w-5 h-5' />
          )}
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
        <FormControl>
          <Label>Name</Label>
          <Input {...register('title')} />
          <FieldError message={errors.title?.message} />
        </FormControl>

        <FormControl className='!flex flex-col'>
          <Label>Content</Label>
          <Controller
            control={control}
            name='content'
            render={({ field }) => <Editor {...field} />}
          />
          <FieldError message={errors.content?.message} />
        </FormControl>

        <Button type='submit' className='gap-2'>
          Update
          {updatePostMutation.isLoading && <Spinner size='sm' className='text-current' />}
        </Button>
      </form>
    </Modal>
  )
}

export default UpdatePost
