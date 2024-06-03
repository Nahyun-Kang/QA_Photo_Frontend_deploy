'use client'
import { ReactNode } from 'react'
import ModalMain from './Modal'

import styles from './modal.module.scss'
import Close from '/public/icons/close.svg'
import Button from '@/app/_components/Button'

interface BasicModalProps {
  title?: string
  description?: ReactNode
  buttonName: string
  onClose?: () => void
  onClick?: () => void
}

export default function BasicModal({
  title,
  description,
  buttonName,
  onClick,
  onClose,
}: BasicModalProps) {
  return (
    <div className={styles.basicModalWrapper}>
      <div className={styles.basicModalContainer}>
        <button onClick={onClose} className={styles.closeButton}>
          <Close className={styles.closeIcon} />
        </button>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonWrapper}>
          <Button thickness="thin" onClick={onClick}>
            {buttonName}
          </Button>
        </div>
      </div>
    </div>
  )
}
