'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import Input from '../Input/InputComponents'
import Title from '@/app/_components/Title'
import CommonHeader from '../Header/CommonHeader'
import MyCardDetail from '../Card/MyCardDetail'
import Button from '@/app/_components/Button'
import Grade from '../Grade'
import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'

import styles from './registerExpectedExchangeInformationModal.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import SelectComponent from '../Select/Select'

export default function RegisterExpectedExchangeInformation() {
  const MOCK_DATA = {
    name: '우리집 앞마당',
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <CommonHeader>나의 포토카드 판매하기</CommonHeader>
        </div>
        <Close width={32} height={32} className={styles.closeIcon} />
        <MobileBar className={styles.mobileBar} />
        <div className={styles.informationContainer}>
          <div className={styles.myGallery}>{'나의 포토카드 판매하기'}</div>
          <Title>
            <div className={styles.title}>{MOCK_DATA.name}</div>
          </Title>
          <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={'/images/image1.png'}
                alt="카드 이미지"
                style={{ objectFit: 'cover' }}
                layout="fill"
                className={styles.image}
              />
            </div>
            <div className={styles.cardContainer}>
              <MyCardDetail
                grade="legendary"
                genre="풍경"
                maker="미쓰손"
                totalQuantity={5}
              />
            </div>
          </div>
          <div className={styles.exchangeWrapper}>
            <Title>
              <div className={styles.exchangeTitle}>교환 희망 정보</div>
            </Title>
            <div className={styles.exchangeContentsWrapper}>
              <div className={styles.selectContainer}>
                <Input.field>
                  <Input.label htmlFor="grade">등급</Input.label>
                  <SelectComponent
                    placeholder={'등급을 선택해 주세요'}
                    list={GRADE_LIST}
                    value={''}
                    defaultValue={''}
                    onClick={() => console.log()}
                  />
                </Input.field>
                <Input.field>
                  <Input.label htmlFor="genre">장르</Input.label>
                  <SelectComponent
                    placeholder={'장르를 선택해 주세요'}
                    list={GENRE_LIST}
                    value={''}
                    defaultValue={''}
                    onClick={() => console.log()}
                  />
                </Input.field>
              </div>
              <Input.field>
                <Input.label htmlFor="description">교환 희망 설명</Input.label>
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
            </div>
            <div className={styles.buttonsWrapper}>
              <Button thickness="thin" buttonStyle="secondary">
                취소하기
              </Button>
              <Button thickness="thin">판매하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
