'use client'
import { useState, useEffect } from 'react'

import Card from './CardComponents'
import Button from '@/app/_components/Button'

import { ExchangeCardType } from '@/app/_lib/cardType'

import styles from './Card.module.scss'

export default function ExchangeCard({
  imageUrl,
  nickName,
  id,
  userId,
  name,
  grade,
  genre,
  description,
}: ExchangeCardType) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Card>
      <Card.image imageUrl={imageUrl} />
      <Card.information
        title={name}
        maker={nickName}
        grade={grade}
        genre={genre}
      />
      <Card.Description description={description} />
      <Card.Logo />
      <div className={styles.buttonContainer}>
        <Button thickness="mini" buttonStyle="secondary">
          {isMobile ? '거절' : '거절하기'}
        </Button>
        <Button thickness="mini">{isMobile ? '승인' : '승인하기'}</Button>
      </div>
    </Card>
  )
}
