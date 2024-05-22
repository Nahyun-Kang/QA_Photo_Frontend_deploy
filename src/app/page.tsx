import styles from './page.module.scss'
import CommonButton from '@/app/_components/Button'

export default function Home() {
  const universal = 'test'
  return (
    <main>
      테스트
      <p className={styles.text}>테스트다용</p>
      <CommonButton type="secondary" thickness="thin">
        {'흠냐'}
      </CommonButton>
    </main>
  )
}
