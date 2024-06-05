import axiosInstance from '@/app/_lib/axios/axiosInstance'
import { SignupType } from '@/app/_lib/types/authType'

interface SignupParams {
  email: string
  nickname: string
  password: string
}

const signup = async (data: SignupParams) => {
  const { email, password, nickname } = data

  try {
    const response = await axiosInstance.post<SignupType>('/api/auth/signup', {
      email,
      nickname,
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

export default signup
