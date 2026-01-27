import styles from './pagination.module.css'
import Link from 'next/link'

export function Pagination(props: {
  totalEntity: number, 
  currentPageEntity: number, 
  currentPage: number, 
  linkPrefix?: string
}) {

  const { totalEntity, currentPageEntity, currentPage } = props
  const pages = Math.ceil(totalEntity / currentPageEntity)

  return (
    <div className={styles.pagination}>
      {[...Array(pages)].map((_, i) => (
        <Link 
          key={i}
          href={`${props.linkPrefix ?? '/'}${i + 1}`}
          className={`${styles.link} ${currentPage === i + 1 ? styles.active : ''}`}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}