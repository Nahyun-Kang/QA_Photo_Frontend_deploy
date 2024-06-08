'use client'
import { useState } from 'react'

import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'
import { getCookie } from '@/app/_util/cookie'
import ModalMain from '@/app/_components/Modal/Modal'
import Filter from '@/app/_components/Filter'

import styles from '../page.module.scss'

export default function MarketPlaceTitle() {
  const accessToken = getCookie('accessToken')

  return (
    <>
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
      <div className={styles.floatButtonContainer}>
        <Button thickness="thin">나의 포토카드 판매하기</Button>
      </div>
    </>
  )
}
