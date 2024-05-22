import { ReactNode } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
  children: ReactNode
  type?: 'primary' | 'secondary'
  thickness?: 'thick' | 'thin'
}

export default function CommonButton({
  children,
  type = 'primary',
  thickness = 'thick',
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[type]} ${styles[thickness]}`}>
      {children}
    </button>
  )
}
