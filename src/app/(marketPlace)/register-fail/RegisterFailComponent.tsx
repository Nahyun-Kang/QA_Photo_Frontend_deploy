'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import Result from '@/app/_components/Result'

export default function RegisterFailPComponent() {
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
        isSuccess={false}
        title={'판매 등록'}
        grade={searchParams.get('grade')}
        cardName={cardName}
        quantity={searchParams.get('quantity')}
        description="판매 등록에 실패했습니다."
        buttonMessage="마켓플레이스로 돌아가기"
        onClick={handleButtonClick}
        onClose={handleCloseButtonClick}
      />
    </div>
  )
}
