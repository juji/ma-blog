'use client'

import { Icon } from '@iconify/react';
import { iconsExt, iconsNamed } from './icons';
import styles from './tree.module.css'
import { ReactElement, useState } from 'react'

export type Branch = {
  text: string | ReactElement
  ext: string | undefined
  open?: boolean | undefined | null
  dir?: boolean | undefined | null
  branch?: Tree
}

export type Tree = Branch[]

function BranchLine({ 
  branch,
  pk
}:{ 
  branch: Branch 
  pk: string
}){

  const [ open, setOpen ] = useState(branch.open)
  const { ext, dir, text, branch: children } = branch

  return <div className={`${styles.line}`}>

    {dir ? <button onClick={() => setOpen(!open)}>
      <span>{ open ? 
        <Icon icon={iconsNamed.folderOpen} /> :
        <Icon icon={iconsNamed.folder} />
      }</span>
      <span>{text}</span>
    </button> : <div>
      <span><Icon icon={(ext && iconsExt[ext]) || iconsNamed.default} /></span>
      <span>{text}</span>
    </div>}

    {children ? <div className={`${open?styles.open:''} ${styles.content}`}>
      <div className={styles.inner}>
      {children.map((v,k) => {
        return <BranchLine key={`BranchLine${pk}${k}`} branch={v} pk={`${pk}${k}`} />
      })}
      </div>
    </div> : null }

  </div>

}

export function TreeStructure({ 
  tree,
  className
}:{ 
  tree: Tree 
  className: string
}){

  return <div className={`${className} ${styles.tree}`}>
    {tree.map((v,k) => <BranchLine key={`BranchLine${k}`} pk={k+''} branch={v} />)}
  </div>

}