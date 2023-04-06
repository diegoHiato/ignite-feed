import styles from './App.module.css'
import { Header } from './components/Header'
import { Post, PostType } from './components/Post'
import { Sidebar } from './components/Sidebar'
import './global.css'
import { User } from './types'

const currentUser: User = {
  name: 'Diego Oliveira',
  role: 'Front-End Developer',
  avatarUrl: 'https://github.com/dgeoi.png',
  backgroundImageUrl: 'https://images.unsplash.com/photo-1678348566820-81f71e66c6ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500q=25'
}

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content: [
      { type: 'paragraph', text: 'Fala Devs!' },
      { type: 'paragraph', text: 'Acabei de subir mais um projeto no meu portifa!' },
      { type: 'link', text: 'https://github.com/diego3g' }
    ],
    publishedAt: new Date('2023-03-22 12:01:19')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    content: [
      { type: 'paragraph', text: 'Fala galerinha!' },
      { type: 'paragraph', text: 'Acabei de subir mais uma aula no YouTube!' },
      { type: 'link', text: 'https://youtube.com/Rocketseat' }
    ],
    publishedAt: new Date('2023-03-22 08:54:22')
  },
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar user={currentUser} />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
