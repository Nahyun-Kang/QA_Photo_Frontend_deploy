import { GradeType } from '@/app/_lib/types/cardType'

interface ExchangeCardListType {
  cardName: string
  grade: GradeType
  genre: string
  message: string
  maker: string
  price: number
}

const EXCHANGE_CARD_MOCK: ExchangeCardListType[] = [
  {
    cardName: '스페인 여행',
    grade: 'common',
    genre: '풍경',
    message:
      '스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!',
    maker: '프로여행러',
    price: 4,
  },
  {
    cardName: `HOW FAR I'll GO`,
    grade: 'super_rare',
    genre: '랍스타',
    message: '여름 바다 풍경 사진과 교환하실래요?',
    maker: '랍스타',
    price: 4,
  },
]

export default EXCHANGE_CARD_MOCK
