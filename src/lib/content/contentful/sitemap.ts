import { getDeliveryClient } from './client'

export async function getPageNum(){

  // contentful limit 1000
  // Google's limit: 50000
  // add 1 for homepage

  // so this will always be 
  return [{ id: 0 }]  

  // because, do I want more than 1000 pages?
  // maybe in the future

  // const data = await getDeliveryClient().getEntries({
  //   skip: 0,
  //   limit: 1000,
  //   // @ts-ignore
  //   order: "-sys.createdAt"
  // })


  // return data.items.length + 1
  

}

// starts at zero
export async function getPages(num: number){

  return await await getDeliveryClient().getEntries({
    skip: num * 1000,
    limit: 1000,
    // @ts-ignore
    order: "-sys.createdAt"
  })

}