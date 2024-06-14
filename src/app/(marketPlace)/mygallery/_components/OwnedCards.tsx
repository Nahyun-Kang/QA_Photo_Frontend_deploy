'use client'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import GradeChip from '@/app/_components/GradeChip'
import styles from './ownedCards.module.scss'
import Pagination from '@/app/_components/pagination'
import { GradeType } from '@/app/_lib/types/cardType'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getProfile from '@/app/_api/profile/getProfile'
import { getCookie } from '@/app/_util/cookie'
import { UserProfileType } from '@/app/_lib/types/profileType'

interface GradeListType {
  grade: GradeType
  count?: number
}

interface OwnedCardType {
  cardCountList: GradeListType[]
  userName: string
  totalCount?: number
}

export default function OwnedCards({
  cardCountList,
  userName,
  totalCount,
}: OwnedCardType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_totalCount}>
        <div className={styles.title}>{`${userName} 님이 보유한 포토카드`}</div>
        <span className={styles.totalCount}>{`(${totalCount}장)`}</span>
      </div>
      <ul className={styles.grade_list}>
        {cardCountList?.map((el: GradeListType) => {
          return (
            <li>
              <GradeChip grade={el.grade} count={el.count} />
            </li>
          )
        })}
      </ul>
      <div className={styles.bottomLine}></div>
    </div>
  )
}
