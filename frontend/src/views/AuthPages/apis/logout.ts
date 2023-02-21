import axiosInstance from '@/api/axiosInstance'

export const logoutUser = () => {
  return axiosInstance.get('/auth/logout')
}
