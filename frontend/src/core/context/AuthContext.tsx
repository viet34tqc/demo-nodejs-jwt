import axiosInstance from '@/api/axiosInstance'
import { AuthUser } from '@/views/AuthPages/types'

import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'

import { Spinner } from '../components/ui/Spinner'

export const getCurrentUser = (): Promise<AuthUser> => {
  return axiosInstance.get('/auth/me')
}

interface AuthContextValues {
  user: AuthUser | null | undefined
  error: unknown
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextValues | null>(null)
export const authKey = ['auth-user']

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [cookies] = useCookies(['loggedInCookie'])
  // This is much like setUser using setState,
  // but instead of saving the user in the state, we are saving it using useQuery with a key
  // This query runs every time the app is mounted to get the user data when we reload the page after login
  // Because the token is saved before (when you login or register), it can calls API to get that user.
  // This is kind of a workaround of session.
  const {
    data: user,
    error,
    status,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: authKey,
    queryFn: loadUser,
    staleTime: Infinity,
  })

  async function loadUser() {
    if (cookies.loggedInCookie) {
      return await getCurrentUser()
    }
    return null
  }

  const value = React.useMemo(
    () => ({
      user,
      error,
    }),
    [user, error],
  )

  if (isSuccess) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  if (isLoading) {
    return (
      <div className='w-screne h-screen grid place-items-center'>
        <Spinner size='xl' />
      </div>
    )
  }

  if (error) {
    return <div style={{ color: 'tomato' }}>{JSON.stringify(error, null, 2)}</div>
  }

  return <div className='h-screen w-screen grid place-items-center'>Unhandled status: {status}</div>
}

export default AuthContextProvider
export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextValues
  if (!context) {
    throw new Error('useAuth must be used within a useAuthProvider')
  }
  return context
}
