export const getSoldOutNameFromType = (isSoldOut: string): string => {
  let soldOut: string

  switch (isSoldOut) {
    case 'true':
      soldOut = '판매 완료'
      break
    case 'false':
      soldOut = '판매 중'
      break
    default:
      soldOut = ''
  }

  return soldOut
}

export const getSoldOutTypeFromName = (name: string): string => {
  let type: string

  switch (name) {
    case '판매 완료':
      type = 'true'
      break
    case '판매 중':
      type = 'false'
      break
    default:
      type = ''
  }

  return type
}
