import { ReactNode } from 'react'
import styles from './Chip.module.scss'

interface ChipProps {
  children: ReactNode
  type?: 'default' | 'yellow'
}

export default function Chip({ children, type = 'default' }: ChipProps) {
  return (
    <div className={styles.container}>
      <span className={`${styles.text} ${styles[type]}`}>{children}</span>
    </div>
  )
}
