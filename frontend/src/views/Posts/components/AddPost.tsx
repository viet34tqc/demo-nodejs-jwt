import axiosInstance from '@/api/axiosInstance'
import { Button } from '@/core/components/ui/Button'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import Modal from '@/core/components/ui/Modal'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type PostFormData = {
  title: string
  content: string
}

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>()

  const onSubmit = async (data: PostFormData) => {
    console.log('data', data)
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

          <Button type='submit' className='flex-grow-0'>
            Create Post
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default AddPost
