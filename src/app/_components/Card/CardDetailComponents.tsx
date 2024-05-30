import { ReactNode } from 'react'

import Grade from '@/app/_components/Grade'
import NumberInput from './NumberInput'

import styles from './CardDetail.module.scss'

function CardDetailContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>
}

interface ICardInformation {
  grade: 'common' | 'rare' | 'super_rare' | 'legendary'
  genre: string
  maker?: string
}

function CardDetailInformation({ grade, genre, maker }: ICardInformation) {
  return (
    <div className={styles.informationContainer}>
      <div className={styles.informationGradeContainer}>
        <Grade grade={grade} type="detail" />
        <div className={styles.bar}>|</div>
        <span className={styles.informationGenre}>{genre}</span>
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

// interface INumberInput {
//   remainingQuantity: number
//   id: string
// }

// function NumberInput({ remainingQuantity, id }: INumberInput) {
//   return (
//     <div>
//       <input id={id} type="number" min={1} max={remainingQuantity} />
//     </div>
//   )
// }

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
})

export default CardDetail
