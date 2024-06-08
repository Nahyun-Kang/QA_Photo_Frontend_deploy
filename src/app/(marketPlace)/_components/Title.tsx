'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import { getCookie } from '@/app/_util/cookie'
import ModalMain from '@/app/_components/Modal/Modal'
import BasicModal from '@/app/_components/Modal/BasicModal'
import SellPhotoCardModal from '@/app/_components/Modal/SellPhotoCardModal'

import styles from '../page.module.scss'

export default function MarketPlaceTitle() {
  const accessToken = getCookie('accessToken')
  const [isModalOn, setIsModalOn] = useState(false)
  const router = useRouter()

  const handleCloseModal = () => {
    setIsModalOn(false)
  }

  const handleSellButtonClick = () => {
    setIsModalOn(true)
  }

  const handleLoginButtonClick = () => {
    router.push('/login')
  }

  return (
    <>
      {!accessToken && isModalOn && (
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
      {accessToken && isModalOn && (
        <ModalMain>
          <SellPhotoCardModal onClose={handleCloseModal} />
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
