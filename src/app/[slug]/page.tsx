import Link from "next/link";
import type Post from "@/types/post";

export async function generateStaticParams() {
  const posts = await fetch(
    (process.env.GHOST_URL as string) +
    '/ghost/api/content/posts/?limit=all&fields=slug&key=' +
    (process.env.GHOST_KEY as string)
  ).then((res) => res.json()).then(r => r.posts)
 
  return posts as Post[]
}

export default async function Post({ params }: { params: { slug: string } }) {



  const res = await fetch(
    (process.env.GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?key=` +
    (process.env.GHOST_KEY as string)
  )
  const data = await res.json()


  return (
    <main>
      <p>This is Page</p>
      <Link href="/">Home</Link><br />
      <pre>{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}

