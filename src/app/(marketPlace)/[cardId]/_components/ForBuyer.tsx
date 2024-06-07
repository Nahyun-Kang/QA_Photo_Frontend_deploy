'use client'
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
import { GENRE } from '../../mygallery/create-card/_constants/createCardConstants'

import styles from './forBuyer.module.scss'
import { GradeType } from '@/app/_lib/types/cardType'

export default function ForBuyer() {
  const { cardId } = useParams<{ cardId: string }>()
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.cardDetail, cardId],
    queryFn: () => getCardDetail(cardId),
    retry: 0,
  })

  console.log(data)

  return (
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
            description="sdfsf"
            price={data?.price}
            remainingQuantity={data?.remainingQuantity}
            totalQuantity={data?.totalQuantity}
          />
        </div>
      </div>
      <div className={styles.exchangeWrapper}>
        <Title>
          <div className={styles.exchangeTitle}>교환 희망 정보</div>
          <div className={styles.exchangeButtonWrapper}>
            <Button thickness="thin">포토카드 교환하기</Button>
          </div>
        </Title>
        <div className={styles.exchangeContentsWrapper}>
          <div className={styles.exchangeDescription}>푸릇푸릇한 여름</div>
          <div className={styles.gradeWrapper}>
            <Grade type="detail" />
            <div className={styles.genre}>|</div>
            <div className={styles.genre}>풍경</div>
          </div>
          <div className={styles.mobileExchangeButtonContainer}>
            <Button thickness="thin">포토카드 교환하기</Button>
          </div>
        </div>
      </div>
      <div className={styles.exchangeListWrapper}>
        <ExchangeList type="buyer" />
      </div>
    </div>
  )
}
