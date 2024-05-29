import styles from './GradeChip.module.scss'
import gradeExtract from '@/app/_util/gradeExtract'
interface GradeProps {
  grade?: 'common' | 'rare' | 'super_rare' | 'legendary'
  count: number
}

export default function GradeChip({ grade = 'common', count = 0 }: GradeProps) {
  return (
    <div className={`${styles.container} ${styles[grade]}`}>
      <div className={styles.grade}>{gradeExtract(grade)}</div>
      <span className={styles.count}>{`${count} 장`}</span>
    </div>
  )
}
