import Title from '@/app/_components/Title'

import styles from './exchangeList.module.scss'
import ExchangeCard from '@/app/_components/Card/ExchangeCard'

import EXCHANGE_CARD_MOCK from './EXCHANGE_CARD_MOCK'
import { GenreType, GradeType } from '@/app/_lib/types/cardType'

interface ExchangeListType {
  exchangeId: string
  genre: GenreType
  grade: GradeType
  image: string
  name: string
  nickname: string
  price: number
  requestMessage: string
}
interface ExchangeListProps {
  type: 'buyer' | 'seller'
  list: ExchangeListType[]
}

export default function ExchangeList({ type, list }: ExchangeListProps) {
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
                  name={el.name}
                  grade={el.grade}
                  genre={el.genre}
                  requestMessage={el.requestMessage}
                  nickName={el.nickname}
                  id={el.exchangeId}
                  price={el.price}
                  image={el.image}
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
                  name={el.name}
                  grade={el.grade}
                  genre={el.genre}
                  requestMessage={el.requestMessage}
                  nickName={el.nickname}
                  id={el.exchangeId}
                  price={el.price}
                  image={el.image}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
