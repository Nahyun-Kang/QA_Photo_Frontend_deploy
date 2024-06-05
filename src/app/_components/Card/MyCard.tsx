import Card from './CardComponents'
import { MyCardType } from '@/app/_lib/types/cardType'

export default function MyCard({
  imageUrl,
  nickName,
  id,
  userId,
  name,
  price,
  grade,
  genre,
  remainingQuantity,
}: MyCardType) {
  return (
    <Card>
      <Card.CardContainer>
        <Card.image imageUrl={imageUrl} />
        <Card.information
          title={name}
          maker={nickName}
          grade={grade}
          genre={genre}
        />
        <Card.QuantityContainer>
          <Card.Price price={price} />
          <Card.Quantity quantity={remainingQuantity} />
        </Card.QuantityContainer>
        <Card.Logo />
      </Card.CardContainer>
    </Card>
  )
}
