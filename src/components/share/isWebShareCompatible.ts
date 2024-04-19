
function isDektopSafari(){
  const uA = navigator.userAgent;
  const vendor = navigator.vendor;
  return /Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA)
}

export default function isWebShareCompatible(data: {
  title: string,
  text: string,
  url: string
}){
  return !isDektopSafari() && navigator?.canShare && navigator?.canShare(data)
}