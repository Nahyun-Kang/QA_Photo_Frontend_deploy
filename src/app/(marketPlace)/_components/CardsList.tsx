'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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

import styles from './CardsList.module.scss'
import Filter from '/public/icons/filter.svg'
import { GenreType, ShopCardType } from '@/app/_lib/types/cardType'

export default function MarketPlaceCardList() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.shopCards],
    queryFn: () => getShopCards(1, 16),
  })
  const router = useRouter()

  console.log(data)

  const handleCardClick = (cardId: string) => {
    router.push(`/${cardId}`)
  }

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
            <Filter width={20} height={20} />
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
        {data &&
          data?.data.map((el: ShopCardType) => {
            return (
              <li
                key={el.id}
                className={styles.cardItem}
                onClick={() => handleCardClick(el.id)}
              >
                <OriginalCard
                  image={el.image}
                  nickName={el.seller_nickname}
                  id={el.id}
                  name={el.name}
                  price={el.price}
                  grade={el.grade}
                  genre={el.genre as GenreType}
                  totalQuantity={el.totalQuantity}
                  remainingQuantity={el.remainingQuantity}
                />
              </li>
            )
          })}
      </ul>
      <div className={styles.paginationWrapper}>
        {data && <Pagination count={data?.pagination?.totalCount} />}
      </div>
    </section>
  )
}
