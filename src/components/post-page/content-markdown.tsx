import './content.css'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import CodeHighlight from '../code-highlight'

export default function Content({ content }:{ content: string }){

  return <Markdown 
    className="juji-post-content" 
    rehypePlugins={[rehypeRaw]}
    components={{
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
        const match = /language-(\w+)/.exec(className || '')
        const lang = className && className.split('-').pop()

        return match && node && lang ? (
          <CodeHighlight lang={lang}>{children?.toString().trim()}</CodeHighlight>
        ) : (
          <code {...rest} className={(className||'')+' juji-code'}>
            {children}
          </code>
        )
      }
    }}
  >{content}</Markdown>

}