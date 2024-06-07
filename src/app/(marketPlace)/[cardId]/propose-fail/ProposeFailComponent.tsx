'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import Result from '@/app/_components/Result'

export default function ProposeFailComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCloseButtonClick = () => {
    router.back()
  }

  const handleButtonClick = () => {
    router.push('/')
  }

  const cardName = decodeURIComponent(searchParams.get('cardname') || '')

  return (
    <div>
      <Result
        isSuccess={true}
        title={'교환 제시'}
        grade={searchParams.get('grade')}
        cardName={cardName}
        quantity={searchParams.get('quantity')}
        description="포토카드 교환 제시에 실패했습니다."
        buttonMessage="마켓플레이스로 돌아가기"
        onClick={handleButtonClick}
        onClose={handleCloseButtonClick}
      />
    </div>
  )
}
