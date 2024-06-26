'use client'

import { useState } from 'react'

import { GradeType } from '@/app/_lib/types/cardType'

import styles from './filter.module.scss'

interface GradeFilterProps {
  handleGradeCount: (num: number) => void
}

export default function GradeFilter({ handleGradeCount }: GradeFilterProps) {
  const [attributeList, setAttributeList] = useState<string[]>([])

  const handleClickAttribute = (grade: GradeType) => {
    setAttributeList((prevList) => {
      let new_list
      if (prevList.includes(grade)) {
        new_list = prevList.filter((el) => el !== grade)
      } else {
        new_list = [...prevList, grade]
      }
      handleGradeCount(new_list.length)
      return new_list
    })
  }

  const common = 52
  const rare = 38
  const super_rare = 22
  const legendary = 6

  return (
    <ul className={styles.attributeList}>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('COMMON') && styles.active}`}
        onClick={() => handleClickAttribute('COMMON')}
      >
        <div className={styles.grade_common}>COMMON</div>
        <div className={styles.count}>{`${common}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('RARE') && styles.active}`}
        onClick={() => handleClickAttribute('RARE')}
      >
        <div className={styles.grade_rare}>RARE</div>
        <div className={styles.count}>{`${rare}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('SUPER_RARE') && styles.active}`}
        onClick={() => handleClickAttribute('SUPER_RARE')}
      >
        <div className={styles.grade_super_rare}>SUPER RARE</div>
        <div className={styles.count}>{`${super_rare}개`}</div>
      </li>
      <li
        className={`${styles.attributeItem} ${attributeList.includes('LEGENDARY') && styles.active}`}
        onClick={() => handleClickAttribute('LEGENDARY')}
      >
        <div className={styles.grade_legendary}>LEGENDARY</div>
        <div className={styles.count}>{`${legendary}개`}</div>
      </li>
    </ul>
  )
}
