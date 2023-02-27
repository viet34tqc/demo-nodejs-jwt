export type Post = {
  id: string
  title: string
  content: string
  authorName: string
  createdAt: string
}

export type AddPostDTO = {
  title: string
  content: string
}
