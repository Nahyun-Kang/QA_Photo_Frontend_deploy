import { atom } from 'jotai'

interface UserProfileType {
  email: string
  nickname: string
  points: number
}

const userProfile = atom<UserProfileType>({
  email: '',
  nickname: '',
  points: 0,
})

export default userProfile
