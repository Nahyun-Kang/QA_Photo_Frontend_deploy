'use client'
import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'
import MyCard from '../Card/MyCard'
import Filter from '/public/icons/filter.svg'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'
import { GenreType, MyGalleryCardType } from '@/app/_lib/types/cardType'
import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'
import getMyCards from '@/app/_api/card/getMyCards'

import styles from './sellPhotoCard.module.scss'
import Close from '/public/icons/close.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import { CardDataType } from '@/app/(marketPlace)/_components/Title'

interface SellPhotoCardModalProps {
  onClose: () => void
  onOpen: (id: string, data: CardDataType) => void
}

export default function SellPhotoCardModal({
  onClose,
  onOpen,
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

  const handleCardClick = (cardId: string, data: CardDataType) => {
    onOpen(cardId, data)
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
            {data &&
              data?.data.map((el: MyGalleryCardType, idx: number) => {
                return (
                  <li
                    key={idx.toString()}
                    className={styles.cardItem}
                    onClick={() =>
                      handleCardClick(el.id, {
                        name: el.name,
                        grade: el.grade,
                        genre: el.genre,
                        totalQuantity: el.totalQuantity,
                        userName: el.user.nickname,
                        image: el.image,
                        price: el.price,
                      })
                    }
                  >
                    <MyCard
                      image={el.image}
                      nickName={el.user.nickname}
                      id={el.id}
                      name={el.name}
                      price={el.price}
                      grade={el.grade}
                      genre={el.genre as GenreType}
                      totalQuantity={el.totalQuantity}
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
