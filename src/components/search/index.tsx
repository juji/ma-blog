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
  const [ loading, setLoading ] = useState(false)
  const [ hasResult, setHasResult ] = useState(false)
  const [ searchResult, setSearchResult ] = useState<({} | undefined)[]|null>(null)

  async function doSearch( text: string ){
    
    setHasResult(false)
    setLoading(true)
    const res = await searchText(text)
    console.log('search result', res)
    setLoading(false)
    if(!res.hits.length) setSearchResult(null)
    else setSearchResult(res.hits)

  }

  useEffect(() => {

    if(search) doSearch(search)
    else {
      setHasResult(false)
      setSearchResult(null)
    }

  },[ search ])

  return (<>
    <button className={styles.button} aria-label="Search" onClick={() => setOpen(true)}>
      <Search />
      <span>{typeof isApple !== 'boolean' ? null : isApple ? '⌘+K' : 'ctrl+k'}</span>
    </button>
    <Command.Dialog 
      loop 
      open={open}
      // shouldFilter={false} 
      filter={(value, search) => {
        const v = JSON.parse(value)
        let ret = 0
        if (v.title.includes(search)) ret = 1
        if (v.description.includes(search)) ret = 1
        if (v.excerpt.includes(search)) ret = 1
        if (v.tags.find((v: string) => v.includes(search))) ret = 1
        if(ret && !hasResult) setHasResult(true)
        return ret
      }}
      onOpenChange={setOpen} label="Search Blog Posts">
      <Command.Input 
        autoFocus placeholder="Type to search posts..."
        value={search} onValueChange={(e) => setSearch(e)} />

      {loading ? null : search ? <Command.Empty>No results found.</Command.Empty> : null}

      <Command.List>
        {loading && <Command.Loading>Fetching words…</Command.Loading>}
        {searchResult && searchResult.length ? searchResult.map(v => {

          const data = {
            // @ts-ignore
            slug: v.fields.slug['en-US'], //@ts-ignore
            title: v.fields.title['en-US'], //@ts-ignore
            description: v.fields.description['en-US'], //@ts-ignore
            excerpt: v.fields.excerpt['en-US'], //@ts-ignore
            tags: v.metadata.tags.map(v => v.id),
          }

          // @ts-ignore
          const key = v.sys.id 
          
          {/* @ts-ignore */}
          return <Command.Item 
            onSelect={val => {
              let d = JSON.parse(val)
              window.location.href = `/post/${d.slug}`
            }}
            key={key} value={`${JSON.stringify(data)}`}>
              <p className="result-title">{data.title}</p>
              <p className="result-desc">{data.description}</p>
          </Command.Item>
        }) : null}
      </Command.List>

      { hasResult ? <div className="juji-cmdk-commands">
        <span className='juji-cmdk-commands-inst'>
          <code>↑</code> <code>↓</code> to select, and <code>Enter</code> to go.
        </span>
        <span className='juji-cmdk-commands-logo'>
          <a href="https://www.algolia.com/" target="_blank" rel="noopener noreferrer">
            <img src="/algolia.jpeg" alt="algolia" />
          </a>
        </span>
      </div> : null}
    </Command.Dialog>
  </>)
}

export default CommandMenu