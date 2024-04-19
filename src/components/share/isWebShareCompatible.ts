'use client'

import UAParser from 'ua-parser-js'

function isDektopSafari(){
  const parserResult = (new UAParser()).getResult()
  return parserResult.browser.name === 'Safari'
}

export default function isWebShareCompatible(data: {
  title: string,
  text: string,
  url: string
}){
  return !isDektopSafari() && navigator?.canShare && navigator?.canShare(data)
}