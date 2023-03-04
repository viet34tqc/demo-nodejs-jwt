import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const formatDate = (timestamp: number | string, options = {}) => {
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(timestamp))
}

export const toastError = (error: unknown) => {
  if (error instanceof AxiosError && error?.response?.data?.message) {
    toast(error?.response?.data?.message)
  } else if (error instanceof Error) {
    toast(error.message)
  } else {
    toast('Network error')
  }
}
