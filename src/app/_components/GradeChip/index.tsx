import styles from './GradeChip.module.scss'

interface GradeProps {
  grade?: 'COMMON' | 'RARE' | 'SUPERRARE' | 'LEGENDARY'
  count: number
}

export default function GradeChip({ grade = 'COMMON', count = 0 }: GradeProps) {
  return (
    <div className={`${styles.container} ${styles[grade]}`}>
      <span>{grade}</span>
      <span>{`${count} 장`}</span>
    </div>
  )
}
