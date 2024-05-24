'use client'
import { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'

import Left from '/public/icons/left.svg'
import Right from '/public/icons/right.svg'

//사이즈를 프롭스로 받는다. (데이터 총 개수를)
//반응형에 따라서 LIMIT 와 페이지 개수가 달라짐
//데스크탑일 경우 데이터 총 개수를 / 15, 테블릿일 경우 총 개수 / 16
//화살표릎 누를 경우 현재 처음 리스트 인덱스에서 + 10을 해서 보여준다.
//남은 페이지가 7개 이하이면, 그냥 모든 페이지 리스트를 보여준다.

interface PaginationProps {
  count: number
}

export default function Pagination({ count }: PaginationProps) {
  const [cardPerView, setCardPerView] = useState(15)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [currentList, setCurrentList] = useState([1])
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageCLick = (el: number) => {
    setCurrentPage(el)
    if (currentList.includes(totalPageCount)) {
      return
    }
    const newArray = new Array(10)
      .fill(el)
      .map((_, i) => i + el)
      .filter((el) => el <= totalPageCount)

    setCurrentList([...newArray])
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
    handleTotalPageCount(count)
    handleInitialCurrentList()
  }, [totalPageCount, cardPerView])

  useEffect(() => {
    updateCardCount()
    window.addEventListener('resize', updateCardCount)

    return () => {
      window.removeEventListener('resize', updateCardCount)
    }
  }, [])

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleLeftArrowClick}>
        <Left />
      </button>
      <NumberList
        list={currentList}
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onClick={handlePageCLick}
      />
      <button>
        <Right className={styles.button} onClick={handleRightArrowClick} />
      </button>
    </div>
  )
}

interface NumberListProps {
  list: number[]
  currentPage: number
  totalPageCount: number
  onClick: (el: number) => void
}

function NumberList({
  list,
  currentPage,
  onClick,
  totalPageCount,
}: NumberListProps) {
  const listSliceSize = 3
  const limit = 7

  return (
    <>
      {list.length < limit || list.includes(totalPageCount) ? (
        <ul className={styles.listContainer}>
          {list.map((el) => {
            return (
              <li
                key={el}
                className={`${styles.listItem} ${el === currentPage && styles.currentPage}`}
                onClick={() => onClick(el)}
              >
                {el}
              </li>
            )
          })}
        </ul>
      ) : (
        <ul className={styles.listContainer}>
          {list.slice(0, listSliceSize).map((el) => {
            return (
              <li
                key={el}
                className={`${styles.listItem} ${el === currentPage && styles.currentPage}`}
                onClick={() => onClick(el)}
              >
                {el}
              </li>
            )
          })}
          <span className={styles.text}>...</span>
          {list.slice(list.length - listSliceSize, list.length).map((el) => {
            return (
              <li
                key={el}
                className={`${styles.listItem} ${el === currentPage && styles.currentPage}`}
                onClick={() => onClick(el)}
              >
                {el}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
