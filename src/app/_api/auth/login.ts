import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { LoginType } from '@/app/_lib/types/authType'

interface LoginParams {
  email: string
  password: string
}

const login = async (data: LoginParams) => {
  const { email, password } = data

  try {
    const response = await axiosInstance.post<LoginType>('/api/auth/login', {
      email,
      password,
    })

    if (response.status === 200) {
      return response
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default login
