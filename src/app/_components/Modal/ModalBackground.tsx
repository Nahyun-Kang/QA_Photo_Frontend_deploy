import { ReactNode } from 'react'
import styles from './modal.module.scss'

export default function ModalBackground({ children }: { children: ReactNode }) {
  return <div className={styles.background}>{children}</div>
}
