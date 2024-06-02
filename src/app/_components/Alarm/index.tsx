import { GradeType } from '@/app/_lib/cardType'
import { AlarmType } from '@/app/_lib/alarmType'
import gradeExtract from '@/app/_util/gradeExtract'
import styles from './Alarm.module.scss'

export default function Alarm() {
  return <div></div>
}

interface AlarmItemProps {
  userName?: string
  quantity?: number
  grade: GradeType
  cardName: string
  createdDate: Date
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
      case 'SaleCompleted':
        message = `${userName}님이 [${grade} | ${cardName}]을 ${quantity}장 구매했습니다.`
        break
      case 'purchaseCompleted':
        message = `[${grade} | ${cardName}] ${quantity}장을 성공적으로 구매했습니다.`
        break
      case 'exchangeCompleted':
        message = `[${grade} | ${cardName}] ${quantity}가 성공적으로 교환되었습니다.`
        break
      case 'exchangeProposed':
        message = `${userName}님이 [${grade} | ${cardName}의 포토카드 교환을 제안했습니다.]`
        break
      case 'outOfStock':
        message = `[${grade} | ${cardName}이 품절되었습니다.]`
        break
      default:
        message = ''
    }
    return message
  }

  return (
    <div>
      <div>{message(type)}</div>
      <div>시간</div>
    </div>
  )
}
