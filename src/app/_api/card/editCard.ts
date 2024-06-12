import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { GradeType, GenreType } from '@/app/_lib/types/cardType'
import { gradeToType } from '@/app/_util/gradeExtract'
import { GENRE } from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'

export interface EditCardType {
  cardId: string
  sellingQuantity: number
  sellingPrice: number
  wishExchangeGenre: GenreType
  wishExchangeGrade: GradeType
  wishExchageDescription: string
}

const editCard = async (params: EditCardType) => {
  const getKeyByValue = (obj: any, value: any) => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }

  const {
    cardId,
    sellingQuantity,
    sellingPrice,
    wishExchangeGenre,
    wishExchangeGrade,
    wishExchageDescription,
  } = params

  try {
    const response = await axiosInstance.put(`/api/shop/cards/${cardId}`, {
      sellingQuantity,
      sellingPrice,
      wishExchangeGrade: gradeToType(wishExchangeGrade) as GradeType,
      wishExchangeGenre: getKeyByValue(GENRE, wishExchangeGenre) as GenreType,
      wishExchageDescription,
    })

    if (response.status === 201) {
      return response.data
    }
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return null
  }
}

export default editCard
