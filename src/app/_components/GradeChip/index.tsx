import styles from './GradeChip.module.scss'
import gradeExtract from '@/app/_util/gradeExtract'
import { GradeType } from '@/app/_lib/types/cardType'

interface GradeProps {
  grade?: GradeType
  count?: number
}

export default function GradeChip({ grade = 'COMMON', count = 0 }: GradeProps) {
  return (
    <div className={`${styles.container} ${styles[grade]}`}>
      <div className={styles.grade}>{gradeExtract(grade)}</div>
      <span className={styles.count}>{`${count} 장`}</span>
    </div>
  )
}
