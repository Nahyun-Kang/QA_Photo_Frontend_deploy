import styles from './page.module.scss'
import CommonButton from '@/app/_components/Button'
import Header from '@/app/_components/Header'
import CommonHeader from './_components/Header/CommonHeader'
import Chip from './_components/Chip'
import Grade from './_components/Grade'
import GradeChip from './_components/GradeChip'
import SelectComponent from './_components/Select'

export default function Home() {
  const universal = ['COMMON', 'RARE', 'SUPERRARE', 'LEGENDARY']

  return (
    <main>
      <Header />
      <CommonHeader>아이</CommonHeader>
      테스트
      <p className={styles.text}>테스트다용</p>
      <CommonButton type="secondary" thickness="thin">
        {'흠냐'}
      </CommonButton>
      <Chip>내용</Chip>
      <Grade type="detail" />
      <GradeChip count={20} grade={'LEGENDARY'} />
      <SelectComponent list={universal} title={'낮은 정렬순'} />
    </main>
  )
}
