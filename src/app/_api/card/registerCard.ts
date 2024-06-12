import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { GradeType, GenreType } from '@/app/_lib/types/cardType'

interface RegisterCardParams {
  cardId: string
  sellingQuantity: number
  sellingPrice: number
  wishExchangeGenre: GenreType
  wishExchangeGrade: GradeType
  wishExchageDescription: string
}

const registerCard = async (data: RegisterCardParams) => {
  const {
    cardId,
    sellingQuantity,
    sellingPrice,
    wishExchangeGenre,
    wishExchangeGrade,
    wishExchageDescription,
  } = data

  try {
    const response = await axiosInstance.post<RegisterCardParams>(
      '/api/shop/cards',
      {
        cardId,
        sellingQuantity,
        sellingPrice,
        wishExchangeGrade,
        wishExchangeGenre,
        wishExchageDescription,
      },
    )

    if (response.status === 201) {
      return response.data
    }
  } catch (error: any) {
    error.response.data.message
    return null
  }
}

export default registerCard
