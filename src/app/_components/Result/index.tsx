'use client'
import { usePathname } from 'next/navigation'

import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/types/cardType'
import replaceSingleQuotes from '@/app/_util/replaceSingleQuote'

import styles from './result.module.scss'
import Close from '/public/icons/close.svg'
import gradeExtract from '@/app/_util/gradeExtract'

interface ResultType {
  isSuccess: boolean
  title: string
  grade?: GradeType | null | string
  cardName?: string | null
  quantity?: string | null
  description?: string
  buttonMessage: string
  onClick: () => void
  onClose: () => void
}

export default function Result({
  isSuccess,
  title,
  grade,
  cardName,
  quantity,
  description,
  onClick,
  onClose,
  buttonMessage,
}: ResultType) {
  const pathname = usePathname()

  const message = () => {
    if (pathname.includes('create-card')) {
      return `[${gradeExtract(replaceSingleQuotes(grade) as GradeType)} | ${replaceSingleQuotes(cardName)}] ${description}`
    } else {
      return `[${grade} | ${cardName}] ${quantity}장 ${description}]`
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button onClick={onClose}>
          <Close className={styles.closeIcon} />
        </button>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={isSuccess ? styles.success : styles.fail}>
            {isSuccess ? '성공' : '실패'}
          </div>
        </div>
        <div className={styles.message}>{message()}</div>
        <div className={styles.buttonContainer}>
          <Button buttonStyle="secondary" thickness="thin" onClick={onClick}>
            {buttonMessage}
          </Button>
        </div>
      </div>
    </div>
  )
}
