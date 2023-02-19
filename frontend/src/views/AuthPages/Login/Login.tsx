import { Button } from '@/core/components/ui/Button';
import { FormControl } from '@/core/components/ui/FormFields/FormControl';
import { Input } from '@/core/components/ui/FormFields/Input';
import { Label } from '@/core/components/ui/FormFields/Label';
import { useAuth } from '@/core/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthLayout } from '../AuthLayout';

export interface LoginValues {
	email: string;
	password: string;
}

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const Login = () => {
	const navigate = useNavigate();
	const { loginMutation, isLoggingIn } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: LoginValues) => {
		loginMutation.mutate(data, {
			onSuccess: () => {
				navigate('/dashboard');
			},
			onError: (error: any) => {
				console.log(error.response.message);
			},
		});
	};

	return (
		<AuthLayout title="Login to your account">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 child:text-[14px]"
			>
				<FormControl>
					<Label>Email</Label>
					<Input type="email" {...register('email')} />
				</FormControl>
				<FormControl>
					<Label>Password</Label>
					<Input type="password" {...register('password')} />
				</FormControl>

				<Button type="submit" className="w-full">
					{isLoggingIn ? 'Loading' : 'Login'}
				</Button>
			</form>

			<div className="flex justify-end mt-4">
				<Link
					to="../register"
					className="font-medium text-sm text-blue-600 hover:text-blue-500"
				>
					Register
				</Link>
			</div>
		</AuthLayout>
	);
};

export default Login;
