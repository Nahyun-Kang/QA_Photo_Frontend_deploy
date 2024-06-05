import { CardCountType } from './cardType'

export interface UserProfileType {
  id: number
  email: string
  nickname: string
  points: number
  createdAt: string
  updatedAt: string
  cardCount: CardCountType
}
