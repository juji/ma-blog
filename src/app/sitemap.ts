
import type { MetadataRoute } from 'next'
import type Post from '@/types/post'
import { BASE_URL, GHOST_URL, GHOST_KEY } from '@/lib/constants'
import { getPageNum, getPages } from '@/lib/content/ghost/sitemap'
 
export async function generateSitemaps() {

  // Fetch the total number of posts 
  // and calculate the number of sitemaps needed
  const num = await getPageNum()
  return [ ...new Array(num) ].map((_,i) => ({ id: i }))

}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {

  const data = await getPages(id)

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