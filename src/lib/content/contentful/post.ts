import { getDeliveryClient } from './client'

export async function getMetadata( slug: string ){

  // @ts-ignore
  return getDeliveryClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}

export async function getContent( slug: string ){
  
  // @ts-ignore
  return getDeliveryClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}