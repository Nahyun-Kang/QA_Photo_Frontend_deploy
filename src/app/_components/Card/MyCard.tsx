import Card from './CardComponents'
import { MyCardType } from '@/app/_lib/types/cardType'

export default function MyCard({
  image,
  nickName,
  id,
  name,
  price,
  grade,
  genre,
  totalQuantity,
}: MyCardType) {
  return (
    <Card>
      <Card.CardContainer>
        <Card.image imageUrl={image} />
        <Card.information
          title={name}
          maker={nickName}
          grade={grade}
          genre={genre}
        />
        <Card.QuantityContainer>
          <Card.Price price={price} />
          <Card.Quantity quantity={totalQuantity} />
        </Card.QuantityContainer>
        <Card.Logo />
      </Card.CardContainer>
    </Card>
  )
}
