import styles from './Pagination.module.scss'

interface EllipsisComponentProps {
  list: number[]
  onClick: (number: number) => void
}

export default function EllipsisComponent({
  list,
  onClick,
}: EllipsisComponentProps) {
  return (
    <ul className={styles.ellipsisContainer}>
      {list.map((el) => {
        return (
          <li
            key={el}
            className={styles.ellipsisItem}
            onClick={() => onClick(el)}
          >
            {el}
          </li>
        )
      })}
    </ul>
  )
}
