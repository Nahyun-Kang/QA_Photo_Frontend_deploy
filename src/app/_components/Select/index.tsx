'use client'
import { useState, ReactNode } from 'react'
import styles from './Select.module.scss'

import Down from '/public/icons/down.svg'
import Up from '/public/icons/up.svg'

interface SelectProps<T> {
  list: T[]
  title: string
  renderItem: (item: T) => ReactNode
}

export default function SelectComponent<T>({
  list,
  title,
  renderItem,
}: SelectProps<T>) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={styles.container}>
      <Trigger isOpened={isOpened}>{title}</Trigger>
      {/* <Select>
        {list.map((item, idx) => (
          <SelectItem key={+idx.toString}>{item}</SelectItem>
        ))}
      </Select> */}
    </div>
  )
}

interface TriggerProps {
  children: ReactNode
  isOpened: boolean
}

function Trigger({ children, isOpened }: TriggerProps) {
  const handleArrowNodeReturn = () => {
    const node = isOpened ? <Up /> : <Down />
    return node
  }

  return (
    <button className={styles.button}>
      <span className={styles.title}>{children}</span>
      {handleArrowNodeReturn()}
    </button>
  )
}

function SelectList() {
  return <div></div>
}
