import { getDeliveryClient, getPreviewClient } from './client'

export default async function getHome(skip = 0, limit = 10){

  return getDeliveryClient().getEntries({
    skip,
    limit,
    // @ts-ignore
    order: "-sys.createdAt"
  })

}

export async function getDrafts(skip = 0, limit = 10){
  
  return getPreviewClient().getEntries({
    skip,
    limit,
    // @ts-ignore
    order: "-sys.createdAt"
  })

}