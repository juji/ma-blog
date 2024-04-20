
import type { MetadataRoute } from 'next'
import type Post from '@/types/post'
import { BASE_URL, GHOST_URL, GHOST_KEY } from '@/lib/constants'
 
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed

  const data = await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?' + 
    `&fields=slug&limit=all&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())


  // Google's limit: 50000
  const num = (data.meta.pagination.total + 1) < 50000 ? 1 : 
    Math.ceil((data.meta.pagination.total + 1) / 50000)

  return new Array(num).map((v,i) => ({ id: i }))
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {

  const data = await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?' + 
    `&limit=50000&page=${id+1}` +
    `&fields=slug,updated_at&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

  const dat = data.posts.map((post: Post) => ({
    url: `${BASE_URL}/post/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'daily',
    priority: 0.8
  }))

  if(!id) dat.unshift({
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  })

  return dat
}