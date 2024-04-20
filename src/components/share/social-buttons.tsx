'use client'

import styles from './social-buttons.module.css'
import { useEffect, useState } from 'react'
import { ClipboardIcon, MailIcon } from './icons'
import { 
  FBShareBtn,
  TwitterShareBtn,
  ThreadsShareBtn,

  LinkedInShareBtn,
  RedditShareBtn,
  SkypeShareBtn,

  WhatsAppShareBtn,
} from "dv-social-share";
import toast from 'react-hot-toast';


type Meta = {
  title: string,
  description: string,
  url: string
}

export function Buttons(
  { className, customClass }:
  { customClass: string, className: string }
){

  const [ meta, setMeta ] = useState<Meta|null>(null)
  useEffect(() => {
    setMeta({
      title: document.title,
      description: document.querySelector("meta[name='description']")?.getAttribute("content") || '',
      url: window.location.href
    })
  },[])

  function copyUrl(){
    if(!meta) return
    navigator.clipboard.writeText(meta.url);
    toast(meta.url + ' copied to clipboard');
  }

  return meta ? <>
    <div className={`${className}`}>
      <FBShareBtn
        url={meta.url}
        quote={meta.title}
      />
      <TwitterShareBtn
        url={meta.url}
        title={meta.title}
      />
      <ThreadsShareBtn
        url={meta.url}
        title={meta.title}
      />
      <LinkedInShareBtn
        url={meta.url}
        title={meta.title}
      />
      <RedditShareBtn
        url={meta.url}
        title={meta.title}
      />
      <SkypeShareBtn 
        url={meta.url}
        title={meta.title}
      />
      <WhatsAppShareBtn
        url={meta.url}
        title={meta.title}
      />

      <a href={`mailto:?body=${encodeURIComponent(meta.title)}%20${encodeURIComponent(meta.url)}`} 
        target="_blank" rel="noreferer noopener" className={customClass}>
        <MailIcon />
      </a>

      <button onClick={copyUrl} className={customClass}>
        <ClipboardIcon />
      </button>

    </div> 
  </> : null

}

export default function SocialButtons({ onClose }: { onClose: () => void }){

  return <div className={styles.socialButtons} onClick={onClose}>
    <Buttons className={styles.buttons} customClass={styles.custom} />
  </div>

}