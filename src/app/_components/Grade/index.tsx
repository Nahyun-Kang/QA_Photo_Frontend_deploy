import styles from './Grade.module.scss'

interface GradeProps {
  grade?: 'COMMON' | 'RARE' | 'SUPERRARE' | 'LEGENDARY'
  type?: 'card' | 'detail'
}

export default function Grade({ grade = 'COMMON', type = 'card' }: GradeProps) {
  return (
    <span className={`${styles.grade} ${styles[grade]} ${styles[type]}`}>
      {grade}
    </span>
  )
}
