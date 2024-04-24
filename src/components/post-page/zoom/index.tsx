'use client'

import './zoom.css'
import styles from './zoom.module.css'
import { PropsWithChildren, useState, useEffect } from 'react'
import { createPortal } from 'react-dom';

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

type ZoomParams = {
  src: string | undefined,
  alt: string | undefined,
  onClose?: () => void
}

function Zoom({ src, alt, onClose }:ZoomParams){

  return <TransformWrapper centerOnInit={true}>
    {({ zoomIn, zoomOut }) => (
      <div className={styles.zoom}>
        <div className={styles.zoomTitle}>
          <p>{alt}</p>
        </div>
        <TransformComponent wrapperClass={styles.zoomContent}>
          <img src={src} alt={alt} />
        </TransformComponent>
        <div className={styles.zoomControls}>
          <div>
            <button aria-label="zoom in" 
              onClick={() => zoomIn()}>+</button>
            <button aria-label="zoom out" 
              onClick={() => zoomOut()}>&minus;</button>
            <button aria-label="close zoom" 
              className={styles.red}
              onClick={onClose}>&times;</button>
          </div>
        </div>
      </div>
    )}
  </TransformWrapper>

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