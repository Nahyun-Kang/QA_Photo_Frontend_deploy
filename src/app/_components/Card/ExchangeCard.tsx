'use client'
import { useState, useEffect } from 'react'

import Card from './CardComponents'
import Button from '@/app/_components/Button'
import ModalMain from '../Modal/Modal'
import BasicModal from '../Modal/BasicModal'

import gradeExtract from '@/app/_util/gradeExtract'
import { ExchangeCardType } from '@/app/_lib/types/cardType'

import styles from './Card.module.scss'

export default function ExchangeCard({
  type = 'seller',
  name,
  grade,
  genre,
  requestMessage,
  nickName,
  id,
  price,
  image,
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
    <>
      {/* {
        <ModalMain>
          <BasicModal
            title="교환 제시 거절"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 카드와의 교환을 거절하시겠습니까?`}</>
            }
            onClick={() => console.log()}
            buttonName="거절하기"
          />
        </ModalMain>
      }
      {
        <ModalMain>
          <BasicModal
            title="포토카드 구매"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 카드와의 교환을 승인하시겠습니까?`}</>
            }
            onClick={() => console.log()}
            buttonName="승인하기"
          />
        </ModalMain>
      } */}
      {/* {
        <ModalMain>
          <BasicModal
            title="교환 제시 취소"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 교환 제시를 취소하시겠습니까?`}</>
            }
            onClick={() => console.log()}
            buttonName="취소하기"
          />
        </ModalMain>
      } */}
      <Card>
        <Card.CardContainer>
          <Card.image imageUrl={image} />
          <Card.information
            title={name}
            maker={nickName}
            grade={grade}
            genre={genre}
            price={price}
            type="exchange"
          />
          <Card.Description description={requestMessage} />
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
    </>
  )
}
