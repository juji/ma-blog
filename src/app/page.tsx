import Link from "next/link";
import type Post from "@/types/post"

export default async function Home() {

  const res = await fetch(
    (process.env.GHOST_URL as string) +
    '/ghost/api/content/posts/?key=' +
    (process.env.GHOST_KEY as string)
  )
  const data = await res.json()


  return (
    <main>
      <p>This is Home</p>
      <Link href="/about">About</Link><br />

      {data.posts.map((v: Post) => {
        return <div>
          <br />
          <p><Link href={`/${v.slug}`}>{v.title}</Link></p>
          <p>{v.excerpt.replace(/\n/g,' ').replace(/\ +/g,' ')}</p>
          <hr />
        </div>
      })}

      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    </main>
  );
}

