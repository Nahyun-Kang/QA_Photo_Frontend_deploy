interface PageNameType {
  [key: string]: string
}

const PAGE_NAMES: PageNameType = {
  '/mygallery': '마이갤러리',
  '/mygallery/create-card': '포토카드 생성',
  '/mygallery/create-card/success': '',
  '/mygallery/create-card/fail': '',
  '/mycards': '나의 판매 포토카드',
  '/myexchangecards': '나의 교환 포토카드',
}

export default PAGE_NAMES
