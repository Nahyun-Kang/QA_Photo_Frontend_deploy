const getGenreNameFromType = (type: string): string => {
  let genreName: string

  switch (type) {
    case 'TRIP':
      genreName = '여행'
      break
    case 'LANDSCAPE':
      genreName = '풍경'
      break
    case 'PORTRAIT':
      genreName = '인물'
      break
    case 'OBJECT':
      genreName = '사물'
      break
    default:
      genreName = ''
  }

  return genreName
}

export default getGenreNameFromType

export const getGenreTypeFromName = (name: string): string => {
  let type: string

  switch (name) {
    case '여행':
      type = 'TRIP'
      break
    case '풍경':
      type = 'LANDSCAPE'
      break
    case '인물':
      type = 'PORTRAIT'
      break
    case '사물':
      type = 'OBJECT'
      break
    default:
      type = ''
  }

  return type
}
