import axiosInstance from '@/app/_lib/axios/axiosInstance'

const getNotification = async () => {
  try {
    const response = await axiosInstance.get('/api/notifications')

    return response.data // response.data를 반환하여 실제 데이터를 반환합니다.
  } catch (error: any) {
    console.log(error.response?.data?.message || error.message)
    return null // 에러 발생 시 null을 반환합니다.
  }
}

export default getNotification
