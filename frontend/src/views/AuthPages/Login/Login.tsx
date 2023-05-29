import { Button } from '@/core/components/ui/Button'
import { FieldError } from '@/core/components/ui/FormFields/FieldError'
import { FormControl } from '@/core/components/ui/FormFields/FormControl'
import { Input } from '@/core/components/ui/FormFields/Input'
import { Label } from '@/core/components/ui/FormFields/Label'
import { Spinner } from '@/core/components/ui/Spinner'
import AuthLayout from '@/core/layouts/AuthLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from '../apis/login'
import { LoginCredentialsDTO } from '../types'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
})

const Login = () => {
  const navigate = useNavigate()
  const { mutate, isLoading: isLoggingIn } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentialsDTO>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginCredentialsDTO) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/posts')
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast(error?.response?.data.message || 'Network Error')
        }
      },
    })
  }

  return (
    <AuthLayout title='Login to your account'>
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

        <Button type='submit' className='w-full gap-2' disabled={isLoggingIn}>
          Login
          {isLoggingIn && <Spinner size='sm' className='text-current' />}
        </Button>
      </form>

      <div className='flex justify-end mt-4'>
        <Link to='../register' className='font-medium text-sm text-blue-600 hover:text-blue-500'>
          Register
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Login
