import { GradeType } from '@/app/_lib/types/cardType'
import { AlarmType } from '@/app/_lib/alarmType'

interface AlarmMockDataType {
  userName?: string
  quantity?: number
  grade: GradeType
  cardName: string
  isRead: boolean
  type: AlarmType
  createdDate: string
}

const ALARM_MOCK: AlarmMockDataType[] = [
  {
    userName: '기며누',
    quantity: 1,
    grade: 'rare',
    cardName: '우리집 앞마당',
    isRead: false,
    type: 'saleCompleted',
    createdDate: '2023-01-01',
  },
  {
    userName: '예진쓰',
    grade: 'common',
    cardName: '스페인 여행',
    isRead: false,
    type: 'exchangeProposed',
    createdDate: '2023-01-01',
  },
  {
    grade: 'legendary',
    cardName: '우리집 앞마당',
    isRead: true,
    type: 'outOfStock',
    createdDate: '2023-01-01',
  },
  {
    grade: 'rare',
    cardName: `How Far I'll Go`,
    isRead: true,
    type: 'purchaseCompleted',
    createdDate: '2023-01-01',
  },
]

export default ALARM_MOCK
