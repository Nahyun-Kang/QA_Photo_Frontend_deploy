import { GenreType } from '../_lib/types/cardType'

const getGenreNameFromType = (type: GenreType): string => {
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
      genreName = '사물'
  }

  return genreName
}

export default getGenreNameFromType
