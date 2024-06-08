'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import ModalMain from '@/app/_components/Modal/Modal'
import Dropdown from '@/app/_components/Dropdown'
import SelectComponent from '@/app/_components/Select/Select'
import {
  GRADE_LIST,
  GENRE_LIST,
  SOLD_OUT_LIST,
  ORDER_LIST,
} from '@/app/_constants/listConstants'
import SearchInput from '@/app/_components/SearchInput'
import Pagination from '@/app/_components/pagination'
import { CARDS_LIST } from '../CARD_LISTS'
import OriginalCard from '@/app/_components/Card/OriginalCard'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getShopCards from '@/app/_api/card/getCards'
import Filter from '@/app/_components/Filter'
import { GenreType } from '@/app/_lib/types/cardType'

import FilterIcon from '/public/icons/filter.svg'
import styles from './CardsList.module.scss'

export default function MarketPlaceCardList() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.shopCards],
    queryFn: getShopCards,
  })

  const [isFilterOn, setIsFilterOn] = useState(false)

  const handleToggleFilter = () => {
    setIsFilterOn((state) => !state)
  }

  const handleCloseFilter = () => {
    setIsFilterOn(false)
  }

  console.log(data)

  return (
    <>
      {isFilterOn && (
        <ModalMain>
          <Filter
            hasGenre={true}
            hasGrade={true}
            hasSoldOut={true}
            onClose={handleCloseFilter}
          />
        </ModalMain>
      )}
      <section className={styles.section}>
        <div className={styles.filterContainer}>
          <div className={styles.filterWrapper}>
            <SearchInput />
            <div className={styles.filters}>
              <Dropdown attribute="등급" list={GRADE_LIST} />
              <Dropdown attribute="장르" list={GENRE_LIST} />
              <Dropdown attribute="판매여부" list={SOLD_OUT_LIST} />
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.orderContainer}>
            <button className={styles.button} onClick={handleToggleFilter}>
              <FilterIcon width={20} height={20} />
            </button>
            <SelectComponent
              defaultValue={ORDER_LIST[0]}
              list={ORDER_LIST}
              value={ORDER_LIST[0]}
              placeholder="정렬"
              onClick={() => console.log('')}
              style="filter"
            />
          </div>
        </div>
        <ul className={styles.ul}>
          {CARDS_LIST?.map((el, idx) => {
            return (
              <li key={idx.toString()}>
                <OriginalCard
                  imageUrl={el.imageUrl}
                  nickName={el.nickName}
                  id={el.id}
                  userId={el.userId}
                  name={el.name}
                  price={el.price}
                  grade={el.grade}
                  genre={el.genre as GenreType}
                  totalQuantity={el.totalQuantity}
                  remainingQuantity={el.remainingQuantity}
                  createdDate={el.createdDate}
                  updatedDate={el.updatedDate}
                />
              </li>
            )
          })}
        </ul>
        <div className={styles.paginationWrapper}>
          <Pagination count={1000} />
        </div>
      </section>
    </>
  )
}
