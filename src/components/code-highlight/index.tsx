import { Code } from "bright"
import { ReactNode } from "react"
import { tabs } from "./tabbed/extension"
import { focus } from "./focus/extension"

// https://bright.codehike.org/
type CodeParams = {
  lang? : string,
  children?: ReactNode,
  title?: string,
  subProps?: {
    code: string,
    lang: string,
    title: string
  }[]
}

Code.theme = 'dracula'

export default function CodeHighlight({ 
  lang,
  children,
  title,
  subProps
} : CodeParams){

  return <Code 
    title={title||''} 
    lang={lang||''}
    subProps={subProps}
    extensions={[tabs, focus]}
    lineNumbers
  >{children}</Code>
}