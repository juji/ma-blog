
import type Post from "@/types/post";
import styles from './post-page.module.css'
import { format } from 'date-fns'
import Content from './content'
import ShareButton from '@/components/share';

export default function PostPage({ post }:{post:Post}){

  return <article className={styles.post}>
    {post.feature_image ? <div className={styles.postImage}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.feature_image} alt={post.title} /> 
    </div> : null}
    <div className={styles.header}>
      <h1>{post.title}</h1>
      <div>
        <time dateTime={post.published_at}>{format(post.published_at, 'PPP')}</time>
        <ShareButton big={false} />
      </div>
    </div>
    <Content content={post.html} />
  </article>

}