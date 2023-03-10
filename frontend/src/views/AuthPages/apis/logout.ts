import axiosInstance from '@/api/axiosInstance'
import { authKey } from '@/core/context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

export const logoutUser = () => {
  return axiosInstance.get('/auth/logout')
}

export function useLogout() {
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['loggedInCookie'])

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // We also need to remove cookie on client, otherwise client will call /me API without refreshToken => create infinite loop
      removeCookie('loggedInCookie')
      queryClient.setQueryData(authKey, null as never)
      queryClient.clear()
    },
  })
}
