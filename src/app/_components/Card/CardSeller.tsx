'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

import Button from '@/app/_components/Button'
import { GradeType } from '@/app/_lib/types/cardType'
import CardDetail from './CardDetailComponents'
import unregisterCard from '@/app/_api/card/unRegisterCard'
import ModalMain from '../Modal/Modal'
import BasicModal from '../Modal/BasicModal'
import EditCardModal from '../Modal/EditCardModal'

import styles from './CardSeller.module.scss'
import ExchangeIcon from '/public/icons/exchange.svg'

interface CardSellerProps {
  genre: string
  grade: GradeType
  maker: string
  description: string
  price: number
  remainingQuantity: number
  totalQuantity: number
  expectedGrade: GradeType
  expectedGenre: string
  expectedContent: string
}

export default function CardSeller({ ...props }: CardSellerProps) {
  const [isEditModalOn, setIsEditModalOn] = useState(false)
  const [isUnRegisterModalOn, setIsUnregisterModalOn] = useState(false)
  const { cardId } = useParams<{ cardId: string }>()
  const router = useRouter()

  const handleCloseEditModal = () => {
    setIsEditModalOn(false)
  }

  const handleOpenEditModal = () => {
    setIsEditModalOn(true)
  }
  const handleUnregisterModalOpen = () => {
    setIsUnregisterModalOn(true)
  }

  const handleUnregisterModalClose = () => {
    setIsUnregisterModalOn(false)
  }

  const handleUnregisterButton = async () => {
    const res = await unregisterCard(cardId)
    if (res !== null) {
      router.push('/mycards')
      handleUnregisterModalClose()
    }
  }

  return (
    <>
      {isEditModalOn && (
        <ModalMain>
          <EditCardModal onClose={handleCloseEditModal} />
        </ModalMain>
      )}
      {isUnRegisterModalOn && (
        <ModalMain>
          <BasicModal
            title="포토카드 판매 내리기"
            description={<>{`정말로 판매를 중단하시겠습니까?`}</>}
            onClick={handleUnregisterButton}
            buttonName="판매 내리기"
            onClose={handleUnregisterModalClose}
          />
        </ModalMain>
      )}
      <CardDetail>
        <CardDetail.CardDetailInformation
          genre={props.genre}
          grade={props.grade}
          maker={props.maker}
        />
        <CardDetail.BottomLine />
        <CardDetail.Description description={props.description} />
        <CardDetail.BottomLine />
        <CardDetail.DetailQuantityContainer
          price={props.price}
          remainingQuantity={props.remainingQuantity}
          totalQuantity={props.totalQuantity}
        />
        <div className={styles.exchange_title_container}>
          <div className={styles.exchange_title_wrapper}>
            <ExchangeIcon />
            <div className={styles.exchange_title}>교환 희망 정보</div>
          </div>
          <div className={styles.section_line}></div>
        </div>
        <CardDetail.CardDetailInformation
          genre={props.expectedGenre}
          grade={props.expectedGrade}
        />
        <CardDetail.BottomLine />
        <CardDetail.Description description={props.expectedContent} />
        <div className={styles.buttonContainer}>
          <Button type="button" onClick={handleOpenEditModal}>
            수정하기
          </Button>
          <Button
            buttonStyle="secondary"
            type="button"
            onClick={handleUnregisterModalOpen}
          >
            판매 내리기
          </Button>
        </div>
      </CardDetail>
    </>
  )
}
