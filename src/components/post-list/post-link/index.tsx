import type Post from '@/types/post'
import styles from './postlink.module.css'
import { format } from 'date-fns'
import Link from 'next/link'

export default function PostLink({ post }: { post: Post }){

  return <div className={styles.postlink}>
    <Link href={`/post/${post.slug}`}>{post.title}</Link>
    <p>
      {post.excerpt.replace(/\n/g,' ').replace(/\ +/g,' ')}
    </p>
    <div className={styles.publishAt}>{format(post.published_at, 'PPP')}</div>
  </div>

}