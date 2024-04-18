
import styles from './header.module.css'

export default function Header({ className }: React.HTMLAttributes<HTMLElement>){

  return <header className={`${className||''} ${styles.header}`}>
    <div className={`${styles.headerContent}`}>
      <h1>JujiBlog</h1>
      <div>right</div>
    </div>
  </header>

}