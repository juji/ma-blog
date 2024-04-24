
import { 
  CONTENTFUL_SPACE_ID, 
  CONTENTFUL_DELIVERY_API,
  CONTENTFUL_PREVIEW_API 
} from '@/lib/constants'

const ContentApi = 'https://cdn.contentful.com'
const PreviewApi = 'https://preview.contentful.com'

export async function getHome(skip = 0, limit = 10){

  return await fetch(
    ContentApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `skip=${skip}&limit=${limit}&` +
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { next: { revalidate: 900 } }
  ).then(res => res.json())  

}

export async function getDrafts(skip = 0, limit = 10){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `skip=${skip}&limit=${limit}&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { next: { revalidate: 900 } }
  ).then(res => res.json())

}

export async function getDraft(slug: string){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `fields.slug=${decodeURIComponent(slug)}&` +
    `content_type=post&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { next: { revalidate: 900 } }
  ).then(res => res.json())
  .then(entries => entries.items[0])

}

export async function getPost(slug: string){

  return await fetch(
    ContentApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `fields.slug=${decodeURIComponent(slug)}&` +
    `content_type=post&` +
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { next: { revalidate: 900 } }
  ).then(res => res.json())
  .then(entries => entries.items[0])

}