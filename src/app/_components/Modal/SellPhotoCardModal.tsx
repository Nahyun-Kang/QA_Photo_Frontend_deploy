'use client'
import { useEffect } from 'react'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'
import MyCard from '../Card/MyCard'
import { CARDS_LIST } from '@/app/(marketPlace)/CARD_LISTS'

import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'

import styles from './sellPhotoCard.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'

export default function SellPhotoCardModal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Close width={32} height={32} className={styles.closeIcon} />
        <MobileBar className={styles.mobileBar} />
        <div>
          <div className={styles.myGallery}>마이갤러리</div>
          <Title>
            <div className={styles.title}>나의 포토카드 판매하기</div>
          </Title>
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
        </div>
      </div>
    </div>
  )
}
