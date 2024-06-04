'use client'

import { useState } from 'react'

import { GradeType } from '@/app/_lib/cardType'

import styles from './filter.module.scss'

interface GenreFilterProps {
  handleGenreCount: (num: number) => void
}

export default function GenreFilter({ handleGenreCount }: GenreFilterProps) {
  const [attributeList, setAttributeList] = useState<string[]>([])

  type GenreType = 'travel' | 'landscape' | 'human' | 'things'

  const handleClickAttribute = (grade: GenreType) => {
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

  const travel = 52
  const landscape = 38
  const human = 22
  const things = 6

  return (
    <ul className={styles.attributeList}>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('travel') && styles.active}`}
        onClick={() => handleClickAttribute('travel')}
      >
        <div className={styles.attributeName}>여행</div>
        <div className={styles.count}>{`${travel}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('landscape') && styles.active}`}
        onClick={() => handleClickAttribute('landscape')}
      >
        <div className={styles.attributeName}>풍경</div>
        <div className={styles.count}>{`${landscape}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('human') && styles.active}`}
        onClick={() => handleClickAttribute('human')}
      >
        <div className={styles.attributeName}>인물</div>
        <div className={styles.count}>{`${human}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('things') && styles.active}`}
        onClick={() => handleClickAttribute('things')}
      >
        <div className={styles.attributeName}>사물</div>
        <div className={styles.count}>{`${things}개`}</div>
      </li>
    </ul>
  )
}
