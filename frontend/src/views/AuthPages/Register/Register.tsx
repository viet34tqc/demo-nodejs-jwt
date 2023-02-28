import { Button } from '@/core/components/ui/Button'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import { Select } from '@/core/components/ui/FormFields/Select'
import { Spinner } from '@/core/components/ui/Spinner'
import { useAuth } from '@/core/context/AuthContext'
import AuthLayout from '@/core/layouts/AuthLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { RegisterCredentialsDTO } from '../types'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  role: z.enum(['ADMIN', 'SUBSCRIBER']),
})

const Register = () => {
  const navigate = useNavigate()
  const { registerMutation, isRegistering } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentialsDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'ADMIN',
    },
  })

  const onSubmit = async (data: RegisterCredentialsDTO) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard')
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast(error?.response?.data.message)
        }
      },
    })
  }

  return (
    <AuthLayout title='Register new account'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 child:text-[14px]'>
        <FormControl>
          <Label>Email</Label>
          <Input type='email' {...register('email')} />
          <FieldError message={errors.email?.message} />
        </FormControl>
        <FormControl>
          <Label>Password</Label>
          <Input type='password' {...register('password')} />
          <FieldError message={errors.password?.message} />
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

        <Button type='submit' className='w-full gap-2' disabled={isRegistering}>
          Login
          {isRegistering && <Spinner size='sm' className='text-current' />}
        </Button>
      </form>

      <div className='flex justify-end mt-4'>
        <Link to='/login' className='font-medium text-sm text-blue-600 hover:text-blue-500'>
          Login
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Register
