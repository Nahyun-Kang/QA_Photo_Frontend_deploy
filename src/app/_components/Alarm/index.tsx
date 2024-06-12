'use client'
import { useQuery } from '@tanstack/react-query'

import { GradeType } from '@/app/_lib/types/cardType'
import { AlarmType } from '@/app/_lib/types/alarmType'
import { getTimeAgo } from '@/app/_util/getTimeAgo'
import gradeExtract from '@/app/_util/gradeExtract'
import ALARM_MOCK from './mock_data'

import styles from './Alarm.module.scss'
import getNotification from '@/app/_api/notification/getNotifications'
import { QUERY_KEYS } from '@/app/_constants/queryKeys'

export default function Alarm() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.notifications],
    queryFn: () => getNotification(),
  })

  return (
    <ul className={styles.alarmList}>
      {data &&
        data?.data.map((el: any, idx: number) => {
          return (
            <li key={idx.toString()}>
              <AlarmItem
                content={el.content}
                isRead={el.isRead}
                timeAgo={el.timeAgo}
              />
            </li>
          )
        })}
    </ul>
  )
}

interface AlarmItemProps {
  content: string
  timeAgo: string
  isRead: string
}

function AlarmItem({ content, timeAgo, isRead }: AlarmItemProps) {
  // const message = (type: AlarmType) => {
  //   let message
  //   switch (type) {
  //     case 'saleCompleted':
  //       message = `${userName}님이 [${gradeExtract(grade)} | ${cardName}]을 ${quantity}장 구매했습니다.`
  //       break
  //     case 'purchaseCompleted':
  //       message = `[${gradeExtract(grade)} | ${cardName}] ${quantity}장을 성공적으로 구매했습니다.`
  //       break
  //     case 'exchangeCompleted':
  //       message = `[${gradeExtract(grade)} | ${cardName}] ${quantity}가 성공적으로 교환되었습니다.`
  //       break
  //     case 'exchangeProposed':
  //       message = `${userName}님이 [${gradeExtract(grade)} | ${cardName}의 포토카드 교환을 제안했습니다.]`
  //       break
  //     case 'outOfStock':
  //       message = `[${gradeExtract(grade)} | ${cardName}이 품절되었습니다.]`
  //       break
  //     default:
  //       message = ''
  //   }
  //   return message
  // }

  return (
    <div className={`${styles.alarmItemWrapper} ${isRead && styles.isRead}`}>
      <div className={styles.alarmItemContainer}>
        <div className={`${styles.message} ${isRead && styles.isReadMessage}`}>
          {content}
        </div>
        <div className={styles.timeAgo}>{timeAgo}</div>
      </div>
    </div>
  )
}
