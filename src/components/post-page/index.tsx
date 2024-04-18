import parse from 'html-react-parser';
import type Post from "@/types/post";
import styles from './post-page.module.css'

export default function PostPage({ post }:{post:Post}){

  return <article className={styles.post}>
    <h1>{post.title}</h1>
    {post.feature_image ? <div className={styles.postImage}>
      <img src={post.feature_image} alt={post.title} />
    </div> : null}
    <div>{parse(post.html)}</div>
  </article>

}