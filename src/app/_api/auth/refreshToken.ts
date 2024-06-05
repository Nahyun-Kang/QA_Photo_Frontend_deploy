import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { getCookie } from '@/app/_util/cookie'

const getNewAccessToken = async () => {
  const refreshToken = getCookie('refreshToken')

  try {
    const response = await axiosInstance.post('/api/auth/refresh', {
      refreshToken,
    })

    if (response.status === 200) {
      return response
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default getNewAccessToken
