import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { GradeType, GenreType } from '@/app/_lib/types/cardType'

interface CreateCardParams {
  image: File
  name: string
  price: number
  grade: GradeType
  genre: GenreType
  description: string
  totalQuantity: number
}

const createCard = async (data: CreateCardParams) => {
  const { image, name, price, grade, genre, description, totalQuantity } = data

  try {
    const response = await axiosInstance.post<CreateCardParams>(
      '/api/users/my-cards',
      {
        image,
        name,
        price,
        grade,
        genre,
        description,
        totalQuantity,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 여기에 Content-Type을 지정합니다.
        },
      },
    )

    if (response.status === 201) {
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default createCard
