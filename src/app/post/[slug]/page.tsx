import type Post from "@/types/post";
import PostPage from "@/components/post-page";
import type { Metadata, ResolvingMetadata } from 'next'
import { GHOST_URL, GHOST_KEY } from '@/lib/constants'

type Props = { params: { slug: string } }

// export const revalidate = 3600

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const data = await fetch(
    (GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?` +
    `&fields=title,feature_image,excerpt&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: data.posts[0].title,
    description: data.posts[0].excerpt,
    openGraph: {
      images: data.posts[0].feature_image ? 
        [data.posts[0].feature_image, ...previousImages] : previousImages,
    },
  }
}

export default async function Post({ params }: Props) {

  const data = await fetch(
    (GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

  return (
    <main>
      <PostPage post={data.posts[0]} />
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

