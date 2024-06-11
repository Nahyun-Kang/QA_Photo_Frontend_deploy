import Card from './CardComponents'
import { OriginalCardType } from '@/app/_lib/types/cardType'

export default function OriginalCard({
  image,
  nickName,
  id,
  name,
  price,
  grade,
  genre,
  totalQuantity,
  remainingQuantity,
  createdDate,
  updatedDate,
}: OriginalCardType) {
  return (
    <Card>
      <Card.CardContainer>
        <Card.image imageUrl={image} isSoldOut={remainingQuantity === 0} />
        <Card.information
          title={name}
          maker={nickName}
          grade={grade}
          genre={genre}
        />
        <Card.QuantityContainer>
          <Card.Price price={price} />
          <Card.Remain
            remainingQuantity={remainingQuantity}
            totalQuantity={totalQuantity}
          />
        </Card.QuantityContainer>
        <Card.Logo />
      </Card.CardContainer>
    </Card>
  )
}
