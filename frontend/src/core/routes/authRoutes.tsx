import loadable from '@loadable/component';
import { Navigate } from 'react-router-dom';
const AuthRoute = loadable(() => import('./components/AuthRoute'));
const Login = loadable(() => import('@/views/AuthPages/Login'));
const Register = loadable(() => import('@/views/AuthPages/Register'));

export const authRoutes = [
	{
		element: <AuthRoute />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: '/', element: <Navigate to="/login" /> },
		],
	},
];
