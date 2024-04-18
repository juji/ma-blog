import type Post from "@/types/post";
import PostPage from "@/components/post-page";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await fetch(
    (process.env.GHOST_URL as string) +
    '/ghost/api/content/posts/?limit=all&fields=slug&key=' +
    (process.env.GHOST_KEY as string)
  ).then((res) => res.json()).then(r => r.posts)
 
  return posts
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
  // fetch data
  const data = await fetch(
    (process.env.GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?` +
    `&fields=title,feature_image,excerpt&key=` +
    (process.env.GHOST_KEY as string)
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

  const res = await fetch(
    (process.env.GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${params.slug}?key=` +
    (process.env.GHOST_KEY as string)
  )
  const data = (await res.json())


  return (
    <main>
      <PostPage post={data.posts[0]} />
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

