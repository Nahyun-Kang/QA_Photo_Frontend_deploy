import Card from './CardComponents'
import Button from '@/app/_components/Button'

import { ExchangeCardType } from '@/app/_lib/CardType'

import styles from './Card.module.scss'

export default function ExchangeCard({
  imageUrl,
  nickName,
  id,
  userId,
  name,
  grade,
  genre,
  description,
}: ExchangeCardType) {
  return (
    <Card>
      <Card.image imageUrl={imageUrl} />
      <Card.information
        title={name}
        maker={nickName}
        grade={grade}
        genre={genre}
      />
      <Card.Description description={description} />
      <Card.Logo />
      <div className={styles.buttonContainer}>
        <Button thickness="mini" buttonStyle="secondary">
          거절하기
        </Button>
        <Button thickness="mini">승인하기</Button>
      </div>
    </Card>
  )
}
