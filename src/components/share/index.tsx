'use client'

import SocialButtons from "./social-buttons"
import { ShareIcon } from "./icons"
import styles from './share.module.css'
import { useState } from "react"
import isWebShareCompatible from "./isWebShareCompatible"

export default function ShareButton(){

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
    <button className={styles.shareButtonBig} onClick={onClick}>
      <span><ShareIcon /></span>
      <span>Share</span>
    </button>
    {isOpen ? <SocialButtons onClose={onClose} /> : null }
  </>

}

