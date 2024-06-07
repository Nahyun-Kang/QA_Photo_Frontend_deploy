'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import Result from '@/app/_components/Result'

export default function RegisterSuccessComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCloseButtonClick = () => {
    router.back()
  }

  const handleButtonClick = () => {
    router.push('/mycards')
  }

  const cardName = decodeURIComponent(searchParams.get('cardname') || '')

  return (
    <div>
      <Result
        isSuccess={true}
        title={'판매 등록'}
        grade={searchParams.get('grade')}
        cardName={cardName}
        quantity={searchParams.get('quantity')}
        description="판매 등록에 성공했습니다!"
        buttonMessage="나의 판매 포토카드에서 확인하기"
        onClick={handleButtonClick}
        onClose={handleCloseButtonClick}
      />
    </div>
  )
}
