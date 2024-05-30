import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/cardType'
import CardDetail from './CardDetailComponents'

import styles from './CardSeller.module.scss'
import ExchangeIcon from '/public/icons/exchange.svg'

interface CardSellerProps {
  genre: string
  grade: GradeType
  maker: string
  description: string
  price: number
  remainingQuantity: number
  totalQuantity: number
  expectedGrade: GradeType
  expectedGenre: string
  expectedContent: string
}

export default function CardSeller({ ...props }: CardSellerProps) {
  return (
    <CardDetail>
      <CardDetail.CardDetailInformation
        genre={props.genre}
        grade={props.grade}
        maker={props.maker}
      />
      <CardDetail.BottomLine />
      <CardDetail.Description description={props.description} />
      <CardDetail.BottomLine />
      <CardDetail.DetailQuantityContainer
        price={props.price}
        remainingQuantity={props.remainingQuantity}
        totalQuantity={props.totalQuantity}
      />
      <div className={styles.exchange_title_container}>
        <div className={styles.exchange_title_wrapper}>
          <ExchangeIcon />
          <div className={styles.exchange_title}>교환 희망 정보</div>
        </div>
        <div className={styles.section_line}></div>
      </div>
      <CardDetail.CardDetailInformation
        genre={props.expectedGenre}
        grade={props.expectedGrade}
      />
      <CardDetail.BottomLine />
      <CardDetail.Description description={props.expectedContent} />
      <div className={styles.buttonContainer}>
        <Button>수정하기</Button>
        <Button buttonStyle="secondary">판매 내리기</Button>
      </div>
    </CardDetail>
  )
}
