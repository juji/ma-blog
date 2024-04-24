import type Post from "@/types/post";
import type { Metadata, /* ResolvingMetadata */ } from 'next'
import { getPost } from "@/lib/content/contentful/fetch";
import { notFound } from 'next/navigation'

import PostPage from "@/components/post-page";
import Content from '@/components/post-page/content/content-markdown'

type Props = { params: { slug: string } }

// export const revalidate = 3600

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const data = await getPost(params.slug)
  if(!data) notFound()
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: data.fields.title as string + " | Juji's Blog",
    description: data.fields.excerpt as string,
    // openGraph: {
    //   images: data.posts[0].feature_image ? 
    //     [data.posts[0].feature_image, ...previousImages] : previousImages,
    // },
  }
}

export default async function Post({ params }: Props) {

  const data = await getPost( params.slug )
  if(!data) notFound()

  return (
    <main>
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      <PostPage post={data}>
        <Content content={data.fields.content as string} />
      </PostPage>
    </main>
  );
}

