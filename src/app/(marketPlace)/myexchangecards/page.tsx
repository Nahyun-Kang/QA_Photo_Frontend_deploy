import Link from 'next/link'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'

import styles from '@/app/(marketPlace)/mycards/page.module.scss'
import OwnedCards from '@/app/(marketPlace)/mygallery/_components/OwnedCards'

import { MOCK_GRADELIST } from '@/app/(marketPlace)/mygallery/MOCK_DATA'
import MyExchangeCardList from './_components/MyExchangeCardList'

export default function MyExchangeCardsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.titleWrapper}>
        <Title>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>나의 교환 포토카드</h2>
          </div>
        </Title>
      </div>
      <OwnedCards />
      <MyExchangeCardList />
    </main>
  )
}
