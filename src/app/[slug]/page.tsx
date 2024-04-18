import Link from "next/link";
import type Post from "@/types/post";
import parse from 'html-react-parser';

export async function generateStaticParams() {
  const posts = await fetch(
    (process.env.GHOST_URL as string) +
    '/ghost/api/content/posts/?limit=all&fields=slug&key=' +
    (process.env.GHOST_KEY as string)
  ).then((res) => res.json()).then(r => r.posts)
 
  return posts
}

export default async function Post({ params }: { params: { slug: string } }) {



  const res = await fetch(
    (process.env.GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?key=` +
    (process.env.GHOST_KEY as string)
  )
  const data = (await res.json())
  const post:Post = data.posts[0]


  return (
    <main>
      <p>This is Page</p>
      <Link href="/">Home</Link><br /><br />
      <h1>{post.title}</h1><br />
      <div>{parse(post.html)}</div>
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

