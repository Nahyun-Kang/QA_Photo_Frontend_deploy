'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import Result from '@/app/_components/Result'

export default function SuccessCreateCardComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCloseButtonClick = () => {
    router.back()
  }

  const handleButtonClick = () => {
    router.push('/mygallery')
  }

  const cardName = decodeURIComponent(searchParams.get('cardname') || '')

  return (
    <div>
      <Result
        isSuccess={true}
        title={'포토카드 생성'}
        grade={searchParams.get('grade')}
        cardName={cardName}
        quantity={searchParams.get('quantity')}
        description="포토카드 생성에 성공했습니다!"
        buttonMessage="마이갤러리에서 확인하기"
        onClick={handleButtonClick}
        onClose={handleCloseButtonClick}
      />
    </div>
  )
}
