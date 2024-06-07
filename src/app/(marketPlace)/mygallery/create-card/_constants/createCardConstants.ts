export const PLACEHOLDER = {
  name: '포토카드 이름을 입력해 주세요',
  grade: '등급을 선택해 주세요',
  genre: '장르를 선택해 주세요',
  price: '가격을 입력해 주세요',
  totalQuantity: '총 발행량을 입력해 주세요',
  file: '사진 업로드',
  description: '카드 설명을 입력해 주세요',
}

export const ERROR_MESSAGE = {
  cardnameRequired: '포토카드 이름은 공란이 될 수 없습니다',
  cardnameInvalid: '포토카드 이름은 10자 이내로 생성할 수 있습니다',
}

export const CARDNAME_RULES = {
  required: ERROR_MESSAGE.cardnameRequired,
  maxLength: { value: 10, message: ERROR_MESSAGE.cardnameInvalid },
}

export const GENRE = {
  TRIP: '여행',
  PORTRAIT: '인물',
  OBJECT: '사물',
  LANDSCAPE: '풍경',
}
export const GRADE = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']
