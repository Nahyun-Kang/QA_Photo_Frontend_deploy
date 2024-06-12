'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { useParams } from 'next/navigation'

import Input from '../Input/InputComponents'
import Title from '@/app/_components/Title'
import CommonHeader from '../Header/CommonHeader'
import MyCard from '../Card/MyCard'
import Button from '@/app/_components/Button'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

import styles from './proposeExchangeModal.module.scss'
import Close from '/public/icons/close.svg'
import Filter from '/public/icons/filter.svg'
import MobileBar from '/public/icons/mobile_bar.svg'
import SelectComponent from '../Select/Select'
import { BuyerCardType } from '@/app/(marketPlace)/[cardId]/_components/ForBuyer'
import getGenreNameFromType from '@/app/_util/getGenreNameFromType'
import proposeExchange from '@/app/_api/exchange/proposeExchange'

interface ProposeExchangeModal {
  onClose: () => void
  cardData: BuyerCardType
}

export default function ProposeExchangeModal({
  onClose,
  cardData,
}: ProposeExchangeModal) {
  const { cardId } = useParams<{ cardId: string }>()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: { description: '', offeredId: cardData.id },
    mode: 'onTouched',
  })
  const queryClient = useQueryClient()

  const proposeExchangeMutation = useMutation({
    mutationFn: (data: FieldValues) =>
      proposeExchange(cardId, data.offeredId, data.description),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cardDetail, cardId],
      })
    },
  })

  const handleProposeButtonClick = async (data: FieldValues) => {
    await proposeExchangeMutation.mutate(data)
  }

  const onSubmit = async (data: FieldValues) => {
    handleProposeButtonClick(data)
    onClose()
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
            <div className={styles.title}>{cardData.name}</div>
          </Title>
          <div className={styles.exchangeWrapper}>
            <div className={styles.cardWrapper}>
              <MyCard
                grade={cardData.grade}
                genre={cardData.genre}
                name={cardData.name}
                image={cardData.image}
                nickName={cardData.userName}
                price={cardData.price}
                totalQuantity={cardData.totalQuantity}
                id={cardData.id}
              />
            </div>
            <form
              className={styles.descriptionWrapper}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input.field>
                <Input.label htmlFor="description">교환 제시 내용</Input.label>
                <Input.containerWithMessage>
                  <Controller
                    control={control}
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
                <Button
                  thickness="thin"
                  buttonStyle="secondary"
                  type="button"
                  onClick={onClose}
                >
                  취소하기
                </Button>
                <Button thickness="thin" type="submit">
                  교환하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
