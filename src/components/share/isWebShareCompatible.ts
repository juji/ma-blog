'use client'

import UAParser from 'ua-parser-js'

function isDektopMac(){
  const parserResult = (new UAParser()).getResult()
  return parserResult.device.model === "Macintosh" &&
    parserResult.browser.name !== 'Edge'
    
}

export default function isWebShareCompatible(data: {
  title: string,
  text: string,
  url: string
}){
  return !isDektopMac() && 
    navigator?.canShare && 
    navigator?.canShare(data)
}