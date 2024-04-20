import type Post from '@/types/post'
import styles from './postlink.module.css'
import { format } from 'date-fns'

export default function PostLink({ post }: { post: Post }){

  return <div className={styles.postlink}>
    <a href={`/post/${post.slug}`}>{post.title}</a>
    <p>
      {post.excerpt.replace(/\n/g,' ').replace(/\ +/g,' ')}
    </p>
    <time 
      dateTime={post.published_at} 
      className={styles.publishAt}>{format(post.published_at, 'PPP')}</time>
  </div>

}