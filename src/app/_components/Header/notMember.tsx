import Link from 'next/link'

import styles from './header.module.scss'

export default function NotMemberHeader() {
  return (
    <div className={styles.notMemberContainer}>
      <Link href={'/login'}>
        <button className={styles.authButton}>로그인</button>
      </Link>
      <Link href={'/signup'}>
        <button className={styles.authButton}>회원가입</button>
      </Link>
    </div>
  )
}
