import styles from './page.module.scss'
import CommonButton from '@/app/_components/Button'
import Header from '@/app/_components/Header'
import CommonHeader from './_components/Header/CommonHeader'
import Chip from './_components/Chip'
import Grade from './_components/Grade'
import GradeChip from './_components/GradeChip'
import SelectComponent from './_components/Select/Select'
import Dropdown from './_components/Dropdown'
import Pagination from './_components/pagination'
import Title from './_components/Title'
import SearchInput from './_components/SearchInput'
import Input, { InputWrapper } from './_components/Input/InputComponents'
import ReactHookFormProvider from './_components/Input/ReactHookFormProvider'

export default function Home() {
  const universal = ['COMMON', 'RARE', 'SUPERRARE', 'LEGENDARY']

  return (
    <main>
      <Header />
      <CommonHeader>아이</CommonHeader>
      테스트
      <p className={styles.text}>테스트다용</p>
      <CommonButton buttonStyle="secondary" thickness="thin">
        {'흠냐'}
      </CommonButton>
      <Chip>내용</Chip>
      <Grade type="detail" />
      <GradeChip count={20} grade={'LEGENDARY'} />
      <SelectComponent list={universal} message={'등급을 선택해주세요'} />
      <Dropdown list={universal} attribute={'등급'} />
      <Pagination count={2000} />
      <Title>
        <div className={styles.title}>제목</div>
        <div className={styles.buttonWrapper}>
          <CommonButton thickness="thin" disabled={false}>
            포토카드 교환하기
          </CommonButton>
        </div>
      </Title>
      <SearchInput />
    </main>
  )
}
