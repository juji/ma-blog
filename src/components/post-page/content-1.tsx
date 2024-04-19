import './content.css'

import CodeHighlight from '@/components/code-highlight';

export default function Content({ content }:{ content: string }){

  console.log(content)

  return <>
    <div className='juji-post-content'
      dangerouslySetInnerHTML={{ __html: content }}></div>
    <hr />
    <CodeHighlight lang="js">const asdf = 'asdf'</CodeHighlight>
  </>

}