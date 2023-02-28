export type AddCommentDTO = {
  content: string
  postId: string
}

export type CommentDTO = {
  id: string
  content: string
  createdAt: string
  authorName: string
  authorId: string
}
