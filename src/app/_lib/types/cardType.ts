export type GradeType = 'COMMON' | 'RARE' | 'SUPER_RARE' | 'LEGENDARY'
export type GenreType = 'TRIP' | 'PORTRAIT' | 'OBJECT' | 'LANDSCAPE'

export interface CardType {
  id: number
  userId: number
  name: string
  price: number
  grade: GradeType
  genre: GenreType
  description: string
  totalQuantity: number
  remainingQuantity: number
  createdDate: string
  updatedDate: string
}

type InformationDetailType = {
  imageUrl: string
  nickName: string
}

export type OriginalCardType = Omit<CardType, 'description'> &
  InformationDetailType

export type MyCardType = Omit<CardType, 'description' | 'totalQuantity'> &
  InformationDetailType

export type CardForSaleType = Omit<
  CardType,
  'totalQuantity' | 'remainingQuantity' | 'description'
> &
  InformationDetailType & {
    registeredQuantity: number
    method: 'sale' | 'exchange'
  }

export type ExchangeCardType = Omit<
  CardType,
  'totalQuantity' | 'remainingQuantity'
> &
  InformationDetailType & {
    type?: 'seller' | 'buyer'
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
  id: string;
  image: string;
  grade: GradeType
  genre: GenreType
  name: string;
  price: number
  totalQuantity: number
  remainingQuantity: number
  isSoldOut: boolean
  seller_nickname: string
}