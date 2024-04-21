import * as contentful from 'contentful'
import { 
  CONTENTFUL_SPACE_ID, 
  CONTENTFUL_DELIVERY_API,
  CONTENTFUL_PREVIEW_API 
} from '@/lib/constants'


export function getDeliveryClient(){

  return contentful.createClient({
    
    // This is the space ID. 
    // A space is like a project folder in Contentful terms
    space: CONTENTFUL_SPACE_ID as string,

    // This is the access token for this space. 
    // Normally you get both ID and the token in the Contentful web app
    accessToken: CONTENTFUL_DELIVERY_API as string,

  })

}

export function getPreviewClient(){

  return contentful.createClient({
    
    // This is the space ID. 
    // A space is like a project folder in Contentful terms
    space: CONTENTFUL_SPACE_ID as string,

    // This is the access token for this space. 
    // Normally you get both ID and the token in the Contentful web app
    accessToken: CONTENTFUL_PREVIEW_API as string,

    host: 'preview.contentful.com'

  })

}