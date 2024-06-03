'use client'

import { useState } from 'react'

import CardDetail from './CardDetailComponents'
import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/cardType'

import styles from './CardBuyer.module.scss'

interface CardBuyerProps {
  grade: GradeType
  genre: string
  description: string
  price: number
  remainingQuantity: number
  totalQuantity: number
  maker: string
}

export default function CardBuyer({
  grade,
  genre,
  description,
  price,
  remainingQuantity,
  totalQuantity,
  maker,
}: CardBuyerProps) {
  const [quantity, setQuantity] = useState<number>(1)

  const handlePlusButtonClick = () => {
    if (quantity >= remainingQuantity) {
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
      <CardDetail.Description description={description} />
      <CardDetail.BottomLine />
      <CardDetail.DetailQuantityContainer
        remainingQuantity={remainingQuantity}
        totalQuantity={totalQuantity}
        price={price}
      />
      <CardDetail.BottomLine />
      <form className={styles.form}>
        <div className={styles.option}>
          <label id="buyQuantity" className={styles.option_label}>
            구매수량
          </label>
          <CardDetail.NumberInput
            quantity={quantity}
            limitQuantity={remainingQuantity}
            id="buyQuantity"
            handlePlusButtonClick={handlePlusButtonClick}
            handleMinusButtonClick={handleMinusButtonClick}
          />
        </div>
        <div className={styles.option}>
          <label id="totalPrice" className={styles.option_label}>
            총 가격
          </label>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{`${price * quantity}P`}</span>
            <span className={styles.quantity}>{`(${quantity}장)`}</span>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button>포토카드 구매하기</Button>
        </div>
      </form>
    </CardDetail>
  )
}
