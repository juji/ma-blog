import { Code } from "bright"
import { ReactNode } from "react"

// https://bright.codehike.org/
type CodeParams = {
  lang : string,
  children: ReactNode
}

Code.theme = 'dracula'

export default function CodeHighlight({ 
  lang,
  children
} : CodeParams){

  return <Code lang={lang} lineNumbers>{children}</Code>
}