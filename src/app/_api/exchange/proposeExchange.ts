import axiosInstance from '@/app/_lib/axios/axiosInstance'

const proposeExchange = async (
  exchangeId: string,
  offeredId: string,
  requestMessage: string,
) => {
  try {
    const response = await axiosInstance.post(
      `/api/cards/${exchangeId}/exchange`,
      {
        offeredId,
        requestMessage,
      },
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
