import Image from 'next/image'

import CardBuyer from '@/app/_components/Card/CardBuyer'
import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import Grade from '@/app/_components/Grade'
import ExchangeList from './ExchangeList'

import styles from './forBuyer.module.scss'

export default function ForBuyer() {
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
          <CardBuyer
            name="우리집 앞마당"
            grade="legendary"
            genre="풍경"
            maker="미쓰손"
            description="sdfsf"
            price={4}
            remainingQuantity={2}
            totalQuantity={5}
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
