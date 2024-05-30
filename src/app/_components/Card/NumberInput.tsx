'use client'
import { useState } from 'react'
import styles from './NumberInput.module.scss'

import Minus from '/public/icons/minus.svg'
import Plus from '/public/icons/plus.svg'

interface INumberInput {
  remainingQuantity: number
  id: string
}

export default function NumberInput({ remainingQuantity, id }: INumberInput) {
  const [number, setNumber] = useState<number>(1)

  const handlePlusButtonClick = () => {
    if (number >= remainingQuantity) {
      return
    }

    setNumber(number + 1)
  }

  const handleMinusButtonClick = () => {
    if (number <= 1) {
      return
    }

    setNumber(number - 1)
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleMinusButtonClick}>
        <Minus />
      </button>
      <input
        id={id}
        type="number"
        min={1}
        max={remainingQuantity}
        value={number}
        className={styles.input}
      />
      <button className={styles.button} onClick={handlePlusButtonClick}>
        <Plus />
      </button>
    </div>
  )
}
