import { getPreviewClient } from './client'

export async function getMetadata( slug: string ){

  return getPreviewClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}

export async function getContent( slug: string ){
  
  return getPreviewClient().getEntries({
    'fields.slug' : slug,
    'content_type': 'post'
  }).then(v => v.items[0])

}