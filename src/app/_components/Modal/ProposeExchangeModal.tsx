'use client'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'

import Input from '../Input/InputComponents'
import Title from '@/app/_components/Title'
import CommonHeader from '../Header/CommonHeader'
import MyCard from '../Card/MyCard'
import Button from '@/app/_components/Button'

import styles from './proposeExchangeModal.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import SelectComponent from '../Select/Select'

export default function ProposeExchangeModal() {
  const MOCK_DATA = {
    name: '우리집 앞마당',
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <CommonHeader>포토카드 교환하기</CommonHeader>
        </div>
        <Close width={32} height={32} className={styles.closeIcon} />
        <MobileBar className={styles.mobileBar} />
        <div className={styles.informationContainer}>
          <div className={styles.myGallery}>{'포토카드 교환하기'}</div>
          <Title>
            <div className={styles.title}>{MOCK_DATA.name}</div>
          </Title>
          <div className={styles.exchangeWrapper}>
            <div className={styles.cardWrapper}>{/* <MyCard/> */}</div>
            <div className={styles.descriptionWrapper}>
              <Input.field>
                <Input.label htmlFor="description">교환 제시 내용</Input.label>
                <Input.containerWithMessage>
                  <Controller
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input.textarea
                        placeholder={'설명을 입력해 주세요.'}
                        onChange={onChange}
                        onBlur={onBlur}
                        type="text"
                      />
                    )}
                  />
                </Input.containerWithMessage>
              </Input.field>
              <div className={styles.buttonsWrapper}>
                <Button thickness="thin" buttonStyle="secondary">
                  취소하기
                </Button>
                <Button thickness="thin">교환하기</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
