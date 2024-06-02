// ~분 전, ~시간 전, ~일 전을 반환하는 함수

import moment from 'moment'

export const getTimeAgo = (timeAt: string): string => {
  if (!timeAt) {
    return ''
  }

  const today = moment()
  const postingDate = moment(timeAt, 'YYYY-MM-DD HH:mm:ss')
  const dayDiff = postingDate.diff(today, 'days')
  const hourDiff = postingDate.diff(today, 'hours')
  const minutesDiff = postingDate.diff(today, 'minutes')

  if (dayDiff === 0 && hourDiff === 0) {
    const minutes = Math.abs(minutesDiff)
    return `${minutes}분 전`
  }

  if (dayDiff === 0) {
    const hour = Math.abs(hourDiff)
    return `${hour}시간 전` // '시간'으로 표시
  }

  const day = Math.abs(dayDiff)
  return `${day}일 전` // '일'로 표시
}
