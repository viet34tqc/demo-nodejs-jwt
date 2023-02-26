import { Post } from '../types'

const PostItem = ({ title, content }: Partial<Post>) => {
  return (
    <div className='prose prose-slate border-b pb-5 border-gray-200'>
      <h2>{title}</h2>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  )
}

export default PostItem
