'use client'
import ModalMain from './Modal'

import styles from './modal.module.scss'
import Close from '/public/icons/close.svg'
import Button from '@/app/_components/Button'

interface BasicModalProps {
  title?: string
  description?: string
  onClick?: () => void
}

export default function BasicModal({
  title,
  description,
  onClick,
}: BasicModalProps) {
  return (
    <div className={styles.basicModalWrapper}>
      <div className={styles.basicModalContainer}>
        <button onClick={onClick} className={styles.closeButton}>
          <Close className={styles.closeIcon} />
        </button>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.buttonWrapper}>
          <Button thickness="thin" onClick={onClick}>
            거절하기
          </Button>
        </div>
      </div>
    </div>
  )
}
