'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import CardBuyer from '@/app/_components/Card/CardBuyer'
import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import Grade from '@/app/_components/Grade'
import ExchangeList from './ExchangeList'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getCardDetail from '@/app/_api/card/getCard'
import gradeExtract from '@/app/_util/gradeExtract'
import { GenreType } from '@/app/_lib/types/cardType'
import { GENRE } from '../../mygallery/create-card/_constants/createCardConstants'
import ModalMain from '@/app/_components/Modal/Modal'
import ExchangePhotoCardModal from '@/app/_components/Modal/ExchangePhotoCardModal'
import ProposeExchangeModal from '@/app/_components/Modal/ProposeExchangeModal'

import styles from './forBuyer.module.scss'
import { GradeType } from '@/app/_lib/types/cardType'

export interface BuyerCardType {
  id: string
  name: string
  grade: GradeType
  genre: GenreType
  userName: string
  totalQuantity: number
  image: string
  price: number
}

const INITIAL_VALUE: BuyerCardType = {
  id: '',
  name: '',
  grade: 'COMMON',
  genre: 'LANDSCAPE',
  userName: '',
  totalQuantity: 0,
  image: '',
  price: 0,
}

export default function ForBuyer() {
  const [isExchangeModalOn, setIsExchangeModalOn] = useState(false)
  const [isProposeModalOn, setIsProposeModalOn] = useState(false)
  const [cardData, setCardData] = useState(INITIAL_VALUE)

  const { cardId } = useParams<{ cardId: string }>()
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.cardDetail, cardId],
    queryFn: () => getCardDetail(cardId),
    retry: 0,
  })

  const handleCloseExchangeModal = () => {
    setIsExchangeModalOn(false)
  }

  const handleOpenExchangeModal = () => {
    setIsExchangeModalOn(true)
  }

  const handleOpenProposeModal = (id: string, data: BuyerCardType) => {
    setIsExchangeModalOn(false)
    setCardData({ ...data })
    setIsProposeModalOn(true)
  }

  const handleCloseProposeModal = () => {
    setIsProposeModalOn(false)
  }

  console.log(data)

  return (
    <>
      {isProposeModalOn && (
        <ModalMain>
          <ProposeExchangeModal
            onClose={handleCloseProposeModal}
            cardData={cardData}
          />
        </ModalMain>
      )}
      {isExchangeModalOn && (
        <ModalMain>
          <ExchangePhotoCardModal
            onClose={handleCloseExchangeModal}
            onOpen={handleOpenProposeModal}
          />
        </ModalMain>
      )}
      <div className={styles.buyerContainer}>
        <Title>
          <div className={styles.cardTitle}>{data?.name}</div>
        </Title>
        <div className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={data?.image}
              alt="카드 이미지"
              style={{ objectFit: 'cover' }}
              layout="fill"
              className={styles.image}
            />
          </div>
          <div className={styles.cardContainer}>
            <CardBuyer
              name={data?.name}
              grade={gradeExtract(data?.grade) as GradeType}
              genre={GENRE[data?.genre]}
              maker={data?.seller_nickname}
              description={data?.description}
              price={data?.price}
              remainingQuantity={data?.remainingQuantity}
              totalQuantity={data?.totalQuantity}
              cardId={cardId}
            />
          </div>
        </div>
        <div className={styles.exchangeWrapper}>
          <Title>
            <div className={styles.exchangeTitle}>교환 희망 정보</div>
            <div className={styles.exchangeButtonWrapper}>
              <Button
                thickness="thin"
                type="button"
                onClick={handleOpenExchangeModal}
              >
                포토카드 교환하기
              </Button>
            </div>
          </Title>
          <div className={styles.exchangeContentsWrapper}>
            <div className={styles.exchangeDescription}>
              {data && data?.wishExchangeData?.wishExchangeDescription}
            </div>
            <div className={styles.gradeWrapper}>
              <Grade
                type="detail"
                grade={data && data?.wishExchangeData?.wishExchangeGrade}
              />
              <div className={styles.genre}>|</div>
              <div className={styles.genre}>
                {data && data?.wishExchangeData?.wishExchangeGenre}
              </div>
            </div>
            <div className={styles.mobileExchangeButtonContainer}>
              <Button
                thickness="thin"
                type="button"
                onClick={handleOpenExchangeModal}
              >
                포토카드 교환하기
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.exchangeListWrapper}>
          <ExchangeList type="buyer" list={data && data?.exchangeRequest} />
        </div>
      </div>
    </>
  )
}
