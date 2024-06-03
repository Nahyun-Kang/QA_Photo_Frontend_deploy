import Image from 'next/image'

import styles from './randomPointModal.module.scss'
import CloseIcon from '/public/icons/close.svg'
import randomBox1 from '/public/images/random_box1.png'
import randomBox2 from '/public/images/random_box2.png'
import randomBox3 from '/public/images/random_box3.png'

export default function RandomPointModal() {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <button className={styles.button}>
          <CloseIcon width={28} height={28} />
        </button>
        <div className={styles.titleWrapper}>
          <div className={styles.randomPointWrapper}>
            <span className={styles.random}>랜덤</span>
            <span className={styles.point}>포인트</span>
          </div>
          <div className={styles.messageWrapper}>
            <div className={styles.message}>1시간마다 돌아오는 기회!</div>
            <div className={styles.message}>
              랜덤 상자 뽑기를 통해 포인트를 획득하세요!
            </div>
          </div>
          <div className={styles.timeWrapper}>
            <div className={styles.timeMessage}>다음 기회까지 남은 시간</div>
            <div className={styles.time}>59분 58초</div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.boxWrapper}>
            <Image
              src={randomBox1}
              alt="랜덤박스1"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.boxWrapper}>
            <Image
              src={randomBox2}
              alt="랜덤박스2"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.boxWrapper}>
            <Image
              src={randomBox3}
              alt="랜덤박스3"
              layout="fill"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
