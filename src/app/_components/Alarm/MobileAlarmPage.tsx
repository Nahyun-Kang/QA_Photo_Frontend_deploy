'use client'
import Alarm from '.'
import CommonHeader from '../Header/CommonHeader'

import styles from './Alarm.module.scss'

interface MobileAlarmPageProps {
  onClick: () => void
}

export default function MobileAlarmPage({ onClick }: MobileAlarmPageProps) {
  return (
    <div className={styles.mobileAlarmWrapper}>
      <CommonHeader onClick={onClick}>알림</CommonHeader>
      <Alarm />
    </div>
  )
}
