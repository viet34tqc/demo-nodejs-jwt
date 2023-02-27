import { formatDate } from '@/core/utils'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'
import { Post } from '../types'

const PostItem = ({ title, content, authorName, createdAt }: Partial<Post>) => {
  return (
    <div className='prose md:prose-lg prose-h2:mb-1 prose-slate max-w-none border-b pb-5 border-gray-200'>
      <h2>{title}</h2>
      <div className='flex gap-4 mb-4 text-gray-500 text-[1rem]'>
        <span className='flex gap-1 items-center'>
          <UserIcon className='w-4 h-4' />
          {authorName}
        </span>
        <span className='flex gap-1 items-center'>
          <CalendarIcon className='w-4 h-4' />
          {createdAt && formatDate(createdAt)}
        </span>
      </div>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  )
}

export default PostItem
