
import type { MetadataRoute } from 'next'
import type { Entry } from "contentful";
import { BASE_URL } from '@/lib/constants'
import { getPageNum, getPages } from '@/lib/content/contentful/sitemap'
 

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

  const dat = data.items.map((post:Entry) => ({
    url: `${BASE_URL}/post/${post.fields.slug}`,
    lastModified: new Date(post.sys.updatedAt),
    changeFrequency: "daily",
    priority: 0.8
  }))

  if(!id) dat.unshift({
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1
  })

  // @ts-ignore
  return dat
}