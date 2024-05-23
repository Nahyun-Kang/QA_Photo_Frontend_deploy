'use client'
import { useState, useRef, useEffect, ReactNode } from 'react'
import styles from './Select.module.scss'

import Down from '/public/icons/down.svg'
import Up from '/public/icons/up.svg'

interface SelectProps {
  list: string[];
  message: string
}

export default function SelectComponent({
  list,
  message,
}: SelectProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null);
  
  const handleTriggerClick =() => {
    setIsOpened((state) => !state)
  }

  const handleSelectItem = (item: string) => {
    setSelectedItem(item)
    setIsOpened(false)
  }

  const handleOutsideClick = (e : Event) => {
    if (ref.current && !(e.target instanceof Node && ref.current.contains(e.target))){
      setIsOpened(false);
    }
  } 


  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <Trigger isOpened={isOpened} onClick={handleTriggerClick}>{selectedItem !== '' ?  selectedItem : message}</Trigger>
      {isOpened && <ul className={styles.dropdownBox}>
        {list?.map((item, idx) => (
          <SelectItem key={idx.toString()} item={item} onClick={handleSelectItem}/>
        ))}
      </ul>}
    </div>
  )
}

interface TriggerProps {
  children: ReactNode
  isOpened: boolean
  onClick: () => void;
}

function Trigger({ children, isOpened, onClick }: TriggerProps) {

  const handleArrowNodeReturn = () => {
    const node = isOpened ? <Up /> : <Down />
    return node
  }

  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.title}>{children}</span>
      {handleArrowNodeReturn()}
    </button>
  )
}

interface SelectItemProps {
  item: string;
  onClick: (item: string) => void;
}

function SelectItem({item, onClick} : SelectItemProps) {
  return <li className={styles.listItem} onClick={() => onClick(item)}>{item}</li>
}