import axiosInstance from '@/app/_lib/axios/axiosInstance'

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1
}

const luckyDraw = async () => {
  const RANDOM_NUMBER = getRandomNumber()
  try {
    const response = await axiosInstance.post(`/api/points/box`, {
      randomPoints: RANDOM_NUMBER,
    })

    if (response.status === 201) {
      console.log(response.data)
      return response.data
    }
  } catch (error: any) {
    console.log(error.response.data.message)
    return null
  }
}

export default luckyDraw
