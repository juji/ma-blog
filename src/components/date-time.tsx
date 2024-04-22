import { isSameDay, format } from "date-fns"

export default function DateTime(
{
  created,
  updated
}:{
  created: string,
  updated: string
}){

  return !updated ? <time dateTime={created}>{format(created, 'PPP')}</time> : <span>
    <time dateTime={created}>{format(created, 'PPP')}</time> | updated at{' '}
    <time>{format(updated, 'PPP')}</time>
  </span>

}
