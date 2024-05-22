import styles from './header.module.scss'
import Profile from '/public/icons/profile.svg'

export default function MemberHeader() {
  return (
    <div className={styles.memberContainer}>
      <span className={styles.point}>1,540 P</span>
      <Profile />
      <span className={styles.userName}>유디</span>
      <div className={styles.line}></div>
      <button className={styles.logoutButton}>로그아웃</button>
    </div>
  )
}
