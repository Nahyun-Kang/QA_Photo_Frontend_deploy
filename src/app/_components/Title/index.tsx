import { ReactNode } from 'react'
import styles from './Title.module.scss'

interface TitleProps {
  children: ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.line}></div>
    </div>
  )
}
