
import type { Metadata } from 'next'

import Hero from "@/components/hero";
import PostList from "@/components/post-list";
// import CodeHighlight from '@/components/code-highlight';

import { GHOST_URL, GHOST_KEY } from '@/lib/constants'

export const metadata: Metadata = {
  title: "Juji's Blog",
  description: 'Just some notes that will help me with web development. I hope it can help you too. ;)',
  openGraph: {
    images: [ 'https://jujiyangasli.com/images/juji-1200-630.jpeg' ]
  }
}

export default async function Home() {

  const data = await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?key=' +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

  return (
    <main>
      <Hero />
      <PostList posts={data.posts} />
      {/* <CodeHighlight lang="json">{JSON.stringify(data,null,2)}</CodeHighlight>  */}
    </main>
  );
}

