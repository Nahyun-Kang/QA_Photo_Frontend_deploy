import MarketPlaceTitle from './_components/Title'

import styles from './page.module.scss'
import MarketPlaceCardList from './_components/CardsList'
import RandomPointModal from '../_components/Modal/RandomPointModal'

export default function Home() {
  const handleButtonClick = () => {
    console.log('clicked')
  }

  return (
    <>
      {/* {
        <ModalMain>
          <RandomPointModal />
        </ModalMain>
      } */}
      <main className={styles.main}>
        <div className={styles.section}>
          <MarketPlaceTitle />
          <MarketPlaceCardList />
        </div>
      </main>
    </>
  )
}
