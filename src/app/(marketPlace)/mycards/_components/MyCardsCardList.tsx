'use client'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getSaleCards from '@/app/_api/card/getSaleCards'
import SearchInput from '@/app/_components/SearchInput'
import Dropdown from '@/app/_components/Dropdown'
import {
  GRADE_LIST,
  GENRE_LIST,
  SOLD_OUT_LIST,
} from '@/app/_constants/listConstants'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'
import Pagination from '@/app/_components/pagination'
import CardForSale from '@/app/_components/Card/CardForSale'

import styles from './MycardsCardList.module.scss'
import Filter from '/public/icons/filter.svg'

export default function MyCardsCardList() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.saleCards],
    queryFn: () => getSaleCards(1, 16),
  })

  return (
    <section className={styles.section}>
      <div className={styles.filterContainer}>
        <div className={styles.filterWrapper}>
          <button className={styles.button}>
            <Filter width={20} height={20} />
          </button>
          <SearchInput />
          <div className={styles.filters}>
            <Dropdown attribute="등급" list={GRADE_LIST} />
            <Dropdown attribute="장르" list={GENRE_LIST} />
            {/* <Dropdown attribute="판매방법" list={SOLD_OUT_LIST} /> */}
            <Dropdown attribute="매진여부" list={SOLD_OUT_LIST} />
          </div>
        </div>
      </div>
      <ul className={styles.ul}>
        {data &&
          data?.data.map((el: any, idx: number) => {
            return (
              <li key={idx.toString()}>
                <CardForSale
                  image={el.image}
                  nickName={el.user.nickname}
                  id={el.id}
                  name={el.name}
                  price={el.price}
                  grade={el.grade}
                  genre={el.genre}
                  registeredQuantity={el.quantity}
                  method={el.method}
                />
              </li>
            )
          })}
      </ul>
      <div className={styles.paginationWrapper}>
        <Pagination count={45} />
      </div>
    </section>
  )
}
