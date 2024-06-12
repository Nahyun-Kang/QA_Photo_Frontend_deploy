import axiosInstance from '@/app/_lib/axios/axiosInstance'

const unregisterCard = async (shopId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/shop/cards/${shopId}`)

    if (response.status === 201) {
      console.log(response.data)
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default unregisterCard
