
import type { Metadata } from 'next'

import PostList from "@/components/post-list";
import { getDrafts } from '@/lib/content/contentful/fetch'
import { openGraphImage } from '@/app/shared-metadata'
import { Pagination } from '@/components/pagination';

export const metadata: Metadata = {
  title: "Draft | Juji's Blog",
  description: 'Just some notes that will help me with web development. I hope it can help you too. ;)',
  openGraph: openGraphImage
}

export default async function Home() {

  const data = await getDrafts(0,5)

  return (
    <main>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        borderBottom: '1px solid grey'
      }}>Drafts</h1>
      <PostList posts={data?.items || []} prefix={'/draft'} />
      <Pagination
        totalEntity={data?.total || 0}
        currentPageEntity={data.limit || 0} 
        currentPage={1} 
        linkPrefix="/drafts/"
      />
    </main>
  );
}

