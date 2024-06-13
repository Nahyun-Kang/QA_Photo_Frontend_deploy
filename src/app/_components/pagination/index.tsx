'use client'
import { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'

import Left from '/public/icons/left.svg'
import Right from '/public/icons/right.svg'
import Ellipsis from '/public/icons/ellipsis.svg'
import EllipsisComponent from './ellipsisComponent'

//사이즈를 프롭스로 받는다. (데이터 총 개수를)
//반응형에 따라서 LIMIT 와 페이지 개수가 달라짐
//데스크탑일 경우 데이터 총 개수를 / 15, 테블릿일 경우 총 개수 / 16
//화살표릎 누를 경우 현재 처음 리스트 인덱스에서 + 10을 해서 보여준다.
//남은 페이지가 7개 이하이면, 그냥 모든 페이지 리스트를 보여준다.

interface PaginationProps {
  count: number
  handleLeftArrowClick: () => void
  handleRightArrowClick: () => void
  handlePageClick: (el: number) => void
  currentList: number[]
  currentPage: number
  totalPageCount: number
}

export default function Pagination({
  count,
  handleLeftArrowClick,
  handlePageClick,
  handleRightArrowClick,
  currentList,
  totalPageCount,
  currentPage,
}: PaginationProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleLeftArrowClick}>
        <Left />
      </button>
      <NumberList
        list={currentList}
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onClick={handlePageClick}
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
  const [isActive, setIsActive] = useState(false)

  const handleToggleEllipsis = () => {
    setIsActive((state) => !state)
  }

  return (
    <>
      {(list && list?.length < limit) || list?.includes(totalPageCount) ? (
        <ul className={styles.listContainer}>
          {list &&
            list?.map((el) => {
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
          {list &&
            list?.slice(0, listSliceSize).map((el) => {
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
          <button
            type="button"
            className={styles.ellipsisButton}
            onClick={handleToggleEllipsis}
          >
            <Ellipsis />
            {isActive && (
              <EllipsisComponent
                list={list.slice(listSliceSize, list.length - listSliceSize)}
                onClick={onClick}
              />
            )}
          </button>
          {list &&
            list?.slice(list.length - listSliceSize, list.length).map((el) => {
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
