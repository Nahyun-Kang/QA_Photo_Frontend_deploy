import { ReactNode } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  buttonStyle?: 'primary' | 'secondary'
  thickness?: 'thick' | 'thin' | 'mini'
  disabled?: boolean
  onClick?: () => void
}

export default function CommonButton({
  children,
  type,
  buttonStyle = 'primary',
  thickness = 'thick',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${styles[buttonStyle]} ${styles[thickness]} ${disabled && styles.disabled}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
