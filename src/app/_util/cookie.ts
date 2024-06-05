import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (
  name: string,
  value: string,
  type: 'access' | 'refresh',
) => {
  return cookies.set(name, value, {
    path: '/',
    secure: true,
    maxAge: type === 'access' ? 60 * 30 : 60 * 60 * 24,
  })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: '/' })
}
