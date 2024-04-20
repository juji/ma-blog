import * as dotenv from 'dotenv'

export default function setup(){
  dotenv.config({ path: ['.env.local'] })
}