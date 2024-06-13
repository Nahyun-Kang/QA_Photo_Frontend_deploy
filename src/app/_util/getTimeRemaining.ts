const getTimeRemaining = (endTime: any) => {
  const total = endTime - Date.now()
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  return {
    total,
    minutes,
    seconds,
  }
}

export default getTimeRemaining
