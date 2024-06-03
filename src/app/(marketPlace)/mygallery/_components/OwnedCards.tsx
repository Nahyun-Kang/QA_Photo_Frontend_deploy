import GradeChip from '@/app/_components/GradeChip'
import styles from './ownedCards.module.scss'
import Pagination from '@/app/_components/pagination'

interface Grade {
  grade: 'common' | 'rare' | 'super_rare' | 'legendary'
  count: number
}

interface OwnedCardsType {
  userName: string
  totalCount: number
  gradeList: Grade[]
}

export default function OwnedCards({
  totalCount,
  gradeList,
  userName,
}: OwnedCardsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_totalCount}>
        <div className={styles.title}>{`${userName}님이 보유한 포토카드`}</div>
        <span className={styles.totalCount}>{`(${totalCount}장)`}</span>
      </div>
      <ul className={styles.grade_list}>
        {gradeList?.map((el) => {
          return (
            <li>
              <GradeChip grade={el.grade} count={el.count} />
            </li>
          )
        })}
      </ul>
      <div className={styles.bottomLine}></div>
    </div>
  )
}
