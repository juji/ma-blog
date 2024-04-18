import type Post from "@/types/post"

import CodeHiglight from "@/components/code-highlight";
import PostList from "@/components/post-list";

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

      <PostList posts={data.posts} />

      <CodeHiglight lang="json">{JSON.stringify(data,null,2)}</CodeHiglight>

    </main>
  );
}

