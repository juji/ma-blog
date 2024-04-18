
import styles from './footer.module.css'
import FooterContainer from './FooterContainer'

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>){

  return <footer className={`${styles.footer} ${className||''}`}>
    <div className={styles.footerSpacer}></div>
    <FooterContainer className={styles.footerContentContainer}>
      <div className={styles.footerContent}>
        <div>footer left</div>
        <div>footer right</div>
      </div>
    </FooterContainer>
    {/* <div className={styles.footerAd}>Ad</div> */}
  </footer>

}