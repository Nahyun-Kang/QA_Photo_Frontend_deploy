import SearchInput from '@/app/_components/SearchInput'
import Dropdown from '@/app/_components/Dropdown'
import { GRADE_LIST, GENRE_LIST } from '@/app/_constants/listConstants'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'
import MyCard from '@/app/_components/Card/MyCard'
import Pagination from '@/app/_components/pagination'

import styles from '@/app/(marketPlace)/mygallery/_components/mygalleryCardList.module.scss'
import Filter from '/public/icons/filter.svg'

export default function MyGalleryCardList() {
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
                genre={el.genre}
                remainingQuantity={el.remainingQuantity}
                createdDate={el.createdDate}
                updatedDate={el.updatedDate}
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
