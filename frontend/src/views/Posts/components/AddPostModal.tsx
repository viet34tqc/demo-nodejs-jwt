import { Button } from '@/core/components/ui/Button'
import Editor from '@/core/components/ui/Editor'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import Modal from '@/core/components/ui/Modal'
import { Spinner } from '@/core/components/ui/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Dispatch, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAddPost } from '../apis/addPost'
import { AddPostDTO } from '../types'

type Props = { isOpen: boolean; setIsOpen: Dispatch<React.SetStateAction<boolean>> }

const schema = z.object({
  title: z.string().min(1, 'This field is required'),
  content: z.string().min(1, 'This field is required'),
})

const AddPostModal = ({ isOpen, setIsOpen }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const addPostMutation = useAddPost()
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPostDTO>({
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

  const onSubmit = async (data: AddPostDTO) => {
    addPostMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false)
        if (!matchRoutes([{ path: '/posts' }], location)) {
          navigate('/posts')
        }
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          toast(error?.response?.data.message)
        }
      },
    })
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Create Post'>
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

        <Button type='submit' className='gap-2'>
          Create Post
          {addPostMutation.isLoading && <Spinner size='sm' className='text-current' />}
        </Button>
      </form>
    </Modal>
  )
}

export default AddPostModal
