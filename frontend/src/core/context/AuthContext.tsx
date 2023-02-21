import axiosInstance from '@/api/axiosInstance'
import { loginUser, logoutUser, registerUser } from '@/views/AuthPages/apis'
import { AuthUser, LoginCredentialsDTO, RegisterCredentialsDTO } from '@/views/AuthPages/types/auth'

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'

import { Spinner } from '../components/ui/Spinner'

export const getCurrentUser = (): Promise<AuthUser> => {
  return axiosInstance.get('/auth/me')
}

interface AuthContextValues {
  user: AuthUser | null | undefined
  loginMutation: UseMutationResult<AuthUser, any, LoginCredentialsDTO>
  logoutMutation: UseMutationResult<any, any, void, any>
  registerMutation: UseMutationResult<AuthUser, any, RegisterCredentialsDTO>
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRegistering: boolean
  refetchUser: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<AuthUser | null, unknown>>
  error: unknown
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextValues | null>(null)
const queryKey = ['auth-user']

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient() // returns the current QueryClient instance created in AppProvider.
  const [cookies] = useCookies(['loggedIn'])
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
    refetch,
  } = useQuery({
    queryKey,
    queryFn: loadUser,
    staleTime: Infinity,
  })

  async function loadUser() {
    if (cookies.loggedIn) {
      const data = await getCurrentUser()
      return data
    }
    return null
  }

  const setUser = React.useCallback(
    (data: AuthUser) => queryClient.setQueryData(queryKey, data),
    [queryClient],
  )

  async function loginFn(data: LoginCredentialsDTO) {
    const response = await loginUser(data)
    return response.user
  }

  async function registerFn(data: RegisterCredentialsDTO) {
    const response = await registerUser(data)
    return response.user
  }

  async function logoutFn() {
    const response = await logoutUser()
    return response.message
  }

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (user) => {
      setUser(user)
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (user) => {
      setUser(user)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      setUser(null as never)
      queryClient.clear()
    },
  })

  const value = React.useMemo(
    () => ({
      user,
      error,
      refetchUser: refetch,
      loginMutation,
      isLoggingIn: loginMutation.isLoading,
      logoutMutation,
      isLoggingOut: logoutMutation.isLoading,
      registerMutation,
      isRegistering: registerMutation.isLoading,
    }),
    [user, error, refetch, loginMutation, logoutMutation, registerMutation],
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
