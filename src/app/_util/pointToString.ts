const pointTostring = (point: number) => {
  return `${Math.floor(point / 1000)},${point % 1000}`
}

export default pointTostring
