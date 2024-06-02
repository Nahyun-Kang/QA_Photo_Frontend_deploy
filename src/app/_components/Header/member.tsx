'use client'

import { useState, useRef, useEffect } from 'react'

import Profile from '@/app/_components/Profile'
import ModalMain from '../Modal/Modal'

import styles from './header.module.scss'
import AlarmIcon from '/public/icons/alarm.svg'

export default function MemberHeader() {
  const [isOpened, setIsOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<null | HTMLDivElement>(null)

  const handleToggleProfile = () => {
    setIsOpened((state) => !state)
  }

  const handleOutsideClick = (e: Event) => {
    if (
      ref.current &&
      !(e.target instanceof Node && ref.current.contains(e.target))
    ) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
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
      {isOpened && isMobile && (
        <ModalMain>
          <div className={styles.mobileProfileContainer}>
            <Profile nickname="유디" point={1540} />
            <span className={styles.logout}>로그아웃</span>
          </div>
        </ModalMain>
      )}
      <div className={styles.memberContainer}>
        <span className={styles.point}>1,540 P</span>
        <button type="button">
          <AlarmIcon />
        </button>
        <div
          className={styles.userName}
          ref={ref}
          onClick={handleToggleProfile}
        >
          <span>{'유디'}</span>
          {isOpened && (
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
