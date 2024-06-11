'use client'
import { useQuery } from '@tanstack/react-query'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'
import MyCard from '../Card/MyCard'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'
import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'
import { GenreType, MyGalleryCardType } from '@/app/_lib/types/cardType'
import { BuyerCardType } from '@/app/(marketPlace)/[cardId]/_components/ForBuyer'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getMyCards from '@/app/_api/card/getMyCards'

import styles from './exchangePhotoCardModal.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'

interface ExchangeModalProps {
  onClose: () => void
  onOpen: (id: string, cardData: BuyerCardType) => void
}

export default function ExchangePhotoCardModal({
  onClose,
  onOpen,
}: ExchangeModalProps) {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.myCards],
    queryFn: () => getMyCards(1),
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
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
            <div className={styles.title}>포토카드 교환하기</div>
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
              data?.data.map((el: MyGalleryCardType) => {
                return (
                  <li
                    onClick={() =>
                      onOpen(el.id, {
                        id: el.id,
                        name: el.name,
                        grade: el.grade,
                        genre: el.genre,
                        userName: el.user.nickname,
                        totalQuantity: el.totalQuantity,
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
