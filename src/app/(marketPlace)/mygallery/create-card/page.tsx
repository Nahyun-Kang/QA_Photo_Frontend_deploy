import Title from '@/app/_components/Title'
import CreateCardForm from './_components/CreateCardForm'
import ReactHookFormProvider from '@/app/_components/Input/ReactHookFormProvider'

import styles from './createCard.module.scss'

export default function CreateCardPage() {
  return (
    <main>
      <div className={styles.titleWrapper}>
        <Title>
          <h2 className={styles.title}>포토카드 생성</h2>
        </Title>
      </div>
      <CreateCardForm />
    </main>
  )
}
