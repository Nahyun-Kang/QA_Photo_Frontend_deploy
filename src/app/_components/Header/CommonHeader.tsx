'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import styles from './header.module.scss'
import Back from '/public/icons/back.svg'

interface CommonHeaderProps {
  children: ReactNode
}

export default function CommonHeader({ children }: CommonHeaderProps) {
  const router = useRouter()

  const handleBackButtonClick = () => {
    router.back()
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <Back />
        </button>
        <div className={styles.commonHeaderTitle}>{children}</div>
        <div></div>
      </div>
      <div></div>
    </header>
  )
}
