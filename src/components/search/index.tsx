'use client'
import { Command } from 'cmdk'
import { useState, useEffect, useMemo } from 'react'
import { Search } from './icons'
import UAParser from 'ua-parser-js'
import styles from './search-button.module.css'
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

  const isApple = useMemo(() => {
    const parsed = (new UAParser()).getResult()
    return parsed.device.vendor === 'Apple'
  },[])

  const [ search, setSearch ] = useState('')

  return (<>
    <button className={styles.button} onClick={() => setOpen(true)}>
      <Search />
      <span suppressHydrationWarning>{isApple ? '⌘+K' : 'ctrl+k'}</span>
    </button>
    <Command.Dialog open={open} onOpenChange={setOpen} label="Search Blog Posts">
      <Command.Input 
        autoFocus placeholder="Type to search posts..."
        value={search} onValueChange={(e) => setSearch(e)} />
      <Command.List>
        {/* <Command.Empty>No results found.</Command.Empty> */}
      </Command.List>
    </Command.Dialog>
  </>)
}

export default CommandMenu