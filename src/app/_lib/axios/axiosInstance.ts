import axios from 'axios'

import { getCookie, removeCookie, setCookie } from '@/app/_util/cookie'
import getNewAccessToken from '@/app/_api/auth/refreshToken'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
})

//요청 시, accessToken 쿠키에서 꺼내 쓰기
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    console.log(error)
  },
)

let isRefreshing = false

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = getCookie('refreshToken')

    if (error.response?.status === 401) {
      if (!isRefreshing && refreshToken === undefined) {
        removeCookie('accessToken')
        removeCookie('refreshToken')

        isRefreshing = true
      }

      if (!isRefreshing) {
        isRefreshing = true

        try {
          const result = await getNewAccessToken()
          const newAccessToken = result?.data.newAccessToken
          setCookie('accessToken', newAccessToken, 'access')
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`
        } catch (error) {
          removeCookie('accessToken')
          removeCookie('refreshToken')
        } finally {
          isRefreshing = true
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
