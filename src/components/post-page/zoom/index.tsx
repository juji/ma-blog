'use client'

import './zoom.css'
import styles from './zoom.module.css'
import { PropsWithChildren, useState, useEffect } from 'react'
import { createPortal } from 'react-dom';

type ZoomParams = {
  src: string | undefined,
  alt: string | undefined,
  onClose?: () => void
}

function Zoom({ src, alt, onClose }:ZoomParams){

  return <div className={styles.zoom}>
    <div className={styles.zoomContent}>
      <img src={src} alt={alt} />
    </div>
    <div className={styles.zoomTitle}>
      <div className={styles.zoomTitleContent}>
        <span>{alt}</span>
        <button aria-label="close zoom" 
          onClick={onClose}>&times;</button>
      </div>
    </div>
  </div>

}

export default function ZoomButton(
  { src, alt, children }: PropsWithChildren<ZoomParams>
){

  const [ open, setOpen ] = useState(false)

  useEffect(() => {
    if(open) document.body.classList.add('juji-zoom-noscroll')
    else document.body.classList.remove('juji-zoom-noscroll')
  },[open])

  return <>
    <button className={styles.zoomButton} 
      aria-label="open zoom" 
      onClick={() => setOpen(true)}>{children}</button>
    {open ? createPortal(
      <Zoom src={src} 
      alt={alt} 
      onClose={() => setOpen(false)} />,
      document.body
    ) : null}
  </>

}