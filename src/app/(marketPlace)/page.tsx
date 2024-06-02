'use client'
import Link from 'next/link'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'

import styles from './page.module.scss'
import MarketPlaceCardList from './_components/CardsList'
import ModalMain from '../_components/Modal/Modal'
import BasicModal from '../_components/Modal/BasicModal'
import Profile from '../_components/Profile'

export default function Home() {
  const handleButtonClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.section}>
          <div className={styles.titleWrapper}>
            <Title>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>마켓플레이스</h2>
                <div className={styles.buttonContainer}>
                  <Button thickness="thin">나의 포토카드 판매하기</Button>
                </div>
              </div>
            </Title>
          </div>
          <MarketPlaceCardList />
        </div>
        <div className={styles.floatButtonContainer}>
          <Button thickness="thin">포토카드 생성하기</Button>
        </div>
      </main>
    </>
  )
}
