'use client'

import styles from './index.module.css'
import { useState } from 'react'

type Branch = {
  text: string
  open?: boolean | undefined | null
  dir?: boolean | undefined | null
  extension?: string | undefined | null
  branch?: Tree
}

type Tree = Branch[]

const getBranchAtDepth = (n:number, currentTree: Tree): Tree => {
  if(!n) return currentTree
  const last = currentTree[currentTree.length-1]
  if(!last.branch) last.branch = []
  return getBranchAtDepth(n-1, last.branch)
}

const createTree = (string: string) => {

  let tree: Tree = []

  string.trim()
    .replace(/\r\n/g,'\n').replace(/\r/g,'\n')
    .replace(/\t/g,'\s')
    .split('\n')
    .forEach(v => {

      const charCat = v.match(/^(\=+)?(.+)$/)
      
      const line = ((charCat && charCat[2]) || '').match(/^((\+|\-)\s)?(.+)$/)

      const isOpenDir = line && line[2] === '+'
      const isCloseDir = line && line[2] === '-'
      const text = (line && line[3]) || ''
      const ext = text.split('.').pop()

      const depth = ((charCat && charCat[1]) || '').length
      const treeAtDepth = getBranchAtDepth(depth, tree)
      
      treeAtDepth.push({
        text, 
        dir: isOpenDir || isCloseDir,
        open: isOpenDir,
        extension: ext
      })

    })

  return tree
}

export function BranchLine({ 
  branch,
  pk
}:{ 
  branch: Branch 
  pk: string
}){

  const [ open, setOpen ] = useState(branch.open)

  return <div 
  className={`
    ${open ? styles.jujiTreeOpen : ''} 
    ${styles.jujiTreeLine}
  `.replace(/\n|\r/g,' ').replace(/\s+/g,' ')}>

    {branch.dir ? <button onClick={() => setOpen(!open)}>
      <span>{open ? '+' : '-'}</span>
      <span>{branch.text}</span>
    </button> : <span>{branch.text}</span>}

    {branch.branch ? <div className={`${open?styles.jujiTreeOpen:''} ${styles.jujiTreeContent}`}>
      <div className={styles.jujiTreeContenInner}>
      {branch.branch.map((v,k) => {
        return <BranchLine key={`${pk}${k}`} branch={v} pk={`${pk}${k}`} />
      })}
      </div>
    </div> : null }

  </div>

}

export default function Tree({ 
  content,
  className
}:{ 
  content: string 
  className: string
}){

  const tree = createTree(content)

  return <div className={`${className} ${styles.jujiTree}`}>
    {tree.map((v,k) => <BranchLine key={`${k}`} pk={k+''} branch={v} />)}
  </div>

}