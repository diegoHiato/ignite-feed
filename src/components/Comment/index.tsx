import { HandsClapping, Trash } from "phosphor-react"
import { useState } from "react"
import { Avatar } from "../Avatar"
import styles from './Comment.module.css'

interface CommentProps {
  content: string
  onDeleteComment: (commentToDelete: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState((Math.floor(Math.random() * 100)) + 1)

  function handleLikeComment() {
    setLikeCount(count => count + 1)
  }

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/dgeoi.png" />
      <div className={styles.container}>
        <div className={styles.content}>
          <header>
            <div>
              <strong>Diego Freitas</strong>
              <time
                title=''
                dateTime=''
              >
                há 1 segundo
              </time>
            </div>

            <button onClick={() => { handleDeleteComment() }} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <HandsClapping size={20} weight='bold' />
            Aplaudir
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}