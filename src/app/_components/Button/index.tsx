import { ReactNode } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
  children: ReactNode
  type?: 'primary' | 'secondary'
  thickness?: 'thick' | 'thin' | 'mini'
  disabled?: boolean
  onClick?: () => void
}

export default function CommonButton({
  children,
  type = 'primary',
  thickness = 'thick',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${styles[type]} ${styles[thickness]} ${disabled && styles.disabled}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
