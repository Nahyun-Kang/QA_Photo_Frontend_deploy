import styles from './Grade.module.scss'
import gradeExtract from '@/app/_util/gradeExtract'
import { GradeType } from '@/app/_lib/types/cardType'

interface GradeProps {
  grade?: GradeType
  type?: 'card' | 'detail'
}

export default function Grade({ grade = 'COMMON', type = 'card' }: GradeProps) {
  return (
    <span className={`${styles.grade} ${styles[grade]} ${styles[type]}`}>
      {gradeExtract(grade)}
    </span>
  )
}
