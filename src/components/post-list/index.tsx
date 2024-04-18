import type Post from "@/types/post";
import styles from './post-list.module.css'
import PostLink from "./post-link";

export default function PostList({ posts } : { posts: Post[] }){

  return <div className={styles.postlist}>
    {posts.map(v => <PostLink key={v.id} post={v} />)}
  </div>

}