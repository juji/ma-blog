
import styles from './post-list.module.css'
import PostLink from "./post-link";
import type { Entry } from "contentful";

export default function PostList({ 
  posts,
  prefix
} : { 
  posts: Entry[]
  prefix?: string
}){

  return <div className={styles.postlist}>
    {posts.map(v => <PostLink prefix={prefix} key={v.sys.id} post={v} />)}
  </div>

}