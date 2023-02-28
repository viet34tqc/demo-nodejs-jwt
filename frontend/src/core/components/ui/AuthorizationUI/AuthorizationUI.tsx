import { useAuth } from '@/core/context/AuthContext'
import { UserRole } from '@/views/AuthPages/types'
import { PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{
  fallbackChildren?: ReactNode
  allowedRoles?: UserRole[]
  policyCheck?: boolean
}>

const AuthorizationUI = ({ children, fallbackChildren, allowedRoles, policyCheck }: Props) => {
  const { user } = useAuth()

  if (!user) {
    throw Error('User does not exist!')
  }

  let canAccess = false

  if (allowedRoles && allowedRoles.length > 0) {
    canAccess = allowedRoles?.includes(user.role)
  }

  if (typeof policyCheck !== undefined) {
    canAccess = policyCheck
  }

  return <>{canAccess ? children : fallbackChildren}</>
}

export default AuthorizationUI
