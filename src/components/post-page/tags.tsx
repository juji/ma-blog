import type { Entry } from 'contentful'

export default function Tags({ 
  className,
  post 
}:{ 
  className: string
  post: Entry 
}){

  return post.metadata.tags.length ? <div className={className}>
    {post.metadata.tags.map(t => {
      return <a key={t.sys.id} 
        href={`/tag/${t.sys.id}`}>#{t.sys.id}</a>
    })}
  </div> : null


}