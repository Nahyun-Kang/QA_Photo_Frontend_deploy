const pointTostring = (point: number) => {
  if (point < 1000) {
    return point
  }

  return `${Math.floor(point / 1000)},${point % 1000}`
}

export default pointTostring
