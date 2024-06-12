import axiosInstance from '@/app/_lib/axios/axiosInstance'

const getExchangeCards = async (page = 1, size = 15) => {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    }).toString()
    const response = await axiosInstance.get(
      `/api/users/my-cards/exchange?${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    return data
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return null // 에러 발생 시 null을 반환합니다.
  }
}

export default getExchangeCards
