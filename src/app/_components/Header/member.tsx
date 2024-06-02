'use client'

import { useState, useRef, useEffect } from 'react'

import Profile from '@/app/_components/Profile'
import ModalMain from '@/app/_components/Modal/Modal'
import Alarm from '@/app/_components/Alarm'

import styles from './header.module.scss'
import AlarmIcon from '/public/icons/alarm.svg'

export default function MemberHeader() {
  const [isProfileOpened, setIsProfileOpened] = useState(false)
  const [isAlarmOpened, setIsAlarmOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<null | HTMLDivElement>(null)
  const alarmRef = useRef<null | HTMLButtonElement>(null)

  const handleToggleProfile = () => {
    setIsProfileOpened((state) => !state)
  }

  const handleToggleAlarm = () => {
    setIsAlarmOpened((state) => !state)
  }

  const handleProfileOutsideClick = (e: Event) => {
    if (
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      setIsProfileOpened(false)
    }
  }

  const handleAlarmOutsideClick = (e: Event) => {
    if (
      alarmRef.current &&
      !(e.target instanceof Node && alarmRef.current.contains(e.target))
    ) {
      setIsAlarmOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleProfileOutsideClick)
    }
  }, [ref])

  useEffect(() => {
    document.addEventListener('mousedown', handleAlarmOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleAlarmOutsideClick)
    }
  }, [alarmRef])

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
      {isProfileOpened && isMobile && (
        <ModalMain>
          <div className={styles.mobileProfileContainer}>
            <Profile nickname="유디" point={1540} />
            <span className={styles.logout}>로그아웃</span>
          </div>
        </ModalMain>
      )}
      <div className={styles.memberContainer}>
        <span className={styles.point}>1,540 P</span>
        <div className={styles.alarmContainer}>
          <button
            type="button"
            className={styles.alarmButtonContainer}
            onClick={handleToggleAlarm}
            ref={alarmRef}
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
          ref={ref}
          onClick={handleToggleProfile}
        >
          <span>{'유디'}</span>
          {isProfileOpened && (
            <div className={styles.profileContainer}>
              <Profile nickname="유디" point={1540} />
            </div>
          )}
        </div>
        <div className={styles.line}></div>
        <button className={styles.logoutButton}>로그아웃</button>
      </div>
    </>
  )
}
