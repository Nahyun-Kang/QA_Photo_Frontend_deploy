'use client'

import { usePathname, useParams } from 'next/navigation'
import ForBuyer from './_components/ForBuyer'

import styles from './page.module.scss'
import ForSeller from './_components/ForSeller'

export default function CardDetailPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageTitle}>마켓플레이스</div>
      <ForBuyer />
      {/* <ForSeller /> */}
    </div>
  )
}
