'use client'
import { useQuery } from '@tanstack/react-query'

import SearchInput from '@/app/_components/SearchInput'
import Dropdown from '@/app/_components/Dropdown'
import { GRADE_LIST, GENRE_LIST } from '@/app/_constants/listConstants'
import MyCard from '@/app/_components/Card/MyCard'
import Pagination from '@/app/_components/pagination'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getMyCards from '@/app/_api/card/getMyCards'
import { MyGalleryCardType } from '@/app/_lib/types/cardType'

import styles from '@/app/(marketPlace)/mygallery/_components/mygalleryCardList.module.scss'
import Filter from '/public/icons/filter.svg'
import { GenreType } from '@/app/_lib/types/cardType'

export default function MyGalleryCardList() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.myCards],
    queryFn: () => getMyCards(1, 15),
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
          </div>
        </div>
      </div>
      <ul className={styles.ul}>
        {data &&
          data?.data.map((el: MyGalleryCardType, idx: number) => {
            return (
              <li key={idx.toString()}>
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
      <div className={styles.paginationWrapper}>
        <Pagination count={45} />
      </div>
    </section>
  )
}
