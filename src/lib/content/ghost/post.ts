import { GHOST_URL, GHOST_KEY } from '@/lib/constants'

export async function getMetadata( slug: string ){

  return await fetch(
    (GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${slug}?` +
    `&fields=title,feature_image,excerpt&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then((res) => res.json())

}

export async function getContent( slug: string ){

  return await fetch(
    (GHOST_URL as string) +
    `/ghost/api/content/posts/slug/${slug}?key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

}