import axiosInstance from '@/app/_lib/axios/axiosInstance'

const proposeExchange = async (exchangeId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/cards/${exchangeId}/exchange`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      console.log(response.data)
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default proposeExchange
