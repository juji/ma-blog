import './content.css'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import CodeHighlight from '../code-highlight'

let codeGroup: {
  code: string,
  lang: string,
  title: string
}[] = []

export default function Content({ content }: { content: string }){

  return <Markdown 
    className="juji-post-content" 
    rehypePlugins={[rehypeRaw]}
    components={{
      img(props){
        const {children, node, alt, ...rest} = props

        let caption = ''
        if(alt?.match(/^caption\:/)){
          caption = alt.replace(/^caption\:/,'')
        }

        return caption ? <figure suppressHydrationWarning>
          <img {...rest} alt={caption} loading="lazy" />
          <figcaption>{caption}</figcaption>
        </figure> : <img {...rest} alt={alt} loading="lazy" />
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
        const match = className?.match(/^language-((([^\|\$]+)(\||\$))?([^\.]+(\.(.+))?))$/)

        // this is a group
        if ( match && match[4] ){
          codeGroup.push({
            code: children?.toString().trim() || '',
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
            >{children?.toString().trim()}</CodeHighlight>
        }

        // this only has lang
        else if(match && match[5]){
          return <CodeHighlight 
              lang={match[5]} 
            >{children?.toString().trim()}</CodeHighlight>
        }

        else return <code {...rest} className={(className||'')+' juji-code'}>
          {children}
        </code>

      }
    }}
  >{content}</Markdown>

}