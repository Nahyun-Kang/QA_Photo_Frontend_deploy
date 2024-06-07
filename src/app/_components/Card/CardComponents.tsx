import Image from 'next/image'
import { ReactNode } from 'react'

import Chip from '@/app/_components/Chip'
import Grade from '@/app/_components/Grade'
import { GradeType, GenreType } from '@/app/_lib/types/cardType'

import styles from './Card.module.scss'
import SoldOut from '/public/images/soldout.svg'
import LogoFavicon from '/public/icons/photo_logo_favicon.svg'

function CardWrapper({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

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
        <div className={styles.soldOutIconWrapper}>
          <SoldOut className={styles.soldOutIcon} />
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
  grade: GradeType
  genre: GenreType
  maker: string
  point?: number
  type?: 'sale' | 'exchange'
}

function CardInformation({
  title,
  grade,
  genre,
  maker,
  point = 0,
  type = 'sale',
}: ICardInformation) {
  return (
    <div className={styles.informationContainer}>
      <div className={styles.title}>{title}</div>
      {type === 'exchange' ? (
        <ExchangeInformation
          grade={grade}
          genre={genre}
          point={point}
          maker={maker}
        />
      ) : (
        <DefaultInformation grade={grade} genre={genre} maker={maker} />
      )}
      <div className={styles.underline}></div>
    </div>
  )
}

type IDefaultInformation = Omit<ICardInformation, 'title' | 'point' | 'type'>

function DefaultInformation({ grade, genre, maker }: IDefaultInformation) {
  return (
    <div className={styles.informationWrapper}>
      <div className={styles.gradeContainer}>
        <Grade grade={grade}></Grade>
        <span className={styles.bar}>{'|'}</span>
        <span className={styles.genre}>{genre}</span>
      </div>
      <div className={styles.makerContainer}>
        <span className={styles.maker}>{maker}</span>
      </div>
    </div>
  )
}

type IExchangeInformation = Omit<ICardInformation, 'title' | 'type'>

function ExchangeInformation({
  grade,
  genre,
  maker,
  point,
}: IExchangeInformation) {
  return (
    <div className={styles.exchangeWrapper}>
      <div className={styles.gradeContainer}>
        <Grade grade={grade}></Grade>
        <span className={styles.bar}>{'|'}</span>
        <span className={styles.genre}>{genre}</span>
      </div>
      <div className={styles.exchangeMakerContainer}>
        <div className={styles.gradeContainer}>
          <span className={`${styles.bar} ${styles.exchange}`}>{'|'}</span>
          <span className={styles.point}>{`${point} P`}</span>
          <span className={styles.genre}>{`에 구매`}</span>
        </div>
        <span className={styles.maker}>{maker}</span>
      </div>
    </div>
  )
}

function QuantityContainer({ children }: { children: ReactNode }) {
  return <div className={styles.quantityInformationContainer}>{children}</div>
}

interface IPrice {
  price: number
}

function Price({ price }: IPrice) {
  return (
    <div className={styles.quantityContainer}>
      <span className={styles.quantityTitle}>가격</span>
      <span className={styles.quantityContent}>{`${price} P`}</span>
    </div>
  )
}

interface IRemain {
  totalQuantity: number
  remainingQuantity: number
}

function Remain({ totalQuantity, remainingQuantity }: IRemain) {
  return (
    <div className={styles.quantityContainer}>
      <span className={styles.quantityTitle}>잔여</span>
      <div className={styles.remainContainer}>
        <span className={styles.quantityContent}>{`${remainingQuantity}`}</span>
        <span className={styles.totalQuantity}>{`/ ${totalQuantity}`}</span>
      </div>
    </div>
  )
}

interface IQuantity {
  quantity: number
}

function Quantity({ quantity }: IQuantity) {
  return (
    <div className={styles.quantityContainer}>
      <span className={styles.quantityTitle}>수량</span>
      <span className={styles.quantityContent}>{quantity}</span>
    </div>
  )
}

interface IDescription {
  description: string
}

function Description({ description }: IDescription) {
  return <p className={styles.description}>{description}</p>
}

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <LogoFavicon className={styles.logofavicon} />
    </div>
  )
}

const Card = Object.assign(CardWrapper, {
  CardContainer,
  image: CardImage,
  information: CardInformation,
  ExchangeInformation,
  QuantityContainer,
  Quantity,
  Remain,
  Price,
  Description,
  Logo,
})

export default Card
