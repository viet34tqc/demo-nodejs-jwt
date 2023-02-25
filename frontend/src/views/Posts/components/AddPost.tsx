import axiosInstance from '@/api/axiosInstance'
import { Button } from '@/core/components/ui/Button'
import Editor from '@/core/components/ui/Editor'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import Modal from '@/core/components/ui/Modal'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type PostFormData = {
  title: string
  content: string
}

const schema = z.object({
  title: z.string().min(1, 'This field is required'),
  content: z.string().min(1, 'This field is required'),
})

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema),
  })

  // Since we are using uncontrolled input, the input value is stay the same when we re-open form
  // So, we need to reset the value to empty.
  useEffect(() => {
    if (isOpen) {
      reset({
        title: '',
        content: '',
      })
    }
  }, [isOpen, reset])

  const onSubmit = async (data: PostFormData) => {
    await axiosInstance.post('posts', { data })
    setIsOpen(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Create Post'
        triggerButton={
          <Button variant='secondary' className='gap-1'>
            <PlusCircleIcon className='h-5 w-5' />
            Add post
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <FormControl>
            <Label>Title</Label>
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

          <Button type='submit' className='flex-grow-0'>
            Create Post
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default AddPost
