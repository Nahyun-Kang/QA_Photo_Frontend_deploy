'use client'
import Dropdown from '@/app/_components/Dropdown'
import SelectComponent from '@/app/_components/Select/Select'
import {
  GRADE_LIST,
  GENRE_LIST,
  SOLD_OUT_LIST,
  ORDER_LIST,
} from '@/app/_constants/listConstants'
import SearchInput from '@/app/_components/SearchInput'

import styles from './CardsList.module.scss'
import Filter from '/public/icons/filter.svg'

export default function MarketPlaceCardList() {
  return (
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
          <button className={styles.button}>
            <Filter />
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
    </section>
  )
}
