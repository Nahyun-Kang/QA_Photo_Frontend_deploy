'use client'
import { useState, useEffect } from 'react'

import Card from './CardComponents'
import Button from '@/app/_components/Button'

import { ExchangeCardType } from '@/app/_lib/cardType'

import styles from './Card.module.scss'

export default function ExchangeCard({
  type = 'seller',
  imageUrl,
  nickName,
  id,
  userId,
  name,
  grade,
  genre,
  description,
}: ExchangeCardType) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743)
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <Card>
      <Card.CardContainer>
        <Card.image imageUrl={imageUrl} />
        <Card.information
          title={name}
          maker={nickName}
          grade={grade}
          genre={genre}
          type="exchange"
        />
        <Card.Description description={description} />
        {type === 'seller' ? (
          <div className={styles.buttonContainer}>
            <Button thickness="mini" buttonStyle="secondary">
              {isMobile ? '거절' : '거절하기'}
            </Button>
            <Button thickness="mini">{isMobile ? '승인' : '승인하기'}</Button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <Button thickness="thin" buttonStyle="secondary">
              취소하기
            </Button>
          </div>
        )}
      </Card.CardContainer>
    </Card>
  )
}
