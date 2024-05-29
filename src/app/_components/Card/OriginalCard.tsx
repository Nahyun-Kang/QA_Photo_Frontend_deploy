import Card from './CardComponents'
import { OriginalCardType } from '@/app/_lib/CardType'

export default function OriginalCard({
  imageUrl,
  nickName,
  id,
  userId,
  name,
  price,
  grade,
  genre,
  totalQuantity,
  remainingQuantity,
}: OriginalCardType) {
  return (
    <Card>
      <Card.image imageUrl={imageUrl} isSoldOut={remainingQuantity === 0} />
      <Card.information
        title={name}
        maker={nickName}
        grade={grade}
        genre={genre}
      />
      <Card.QuantityContainer>
        <Card.Price price={price} />
        <Card.Remain remain={remainingQuantity} totalQuantity={totalQuantity} />
      </Card.QuantityContainer>
      <Card.Logo />
    </Card>
  )
}
