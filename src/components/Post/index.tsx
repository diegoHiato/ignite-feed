import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import styles from './Post.module.css'

export interface PostType {
  id: number,
  author: {
    name: string,
    avatarUrl: string,
    role: string
  },
  content: {
    type: 'paragraph' | 'link',
    text: string
  }[],
  publishedAt: Date
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const [commentsFromThisPost, setCommentsFromThisPost] = useState<string[]>([])
  const [newCommentForThisPost, setNewCommentForThisPost] = useState<string>('')

  const isNewCommentTextareaEmpty = newCommentForThisPost.length === 0
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true })
  const publishedDateFormattedForHeaderTimeAttributeTitle = format(post.publishedAt, "d 'de' LLLL 'às' HH':'mm", { locale: ptBR })

  function handleNewCommentTextValue(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentForThisPost(event.target.value)
  }

  function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteCommentFromThisPost(commentToDelete: string) {
    //* Imutabilidade -> As variáves não sofrem mutação, nós criamos um novo valor (alocamos um novo espaço na memória).
    const newCommentListWithoutDeletedOne = commentsFromThisPost.filter(comment => comment !== commentToDelete)
    setCommentsFromThisPost(newCommentListWithoutDeletedOne)
  }

  function postNewComment(event: FormEvent) {
    event.preventDefault()
    setCommentsFromThisPost(previous => previous.concat([newCommentForThisPost]))
    setNewCommentForThisPost('')
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormattedForHeaderTimeAttributeTitle}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(item => {
          switch (item.type) {
            case 'link':
              return (
                <p key={item.text}>
                  <a href={item.text} target='_blank'>{item.text}</a>
                </p>
              )

            default:
              return <p key={item.text}>{item.text}</p>
          }
        })}
      </div>

      <form
        className={styles.leaveComment}
        onSubmit={(e) => { postNewComment(e) }}
      >
        <strong>Deixe seu comentário</strong>
        <textarea
          required
          value={newCommentForThisPost}
          placeholder='Deixe um comentário...'
          onChange={(e) => { handleNewCommentTextValue(e) }}
          onInvalid={handleInvalidNewComment}
        />
        <footer>
          <button type="submit" disabled={isNewCommentTextareaEmpty}>Publicar</button>
        </footer>
      </form>

      <div>
        {commentsFromThisPost.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteCommentFromThisPost}
            />
          )
        })}
      </div>
    </article>
  )
}