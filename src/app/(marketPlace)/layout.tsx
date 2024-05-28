'use client'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import MainHeader from '@/app/_components/Header'
import CommonHeader from '../_components/Header/CommonHeader'
import PAGE_NAMES from '../_constants/pathContstants'

import styles from './page.module.scss'

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.main}>
      <div>
        <MainHeader />
      </div>
      {pathname !== '/' && (
        <div className={styles.commonHeaderContainer}>
          <CommonHeader>{PAGE_NAMES[pathname]}</CommonHeader>
        </div>
      )}
      {children}
    </div>
  )
}
