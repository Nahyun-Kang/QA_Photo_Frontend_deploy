import axiosInstance from '@/app/_lib/axios/axiosInstance'

const getCardDetail = async (cardId: string) => {
  try {
    const response = await axiosInstance.get(`/api/shop/cards/${cardId}`)

    return response.data // response.data를 반환하여 실제 데이터를 반환합니다.
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return {}
  }
}

export default getCardDetail
