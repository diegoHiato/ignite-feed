export type User = {
  name: string
  role: string
  avatarUrl: string
  backgroundImageUrl: string
}

export type Post = {
  id: number
  author: {
    avatarUrl: string
    name: string
    role: string
  },
  content: {
    type: 'paragraph' | 'link'
    content: string
  }[],
  publishedAt: Date
}