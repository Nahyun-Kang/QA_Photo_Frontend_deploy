import Link from 'next/link'
import pointTostring from '@/app/_util/pointToString'

import styles from './Profile.module.scss'

interface ProfileProps {
  nickname: string
  point: number
}

export default function Profile({ nickname, point }: ProfileProps) {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.informationWrapper}>
        <div className={styles.greeting}>{`안녕하세요, ${nickname}!`}</div>
        <div className={styles.pointWrapper}>
          <div className={styles.pointTitle}>보유포인트</div>
          <div className={styles.point}>{`${pointTostring(point)} P`}</div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.linkWrapper}>
        <Link href={'/mygallery'} className={styles.link}>
          <div>마이갤러리</div>
        </Link>
        <Link href={'/mycards'} className={styles.link}>
          <div>나의 판매 포토카드</div>
        </Link>
        <Link href={'/myexchangecards'} className={styles.link}>
          <div>나의 교환 포토카드</div>
        </Link>
      </div>
    </div>
  )
}
