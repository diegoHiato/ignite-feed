import { PencilSimpleLine } from 'phosphor-react';
import { User } from '../../types';
import { Avatar } from '../Avatar';
import styles from './Sidebar.module.css';

interface SidebarProps {
  user: User
}

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <img src={user.backgroundImageUrl} />

      <div>
        <Avatar src={user.avatarUrl} hasBorder />
        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
