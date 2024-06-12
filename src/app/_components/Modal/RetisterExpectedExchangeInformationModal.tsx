'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import Input from '../Input/InputComponents'
import Title from '@/app/_components/Title'
import CommonHeader from '../Header/CommonHeader'
import MyCardDetail from '../Card/MyCardDetail'
import Button from '@/app/_components/Button'
import { GENRE_LIST, GRADE_LIST } from '@/app/_constants/listConstants'
import registerCard from '@/app/_api/card/registerCard'
import {
  GRADE,
  GENRE,
} from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'
import { PLACEHOLDER } from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'
import { gradeToType } from '@/app/_util/gradeExtract'

import styles from './registerExpectedExchangeInformationModal.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import SelectComponent from '../Select/Select'
import { GenreType, GradeType } from '@/app/_lib/types/cardType'
import { CardDataType } from '@/app/(marketPlace)/_components/Title'

interface RegisterExpectedExchangeInformationProps {
  onClose: () => void
  id: string
  data: CardDataType
}

export default function RegisterExpectedExchangeInformation({
  onClose,
  id,
  data: cardData,
}: RegisterExpectedExchangeInformationProps) {
  const methods = useForm({
    defaultValues: {
      cardId: id,
      sellingQuantity: 1,
      sellingPrice: cardData.price,
      wishExchangeGenre: '',
      wishExchangeGrade: '',
      wishExchageDescription: '',
    },
    mode: 'onTouched',
  })
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = methods
  const [quantity, setQuantity] = useState<number>(getValues('sellingQuantity'))

  const [price, setPrice] = useState<number>(getValues('sellingPrice'))

  const getKeyByValue = (obj: any, value: any) => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }

  const handleChangePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
  }

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    const res = await registerCard({
      cardId: data.cardId,
      sellingQuantity: data.sellingQuantity,
      sellingPrice: data.sellingPrice,
      wishExchangeGenre: getKeyByValue(
        GENRE,
        data.wishExchangeGenre,
      ) as GenreType,
      wishExchangeGrade: gradeToType(data.wishExchangeGrade) as GradeType,
      wishExchageDescription: data.wishExchageDescription,
    })
    if (res !== null) {
      console.log(res)
      onClose()
      router.push(
        `/register-success?grade=${cardData.grade}&cardname=${cardData.name}&quantity=${data.sellingQuantity}`,
      )
    }
  }

  const wishExchangeGenre = useWatch({
    control,
    name: 'wishExchangeGenre',
  })

  const wishExchangeGrade = useWatch({
    control,
    name: 'wishExchangeGrade',
  })

  const handleClickGenreOption = (item: string) => {
    setValue('wishExchangeGenre', item)
  }

  const handleClickGradeOption = (item: string) => {
    setValue('wishExchangeGrade', item)
  }

  const handlePlusButtonClick = () => {
    if (quantity >= cardData.totalQuantity) {
      return
    }
    setQuantity((prevState) => prevState + 1)
  }

  const handleMinusButtonClick = () => {
    if (quantity <= 1) {
      return
    }
    setQuantity((prevState) => prevState - 1)
  }

  useEffect(() => {
    setValue('sellingQuantity', quantity)
  }, [quantity, setValue])
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <CommonHeader>나의 포토카드 판매하기</CommonHeader>
        </div>
        <Close
          width={32}
          height={32}
          className={styles.closeIcon}
          onClick={onClose}
        />
        <MobileBar className={styles.mobileBar} />
        <form
          className={styles.informationContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.myGallery}>{'나의 포토카드 판매하기'}</div>
          <Title>
            <div className={styles.title}>{cardData.name}</div>
          </Title>
          <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={cardData.image}
                alt="카드 이미지"
                style={{ objectFit: 'cover' }}
                layout="fill"
                className={styles.image}
              />
            </div>
            <div className={styles.cardContainer}>
              <MyCardDetail
                grade={cardData.grade}
                genre={cardData.genre}
                maker={cardData.userName}
                totalQuantity={cardData.totalQuantity}
                handlePlusButtonClick={handlePlusButtonClick}
                handleMinusButtonClick={handleMinusButtonClick}
                priceValue={price}
                quantity={quantity}
                onChange={handleChangePriceInput}
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
                  <Input.label htmlFor="wishExchangeGrade">등급</Input.label>
                  <SelectComponent
                    placeholder={PLACEHOLDER.grade}
                    list={GRADE}
                    value={wishExchangeGrade}
                    defaultValue={getValues('wishExchangeGrade')}
                    onClick={handleClickGradeOption}
                  />
                </Input.field>
                <Input.field>
                  <Input.label htmlFor="genre">장르</Input.label>
                  <SelectComponent
                    placeholder={PLACEHOLDER.genre}
                    list={Object.values(GENRE)}
                    value={wishExchangeGenre}
                    defaultValue={getValues('wishExchangeGenre')}
                    onClick={handleClickGenreOption}
                  />
                </Input.field>
              </div>
              <Input.field>
                <Input.label htmlFor="wishExchangeDescription">
                  교환 희망 설명
                </Input.label>
                <Input.containerWithMessage>
                  <Controller
                    control={control}
                    name="wishExchageDescription"
                    render={({ field: { onChange, onBlur } }) => (
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
              <Button
                thickness="thin"
                buttonStyle="secondary"
                onClick={onClose}
              >
                취소하기
              </Button>
              <Button thickness="thin" type="submit">
                판매하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
