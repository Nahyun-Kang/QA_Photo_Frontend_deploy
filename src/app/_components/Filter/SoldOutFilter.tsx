'use client'

import { useState } from 'react'

import { GradeType } from '@/app/_lib/types/cardType'

import styles from './filter.module.scss'

interface SoldOutFilterProps {
  handleSoldOUtCount: (num: number) => void
}

export default function GenreFilter({
  handleSoldOUtCount: handleGenreCount,
}: SoldOutFilterProps) {
  const [attributeList, setAttributeList] = useState<string[]>([])

  type SoldOutType = 'soldOut' | 'selling'

  const handleClickAttribute = (grade: SoldOutType) => {
    setAttributeList((prevList) => {
      let new_list
      if (prevList.includes(grade)) {
        new_list = prevList.filter((el) => el !== grade)
      } else {
        new_list = [...prevList, grade]
      }
      handleGenreCount(new_list.length)
      return new_list
    })
  }

  const selling = 52
  const soldOut = 38

  return (
    <ul className={styles.attributeList}>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('selling') && styles.active}`}
        onClick={() => handleClickAttribute('selling')}
      >
        <div className={styles.attributeName}>판매 중</div>
        <div className={styles.count}>{`${selling}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('soldOut') && styles.active}`}
        onClick={() => handleClickAttribute('soldOut')}
      >
        <div className={styles.attributeName}>판매 완료</div>
        <div className={styles.count}>{`${soldOut}개`}</div>
      </li>
    </ul>
  )
}
