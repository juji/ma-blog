// import type Post from "@/types/post";
import styles from './post-list.module.css'
import PostLink from "./post-link";
import type { Entry } from "contentful";

export default function PostList({ posts } : { posts: Entry[] }){

  return <div className={styles.postlist}>
    {posts.map(v => <PostLink key={v.sys.id} post={v} />)}
  </div>

}