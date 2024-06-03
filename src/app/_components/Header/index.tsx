'use client'

import { useState } from 'react'
import Link from 'next/link'
import NotMemberHeader from './notMember'
import MemberHeader from './member'
import styles from './header.module.scss'
import Menu from '/public/icons/menu.svg'
import Logo from '/public/icons/photo_logo_favicon.svg'

export default function MainHeader() {
  const [isProfileOpened, setIsProfileOpened] = useState(false)

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
        {/* <NotMemberHeader /> */}
        <MemberHeader
          handleCloseProfile={handleCloseProfile}
          handleToggleProfile={handleToggleProfile}
          isProfileOpened={isProfileOpened}
        />
      </div>
    </header>
  )
}
