'use client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import Image from 'next/image'

import luckyDraw from '@/app/_api/points/luckyDraw'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

import styles from './randomPointModal.module.scss'
import CloseIcon from '/public/icons/close.svg'
import randomBox1 from '/public/images/random_box1.png'
import randomBox2 from '/public/images/random_box2.png'
import randomBox3 from '/public/images/random_box3.png'

interface RandomPointModalProps {
  onClose: () => void
}

export default function RandomPointModal({ onClose }: RandomPointModalProps) {
  const initialTime = 60 * 60
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`
  }

  const luckyDrawMutation = useMutation({
    mutationFn: () => luckyDraw(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userProfile, QUERY_KEYS.point],
      })
      onClose()
    },
  })

  const handleBoxClick = () => {
    luckyDrawMutation.mutate()
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <button className={styles.button}>
          <CloseIcon width={28} height={28} onClick={onClose} />
        </button>
        <div className={styles.titleWrapper}>
          <div className={styles.randomPointWrapper}>
            <span className={styles.random}>랜덤</span>
            <span className={styles.point}>포인트</span>
          </div>
          <div className={styles.messageWrapper}>
            <div className={styles.message}>1시간마다 돌아오는 기회!</div>
            <div className={styles.message}>
              랜덤 상자 뽑기를 통해 포인트를 획득하세요!
            </div>
          </div>
          <div className={styles.timeWrapper}>
            <div className={styles.timeMessage}>다음 기회까지 남은 시간</div>
            <div className={styles.time}>{formatTime(timeRemaining)}</div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.boxWrapper} onClick={handleBoxClick}>
            <Image
              src={randomBox1}
              alt="랜덤박스1"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.boxWrapper} onClick={handleBoxClick}>
            <Image
              src={randomBox2}
              alt="랜덤박스2"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.boxWrapper} onClick={handleBoxClick}>
            <Image
              src={randomBox3}
              alt="랜덤박스3"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
