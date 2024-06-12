'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import Input from '../Input/InputComponents'
import Title from '@/app/_components/Title'
import CommonHeader from '../Header/CommonHeader'
import MyCardDetail from '../Card/MyCardDetail'
import Button from '@/app/_components/Button'
import getCardDetail from '@/app/_api/card/getCard'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import getGenreNameFromType from '@/app/_util/getGenreNameFromType'
import editCard, { EditCardType } from '@/app/_api/card/editCard'

import styles from './editcardModal.module.scss'
import Close from '/public/icons/close.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import SelectComponent from '../Select/Select'
import {
  GENRE,
  GRADE,
} from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'

interface EditCardModalProps {
  onClose: () => void
}

export default function EditCardModal({ onClose }: EditCardModalProps) {
  const { cardId } = useParams<{ cardId: string }>()
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.cardDetail, cardId],
    queryFn: () => getCardDetail(cardId),
    retry: 0,
  })
  const queryClient = useQueryClient()

  const methods = useForm({
    defaultValues: {
      cardId: data.id,
      sellingQuantity: data.maxSellingQuantity,
      sellingPrice: data.price,
      wishExchangeGenre: getGenreNameFromType(
        data.wishExchangeData.wishExchangeGenre,
      ),
      wishExchangeGrade: data.wishExchangeData.wishExchangeGrade,
      wishExchageDescription: data.wishExchangeData.wishExchangeDescription,
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

  const handleClickGenreOption = (item: string) => {
    setValue('wishExchangeGenre', item)
  }

  const handleClickGradeOption = (item: string) => {
    setValue('wishExchangeGrade', item)
  }

  const handlePlusButtonClick = () => {
    if (quantity >= data.totalQuantity) {
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

  const handleChangePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
  }

  const wishExchangeGenre = useWatch({
    control,
    name: 'wishExchangeGenre',
  })

  const wishExchangeGrade = useWatch({
    control,
    name: 'wishExchangeGrade',
  })

  const editCardMutation = useMutation({
    mutationFn: (data: FieldValues) => editCard(data as EditCardType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cardDetail, cardId],
      })
      onClose()
    },
    onError: (error: any) => {
      console.error(error.response?.data?.message || error.message)
    },
  })

  const handleEditButtonClick = (data: FieldValues) => {
    editCardMutation.mutate(data)
  }

  const onSubmit = async (data: FieldValues) => {
    handleEditButtonClick(data)
    onClose()
  }
  useEffect(() => {
    setValue('sellingQuantity', quantity)
  }, [quantity, setValue])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <CommonHeader>수정하기</CommonHeader>
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
          <div className={styles.myGallery}>{'수정하기'}</div>
          <Title>
            <div className={styles.title}>{data.name}</div>
          </Title>
          <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={data.image}
                alt="카드 이미지"
                style={{ objectFit: 'cover' }}
                layout="fill"
                className={styles.image}
              />
            </div>
            <div className={styles.cardContainer}>
              <MyCardDetail
                grade={data.grade}
                genre={data.genre}
                maker={data.seller_nickname}
                totalQuantity={data.maxSellingQuantity}
                priceValue={price}
                quantity={quantity}
                handlePlusButtonClick={handlePlusButtonClick}
                handleMinusButtonClick={handleMinusButtonClick}
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
                  <Input.label htmlFor="grade">등급</Input.label>
                  <SelectComponent
                    placeholder={'등급을 선택해 주세요'}
                    list={GRADE}
                    value={wishExchangeGrade}
                    defaultValue={getValues('wishExchangeGrade')}
                    onClick={handleClickGradeOption}
                  />
                </Input.field>
                <Input.field>
                  <Input.label htmlFor="genre">장르</Input.label>
                  <SelectComponent
                    placeholder={'장르를 선택해 주세요'}
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
              <Button
                thickness="thin"
                buttonStyle="secondary"
                type="button"
                onClick={onClose}
              >
                취소하기
              </Button>
              <Button thickness="thin" type="submit">
                수정하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
