
import { 
  getPostById, 
  getDraftById 
} from '@/lib/content/contentful/fetch'
import { revalidateTag } from 'next/cache';

import { WEBHOOK_SECRET } from '@/lib/constants'; 

export async function POST(request: Request) {

  const topic = request.headers.get('X-Contentful-Topic')
  // topic === 'ContentManagement.Entry.publish'
  // topic === 'ContentManagement.Entry.unpublish'
  // topic === 'ContentManagement.Entry.auto_save'

  const secret = request.headers.get('X-JUJI-WEBHOOK')
  if(secret !== WEBHOOK_SECRET) return Response.error()

    
  const data = await request.json();

  let slug = ''
  let tags:any[]|null = null

  // request content when it's not available
  if(!data.fields?.slug || !data.metadata?.tags){
    
    // get full data from post || draft
    const [ post, draft ] = await Promise.all([
      getPostById(data.sys.id),
      getDraftById(data.sys.id),
    ])

    // draft will always have the content,
    // but post sometimes not
    slug = post.fields?.slug || draft.fields?.slug
    tags = post.metadata?.tags || draft.metadata?.tags

  }else{

    slug = data.fields?.slug['en-US']
    tags = data.metadata?.tags

  }

  if(
    topic === 'ContentManagement.Entry.unpublish' ||
    topic === 'ContentManagement.Entry.publish'
  ){

    // revalidate the pages
    revalidateTag(`post/${slug}`)
    revalidateTag(`home`)

    // and the tag
    tags && tags.forEach((tag:any) => {
      revalidateTag(`tag/${tag.sys.id}`)
    });
    
  }

  if(
    topic === 'ContentManagement.Entry.auto_save'
  ){
    revalidateTag(`draft/${slug}`)
    revalidateTag(`draft`)
  }

  return Response.json({ ok: true })

}
