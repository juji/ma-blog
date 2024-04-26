
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
    { next: { tags: ["home"] } }
  ).then(res => res.json())  

}

export async function getDrafts(skip = 0, limit = 10){

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `skip=${skip}&limit=${limit}&` +
    `order=-sys.createdAt&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { next: { tags: ["draft"] } }
  ).then(res => res.json())

}

export async function getDraft(slug: string){

  // WARNING: doesn't cache much

  return await fetch(
    PreviewApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `fields.slug=${decodeURIComponent(slug)}&` +
    `content_type=post&` +
    `access_token=${CONTENTFUL_PREVIEW_API}`,
    { next: { tags: [`draft/${slug}`] } }
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
    { next: { tags: [`post/${slug}`] } }
  ).then(res => res.json())
  .then(entries => entries.items[0])

}

export async function getByTag(tag: string){

  return await fetch(
    ContentApi +
    `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?` + 
    `metadata.tags.sys.id[in]=${decodeURIComponent(tag)}&` +
    `content_type=post&` +
    `order=-sys.createdAt&` +
    `access_token=${CONTENTFUL_DELIVERY_API}`,
    { next: { tags: [`tag/${tag}`] } }
  ).then(res => res.json())

}