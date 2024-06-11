import styles from './page.module.scss'
import SellerOrBuyer from './_components/SellerOrBuyer'

export default function CardDetailPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageTitle}>마켓플레이스</div>
      <SellerOrBuyer />
    </div>
  )
}
