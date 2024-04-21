import { MetadataRoute } from 'next'
import { getPages } from '@/lib/content/contentful/sitemap'
import type { Entry } from "contentful";
import { BASE_URL } from '@/lib/constants'

/*

This is currently creating a max of 1000 page
need to update when there are more pages than 1000

*/

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const data = await getPages(0)
  const pages = data.items.map((post:Entry) => ({
    url: `${BASE_URL}/post/${post.fields.slug}`,
    lastModified: new Date(post.sys.updatedAt),
    changeFrequency: "daily",
    priority: 0.8
  }))

  pages.unshift({
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1
  })

  // @ts-ignore
  return pages

}