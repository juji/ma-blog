'use client'

import SocialButtons, { Buttons } from "./social-buttons"
import { ShareIcon } from "./icons"
import styles from './share.module.css'
import { useEffect, useState } from "react"
import isWebShareCompatible from "./isWebShareCompatible"

type ShareData = { title: string, text: string, url: string }

export default function ShareButton({ big = true }:{ big?: boolean }){

  const [ isOpen, setOpen ] = useState(false)
  const [ data, setData ] = useState<null|ShareData|false>(null)

  useEffect(() => {
    const shareData = {
      title: document.title,
      text: document.querySelector("meta[name='description']")?.getAttribute("content") || '',
      url: window.location.href
    }

    if(isWebShareCompatible(shareData)){
      setData(shareData)
    }else{
      setData(false)
    }
  },[])

  const onClose = () => {
    setOpen(false)
  }

  const onClick = () => {
    if(data) navigator.share(data)
    else setOpen(true)
  }

  return <>
    { !data && big ? <Buttons className={styles.shareBlockElm} customClass={styles.custom} /> :
      <button aria-label="Share this article" className={big ? styles.shareButtonBig : styles.shareButtonSmall} 
        onClick={onClick}>
        <span><ShareIcon /></span>
        {big ? <span>Share</span> : null}
      </button> }
    
    {isOpen ? <SocialButtons onClose={onClose} /> : null }
  </>

}

