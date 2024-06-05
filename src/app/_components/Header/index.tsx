'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import NotMemberHeader from './notMember'
import MemberHeader from './member'
import getProfile from '@/app/_api/profile/getProfile'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'
import { getCookie } from '@/app/_util/cookie'

import styles from './header.module.scss'
import Menu from '/public/icons/menu.svg'
import Logo from '/public/icons/photo_logo_favicon.svg'

export default function MainHeader() {
  const [isProfileOpened, setIsProfileOpened] = useState(false)
  const accessToken = getCookie('accessToken')

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.userProfile],
    queryFn: getProfile,
    enabled: !!accessToken,
  })

  console.log(data)

  const handleToggleProfile = () => {
    setIsProfileOpened((state) => !state)
  }

  const handleCloseProfile = () => {
    setIsProfileOpened(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.menuIcon}>
          <button className={styles.button} onClick={handleToggleProfile}>
            <Menu />
          </button>
        </div>
        <Link href={'/'}>
          <Logo className={styles.logo} />
        </Link>
        {!data && <NotMemberHeader />}
        {data && (
          <MemberHeader
            handleCloseProfile={handleCloseProfile}
            handleToggleProfile={handleToggleProfile}
            isProfileOpened={isProfileOpened}
            nickname={data?.nickname}
            points={data?.points}
          />
        )}
      </div>
    </header>
  )
}
