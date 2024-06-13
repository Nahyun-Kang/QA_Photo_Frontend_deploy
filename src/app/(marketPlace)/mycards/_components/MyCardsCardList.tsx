'use client'
import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getSaleCards from '@/app/_api/card/getSaleCards'
import SearchInput from '@/app/_components/SearchInput'
import Dropdown from '@/app/_components/Dropdown'
import {
  GRADE_LIST,
  GENRE_LIST,
  SOLD_OUT_LIST,
} from '@/app/_constants/listConstants'
import Pagination from '@/app/_components/pagination'
import CardForSale from '@/app/_components/Card/CardForSale'
import gradeExtract, { gradeToType } from '@/app/_util/gradeExtract'
import getGenreNameFromType, {
  getGenreTypeFromName,
} from '@/app/_util/getGenreNameFromType'
import { GenreType } from '@/app/_lib/types/cardType'
import {
  getSoldOutNameFromType,
  getSoldOutTypeFromName,
} from '@/app/_util/getSoldOutNameFromType'

import styles from './MycardsCardList.module.scss'
import Filter from '/public/icons/filter.svg'

export default function MyCardsCardList() {
  const [grade, setGrade] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [isSoldOut, setIsSoldOut] = useState('')
  const queryClient = useQueryClient()

  const [cardPerView, setCardPerView] = useState(15)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [currentList, setCurrentList] = useState([1])
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState<string>('')
  const { data } = useQuery({
    queryKey: [
      QUERY_KEYS.saleCards,
      currentPage,
      cardPerView,
      genre,
      grade,
      keyword,
      isSoldOut,
    ],
    queryFn: () =>
      getSaleCards(currentPage, cardPerView, genre, grade, keyword, isSoldOut),
  })

  const handleSearchClick = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handlePageClick = (el: number) => {
    setCurrentPage(el)
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.myCards, currentPage],
    })
  }

  const handleRightArrowClick = () => {
    if (currentList.includes(totalPageCount)) {
      return null
    }
    const newList = currentList
      .map((el) => el + 10)
      .filter((el) => el <= totalPageCount)
    setCurrentList([...newList])
    setCurrentPage(newList[0])
  }

  const handleInitialCurrentList = () => {
    const newArray = new Array(10)
      .fill(1)
      .map((_, i) => i + 1)
      .filter((el) => el <= totalPageCount)

    setCurrentList([...newArray])
    setCurrentPage(newArray[0])
  }

  const handleLeftArrowClick = () => {
    if (currentList.includes(1)) {
      return null
    }

    let newArray
    if (currentList[0] - 9 <= 1) {
      handleInitialCurrentList()
    } else {
      newArray = new Array(10)
        .fill(1)
        .map((_, i) => i + (currentList[0] - 10))
        .filter((el) => el <= totalPageCount)
      setCurrentList([...newArray])
      setCurrentPage(newArray[0])
    }
  }

  const handleTotalPageCount = (count: number) => {
    const total_page =
      count % cardPerView === 0
        ? count / cardPerView
        : Math.floor(count / cardPerView) + 1
    console.log(total_page)
    setTotalPageCount(total_page)
  }

  const updateCardCount = () => {
    setCardPerView(window.innerWidth < 1024 ? 16 : 15)
  }

  useEffect(() => {
    updateCardCount()
    window.addEventListener('resize', updateCardCount)

    return () => {
      window.removeEventListener('resize', updateCardCount)
    }
  }, [])

  useEffect(() => {
    if (data?.pagination?.totalCount) {
      handleTotalPageCount(data.pagination.totalCount)
    }
  }, [data])

  useEffect(() => {
    if (totalPageCount && cardPerView) {
      handleInitialCurrentList()
    }
  }, [totalPageCount, cardPerView])

  const handleClickGradeItem = (item: string) => {
    setGrade(gradeToType(item))
  }
  const handleClickGenreItem = (item: string) => {
    setGenre(getGenreTypeFromName(item))
  }

  const handleClickSoldOutItem = (item: string) => {
    setIsSoldOut(getSoldOutTypeFromName(item))
  }

  return (
    <section className={styles.section}>
      <div className={styles.filterContainer}>
        <div className={styles.filterWrapper}>
          <button className={styles.button}>
            <Filter width={20} height={20} />
          </button>
          <SearchInput
            onClick={handleSearchClick}
            onChange={handleInputChange}
          />
          <div className={styles.filters}>
            <Dropdown
              attribute="등급"
              list={GRADE_LIST}
              handleItemClick={handleClickGradeItem}
              value={gradeExtract(grade)}
            />
            <Dropdown
              attribute="장르"
              list={GENRE_LIST}
              handleItemClick={handleClickGenreItem}
              value={getGenreNameFromType(genre as GenreType)}
            />
            <Dropdown
              attribute="매진여부"
              list={SOLD_OUT_LIST}
              handleItemClick={handleClickSoldOutItem}
              value={getSoldOutNameFromType(isSoldOut)}
            />
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
        <Pagination
          count={data?.pagination?.totalCount}
          handleLeftArrowClick={handleLeftArrowClick}
          handleRightArrowClick={handleRightArrowClick}
          handlePageClick={handlePageClick}
          totalPageCount={totalPageCount}
          currentList={currentList}
          currentPage={currentPage}
        />
      </div>
    </section>
  )
}
