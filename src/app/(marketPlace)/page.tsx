'use client'
import Link from 'next/link'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'

import styles from './page.module.scss'
import MarketPlaceCardList from './_components/CardsList'
import ModalMain from '../_components/Modal/Modal'
import BasicModal from '../_components/Modal/BasicModal'
import Profile from '../_components/Profile'
import RandomPointModal from '../_components/Modal/RandomPointModal'
import RegisterExpectedExchangeInformation from '../_components/Modal/RetisterExpectedExchangeInformationModal'
import ExchangePhotoCardModal from '../_components/Modal/ExchangePhotoCardModal'
import ProposeExchangeModal from '../_components/Modal/ProposeExchangeModal'

export default function Home() {
  const handleButtonClick = () => {
    console.log('clicked')
  }

  return (
    <>
      {/* {
        <ModalMain>
          <ProposeExchangeModal />
        </ModalMain>
      } */}
      {/* {
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
            onClick={() => console.log()}
            buttonName="확인"
          />
        </ModalMain>
      } */}
      {/* {
        <ModalMain>
          <RandomPointModal />
        </ModalMain>
      } */}
      <main className={styles.main}>
        <div className={styles.section}>
          <div className={styles.titleWrapper}>
            <Title>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>마켓플레이스</h2>
                <div className={styles.buttonContainer}>
                  <Button thickness="thin">나의 포토카드 판매하기</Button>
                </div>
              </div>
            </Title>
          </div>
          <MarketPlaceCardList />
        </div>
        <div className={styles.floatButtonContainer}>
          <Button thickness="thin">나의 포토카드 판매하기</Button>
        </div>
      </main>
    </>
  )
}
