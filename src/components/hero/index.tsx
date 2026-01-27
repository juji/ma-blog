
import styles from './hero.module.css'

export default function Hero(){
  
  return <div className={styles.hero}>
    <h1 className={styles.big}>Juji&apos;s Blog</h1>
    <p className={styles.what}>What? where? here? ... Awesome!</p>
    <p className={styles.note}>
      <span>Just some notes</span>{' '}
      <span>that will help me</span>{' '}
      <span>with web development,</span><br />
      <span>or some other stuff.</span>{' '}
      <span>I hope it can</span>{' '}<span>help you too. ;)</span></p>
    <div className={styles.rainbow}></div>
  </div>

}