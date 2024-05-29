import Title from '@/app/_components/Title'
import Button from '@/app/_components/Button'

import styles from './page.module.scss'

export default function myGalleryPage() {
  return (
    <main>
      <div className={styles.titleWrapper}>
        <Title>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>마이갤러리</h2>
            <div className={styles.buttonContainer}>
              <Button thickness="thin">포토카드 생성하기</Button>
            </div>
          </div>
        </Title>
      </div>
      <div className={styles.floatButtonContainer}>
        <Button thickness="thin">포토카드 생성하기</Button>
      </div>
    </main>
  )
}
