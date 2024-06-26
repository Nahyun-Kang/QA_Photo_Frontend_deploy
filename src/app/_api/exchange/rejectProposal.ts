import axiosInstance from '@/app/_lib/axios/axiosInstance'

const rejectProposal = async (exchangeId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/cards/${exchangeId}/exchange/refuse`,
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

export default rejectProposal
