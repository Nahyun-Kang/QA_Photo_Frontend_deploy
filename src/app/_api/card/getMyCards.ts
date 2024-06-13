import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { GenreType, MyGalleryCardType } from '@/app/_lib/types/cardType'

const getMyCards = async (
  page = 1,
  size = 16,
  genre: string,
  grade: string,
  keyword: string,
) => {
  try {
    const params = {
      page: page.toString(),
      size: size.toString(),
      ...(genre && { genre }), // Add genre only if it has a value
      ...(grade && { grade }),
      ...(keyword && { keyword }),
    }

    if (grade) {
      params.grade = grade
    }

    const query = new URLSearchParams(params).toString()
    const response = await axiosInstance.get(`/api/users/my-cards?${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = response.data
    return data
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return null // 에러 발생 시 null을 반환합니다.
  }
}

export default getMyCards
