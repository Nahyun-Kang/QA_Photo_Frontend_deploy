'use client'
import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'
import MyCard from '../Card/MyCard'
import Filter from '/public/icons/filter.svg'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'
import { GenreType } from '@/app/_lib/types/cardType'
import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'
import getMyCards from '@/app/_api/card/getMyCards'

import styles from './sellPhotoCard.module.scss'
import Close from '/public/icons/close.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

interface SellPhotoCardModalProps {
  onClose: () => void
}

export default function SellPhotoCardModal({
  onClose,
}: SellPhotoCardModalProps) {
  const ref = useRef<null | HTMLDivElement>(null)

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.myCards],
    queryFn: () => getMyCards(1),
  })

  console.log(data)

  const handleOutSideClick = (e: Event) => {
    if (
      onClose &&
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutSideClick)

    return () => {
      document.addEventListener('mousedown', handleOutSideClick)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <Close
          width={32}
          height={32}
          className={styles.closeIcon}
          onClick={onClose}
        />
        <MobileBar className={styles.mobileBar} />
        <div>
          <div className={styles.myGallery}>마이갤러리</div>
          <Title>
            <div className={styles.title}>나의 포토카드 판매하기</div>
          </Title>
          <div className={styles.filterContainer}>
            <div className={styles.filterWrapper}>
              <button className={styles.button}>
                <Filter width={20} height={20} />
              </button>
              <SearchInput />
              <div className={styles.filters}>
                <Dropdown attribute="등급" list={GRADE_LIST} />
                <Dropdown attribute="장르" list={GENRE_LIST} />
              </div>
            </div>
          </div>
          <ul className={styles.ul}>
            {CARDS_LIST?.map((el, idx) => {
              return (
                <li key={idx.toString()}>
                  <MyCard
                    imageUrl={el.imageUrl}
                    nickName={el.nickName}
                    id={el.id}
                    userId={el.userId}
                    name={el.name}
                    price={el.price}
                    grade={el.grade}
                    genre={el.genre as GenreType}
                    remainingQuantity={el.remainingQuantity}
                    createdDate={el.createdDate}
                    updatedDate={el.updatedDate}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
