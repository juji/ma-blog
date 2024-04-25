
import type { Metadata } from 'next'

// import Post from '@/types/post';
import Hero from "@/components/hero";
import PostList from "@/components/post-list";
import { getHome } from '@/lib/content/contentful/fetch'
import { openGraphImage } from './shared-metadata'

// import CodeHighlight from '@/components/code-highlight';

export const metadata: Metadata = {
  title: "Juji's Blog",
  description: 'Just some notes that will help me with web development. I hope it can help you too. ;)',
  openGraph: openGraphImage
}

export default async function Home() {

  const data = await getHome()

  return (
    <main>
      <Hero />
      <PostList posts={data.items} />
      {/* <CodeHighlight lang="json">{JSON.stringify(data,null,2)}</CodeHighlight>  */}
    </main>
  );
}

