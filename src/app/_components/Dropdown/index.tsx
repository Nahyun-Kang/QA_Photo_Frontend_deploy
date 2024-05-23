'use client'
import { ReactNode, useState, useRef, useEffect } from 'react'
import styles from './Dropdown.module.scss'

import Down from '/public/icons/down.svg'
import Up from '/public/icons/up.svg'

interface DropdownProps {
  attribute: string
  list: string[]
}

export default function Dropdown({ attribute, list }: DropdownProps) {
  const [dropdownOn, setDropdownOn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const handleTriggerClick = () => {
    setDropdownOn((state) => !state)
  }

  const handleOutsideClick = (e: Event) => {
    if (
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      setDropdownOn(false)
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
      <Trigger onClick={handleTriggerClick} isOpened={dropdownOn}>
        {attribute}
      </Trigger>
      {dropdownOn && (
        <DropdownList list={list} onClick={() => console.log('')} />
      )}
    </div>
  )
}

interface TriggerProps {
  children: ReactNode
  onClick: () => void
  isOpened: boolean
}

const Trigger = ({ children, onClick, isOpened }: TriggerProps) => {
  return (
    <button onClick={onClick} className={styles.trigger}>
      <span className={styles.attribute}>{children}</span>
      {isOpened ? <Up /> : <Down />}
    </button>
  )
}

interface DropdownListProps {
  list: string[]
  onClick: (item: string) => void
}

function DropdownList({ list, onClick }: DropdownListProps) {
  return (
    <ul className={styles.dropdownBox}>
      {list?.map((item, idx) => {
        return <DropdownItem item={item} onClick={onClick} />
      })}
    </ul>
  )
}

interface DropdownItemProps {
  item: string
  onClick: (item: string) => void
}

function DropdownItem({ item, onClick }: DropdownItemProps) {
  return (
    <li className={styles.listItem} onClick={() => onClick(item)}>
      {item}
    </li>
  )
}
