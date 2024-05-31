'use client'

import { useRouter } from 'next/navigation'

import Result from '@/app/_components/Result'

export default function FailCreateCardPage() {
  const router = useRouter()

  const handleCloseButtonClick = () => {
    router.back()
  }

  const handleButtonClick = () => {
    router.push('/mygallery')
  }

  return (
    <div>
      <Result
        isSuccess={true}
        title={'포토카드 생성'}
        description="[LEGENDARY | 우리집 앞마당] 포토카드 생성에 실패했습니다."
        buttonMessage="마이갤러리로 돌아가기"
        onClick={handleButtonClick}
        onClose={handleCloseButtonClick}
      />
    </div>
  )
}
