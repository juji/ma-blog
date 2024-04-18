
import styles from './hero.module.css'

export default function Hero(){
  
  return <div className={styles.hero}>
    <h1 className={styles.big}>Juji's Blog</h1>
    <p className={styles.what}>What? where? here? ... Awesome!</p>
    <p className={styles.note}>
      Just some notes that will help me with web development.<br />
      I hope it can help you too. ;)</p>
  </div>

}