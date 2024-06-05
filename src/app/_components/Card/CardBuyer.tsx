'use client'

import { useState } from 'react'

import ModalMain from '../Modal/Modal'
import BasicModal from '../Modal/BasicModal'
import CardDetail from './CardDetailComponents'
import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/types/cardType'

import styles from './CardBuyer.module.scss'
import gradeExtract from '@/app/_util/gradeExtract'

interface CardBuyerProps {
  grade: GradeType
  genre: string
  description: string
  price: number
  remainingQuantity: number
  totalQuantity: number
  maker: string
  name: string
}

export default function CardBuyer({
  name,
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
    <>
      {/* {
        <ModalMain>
          <BasicModal
            title="포토카드 구매"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] ${quantity}장을 구매하시겠습니까?`}</>
            }
            onClick={() => console.log()}
            buttonName="구매하기"
          />
        </ModalMain>
      } */}
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
    </>
  )
}
