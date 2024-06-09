'use client'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import GradeChip from '@/app/_components/GradeChip'
import styles from './ownedCards.module.scss'
import Pagination from '@/app/_components/pagination'
import { GradeType } from '@/app/_lib/types/cardType'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getProfile from '@/app/_api/profile/getProfile'
import { getCookie } from '@/app/_util/cookie'
import { UserProfileType } from '@/app/_lib/types/profileType'

export default function OwnedCards() {
  const accessToken = getCookie('accessToken')

  const { data } = useQuery<UserProfileType>({
    queryKey: [QUERY_KEYS.userProfile],
    queryFn: getProfile,
    enabled: !!accessToken,
  })

  const returnGradeList = () => {
    return GRADE_LIST
  }

  interface GradeListType {
    grade: GradeType
    count?: number
  }

  const GRADE_LIST: GradeListType[] = [
    { grade: 'COMMON', count: data?.cardCount.commonCount },
    { grade: 'RARE', count: data?.cardCount.rareCount },
    { grade: 'SUPER_RARE', count: data?.cardCount.superRareCount },
    { grade: 'LEGENDARY', count: data?.cardCount.legendaryCount },
  ]

  useEffect(() => {
    returnGradeList
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_totalCount}>
        <div
          className={styles.title}
        >{`${data?.nickname}님이 보유한 포토카드`}</div>
        <span
          className={styles.totalCount}
        >{`(${data?.cardCount.totalCount}장)`}</span>
      </div>
      <ul className={styles.grade_list}>
        {data &&
          GRADE_LIST?.map((el) => {
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
