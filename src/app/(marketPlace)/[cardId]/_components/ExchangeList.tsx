import Title from '@/app/_components/Title'

import styles from './exchangeList.module.scss'
import ExchangeCard from '@/app/_components/Card/ExchangeCard'

import EXCHANGE_CARD_MOCK from './EXCHANGE_CARD_MOCK'

interface ExchangeListProps {
  type: 'buyer' | 'seller'
}

export default function ExchangeList({ type }: ExchangeListProps) {
  const list = EXCHANGE_CARD_MOCK

  return (
    <div className={styles.exchangeWrapper}>
      <Title>
        <div className={styles.exchangeTitle}>
          {type === 'seller' ? '교환 제시 목록' : '내가 제시한 교환 목록'}
        </div>
      </Title>
      {type === 'seller' ? (
        <ul className={styles.listWrapper}>
          {list?.map((el, idx) => {
            return (
              <li key={idx.toString()}>
                <ExchangeCard
                  type="seller"
                  name={el.cardName}
                  grade={el.grade}
                  genre={el.genre}
                  description={el.message}
                  nickName={el.maker}
                  id={1}
                  userId={1}
                  price={el.price}
                  createdDate="2024-01-01"
                  updatedDate="2024-01-01"
                  imageUrl="/images/image2.png"
                />
              </li>
            )
          })}
        </ul>
      ) : (
        <ul className={styles.listWrapper}>
          {list?.map((el, idx) => {
            return (
              <li key={idx.toString()}>
                <ExchangeCard
                  type="buyer"
                  name={el.cardName}
                  grade={el.grade}
                  genre={el.genre}
                  description={el.message}
                  nickName={el.maker}
                  id={1}
                  userId={1}
                  price={el.price}
                  createdDate="2024-01-01"
                  updatedDate="2024-01-01"
                  imageUrl="/images/image2.png"
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
