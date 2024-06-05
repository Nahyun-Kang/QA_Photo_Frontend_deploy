'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import Profile from '@/app/_components/Profile'
import ModalMain from '@/app/_components/Modal/Modal'
import Alarm from '@/app/_components/Alarm'
import logout from '@/app/_api/auth/logout'
import { removeCookie } from '@/app/_util/cookie'
import pointTostring from '@/app/_util/pointToString'

import styles from './header.module.scss'
import AlarmIcon from '/public/icons/alarm.svg'
import MobileAlarmPage from '../Alarm/MobileAlarmPage'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

interface MemberHeaderProps {
  isProfileOpened: boolean
  handleToggleProfile: () => void
  handleCloseProfile: () => void
  points: number
  nickname: string
}

export default function MemberHeader({
  handleCloseProfile,
  handleToggleProfile,
  isProfileOpened,
  points,
  nickname,
}: MemberHeaderProps) {
  const [isAlarmOpened, setIsAlarmOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<null | HTMLDivElement>(null)
  const alarmRef = useRef<null | HTMLDivElement>(null)
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    const result = await logout()

    if (result && result.status === 200) {
      console.log('로그아웃 성공')
      removeCookie('accessToken')
      removeCookie('refreshToken')
      router.push('/')
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userProfile],
      })
    }
  }

  const handleToggleAlarm = () => {
    setIsAlarmOpened((state) => !state)
  }

  // const handleProfileOutsideClick = (e: Event) => {
  //   if (
  //     ref.current &&
  //     !(e.target instanceof Node && ref.current.contains(e.target))
  //   ) {
  //     handleCloseProfile()
  //   }
  // }

  const handleAlarmOutsideClick = (e: Event) => {
    if (
      alarmRef.current &&
      !(e.target instanceof Node && alarmRef.current.contains(e.target))
    ) {
      setIsAlarmOpened(false)
    }
  }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleProfileOutsideClick)

  //   return () => {
  //     document.removeEventListener('mousedown', handleProfileOutsideClick)
  //   }
  // }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleAlarmOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleAlarmOutsideClick)
    }
  }, [])

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
      <div className={styles.memberContainer}>
        <span className={styles.point}>{`${pointTostring(points)} P`}</span>
        <div className={styles.alarmContainer} ref={alarmRef}>
          {isAlarmOpened && isMobile && (
            <ModalMain>
              <MobileAlarmPage onClick={handleToggleAlarm} />
            </ModalMain>
          )}
          <button
            type="button"
            className={styles.alarmButtonContainer}
            onClick={handleToggleAlarm}
          >
            <AlarmIcon />
          </button>
          {isAlarmOpened && (
            <div className={styles.alarmWrapper}>
              <Alarm />
            </div>
          )}
        </div>
        <div
          className={styles.userName}
          onClick={handleToggleProfile}
          ref={ref}
        >
          {isProfileOpened && isMobile && (
            <ModalMain>
              <div className={styles.mobileProfileContainer}>
                <Profile nickname={nickname} point={points} />
                <span className={styles.logout}>로그아웃</span>
              </div>
            </ModalMain>
          )}
          <div>{nickname}</div>
          {isProfileOpened && (
            <div className={styles.profileContainer}>
              <Profile nickname={nickname} point={points} />
            </div>
          )}
        </div>
        <div className={styles.line}></div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </>
  )
}
