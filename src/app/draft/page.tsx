
import type { Metadata } from 'next'

// import Post from '@/types/post';
// import Hero from "@/components/hero";
import PostList from "@/components/post-list";
import { getDrafts } from '@/lib/content/contentful/fetch'
import { openGraphImage } from '@/app/shared-metadata'
// import CodeHighlight from '@/components/code-highlight';

export const metadata: Metadata = {
  title: "Draft | Juji's Blog",
  description: 'Just some notes that will help me with web development. I hope it can help you too. ;)',
  openGraph: openGraphImage
}

export default async function Home() {

  const data = await getDrafts()

  return (
    <main>
      <h1 style={{
        fontSize: '3rem', 
        fontWeight: 'bold',
        borderBottom: '1px solid grey'
      }}>Drafts</h1>
      <PostList posts={data.items} prefix={'/draft'} />
      {/* <CodeHighlight lang="json">{JSON.stringify(data,null,2)}</CodeHighlight>  */}
    </main>
  );
}

