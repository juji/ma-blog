"use client"

import styles from './footer.module.css'
import { useRef } from 'react'

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

  const color = useRef(bg[Math.floor(Math.random()*bg.length)])

  return <footer className={`${styles.footer} ${className||''}`}>
    <div className={styles.footerSpacer}></div>
    <div className={styles.footerContentContainer} 
      style={{background: color.current}}>
      <div className={styles.footerContent}>
        <div>footer left</div>
        <div>footer right</div>
      </div>
    </div>
    {/* <div className={styles.footerAd}>Ad</div> */}
  </footer>

}