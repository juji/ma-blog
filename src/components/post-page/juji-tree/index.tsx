

export default function Tree({ content }:{ content: string }){

  const str = content.trim().replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n')

  return <div data-juji-tree>
    <p>asdf</p>
  </div>

}