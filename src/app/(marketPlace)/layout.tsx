'use client'
import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import MainHeader from '@/app/_components/Header'
import CommonHeader from '../_components/Header/CommonHeader'
import PAGE_NAMES from '../_constants/pathContstants'

import styles from './page.module.scss'

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const commonHeader = (pathname: string) => {
    if (pathname === '/') {
      return null
    } else if (PAGE_NAMES.hasOwnProperty(pathname)) {
      return (
        <div className={styles.commonHeaderContainer}>
          <CommonHeader>{PAGE_NAMES[pathname]}</CommonHeader>
        </div>
      )
    } else {
      return (
        <div className={styles.commonHeaderContainer}>
          <CommonHeader>{'마켓플레이스'}</CommonHeader>
        </div>
      )
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.main}>
        <div>
          <MainHeader />
        </div>
        {commonHeader(pathname)}
        {children}
      </div>
    </Suspense>
  )
}
