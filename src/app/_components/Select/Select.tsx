'use client'
import { useState, useRef, useEffect, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './Select.module.scss'

import Down from '/public/icons/down.svg'
import Up from '/public/icons/up.svg'

interface SelectProps {
  list: string[]
  placeholder: string
  value: string
  onClick: (item: string) => void
  defaultValue: string
}

export default function SelectComponent({
  placeholder,
  list,
  value,
  onClick,
}: SelectProps) {
  const [isOpened, setIsOpened] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleTriggerClick = () => {
    setIsOpened((state) => !state)
  }

  const handleOptionClick = (item: string) => {
    onClick(item)
    setIsOpened(false)
  }

  const handleOutsideClick = (e: Event) => {
    if (
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <Trigger isOpened={isOpened} onClick={handleTriggerClick} value={value}>
        {value !== '' ? value : placeholder}
      </Trigger>
      {isOpened && (
        <ul className={styles.dropdownBox}>
          {list?.map((item, idx) => (
            <SelectItem
              key={idx.toString()}
              item={item}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

interface TriggerProps {
  children: ReactNode
  isOpened: boolean
  onClick: () => void
  value: string
}

function Trigger({ children, isOpened, onClick, value }: TriggerProps) {
  const handleArrowNodeReturn = () => {
    const node = isOpened ? <Up /> : <Down />
    return node
  }

  return (
    <button className={styles.button} onClick={onClick}>
      <span className={`${styles.title} ${value === '' && styles.placeholder}`}>
        {children}
      </span>
      {handleArrowNodeReturn()}
    </button>
  )
}

interface SelectItemProps {
  item: string
  onClick: (item: string) => void
}

function SelectItem({ item, onClick }: SelectItemProps) {
  return (
    <li className={styles.listItem} onClick={() => onClick(item)}>
      {item}
    </li>
  )
}
