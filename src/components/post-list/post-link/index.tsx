import type { Entry } from "contentful";
import styles from './postlink.module.css'
import DateTime from '@/components/date-time'

export default function PostLink({ post }: { post: Entry }){

  return <div className={styles.postlink}>
    
    <a href={`/post/${post.fields.slug}`}>{post.fields.title as string}</a>
    
    <p>
      {(post.fields.excerpt as string).replace(/\n/g,' ').replace(/\ +/g,' ')}
    </p>

    <div className={styles.dateTime}>
      <DateTime created={post.sys.createdAt} updated={post.fields.updatedAt as string} />
    </div>

  </div>

}