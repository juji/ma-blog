'use client'

import { TreeStructure, type Tree } from './tree'

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
        ext,
        text,
        dir: isOpenDir || isCloseDir,
        open: isOpenDir,
      })

    })

  return tree
}

export default function TreeElm({ 
  content,
  className
}:{ 
  content: string 
  className: string
}){
  const tree = createTree(content)

  return <TreeStructure className={className} tree={tree} />
}