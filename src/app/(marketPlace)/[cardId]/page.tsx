'use client'

import Title from '@/app/_components/Title'
import { usePathname, useParams } from 'next/navigation'
import ForBuyer from './_components/ForBuyer'

import styles from './page.module.scss'

export default function CardDetailPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageTitle}>마켓플레이스</div>
      <ForBuyer />
    </div>
  )
}
