'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

// repetition makes it more random
const bg = [
  '#fdbe02',
  '#88fd02',
  '#ed47fc',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
  //
  '#fdbe02',
  '#88ff00',
  '#ed47fc',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
  //
  '#fdbe02',
  '#88ff00',
  '#ed47fc',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
]

export default function Footer({ className, children }: React.HTMLAttributes<HTMLElement>){

  const pathname = usePathname()
  const color = useMemo(() => {
    return bg[Math.floor(Math.random()*bg.length)]
  },[ pathname ])

  return <div 
    className={className}
    style={{background: color }}>
      {children}
    </div>

}