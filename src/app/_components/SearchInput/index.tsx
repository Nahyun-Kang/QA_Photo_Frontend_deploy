'use client'
import { ChangeEvent, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './SearchInput.module.scss'

import SearchIcon from '/public/icons/search.svg'

interface IFormInput {
  onClick: (keyword: string) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ onClick, onChange }: IFormInput) {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const handleIconClick = () => {
    if (inputRef.current && inputRef.current.value) {
      onClick(inputRef?.current.value)
    } else {
      onClick('')
    }
  }

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        placeholder={'검색'}
        ref={inputRef}
        onChange={onChange}
      />
      <SearchIcon
        className={styles.icon}
        onClick={handleIconClick}
        placeholder={'이메일을 입력해주세요'}
      />
    </div>
  )
}
