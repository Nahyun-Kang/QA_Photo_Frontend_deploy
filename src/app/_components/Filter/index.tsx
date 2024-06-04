'use client'

import { useState } from 'react'

import Button from '@/app/_components/Button'
import GradeFilter from './GradeFilter'
import SoldOutFilter from './SoldOutFilter'

import ExchangeIcon from '/public/icons/exchange.svg'
import CloseIcon from '/public/icons/close.svg'
import styles from './filter.module.scss'
import GenreFilter from './GenreFiilter'

interface FilterProps {
  hasGrade?: boolean
  hasGenre?: boolean
  hasSoldOut?: boolean
}

export default function Filter({
  hasGrade,
  hasGenre,
  hasSoldOut,
}: FilterProps) {
  type FilterType = 'grade' | 'genre' | 'soldOut'

  const [activeFilter, setActiveFilter] = useState<FilterType>('grade')
  const [gradeCount, setGradeCount] = useState(0)
  const [genreCount, setGenreCount] = useState(0)
  const [soldOutCount, setSoldOutCount] = useState(0)

  const handleGradeCount = (num: number) => {
    setGradeCount(num)
  }
  const handleGenreCount = (num: number) => {
    setGenreCount(num)
  }
  const handleSoldOutCount = (num: number) => {
    setSoldOutCount(num)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>필터</div>
          <CloseIcon width={24} height={24} className={styles.close} />
        </div>
        <ul className={styles.filterList}>
          {hasGrade && (
            <li
              className={`${styles.filterContainer} ${activeFilter === 'grade' && styles.active}`}
              onClick={() => {
                setActiveFilter('grade')
              }}
            >
              <span
                className={`${styles.filterName} ${activeFilter === 'grade' && styles.active}`}
              >
                등급
              </span>
              <span
                className={`${styles.activeFilterCount} ${activeFilter === 'grade' && styles.active}`}
              >
                {gradeCount !== 0 && gradeCount}
              </span>
            </li>
          )}
          {hasGenre && (
            <li
              className={`${styles.filterContainer} ${activeFilter === 'genre' && styles.active}`}
              onClick={() => {
                setActiveFilter('genre')
              }}
            >
              <span
                className={`${styles.filterName} ${activeFilter === 'genre' && styles.active}`}
              >
                장르
              </span>
              <span
                className={`${styles.activeFilterCount} ${activeFilter === 'genre' && styles.active}`}
              >
                {genreCount !== 0 && genreCount}
              </span>
            </li>
          )}
          {hasSoldOut && (
            <li
              className={`${styles.filterContainer} ${activeFilter === 'soldOut' && styles.active}`}
              onClick={() => {
                setActiveFilter('soldOut')
              }}
            >
              <span
                className={`${styles.filterName} ${activeFilter === 'soldOut' && styles.active}`}
              >
                매진여부
              </span>
              <span
                className={`${styles.activeFilterCount} ${activeFilter === 'soldOut' && styles.active}`}
              >
                {soldOutCount !== 0 && soldOutCount}
              </span>
            </li>
          )}
        </ul>
        <div className={styles.attributeListContainer}>
          {activeFilter === 'grade' && (
            <GradeFilter handleGradeCount={handleGradeCount} />
          )}
          {activeFilter === 'genre' && (
            <GenreFilter handleGenreCount={handleGenreCount} />
          )}
          {activeFilter === 'soldOut' && (
            <SoldOutFilter handleSoldOUtCount={handleSoldOutCount} />
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.refreshButton}>
            <ExchangeIcon />
          </button>
          <button className={styles.filterButton}>52개 포토보기</button>
        </div>
      </div>
    </div>
  )
}
