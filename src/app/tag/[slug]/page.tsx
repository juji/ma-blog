import type Post from "@/types/post";
import type { Metadata } from 'next'
import { getByTag } from "@/lib/content/contentful/post";
import { notFound } from 'next/navigation'
import PostList from "@/components/post-list";

type Props = { params: { slug: string } }

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
 
  return {
    title: `tag: ${params.slug} | Juji's Blog`,
  }
}

export default async function Post({ params }: Props) {

  const data = await getByTag( params.slug )
  if(!data) notFound()

  return (
    <main>
      <h1 style={{fontSize: '3rem'}}>#{params.slug}</h1>
      <p>Post{data.items.length>1?'s':''} using this tag:</p>
      <PostList posts={data.items} />
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

