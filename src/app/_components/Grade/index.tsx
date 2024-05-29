import styles from './Grade.module.scss'
import gradeExtract from '@/app/_util/gradeExtract'

interface GradeProps {
  grade?: 'common' | 'rare' | 'super_rare' | 'legendary'
  type?: 'card' | 'detail'
}

export default function Grade({ grade = 'common', type = 'card' }: GradeProps) {
  return (
    <span className={`${styles.grade} ${styles[grade]} ${styles[type]}`}>
      {gradeExtract(grade)}
    </span>
  )
}
