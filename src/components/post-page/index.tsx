

import type { Entry } from 'contentful'
import styles from './post-page.module.css'
// import Content from './content'
// import Content from './content-markdown'
// import ContentMdx from './content-mdx'
import ShareButton from '@/components/share';
import Comments from "./comments";
import DateTime from '../date-time';
import Tags from './tags';
import { PropsWithChildren } from 'react';

export default function PostPage({ 
  post, 
  children 
}: PropsWithChildren<{
  post: Entry
}>){

  return <article className={styles.post}>
    
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {/* {post.feature_image ? <div className={styles.postImage}>
      <img src={post.feature_image} alt={post.title} /> 
    </div> : null} */}

    {/* <CodeHighlight lang='js'>{JSON.stringify(post,null,2)}</CodeHighlight> */}

    <div className={styles.header}>
      <h1>{post.fields.title as string}</h1>
      <Tags className={styles.tags} post={post} />
      <div className={styles.dateShare}>
        <span className={styles.dateTime}>
          <DateTime created={post.sys.createdAt} updated={post.fields.updatedAt as string} />
        </span>
        <ShareButton big={false} />
      </div>
    </div>
    {children}
    <br /><br />
    <ShareButton />
    <Comments />
  </article>

}