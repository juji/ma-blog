import { GHOST_URL, GHOST_KEY } from '@/lib/constants'

export default async function getHome(){

  return await fetch(
    (GHOST_URL as string) +
    '/ghost/api/content/posts/?' + 
    `&fields=title,slug,excerpt,published_at&key=` +
    (GHOST_KEY as string),
    { next: { revalidate: 900 } }
  ).then(res => res.json())  

}