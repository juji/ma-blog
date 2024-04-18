'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

// repetition makes it more random
const bg = [
  '#fdbe02',
  '#88fd02',
  '#ef9af7',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
  //
  '#fdbe02',
  '#88ff00',
  '#ef9af7',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
  //
  '#fdbe02',
  '#88ff00',
  '#ef9af7',
  '#02fdf9',
  '#fdf502',
  '#02fd41',
]

function getColor(last: string|null) : string {
  const color = bg[Math.floor(Math.random()*bg.length)]
  return last && last === color ? getColor(last) : color
}

export default function Footer({ className, children }: React.HTMLAttributes<HTMLElement>){

  const pathname = usePathname()
  const lastColor = useRef<string|null>(null)
  const color = useMemo(() => {
    const col = getColor(lastColor.current)
    return col
  },[ pathname ])

  return <div 
    className={className}
    style={{background: color }}>
      {children}
    </div>

}