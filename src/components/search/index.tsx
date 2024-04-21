'use client'
import { Command } from 'cmdk'
import { useState, useEffect } from 'react'
import { Search } from './icons'
import UAParser from 'ua-parser-js'
import styles from './search-button.module.css'
import searchText from '@/lib/search-text'
import './search.css'

const CommandMenu = () => {
  const [open, setOpen] = useState(false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const [ isApple, setApple ] = useState<null|boolean>(null)
  useEffect(() => {
    const parsed = (new UAParser()).getResult()
    setApple(parsed.device.vendor === 'Apple')
  },[])

  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState<({} | undefined)[]|null>(null)

  async function doSearch( text: string ){

    const res = await searchText(text)
    console.log('search result', res)

    if(!res.hits.length) setSearchResult(null)
    else setSearchResult(res.hits)

  }

  useEffect(() => {

    if(search) doSearch(search)
    else setSearchResult(null)

  },[ search ])

  return (<>
    <button className={styles.button} onClick={() => setOpen(true)}>
      <Search />
      <span>{typeof isApple !== 'boolean' ? null : isApple ? '⌘+K' : 'ctrl+k'}</span>
    </button>
    <Command.Dialog loop open={open} onOpenChange={setOpen} label="Search Blog Posts">
      <Command.Input 
        autoFocus placeholder="Type to search posts..."
        value={search} onValueChange={(e) => setSearch(e)} />
      <Command.List>
        {searchResult ? searchResult.map(v => {

          // @ts-ignore
          const key = v.sys.id // @ts-ignore
          const slug = v.fields.slug['en-US'] //@ts-ignore
          const title = v.fields.title['en-US'] //@ts-ignore
          const description = v.fields.description['en-US']

          {/* @ts-ignore */}
          return <Command.Item 
            onSelect={val => window.location.href = `/post/${val}`}
            key={key} value={slug}>
              <span className="result-title">{title}</span>
              <span className="result-desc">{description}</span>
          </Command.Item>
        }) : null}
        {/* <Command.Empty>No results found.</Command.Empty> */}
      </Command.List>
    </Command.Dialog>
  </>)
}

export default CommandMenu