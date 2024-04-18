
import Link from 'next/link'
import styles from './footer.module.css'
import FooterContainer from './FooterContainer'

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>){

  return <footer className={`${styles.footer} ${className||''}`}>
    <div className={styles.footerSpacer}></div>
    <FooterContainer className={styles.footerContentContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p>Made by:</p>
          <Link className={styles.jujiyangasli}
            href="https://jujiyangasli.com" target="_blank" rel="noreferer noopener">
            jujiyangasli.com
          </Link>
          <p>With{' '}
            <Link href="https://nextjs.org/" 
              target="_blank" rel="noreferer noopener">Next.js</Link> and{' '}
            <Link href="https://ghost.org/" 
              target="_blank" rel="noreferer noopener">Ghost</Link></p>
        </div>
        <div className={styles.footerRight}>@ 2024</div>
      </div>
    </FooterContainer>
    {/* <div className={styles.footerAd}>Ad</div> */}
  </footer>

}