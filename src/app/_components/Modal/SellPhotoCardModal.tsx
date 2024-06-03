'use client'

import Title from '@/app/_components/Title'
import SearchInput from '../SearchInput'
import Dropdown from '../Dropdown'

import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'
import Close from '/public/icons/close.svg'

export default function SellPhotoCardModal() {
  return (
    <div>
      <Close width={32} height={32} />
      <div>
        <div>마이갤러리</div>
        <Title>
          <div>나의 포토카드 판매하기</div>
        </Title>
        <div>
          <SearchInput />
          <Dropdown attribute="등급" list={GRADE_LIST} />
          <Dropdown attribute="장르" list={GENRE_LIST} />
        </div>
        <div>카드리스트 컴포넌트</div>
      </div>
    </div>
  )
}
