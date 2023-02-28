import { AuthUser } from '@/views/AuthPages/types'

export const formatDate = (timestamp: number | string, options = {}) => {
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(timestamp))
}
