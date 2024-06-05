import Card from './CardComponents'
import { CardForSaleType } from '@/app/_lib/types/cardType'

export default function CardForSale({
  imageUrl,
  nickName,
  id,
  userId,
  name,
  price,
  grade,
  genre,
  registeredQuantity,
  method,
}: CardForSaleType) {
  return (
    <Card>
      <Card.CardContainer>
        <Card.image imageUrl={imageUrl} hasChip={true} chip={method} />
        <Card.information
          title={name}
          maker={nickName}
          grade={grade}
          genre={genre}
        />
        <Card.QuantityContainer>
          <Card.Price price={price} />
          <Card.Quantity quantity={registeredQuantity} />
        </Card.QuantityContainer>
        <Card.Logo />
      </Card.CardContainer>
    </Card>
  )
}
