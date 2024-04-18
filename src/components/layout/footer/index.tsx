import styles from './footer.module.css'

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>){

  return <footer className={`${styles.footer} ${className||''}`}>
    <div className={styles.footerSpacer}></div>
    <div className={styles.footerContentContainer}>
      <div className={styles.footerContent}>
        <div>footer left</div>
        <div>footer right</div>
      </div>
    </div>
    {/* <div className={styles.footerAd}>Ad</div> */}
  </footer>

}