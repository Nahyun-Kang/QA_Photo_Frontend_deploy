'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import CardDetail from './CardDetailComponents'
import NumberInput from './NumberInput'
import { GradeType } from '@/app/_lib/types/cardType'

import styles from './MyCardDetail.module.scss'

interface MyCardDetailProps {
  genre: string
  grade: GradeType
  maker: string
  totalQuantity: number
  quantity: number
  handlePlusButtonClick: () => void
  handleMinusButtonClick: () => void
  priceValue: number
}

export default function MyCardDetail({
  genre,
  grade,
  maker,
  totalQuantity,
  handlePlusButtonClick,
  handleMinusButtonClick,
  quantity,
  priceValue,
}: MyCardDetailProps) {
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
            <CardDetail.PriceInput id="pricePerCard" value={priceValue} />
          </div>
        </div>
      </div>
    </CardDetail>
  )
}
