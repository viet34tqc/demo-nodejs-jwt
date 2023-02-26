import { Post } from '../types'

const PostItem = ({ title, content }: Partial<Post>) => {
  return (
    <div>
      <h2>{title}</h2>
      <>{content}</>
    </div>
  )
}

export default PostItem
