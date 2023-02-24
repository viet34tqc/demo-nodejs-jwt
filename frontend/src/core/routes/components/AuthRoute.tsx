import { useAuth } from '@/core/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoute = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to='/posts' replace />
  }
  return <Outlet />
}

export default AuthRoute
