import axiosInstance from '@/app/_lib/axios/axiosInstance'

const cancelProposal = async (exchangeId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/cards/${exchangeId}/exchange`,
    )

    if (response.status === 204) {
      console.log(response.data)
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default cancelProposal
