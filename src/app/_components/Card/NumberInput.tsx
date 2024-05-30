'use client'
import { useState } from 'react'
import styles from './NumberInput.module.scss'

import Minus from '/public/icons/minus.svg'
import Plus from '/public/icons/plus.svg'

interface INumberInput {
  limitQuantity?: number
  id: string
  quantity: number
  handlePlusButtonClick: () => void
  handleMinusButtonClick: () => void
}

export default function NumberInput({
  limitQuantity: remainingQuantity,
  id,
  quantity,
  handlePlusButtonClick,
  handleMinusButtonClick,
}: INumberInput) {
  const [number, setNumber] = useState<number>(1)

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleMinusButtonClick}
        type="button"
      >
        <Minus />
      </button>
      <input
        id={id}
        type="number"
        min={1}
        max={remainingQuantity}
        value={quantity}
        className={styles.input}
      />
      <button
        className={styles.button}
        onClick={handlePlusButtonClick}
        type="button"
      >
        <Plus />
      </button>
    </div>
  )
}
