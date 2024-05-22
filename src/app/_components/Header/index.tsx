import Link from 'next/link'
import NotMemberHeader from './notMember'
import MemberHeader from './member'
import styles from './header.module.scss'
import Menu from '/public/icons/menu.svg'
import Logo from '/public/icons/photo_logo_favicon.svg'

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.menuIcon}>
          <Menu />
        </div>
        <Link href={'/'}>
          <Logo className={styles.logo} />
        </Link>
        {/* <NotMemberHeader /> */}
        <MemberHeader />
      </div>
    </header>
  )
}
