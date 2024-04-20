import { isSameDay, format } from "date-fns"

export default function DateTime(
{
  created,
  updated
}:{
  created: string,
  updated: string
}){

  const same = isSameDay(created, updated)

  return same ? <time dateTime={created}>{format(created, 'PPP')}</time> : <span>
    <time dateTime={created}>{format(created, 'PPP')}</time> | updated at{' '}
    <time>{format(updated, 'PPP')}</time>
  </span>

}
