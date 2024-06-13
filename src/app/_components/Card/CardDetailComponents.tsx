import { ChangeEvent, ReactNode } from 'react'

import Grade from '@/app/_components/Grade'
import NumberInput from './NumberInput'
import { GradeType } from '@/app/_lib/types/cardType'
import { GENRE } from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'

import styles from './CardDetail.module.scss'

function CardDetailContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>
}

interface ICardInformation {
  grade: GradeType
  genre: string
  maker?: string
}

function CardDetailInformation({ grade, genre, maker }: ICardInformation) {
  return (
    <div className={styles.informationContainer}>
      <div className={styles.informationGradeContainer}>
        <Grade grade={grade} type="detail" />
        <div className={styles.bar}>|</div>
        <span className={styles.informationGenre}>{GENRE[genre]}</span>
      </div>
      {maker && <div className={styles.informationMaker}>{maker}</div>}
    </div>
  )
}

function BottomLine() {
  return <div className={styles.bottomLine}></div>
}

interface IDetailQuantityContainer {
  price: number
  remainingQuantity: number
  totalQuantity: number
}

function DetailQuantityContainer({
  price,
  remainingQuantity,
  totalQuantity,
}: IDetailQuantityContainer) {
  return (
    <div className={styles.quantityInformationContainer}>
      <div className={styles.quantityContainer}>
        <span className={styles.quantityTitle}>가격</span>
        <span className={styles.quantityContent}>{`${price} P`}</span>
      </div>
      <div className={styles.quantityContainer}>
        <span className={styles.quantityTitle}>잔여</span>
        <div className={styles.remainContainer}>
          <span
            className={styles.quantityContent}
          >{`${remainingQuantity}`}</span>
          <span className={styles.totalQuantity}>{`/ ${totalQuantity}`}</span>
        </div>
      </div>
    </div>
  )
}

interface IPriceInput {
  id: string
  value?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function PriceInput({ id, value, onChange }: IPriceInput) {
  return (
    <div className={styles.priceInputContainer}>
      <input
        id={id}
        type="number"
        // min={0}
        placeholder="숫자만 입력"
        className={styles.priceInput}
        onChange={onChange}
        value={value}
      />
      <span className={styles.price}>{'P'}</span>
    </div>
  )
}

interface IDescription {
  description: string
}

function Description({ description }: IDescription) {
  return <p className={styles.description}>{description}</p>
}

const CardDetail = Object.assign(CardDetailContainer, {
  CardDetailInformation,
  BottomLine,
  DetailQuantityContainer,
  Description,
  NumberInput,
  PriceInput,
})

export default CardDetail
