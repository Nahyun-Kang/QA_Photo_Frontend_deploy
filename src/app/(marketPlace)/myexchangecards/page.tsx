import Title from '@/app/_components/Title'

import styles from '@/app/(marketPlace)/mycards/page.module.scss'

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
      <MyExchangeCardList />
    </main>
  )
}
