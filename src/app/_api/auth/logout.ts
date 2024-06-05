import axiosInstance from '@/app/_lib/axios/axiosInstance'

const logout = async () => {
  try {
    const response = await axiosInstance.post('/api/auth/logout')

    if (response.status === 200) {
      return response
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default logout
