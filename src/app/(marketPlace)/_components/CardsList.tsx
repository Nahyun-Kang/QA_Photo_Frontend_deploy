'use client'
import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import OriginalCard from '@/app/_components/Card/OriginalCard'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getShopCards from '@/app/_api/card/getCards'
import ModalMain from '@/app/_components/Modal/Modal'
import RandomPointModal from '@/app/_components/Modal/RandomPointModal'
import getLastDrawTime from '@/app/_api/points/getLastDrawTime'
import gradeExtract, { gradeToType } from '@/app/_util/gradeExtract'
import getGenreNameFromType, {
  getGenreTypeFromName,
} from '@/app/_util/getGenreNameFromType'
import {
  getSoldOutNameFromType,
  getSoldOutTypeFromName,
} from '@/app/_util/getSoldOutNameFromType'
import Filter from '@/app/_components/Filter'

import styles from './CardsList.module.scss'
import FilterIcon from '/public/icons/filter.svg'
import { GenreType, ShopCardType } from '@/app/_lib/types/cardType'

export default function MarketPlaceCardList() {
  const [grade, setGrade] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [isSoldOut, setIsSoldOut] = useState('')

  const [cardPerView, setCardPerView] = useState(15)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [currentList, setCurrentList] = useState([1])
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState<string>('')
  const [isPointModalOn, setIsPointModalOn] = useState(false)
  const [isFilterModalOn, setIsFilterModalOn] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: [
      QUERY_KEYS.shopCards,
      currentPage,
      cardPerView,
      genre,
      grade,
      keyword,
      isSoldOut,
    ],
    queryFn: () =>
      getShopCards(currentPage, cardPerView, genre, grade, keyword, isSoldOut),
  })

  const { data: point } = useQuery({
    queryKey: [QUERY_KEYS.point],
    queryFn: () => getLastDrawTime(),
  })

  const handleCardClick = (cardId: string) => {
    router.push(`/${cardId}`)
  }

  const handleModalClose = () => {
    setIsPointModalOn(false)
  }
  const handleFilterModalOpen = () => {
    setIsFilterModalOn(true)
  }
  const handleFilterModalClose = () => {
    setIsFilterModalOn(false)
  }

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

  useEffect(() => {
    const oneMinute = 1000 * 60
    const oneHour = 1000 * 60 * 60 // 1시간을 밀리초 단위로 나타내는 상수
    const interval = setInterval(() => {
      if (point) {
        const lastDrawTime = new Date(point.lastDrawTime)
        const now = new Date()
        const timeDifference = now.getTime() - lastDrawTime.getTime()

        if (timeDifference >= oneHour) {
          setIsPointModalOn(true)
        }
      }
    }, oneMinute)

    return () => clearInterval(interval)
  }, [point])

  return (
    <>
      {isPointModalOn && (
        <ModalMain>
          <RandomPointModal onClose={handleModalClose} />
        </ModalMain>
      )}
      {isFilterModalOn && (
        <ModalMain>
          <Filter
            onClose={handleFilterModalClose}
            hasGenre
            hasGrade
            hasSoldOut
          />
        </ModalMain>
      )}
      <section className={styles.section}>
        <div className={styles.filterContainer}>
          <div className={styles.filterWrapper}>
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
          <div className={styles.line}></div>
          <div className={styles.orderContainer}>
            <button className={styles.button} onClick={handleFilterModalOpen}>
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
          {data && (
            <Pagination
              count={data?.pagination?.totalCount}
              handleLeftArrowClick={handleLeftArrowClick}
              handleRightArrowClick={handleRightArrowClick}
              handlePageClick={handlePageClick}
              totalPageCount={totalPageCount}
              currentList={currentList}
              currentPage={currentPage}
            />
          )}
        </div>
      </section>
    </>
  )
}
