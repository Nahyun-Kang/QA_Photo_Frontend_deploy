import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { ShopCardType } from '@/app/_lib/types/cardType'

const getShopCards = async (
  page = 1,
  size = 16,
  genre: string,
  grade: string,
  keyword: string,
  isSoldOut: string,
) => {
  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(genre && { genre }), // Add genre only if it has a value
    ...(grade && { grade }),
    ...(keyword && { keyword }),
    ...(isSoldOut && { isSoldOut }),
  }

  if (grade) {
    params.grade = grade
  }

  const query = new URLSearchParams(params).toString()
  try {
    const response = await axiosInstance.get(`/api/shop/cards?${query}`)

    return response.data // response.data를 반환하여 실제 데이터를 반환합니다.
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return null // 에러 발생 시 null을 반환합니다.
  }
}

export default getShopCards
