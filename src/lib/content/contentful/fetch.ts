
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
    `order=-sys.createdAt&` +
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { cache: 'force-cache', next: { tags: ["home"] } }
  ).then(res => res.json())

}

export async function getDrafts(skip = 0, limit = 10){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` +
    `skip=${skip}&limit=${limit}&` +
    `order=-sys.createdAt&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { cache: 'force-cache', next: { tags: ["draft"] } } as any
  ).then(res => res.json())

}

export async function getDraft(slug: string){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` +
    `fields.slug=${decodeURIComponent(slug)}&` +
    `content_type=post&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { cache: 'force-cache', next: { tags: [`draft/${slug}`] } } as any
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
    { cache: 'force-cache', next: { tags: [`post/${slug}`] } } as any
  ).then(res => res.json())
  .then(entries => entries.items[0])

}

export async function getDraftById(id: string){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}?` + 
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { cache: 'no-store' }
  ).then(res => res.json())

}

export async function getPostById(id: string){

  return await fetch(
    ContentApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}?` + 
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { cache: 'no-store' }
  ).then(res => res.json())

}

export async function getByTag(tag: string){

  return await fetch(
    ContentApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` +
    `metadata.tags.sys.id[in]=${decodeURIComponent(tag)}&` +
    `content_type=post&` +
    `order=-sys.createdAt&` +
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { cache: 'force-cache', next: { tags: [`tag/${tag}`] } } as any
  ).then(res => res.json())

}