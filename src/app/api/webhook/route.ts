
import { getPost } from '@/lib/content/contentful/fetch'
import { revalidateTag } from 'next/cache';
 
export async function POST(request: Request) {

  const data = await request.json();
  // console.log(JSON.stringify(data,null,2));

  const isPost = await getPost(data.fields.slug['en-US'])
    .then(v => !!v).catch(e => false)

  if(isPost){
    revalidateTag(`post/${data.fields.slug['en-US']}`)
    revalidateTag(`home`)
    data.metada.tags.forEach((tag:any) => {
      revalidateTag(`tag/${tag.sys.id}`)
    });
  }

  revalidateTag(`draft/${data.fields.slug['en-US']}`)
  revalidateTag(`draft`)

  return Response.json({ ok: true })

}
