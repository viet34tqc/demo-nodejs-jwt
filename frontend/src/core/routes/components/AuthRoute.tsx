import { useAuth } from '@/core/context/AuthContext'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthRoute = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/posts')
    }
  }, [user, navigate])
  return <Outlet />
}

export default AuthRoute
