
function isDektopSafari(){
  const uA = navigator.userAgent;
  const vendor = navigator.vendor;
  return /Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA)
}

export default function isWebShareCompatible(){
  return !isDektopSafari() && navigator?.canShare && navigator?.canShare()
}