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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from '../apis/login'
import { LoginCredentialsDTO } from '../types'
import { getGoogleUrl } from './utils'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
})

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = ((location.state as any)?.from.pathname as string) || '/posts'
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
      <div className='text-center my-2'>Or</div>
      <Button variant='secondary' type='submit' className='w-full gap-2' disabled={isLoggingIn}>
        <a href={getGoogleUrl(from)} className='flex gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon'
            viewBox='0 0 1024 1024'
            width='24px'
            height='24px'
          >
            <path
              xmlns='http://www.w3.org/2000/svg'
              d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z'
            ></path>
          </svg>
          Login with Google
        </a>
      </Button>

      <div className='flex items-center justify-end mt-4 text-sm'>
        Don&apos;t have an account? &nbsp;
        <Link to='../register' className='font-medium text-blue-600 hover:text-blue-500'>
          Sign up!
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Login
