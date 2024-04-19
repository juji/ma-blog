// @ts-ignore
// 'use client'
import './content.css'
import { Interweave } from 'interweave';
import { FilterInterface } from 'interweave';
import { polyfill } from 'interweave-ssr';

import CodeHighlight from '../code-highlight';

polyfill()

function swapAttribute( 
  node: HTMLElement,
  attribute: string,
  replacement: string 
){

  if(!node.hasAttribute(attribute)) return;
  const val = node.getAttribute(attribute) || ''
  node.removeAttribute(attribute)
  node.setAttribute(replacement, val)

}

const linkFilter: FilterInterface = {
  node(name, node) {

    swapAttribute(node, 'frameborder', 'frameBorder')
    swapAttribute(node, 'referrerpolicy', 'referrerPolicy')
    swapAttribute(node, 'allowfullscreen', 'allowFullScreen')

    if (name === 'a') {
      node.setAttribute('target', '_blank');
    }

    return node;
  },
};

export default function Content({ content }:{ content: string }){

  // console.log(content)

  return <div className="juji-post-content">
    <Interweave 
      allowAttributes={true}
      allowElements={true}
      content={content} 
      noWrap={true}
      filters={[linkFilter]}
  />
  <hr />
  <CodeHighlight lang="js">const asdf = 'asdf'</CodeHighlight>
  </div>

}