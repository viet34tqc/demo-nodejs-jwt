import { Button } from '@/core/components/ui/Button'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import { Select } from '@/core/components/ui/FormFields/Select'
import Modal from '@/core/components/ui/Modal'
import { Spinner } from '@/core/components/ui/Spinner'
import { AuthUser } from '@/views/AuthPages/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useUpdateProfile } from '../apis/updateProfile'

const schema = z.object({
  name: z.string().min(1, 'This field is required'),
  role: z.enum(['ADMIN', 'SUBSCRIBER']),
})

type ProfileFormData = Pick<AuthUser, 'name' | 'role'>

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false)
  const updateProfileMutation = useUpdateProfile()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  })

  // Since we are using uncontrolled input, the input value is stay the same when we re-open form
  // So, we need to reset the value to empty.
  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        role: 'ADMIN',
      })
    }
  }, [isOpen, reset])

  const onSubmit = async (data: ProfileFormData) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false)
        toast('Update profile successfully')
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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Update Profile'
        triggerButton={<Button>Update profile</Button>}
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
          <FormControl>
            <Label>Name</Label>
            <Input {...register('name')} />
            <FieldError message={errors.name?.message} />
          </FormControl>

          <FormControl>
            <Label>Role</Label>
            <Select
              {...register('role')}
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'SUBSCRIBER', label: 'Subscriber' },
              ]}
            />
            <FieldError message={errors.role?.message} />
          </FormControl>

          <Button type='submit' className='gap-2'>
            Update
            {updateProfileMutation.isLoading && <Spinner size='sm' className='text-current' />}
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default AddPost
