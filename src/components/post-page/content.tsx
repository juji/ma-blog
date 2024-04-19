import './content.css'

export default function Content({ content }:{ content: string }){

  return <div className="juji-post-content" 
    dangerouslySetInnerHTML={{ __html: content }}></div>

  // return <Interweave 
  //   // allowAttributes={true}
  //   allowElements={true}
  //   content={content} 
  //   noWrap={true}
  //   filters={[linkFilter]}
  // />

}