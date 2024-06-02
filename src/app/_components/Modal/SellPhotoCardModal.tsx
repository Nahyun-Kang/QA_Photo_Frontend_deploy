'use client'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'

export default function SellPhotoCardModal() {
  return (
    <div>
      <div>
        <div>마이갤러리</div>
        <Title>
          <div>나의 포토카드 판매하기</div>
        </Title>
        <div>
          <SearchInput />
          <Dropdown />
          <Dropdown />
        </div>
        <div>카드리스트</div>
      </div>
    </div>
  )
}
