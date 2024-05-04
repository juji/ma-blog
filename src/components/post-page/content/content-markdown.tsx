import 'katex/dist/katex.min.css'
import './content.css'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Latex from 'react-latex-next';
import Zoom from '../zoom'
import remarkGfm from 'remark-gfm'

import CodeHighlight from '../code-highlight'
import Tree from '../juji-tree'
import {
  Table,
  TableHeader,
  TableBody,
  // TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '../table'

let codeGroup: {
  code: string,
  lang: string,
  title: string
}[] = []

export default function Content({ content }: { content: string }){

  return <Markdown 
    className="juji-post-content"
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      table(props){
        const {children, node, ...rest} = props
        return <Table {...rest}>{children}</Table>
      },

      thead(props){
        const { children, node, ...rest } = props
        return <TableHeader {...rest}>{children}</TableHeader>
      },

      tr(props){
        const { children, node, ...rest } = props
        return <TableRow {...rest}>{children}</TableRow>
      },

      th(props){
        const { children, node, ...rest } = props
        return <TableHead {...rest}>{children}</TableHead>
      },

      tbody(props){
        const { children, node, ...rest } = props
        return <TableBody {...rest}>{children}</TableBody>
      },

      td(props){
        const { children, node, ...rest } = props
        return <TableCell {...rest}>{children}</TableCell>
      },
      
      img(props){
        const {children, node, alt, src, ...rest} = props

        const zoom = alt?.match(/^zoom\:/)
        const title = alt?.replace(/^zoom\:/,'')

        let caption = ''
        if(title?.match(/^caption\:/)){
          caption = title.replace(/^caption\:/,'')
        }

        return caption ? <figure>
          { zoom ? <Zoom src={src} alt={caption} >
            <img {...rest} src={src} alt={caption} loading="lazy" /></Zoom> : 
            <img {...rest} src={src} alt={caption} loading="lazy" /> }
          <figcaption>{caption}</figcaption>
        </figure> : zoom ? <Zoom src={src} alt={title} >
            <img {...rest} src={src} alt={title} loading="lazy" /></Zoom> : 
            <img {...rest} src={src} alt={title} loading="lazy" />
        
      },
      a(props){
        const {children, className, node, ...rest} = props

        return <a {...rest} className={(className||'')} 
          rel="noopener noreferrer"
          target="_blank">
          {children}
        </a>

      },
      code(props) {
        
        const {children, className, node, ...rest} = props
        const match = className?.match(/^language-((([^\|\$]+)(\||\$))?(.+?(\.([^\.]+)$)?))$/)
        const trimmed = children?.toString().trim() as string

        // latex
        if(match && match[1].toLowerCase() === 'latex'){
          return <Latex>$$
            {trimmed}
          $$</Latex>
        }

        if(match && match[1].toLowerCase() === 'juji-tree'){
          return <Tree content={trimmed} className='juji-tree' />
        }

        // this is a group
        else if ( match && match[4] ){
          codeGroup.push({
            code: trimmed || '',
            lang: match[7] || match[5],
            title: match[5]
          })
          
          // this is the last element
          if(match[4] === '$') {
            const props = [...codeGroup];
            codeGroup = []
            return <CodeHighlight subProps={props} />
          }else{

            // match[4] === '|'
            return null
          }
        }

        // this has title
        else if(match && match[5] && match[7]){
          return <CodeHighlight 
              lang={match[7]} 
              title={match[5]}
            >{trimmed}</CodeHighlight>
        }

        // this only has lang
        else if(match && match[5]){
          return <CodeHighlight 
              lang={match[5]} 
            >{trimmed}</CodeHighlight>
        }

        // just draw the thing
        else if(trimmed.match(/\r|\n/g)){
          return <CodeHighlight>{trimmed}</CodeHighlight>
        }

        // inline
        else {

          const isLatex = trimmed.match(/^\$\$?[^$]+\$\$?$/)
          if(isLatex){
            return <Latex>{isLatex[0]}</Latex>
          }

          return <code {...rest} className={(className||'')+' juji-code'}>
            {children}
          </code>
        }

      }
    }}
  >{content}</Markdown>

}