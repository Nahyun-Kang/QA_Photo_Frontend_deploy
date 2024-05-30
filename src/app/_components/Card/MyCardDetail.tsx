'use client'
import { useState } from 'react'

import CardDetail from './CardDetailComponents'
import NumberInput from './NumberInput'
import { GradeType } from '@/app/_lib/cardType'

import styles from './MyCardDetail.module.scss'

interface MyCardDetailProps {
  genre: string
  grade: GradeType
  maker: string
  totalQuantity: number
}

export default function MyCardDetail({
  genre,
  grade,
  maker,
  totalQuantity,
}: MyCardDetailProps) {
  const [quantity, setQuantity] = useState<number>(1)

  const handlePlusButtonClick = () => {
    if (quantity >= totalQuantity) {
      return
    }

    setQuantity(quantity + 1)
  }

  const handleMinusButtonClick = () => {
    if (quantity <= 1) {
      return
    }

    setQuantity(quantity - 1)
  }

  return (
    <CardDetail>
      <CardDetail.CardDetailInformation
        genre={genre}
        grade={grade}
        maker={maker}
      />
      <CardDetail.BottomLine />
      <div className={styles.labels_container}>
        <div className={styles.label_container}>
          <label htmlFor="totalSellingQuantity" className={styles.label}>
            총 판매 수량
          </label>
          <div className={styles.selling_container}>
            <NumberInput
              id="totalSellingQuantity"
              limitQuantity={totalQuantity}
              quantity={quantity}
              handleMinusButtonClick={handleMinusButtonClick}
              handlePlusButtonClick={handlePlusButtonClick}
            />
            <div className={styles.limit_container}>
              <span className={styles.limit_index}>{`/${totalQuantity}`}</span>
              <span
                className={styles.limit_guide}
              >{`최대 ${totalQuantity}장`}</span>
            </div>
          </div>
        </div>
        <div className={styles.label_container}>
          <label htmlFor="pricePerCard" className={styles.label}>
            장당 가격
          </label>
          <div className={styles.price_input_wrapper}>
            <CardDetail.PriceInput id="pricePerCard" />
          </div>
        </div>
      </div>
    </CardDetail>
  )
}
