import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import getCardDetail from '@/app/_api/card/getCard'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

import CardSeller from '@/app/_components/Card/CardSeller'
import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import Grade from '@/app/_components/Grade'

import styles from './forSeller.module.scss'
import ExchangeList from './ExchangeList'

export default function ForSeller() {
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
        <div className={styles.cardTitle}>{data.name}</div>
      </Title>
      <div className={styles.cardWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={data.image}
            alt="카드 이미지"
            style={{ objectFit: 'cover' }}
            layout="fill"
            className={styles.image}
          />
        </div>
        <div className={styles.cardContainer}>
          <CardSeller
            grade={data.grade}
            genre={data.genre}
            maker={data.seller_nickname}
            description={data.description}
            price={data.price}
            remainingQuantity={data.remainingQuantity}
            totalQuantity={data.totalQuantity}
            expectedContent={data?.wishExchangeData.wishExchangeDescription}
            expectedGenre={data?.wishExchangeData.wishExchangeGenre}
            expectedGrade={data?.wishExchangeData.wishExchangeGrade}
          />
        </div>
      </div>
      <div className={styles.exchangeListWrapper}>
        <ExchangeList type="seller" list={data && data?.exchangeRequest} />
      </div>
    </div>
  )
}
