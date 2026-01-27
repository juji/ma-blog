
import type { Metadata } from 'next'
import { getByTag } from "@/lib/content/contentful/fetch";

import { notFound } from 'next/navigation'
import PostList from "@/components/post-list";

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  const { slug } = await params
  return {
    title: `tag: ${slug} | Juji's Blog`,
  }
}

export default async function Post({ params }: Props) {

  const { slug } = await params
  const data = await getByTag( slug )
  if(!data) notFound()

  return (
    <main>
      <h1 style={{fontSize: '3rem'}}>#{slug}</h1>
      <p>Post{data.items.length>1?'s':''} using this tag:</p>
      <PostList posts={data.items} />
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

