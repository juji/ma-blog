
import styles from './main.module.css'

export default function Main({ className, children }: React.HTMLAttributes<HTMLElement>){

  return <div className={`${styles.main} ${className||''}`}>
    <div className={`${styles.mainContent}`}>{children}
    {/* <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p>
    <p>asdf</p> */}
    </div>
  </div>

}