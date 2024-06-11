'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import { getCookie } from '@/app/_util/cookie'
import ModalMain from '@/app/_components/Modal/Modal'
import BasicModal from '@/app/_components/Modal/BasicModal'
import SellPhotoCardModal from '@/app/_components/Modal/SellPhotoCardModal'
import RegisterExpectedExchangeInformation from '@/app/_components/Modal/RetisterExpectedExchangeInformationModal'
import { GradeType, GenreType } from '@/app/_lib/types/cardType'

import styles from '../page.module.scss'

export interface CardDataType {
  name: string
  grade: GradeType
  genre: GenreType
  userName: string
  totalQuantity: number
  image: string
}

const INITIAL_VALUE: CardDataType = {
  name: '',
  grade: 'COMMON',
  genre: 'LANDSCAPE',
  userName: '',
  totalQuantity: 0,
  image: '',
}

export default function MarketPlaceTitle() {
  const accessToken = getCookie('accessToken')
  const [isSellModalOn, setIsSellModalOn] = useState(false)
  const [isRegisterModalOn, setIsRegisterModalOn] = useState(false)
  const [currentId, setCurrentId] = useState<string>('')
  const [cardData, setCardData] = useState(INITIAL_VALUE)
  const router = useRouter()

  const handleCloseModal = () => {
    setIsSellModalOn(false)
  }

  const handleSellButtonClick = () => {
    setIsSellModalOn(true)
  }

  const handleLoginButtonClick = () => {
    router.push('/login')
  }

  const handleOpenRegisterModal = (id: string, data: CardDataType) => {
    setIsSellModalOn(false)
    setCurrentId(id)
    setCardData({ ...data })
    setIsRegisterModalOn(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOn(false)
  }

  console.log(isSellModalOn)
  console.log(isRegisterModalOn)
  console.log(currentId)

  return (
    <>
      {accessToken && isRegisterModalOn && (
        <ModalMain>
          <RegisterExpectedExchangeInformation
            onClose={handleCloseRegisterModal}
            id={currentId}
            data={cardData}
          />
        </ModalMain>
      )}
      {!accessToken && isSellModalOn && (
        <ModalMain>
          <BasicModal
            title="로그인이 필요합니다."
            description={
              <>
                로그인 하시겠습니까?
                <br />
                다양한 서비스를 편리하게 이용하실 수 있습니다.
              </>
            }
            onClick={handleLoginButtonClick}
            onClose={handleCloseModal}
            buttonName="확인"
          />
        </ModalMain>
      )}
      {accessToken && isSellModalOn && (
        <ModalMain>
          <SellPhotoCardModal
            onClose={handleCloseModal}
            onOpen={handleOpenRegisterModal}
          />
        </ModalMain>
      )}
      <div className={styles.titleWrapper}>
        <Title>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>마켓플레이스</h2>
            <div className={styles.buttonContainer}>
              <Button thickness="thin" onClick={handleSellButtonClick}>
                나의 포토카드 판매하기
              </Button>
            </div>
          </div>
        </Title>
      </div>
      <div className={styles.floatButtonContainer}>
        <Button thickness="thin" onClick={handleSellButtonClick}>
          나의 포토카드 판매하기
        </Button>
      </div>
    </>
  )
}
