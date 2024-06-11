import axiosInstance from '@/app/_lib/axios/axiosInstance'

const purchaseCard = async (shopId: string, purchaseQuantity: number) => {
  try {
    const response = await axiosInstance.post(
      `/api/shop/cards/${shopId}/purchase`,
      {
        purchaseQuantity,
      },
    )

    if (response.status === 201) {
      console.log(response.data)
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default purchaseCard
