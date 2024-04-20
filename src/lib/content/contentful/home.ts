import { getDeliveryClient } from './client'

export default async function getHome(skip = 0, limit = 10){

  return getDeliveryClient().getEntries({
    skip,
    limit,
    // @ts-ignore
    order: "-sys.createdAt"
  })

}