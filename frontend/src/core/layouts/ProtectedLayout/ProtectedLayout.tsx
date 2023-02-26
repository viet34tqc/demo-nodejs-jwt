import { PropsWithChildren } from 'react'
import AddPost from '../../../views/Posts/components/AddPost'
import UserNavigation from './components/UserNavigation'

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen grid grid-rows-[auto,1fr]'>
      <header className='bg-slate-100 shadow-sm'>
        <div className='c-container flex justify-between items-center'>
          <strong>Logo</strong>
          <div className='flex items-center justify-end gap-4'>
            <AddPost />
            <UserNavigation />
          </div>
        </div>
      </header>
      <div className='bg-gray-50 py-12 sm:px-6 lg:px-8'>
        <div className='w-[800px] max-w-full mx-auto px-4'>{children}</div>
      </div>
    </div>
  )
}

export default ProtectedLayout
