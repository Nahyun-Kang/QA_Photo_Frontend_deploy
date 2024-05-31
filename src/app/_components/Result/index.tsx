'use client'
import { usePathname } from 'next/navigation'

import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/cardType'
import replaceSingleQuotes from '@/app/_util/replaceSingleQuote'

import styles from './result.module.scss'
import Close from '/public/icons/close.svg'

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
      return `[${replaceSingleQuotes(grade)} | ${replaceSingleQuotes(cardName)}] ${description}`
    } else {
      return `[${grade} | ${cardName}] ${quantity}장 ${description}]`
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <button onClick={onClose}>
          <Close className={styles.closeIcon} />
        </button>
        <div>
          <div className={styles.title}>{title}</div>
          <div>{isSuccess ? '성공' : '실패'}</div>
        </div>
        <div>{message()}</div>
        <div>
          <Button buttonStyle="secondary" thickness="thin" onClick={onClick}>
            {buttonMessage}
          </Button>
        </div>
      </div>
    </div>
  )
}
