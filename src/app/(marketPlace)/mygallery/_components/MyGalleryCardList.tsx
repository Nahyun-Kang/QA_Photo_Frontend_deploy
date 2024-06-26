'use client'
import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import SearchInput from '@/app/_components/SearchInput'
import Dropdown from '@/app/_components/Dropdown'
import { GRADE_LIST, GENRE_LIST } from '@/app/_constants/listConstants'
import MyCard from '@/app/_components/Card/MyCard'
import Pagination from '@/app/_components/pagination'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getMyCards from '@/app/_api/card/getMyCards'
import { MyGalleryCardType } from '@/app/_lib/types/cardType'
import gradeExtract, { gradeToType } from '@/app/_util/gradeExtract'
import getGenreNameFromType, {
  getGenreTypeFromName,
} from '@/app/_util/getGenreNameFromType'
import OwnedCards from './OwnedCards'
import { GradeType } from '@/app/_lib/types/cardType'
import ModalMain from '@/app/_components/Modal/Modal'
import Filter from '@/app/_components/Filter'

import styles from '@/app/(marketPlace)/mygallery/_components/mygalleryCardList.module.scss'
import FilterIcon from '/public/icons/filter.svg'
import { GenreType } from '@/app/_lib/types/cardType'
import getProfile from '@/app/_api/profile/getProfile'

interface GradeListType {
  grade: GradeType
  count?: number
}

/*Todo
  인풋 디바운스 걸기
  필터 연동
*/
export default function MyGalleryCardList() {
  const [grade, setGrade] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const queryClient = useQueryClient()

  const [cardPerView, setCardPerView] = useState(15)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [currentList, setCurrentList] = useState([1])
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState<string>('')
  const [cardCountList, setCardCountList] = useState<GradeListType[]>([])
  const [isFilterModalOn, setIsFilterModalOn] = useState(false)

  const handleFilterModalOpen = () => {
    setIsFilterModalOn(true)
  }
  const handleFilterModalClose = () => {
    setIsFilterModalOn(false)
  }
  const { data } = useQuery({
    queryKey: [
      QUERY_KEYS.myCards,
      currentPage,
      cardPerView,
      genre,
      grade,
      keyword,
    ],
    queryFn: () => {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.userProfile],
        queryFn: getProfile,
      })
      return getMyCards(currentPage, cardPerView, genre, grade, keyword)
    },
  })

  const { data: userProfileData } = useQuery({
    queryKey: [QUERY_KEYS.userProfile],
    queryFn: getProfile,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEYS.userProfile])
    },
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

  useEffect(() => {
    if (data) {
      const newCardCountList: GradeListType[] = [
        { grade: 'COMMON', count: data.cardCount.commonCount },
        { grade: 'RARE', count: data.cardCount.rareCount },
        { grade: 'SUPER_RARE', count: data.cardCount.superRareCount },
        { grade: 'LEGENDARY', count: data.cardCount.legendaryCount },
      ]
      setCardCountList(newCardCountList)
    }
  }, [data])

  return (
    <>
      {isFilterModalOn && (
        <ModalMain>
          <Filter onClose={handleFilterModalClose} hasGenre hasGrade />
        </ModalMain>
      )}
      <section className={styles.section}>
        {data && (
          <OwnedCards
            cardCountList={cardCountList}
            userName={userProfileData?.nickname}
            totalCount={data?.cardCount?.totalCount}
          />
        )}
        <div className={styles.filterContainer}>
          <div className={styles.filterWrapper}>
            <button className={styles.button} onClick={handleFilterModalOpen}>
              <FilterIcon width={20} height={20} />
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
