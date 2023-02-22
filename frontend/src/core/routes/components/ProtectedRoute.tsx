import { useAuth } from '@/core/context/AuthContext'
import { PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// This is one kind of authorization route authorization
// We implement UI authorization in AuthorizationUI component
const ProtectedRoute = ({
  isRoleAllowed = [],
  redirectPath = '/login',
  children,
}: PropsWithChildren<{ isRoleAllowed?: string[]; redirectPath?: string }>) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to='/login' replace />
  }

  // In case user.roles is array
  //if (isRoleAllowed.length > 0 && isRoleAllowed.some( role => user.roles.includes(role)))
  if (isRoleAllowed.length > 0 && !isRoleAllowed.includes(user.role)) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? <>{children}</> : <Outlet /> // Need to add React.Fragment because children itself returns string
}

export default ProtectedRoute
