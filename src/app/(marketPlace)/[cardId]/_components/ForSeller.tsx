import Image from 'next/image'

import CardSeller from '@/app/_components/Card/CardSeller'
import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import Grade from '@/app/_components/Grade'

import styles from './forSeller.module.scss'
import ExchangeList from './ExchangeList'

export default function ForSeller() {
  return (
    <div className={styles.buyerContainer}>
      <Title>
        <div className={styles.cardTitle}>우리집 앞마당</div>
      </Title>
      <div className={styles.cardWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={'/images/image1.png'}
            alt="카드 이미지"
            style={{ objectFit: 'cover' }}
            layout="fill"
            className={styles.image}
          />
        </div>
        <div className={styles.cardContainer}>
          <CardSeller
            grade="common"
            genre="풍경"
            maker="미쓰손"
            description="sdfsf"
            price={4}
            remainingQuantity={2}
            totalQuantity={5}
            expectedContent="푸릇푸릇"
            expectedGenre="풍경"
            expectedGrade="legendary"
          />
        </div>
      </div>
      <div className={styles.exchangeListWrapper}>
        <ExchangeList type="seller" />
      </div>
    </div>
  )
}
