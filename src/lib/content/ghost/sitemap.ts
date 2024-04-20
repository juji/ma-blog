import { GHOST_URL, GHOST_KEY } from '@/lib/constants'

export async function getPageNum(){

  const data = await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?' + 
    `&fields=slug&limit=all&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

  // Google's limit: 50000
  // add 1 for homepage
  return (data.meta.pagination.total + 1) < 50000 ? 1 : 
    Math.ceil((data.meta.pagination.total + 1) / 50000)

}

// starts at zero
export async function getPages(num: number){

  return await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?' + 
    `&limit=50000&page=${num+1}` +
    `&fields=slug,updated_at&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())

}