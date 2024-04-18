import Link from "next/link";
import type Post from "@/types/post"

export default async function Page({ params }: { params : { page: string }}) {

  const res = await fetch(
    (process.env.GHOST_URL as string) +
    `/ghost/api/content/posts/?page=${params.page}key=` +
    (process.env.GHOST_KEY as string)
  )
  const data = await res.json()


  return (
    <main>
      <p>This is Home</p>
      <Link href="/about">About</Link><br />

      {data.posts.map((v: Post) => {
        return <div key={v.uuid}>
          <br />
          <p><Link href={`/post/${v.slug}`}>{v.title}</Link></p>
          <p>{v.excerpt.replace(/\n/g,' ').replace(/\ +/g,' ')}</p>
          <hr />
        </div>
      })}

      <pre className="test">{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}

