import Link from 'next/link'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'

import styles from './page.module.scss'
import OwnedCards from '@/app/(marketPlace)/mygallery/_components/OwnedCards'

import MyCardsCardList from './_components/MyCardsCardList'

export default function MyCardsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.titleWrapper}>
        <Title>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>나의 판매 포토카드</h2>
          </div>
        </Title>
      </div>
      <MyCardsCardList />
    </main>
  )
}
