
import { getPostById, getDraftById } from '@/lib/content/contentful/fetch'
import { revalidateTag } from 'next/cache';
 
export async function POST(request: Request) {

  // const topic = request.headers.get('X-Contentful-Topic')
  // topic === 'ContentManagement.Entry.publish'
  // topic === 'ContentManagement.Entry.unpublish'
  // topic === 'ContentManagement.Entry.auto_save'
  // topic === 'ContentManagement.Entry.archive'
  // topic === 'ContentManagement.Entry.unarchive'

  const data = await request.json();

  // get full data from post || draft
  const [ post, draft ] = await Promise.all([
    getPostById(data.sys.id),
    getDraftById(data.sys.id),
  ])

  // update all
  // since it's easier
  const slug = post.fields?.slug || draft.fields?.slug
  const tags = post.metadata?.tags || draft.metadata?.tags

  revalidateTag(`post/${slug}`)
  revalidateTag(`draft/${slug}`)
  revalidateTag(`home`)
  revalidateTag(`draft`)
  tags && tags.forEach((tag:any) => {
    revalidateTag(`tag/${tag.sys.id}`)
  });

  return Response.json({ ok: true })

}
