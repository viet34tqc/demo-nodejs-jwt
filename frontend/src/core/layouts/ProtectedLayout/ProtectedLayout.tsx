import AuthorizationUI from '@/core/components/ui/AuthorizationUI/AuthorizationUI'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import AddPost from '../../../views/Posts/components/AddPost'
import UserNavigation from './components/UserNavigation'

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen grid grid-rows-[auto,1fr]'>
      <header className='bg-slate-100 shadow-sm'>
        <div className='c-container flex justify-between items-center'>
          <strong>Logo</strong>
          <div className='flex items-center justify-end gap-4'>
            <Link to='/posts' className='hover:text-gray-400 transition-all'>
              Posts
            </Link>
            <AuthorizationUI allowedRoles={['ADMIN']}>
              <AddPost />
            </AuthorizationUI>
            <UserNavigation />
          </div>
        </div>
      </header>
      <div className='bg-gray-50 py-12 sm:px-6 lg:px-8'>
        <div className='max-w-[85ch] mx-auto px-4'>{children}</div>
      </div>
    </div>
  )
}

export default ProtectedLayout
