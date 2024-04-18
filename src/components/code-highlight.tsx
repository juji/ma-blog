import { Code } from "bright"
import { ReactNode } from "react"

// https://bright.codehike.org/
type CodeParams = {
  lang : string,
  children: ReactNode
}

Code.theme = 'dracula'

export default function CodeHiglight({ 
  lang,
  children
} : CodeParams){

  return <div style={{ margin: '3rem 0' }}>
    <Code lang={lang} lineNumbers>{children}</Code>
  </div>
}