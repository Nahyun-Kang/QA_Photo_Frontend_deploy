import Image from 'next/image'
import { ReactNode } from 'react'

import styles from './Card.module.scss'

import SoldOut from '/public/images/soldout.svg'
import Chip from '../Chip'

function CardContainer({ children }: { children: ReactNode }) {
  return <div className={styles.cardContainer}>{children}</div>
}

interface ICardImage {
  imageUrl: string
  isSoldOut?: boolean
  hasChip?: boolean
  chip?: 'sale' | 'exchange'
}

function CardImage({
  imageUrl,
  isSoldOut,
  hasChip = false,
  chip = 'sale',
}: ICardImage) {
  return (
    <div className={`${styles.imageContainer} ${styles.soldOut}`}>
      {isSoldOut && (
        <div className={styles.soldOutIcon}>
          <SoldOut />
        </div>
      )}
      {hasChip && (
        <div className={styles.chip}>
          {chip === 'sale' ? (
            <Chip>판매 중</Chip>
          ) : (
            <Chip type="yellow">교환 제시 대기 중</Chip>
          )}
        </div>
      )}
      <Image
        src={imageUrl}
        alt="카드 이미지"
        layout="fill"
        style={{ objectFit: 'cover' }}
        className={`${isSoldOut && styles.image}`}
      />
    </div>
  )
}

interface ICardInformation {
  title: string
  grade: 'COMMON' | 'RARE' | 'SUPERRARE' | 'LEGENDARY'
  genre: string
  maker: string
}

function CardInformation({ title, grade, genre, maker }: ICardInformation) {
  return (
    <div>
      <div>{title}</div>
      <div>
        <div>
          <span>{grade}</span>
          <span>|</span>
          <span>{genre}</span>
        </div>
        <span>{maker}</span>
      </div>
    </div>
  )
}

const Card = Object.assign(CardContainer, {
  image: CardImage,
  information: CardInformation,
})

export default Card
