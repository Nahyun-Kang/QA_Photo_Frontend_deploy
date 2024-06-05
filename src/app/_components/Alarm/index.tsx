import { GradeType } from '@/app/_lib/types/cardType'
import { AlarmType } from '@/app/_lib/types/alarmType'
import { getTimeAgo } from '@/app/_util/getTimeAgo'
import gradeExtract from '@/app/_util/gradeExtract'
import ALARM_MOCK from './mock_data'

import styles from './Alarm.module.scss'

export default function Alarm() {
  const list = ALARM_MOCK

  return (
    <ul className={styles.alarmList}>
      {list?.map((el, idx) => {
        return (
          <li key={idx.toString()}>
            <AlarmItem
              userName={el.userName}
              quantity={el.quantity}
              grade={el.grade}
              cardName={el.cardName}
              isRead={el.isRead}
              type={el.type}
              createdDate={el.createdDate}
            />
          </li>
        )
      })}
    </ul>
  )
}

interface AlarmItemProps {
  userName?: string
  quantity?: number
  grade: GradeType
  cardName: string
  createdDate: string
  isRead: boolean
  type: AlarmType
}

function AlarmItem({
  userName,
  quantity,
  grade,
  cardName,
  createdDate,
  isRead,
  type,
}: AlarmItemProps) {
  const message = (type: AlarmType) => {
    let message
    switch (type) {
      case 'saleCompleted':
        message = `${userName}님이 [${gradeExtract(grade)} | ${cardName}]을 ${quantity}장 구매했습니다.`
        break
      case 'purchaseCompleted':
        message = `[${gradeExtract(grade)} | ${cardName}] ${quantity}장을 성공적으로 구매했습니다.`
        break
      case 'exchangeCompleted':
        message = `[${gradeExtract(grade)} | ${cardName}] ${quantity}가 성공적으로 교환되었습니다.`
        break
      case 'exchangeProposed':
        message = `${userName}님이 [${gradeExtract(grade)} | ${cardName}의 포토카드 교환을 제안했습니다.]`
        break
      case 'outOfStock':
        message = `[${gradeExtract(grade)} | ${cardName}이 품절되었습니다.]`
        break
      default:
        message = ''
    }
    return message
  }

  return (
    <div className={`${styles.alarmItemWrapper} ${isRead && styles.isRead}`}>
      <div className={styles.alarmItemContainer}>
        <div className={`${styles.message} ${isRead && styles.isReadMessage}`}>
          {message(type)}
        </div>
        <div className={styles.timeAgo}>{getTimeAgo(createdDate)}</div>
      </div>
    </div>
  )
}
