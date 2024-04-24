import * as contentful from 'contentful'
import { 
  CONTENTFUL_SPACE_ID, 
  CONTENTFUL_DELIVERY_API,
  CONTENTFUL_PREVIEW_API 
} from '@/lib/constants'

const ContentApi = 'https://cdn.contentful.com'
const PreviewApi = 'https://preview.contentful.com'

export async function getDrafts(){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries` + 
    `?access_token=${CONTENTFUL_PREVIEW_API}`,
    { next: { revalidate: 900 } }
  ).then(res => res.json())  

}