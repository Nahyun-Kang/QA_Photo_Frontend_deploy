'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Card from './CardComponents'
import Button from '@/app/_components/Button'
import ModalMain from '../Modal/Modal'
import BasicModal from '../Modal/BasicModal'
import cancelProposal from '@/app/_api/exchange/cancelProposal'
import acceptProposal from '@/app/_api/exchange/acceptProposal'
import rejectProposal from '@/app/_api/exchange/rejectProposal'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

import gradeExtract from '@/app/_util/gradeExtract'
import { ExchangeCardType } from '@/app/_lib/types/cardType'

import styles from './Card.module.scss'

export default function ExchangeCard({
  type = 'seller',
  name,
  grade,
  genre,
  requestMessage,
  nickName,
  id,
  price,
  image,
}: ExchangeCardType) {
  const [isMobile, setIsMobile] = useState(false)
  const [isCancelModalOn, setIsCancelModalOn] = useState(false)
  const [isRejectModalOn, setIsRejectModalOn] = useState(false)
  const [isAcceptModalOn, setIsAcceptModalOn] = useState(false)
  const { cardId } = useParams<{ cardId: string }>()
  const queryClient = useQueryClient()

  const handleCloseCancelModal = () => {
    setIsCancelModalOn(false)
  }

  const handleOpenCancelModal = () => {
    setIsCancelModalOn(true)
  }
  const handleCloseAcceptModal = () => {
    setIsAcceptModalOn(false)
  }

  const handleOpenAcceptModal = () => {
    setIsAcceptModalOn(true)
  }
  const handleCloseRejectModal = () => {
    setIsRejectModalOn(false)
  }

  const handleOpenRejectModal = () => {
    setIsRejectModalOn(true)
  }

  const handleCancelProposal = async () => {
    const res = await cancelProposal(id)
    console.log(res)
    handleCloseCancelModal()
  }

  const cancelProposalMutation = useMutation({
    mutationFn: () => handleCancelProposal(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cardDetail, cardId],
      })
      handleCloseCancelModal()
    },
  })

  const handleCancelButtonClick = () => {
    cancelProposalMutation.mutate()
  }

  const acceptProposalMutation = useMutation({
    mutationFn: () => acceptProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cardDetail, cardId],
      })
      handleCloseAcceptModal()
    },
  })

  const handleAcceptButtonClick = () => {
    acceptProposalMutation.mutate()
  }

  const rejectProposalMutation = useMutation({
    mutationFn: () => rejectProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cardDetail, cardId],
      })
      handleCloseRejectModal()
    },
  })

  const handleRejectButtonClick = () => {
    rejectProposalMutation.mutate()
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743)
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <>
      {isRejectModalOn && (
        <ModalMain>
          <BasicModal
            title="교환 제시 거절"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 카드와의 교환을 거절하시겠습니까?`}</>
            }
            onClick={handleRejectButtonClick}
            buttonName="거절하기"
            onClose={handleCloseRejectModal}
          />
        </ModalMain>
      )}
      {isAcceptModalOn && (
        <ModalMain>
          <BasicModal
            title="교환 제시 승인"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 카드와의 교환을 승인하시겠습니까?`}</>
            }
            onClick={handleAcceptButtonClick}
            buttonName="승인하기"
            onClose={handleCloseAcceptModal}
          />
        </ModalMain>
      )}
      {isCancelModalOn && (
        <ModalMain>
          <BasicModal
            title="교환 제시 취소"
            description={
              <>{`[${gradeExtract(grade)} | ${name}] 교환 제시를 취소하시겠습니까?`}</>
            }
            onClick={handleCancelButtonClick}
            onClose={handleCloseCancelModal}
            buttonName="취소하기"
          />
        </ModalMain>
      )}
      <Card>
        <Card.CardContainer>
          <Card.image imageUrl={image} />
          <Card.information
            title={name}
            maker={nickName}
            grade={grade}
            genre={genre}
            price={price}
            type="exchange"
          />
          <Card.Description description={requestMessage} />
          {type === 'seller' ? (
            <div className={styles.buttonContainer}>
              <Button
                thickness="mini"
                buttonStyle="secondary"
                type="button"
                onClick={handleOpenRejectModal}
              >
                {isMobile ? '거절' : '거절하기'}
              </Button>
              <Button
                thickness="mini"
                type="button"
                onClick={handleOpenAcceptModal}
              >
                {isMobile ? '승인' : '승인하기'}
              </Button>
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <Button
                thickness="thin"
                buttonStyle="secondary"
                type="button"
                onClick={handleOpenCancelModal}
              >
                취소하기
              </Button>
            </div>
          )}
        </Card.CardContainer>
      </Card>
    </>
  )
}
