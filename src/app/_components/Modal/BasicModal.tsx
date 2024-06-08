'use client'

import { ReactNode, useEffect, useRef } from 'react'
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
  const ref = useRef<null | HTMLDivElement>(null)

  const handleOutSideClick = (e: Event) => {
    if (
      onClose &&
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutSideClick)

    return () => {
      document.addEventListener('mousedown', handleOutSideClick)
    }
  }, [])

  return (
    <div className={styles.basicModalWrapper}>
      <div className={styles.basicModalContainer} ref={ref}>
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
