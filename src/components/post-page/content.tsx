import './content.css'
import ReactHtmlParser from 'react-html-parser';
import CodeHighlight from '@/components/code-highlight';
import ShareButton from '@/components/share';

const render = (content: string) => {
  return ReactHtmlParser(content, {
      transform: (node) => {
          if (node.type === 'tag' && node.name === 'code' && node.children) {
              return (
                <CodeHighlight lang="js">{node.children[0].data}</CodeHighlight>
              );
          }
          return undefined;
      },
  });
};

export default function Content({ content }:{ content: string }){

  return <>
    <div className='juji-post-content'>{render(content)}</div>
    <br /><br />
    <ShareButton />
  </>

}