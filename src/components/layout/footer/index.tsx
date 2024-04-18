'use client'

import styles from './footer.module.css'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

const bg = [
  '#fdbe02',
  '#88fd02',
  '#e902fd',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
  '#fdbe02',
  '#88fd02',
  '#e902fd',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
]

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>){

  const pathname = usePathname()
  const color = useMemo(() => {
    return bg[Math.floor(Math.random()*bg.length)]
  },[ pathname ])

  return <footer className={`${styles.footer} ${className||''}`}>
    <div className={styles.footerSpacer}></div>
    <div className={styles.footerContentContainer} 
      style={{background: color}}>
      <div className={styles.footerContent}>
        <div>footer left</div>
        <div>footer right</div>
      </div>
    </div>
    {/* <div className={styles.footerAd}>Ad</div> */}
  </footer>

}