export type GradeType = 'COMMON' | 'RARE' | 'SUPER_RARE' | 'LEGENDARY'
export type GenreType = 'TRIP' | 'PORTRAIT' | 'OBJECT' | 'LANDSCAPE'

export interface CardType {
  id: string
  name: string
  price: number
  grade: GradeType
  genre: GenreType
  description: string
  totalQuantity: number
  remainingQuantity?: number
  createdDate?: string
  updatedDate?: string
}

type InformationDetailType = {
  image: string
  nickName: string
}

export type OriginalCardType = Omit<CardType, 'description'> &
  InformationDetailType

export type MyCardType = Omit<CardType, 'description'> & InformationDetailType

export type CardForSaleType = Omit<
  CardType,
  'totalQuantity' | 'remainingQuantity' | 'description'
> &
  InformationDetailType & {
    registeredQuantity: number
    method: 'sale' | 'exchange'
  }

export interface ExchangeCardType {
  type: 'seller' | 'buyer'
  name: string
  grade: GradeType
  genre: GenreType
  requestMessage: string
  nickName: string
  id: string
  price: number
  image: string
}

export interface CardListType {
  list: CardListType[]
}

export interface CardCountType {
  totalCount: number
  commonCount: number
  rareCount: number
  superRareCount: number
  legendaryCount: number
}

export interface ShopCardType {
  id: string
  image: string
  grade: GradeType
  genre: GenreType
  name: string
  price: number
  totalQuantity: number
  remainingQuantity: number
  isSoldOut: boolean
  seller_nickname: string
}

export interface MyGalleryCardType {
  id: string
  image: string
  grade: GradeType
  genre: GenreType
  name: string
  totalQuantity: number
  price: number
  user: {
    nickname: string
  }
}
