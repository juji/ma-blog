import parse from 'html-react-parser';
import type Post from "@/types/post";
import styles from './post-page.module.css'
import { format } from 'date-fns'

export default function PostPage({ post }:{post:Post}){

  return <article className={styles.post}>
    {post.feature_image ? <div className={styles.postImage}>
      <img src={post.feature_image} alt={post.title} />
    </div> : null}
    <div className={styles.header}>
      <h1>{post.title}</h1>
      <span>{format(post.published_at, 'PPP')}</span>
    </div>
    <div suppressHydrationWarning>{parse(post.html)}</div>
  </article>

}