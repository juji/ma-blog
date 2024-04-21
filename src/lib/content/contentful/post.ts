import { getDeliveryClient } from './client'

export async function getMetadata( slug: string ){

  return getDeliveryClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}

export async function getContent( slug: string ){
  
  return getDeliveryClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}

export async function getByTag( tag: string ){

  return getDeliveryClient().getEntries({
    // @ts-ignore
    'metadata.tags.sys.id[in]': tag,
    'content_type': 'post',
    // @ts-ignore
    order: "-sys.createdAt",
    limit: 1000
  })

}