import { AuthUser } from '@/views/AuthPages/types'

export const authorizedPolicies = {
  'comment:delete': (user: AuthUser, authorId: string) => {
    if (user.role === 'ADMIN') {
      return true
    }

    if (user.role === 'SUBSCRIBER' && authorId === user.id) {
      return true
    }

    return false
  },

  'post:delete': (user: AuthUser, authorId: string) => {
    if (authorId === user.id) {
      return true
    }

    return false
  },
}
