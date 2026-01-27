
import type { Metadata } from 'next'

import Hero from "@/components/hero";
import PostList from "@/components/post-list";
import { getDrafts } from '@/lib/content/contentful/fetch'
import { openGraphImage } from '@/app/shared-metadata'
import { Pagination } from '@/components/pagination';

// import CodeHighlight from '@/components/code-highlight';

export const metadata: Metadata = {
  title: "Juji's Blog",
  description: 'Just some notes that will help me with web development, or some other stuff. I hope it can help you too. ;)',
  openGraph: openGraphImage
}

export default async function Home({
  params
}: {
  params: Promise<{ pageid: string }>
}) {
  
  const pageId = await params.then(p => Number(p.pageid));
  const data = await getDrafts(5 * (pageId - 1), 5);

  return (
    <main>
      <Hero />
      <PostList posts={data?.items || []} />
      <Pagination 
        totalEntity={data?.total || 0}
        currentPageEntity={data.limit || 0} 
        currentPage={pageId} 
        linkPrefix="/drafts/"
      />
    </main>
  );
}

