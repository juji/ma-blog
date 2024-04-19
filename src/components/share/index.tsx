'use client'

import SocialButtons from "./social-buttons"
import { ShareIcon } from "./icons"
import styles from './share.module.css'
import { useState } from "react"
import isWebShareCompatible from "./isWebShareCompatible"

export default function ShareButton({ big = true }:{ big?: boolean }){

  const [ isOpen, setOpen ] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  const onClick = () => {

    const shareData = {
      title: document.title,
      text: document.querySelector("meta[name='description']")?.getAttribute("content") || '',
      url: window.location.href
    }

    if(isWebShareCompatible(shareData)){
      navigator.share(shareData)
    } else setOpen(true)
  }

  return <>
    <button className={big ? styles.shareButtonBig : styles.shareButtonSmall} onClick={onClick}>
      <span><ShareIcon /></span>
      {big ? <span>Share</span> : null}
    </button>
    {isOpen ? <SocialButtons onClose={onClose} /> : null }
  </>

}

